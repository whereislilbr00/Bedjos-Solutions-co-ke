from flask import Blueprint, request, jsonify, current_app
import requests
import base64
import json
import os
from datetime import datetime
from app import db
from app.models import Order

mpesa_bp = Blueprint('mpesa', __name__, url_prefix='/mpesa')

@mpesa_bp.route('/stkpush', methods=['POST'])
def stk_push():
    data = request.get_json()
    phone = data.get('phone')
    amount = data.get('amount')
    order_id = data.get('order_id')
    
    if not all([phone, amount, order_id]):
        return jsonify({'error': 'Missing phone, amount, or order_id'}), 400
    
    # Get OAuth token
    consumer_key = os.getenv('MPESA_CONSUMER_KEY')
    consumer_secret = os.getenv('MPESA_CONSUMER_SECRET')
    creds = base64.b64encode(f"{consumer_key}:{consumer_secret}".encode()).decode()
    
    token_response = requests.get(
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        headers={'Authorization': f'Basic {creds}'}
    )
    
    if token_response.status_code != 200:
        return jsonify({'error': 'Failed to get MPESA token'}), 500
    
    access_token = token_response.json()['access_token']
    
    # Generate timestamp and password
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    shortcode = os.getenv('MPESA_SHORTCODE')
    passkey = os.getenv('MPESA_PASSKEY')
    password = base64.b64encode(
        f"{shortcode}{passkey}{timestamp}".encode()
    ).decode()
    
    # STK Push request
    callback_url = os.getenv('MPESA_CALLBACK_URL', 'https://placeholder.ngrok.io/api/mpesa/callback')
    stk_data = {
        "BusinessShortCode": shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": shortcode,
        "PhoneNumber": phone,
        "CallBackURL": callback_url,
        "AccountReference": f"BedjosOrder{order_id}",
        "TransactionDesc": f"Payment for Order {order_id}"
    }
    
    stk_response = requests.post(
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        json=stk_data,
        headers={
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }
    )
    
    return jsonify(stk_response.json())

@mpesa_bp.route('/callback', methods=['POST'])
def mpesa_callback():
    try:
        callback_data = request.get_data(as_text=True)
        data = json.loads(callback_data)
        
        if 'Body' in data and 'stkCallback' in data['Body']:
            if data['Body']['stkCallback']['ResultCode'] == 0:
                result = data['Body']['stkCallback']['CallbackMetadata'] or []
                receipt = next((item['Value'] for item in result if item['Name'] == 'MpesaReceiptNumber'), None)
                trans_time = next((item['Value'] for item in result if item['Name'] == 'TransactionDate'), None)
                
                if receipt and trans_time:
                    # Extract order_id from AccountReference (format: BedjosOrder123)
                    checkout_id = data['Body']['stkCallback'].get('CheckoutRequestID', '')
                    # For now update by recent order; production: store CheckoutRequestID -> order_id mapping
                    recent_order = Order.query.filter(Order.status == 'processing').order_by(Order.id.desc()).first()
                    if recent_order:
                        recent_order.status = 'paid'
                        recent_order.mpesa_receipt = receipt
                        recent_order.mpesa_transaction_date = datetime.fromtimestamp(int(trans_time)/1000)
                        db.session.commit()
                        print(f"✅ Order {recent_order.id} PAID: Receipt {receipt}")
        
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        print(f"❌ M-Pesa callback error: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 400

