from flask import Blueprint, request, jsonify
from app import db
from app.models import Order

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON data"}), 400
    
    order = Order(
        customer_name=data.get('customer_name'),
        phone=data.get('phone'),
        email=data.get('email'), 
        total=data.get('total'),
        status=data.get('status', 'pending'),
        payment_method=data.get('payment_method', 'cod')
    )
    
    db.session.add(order)
    db.session.commit()
    
    return jsonify({"message": "Order created", "order_id": order.id}), 201

@orders_bp.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify([{
        'id': o.id,
        'customer_name': o.customer_name,
        'total': o.total,
        'status': o.status
    } for o in orders]), 200

