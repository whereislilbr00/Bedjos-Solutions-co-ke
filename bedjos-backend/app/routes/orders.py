from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Order, OrderItem, Product

bp = Blueprint('orders', __name__, url_prefix='/orders')

@bp.route('/', methods=['POST'])
@jwt_required()
def create_order():
    user_id = get_jwt_identity()
    data = request.get_json()
    total = 0
    order = Order(user_id=user_id, total=total)
    db.session.add(order)
    db.session.commit()
    for item in data['items']:
        product = Product.query.get(item['product_id'])
        if product.stock < item['quantity']:
            return jsonify({'message': f'Insufficient stock for {product.name}'}), 400
        order_item = OrderItem(order_id=order.id, product_id=item['product_id'], quantity=item['quantity'], price=product.price)
        total += product.price * item['quantity']
        product.stock -= item['quantity']
        db.session.add(order_item)
    order.total = total
    db.session.commit()
    return jsonify({'message': 'Order created successfully', 'order_id': order.id}), 201

@bp.route('/', methods=['GET'])
@jwt_required()
def get_orders():
    user_id = get_jwt_identity()
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([{'id': o.id, 'total': o.total, 'status': o.status, 'created_at': o.created_at.isoformat(), 'items': [{'product_id': i.product_id, 'quantity': i.quantity, 'price': i.price} for i in o.items]} for o in orders]), 200
