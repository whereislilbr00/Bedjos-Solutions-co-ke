from flask import Blueprint, request, jsonify
from app import db
from app.models import Order

orders_simple_bp = Blueprint('orders_simple', __name__, url_prefix='/orders')

@orders_simple_bp.route('/', methods=['POST'])
def create_simple_order():
    data = request.get_json()
    
    order = Order(
        customer_name=data['customer_name'],
        phone=data['phone'],
        email=data.get('email'),
        total=data['total'],
        status=data.get('status', 'pending'),
        payment_method=data.get('payment_method', 'cod')
    )
    db.session.add(order)
    db.session.commit()
    
    return jsonify({
        'message': 'Order created successfully', 
        'order_id': order.id
    }), 201

