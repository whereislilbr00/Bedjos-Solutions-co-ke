from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app import db
from app.models import Product, Order, Customer

bp = Blueprint('admin', __name__, url_prefix='/admin')

@bp.route('/products', methods=['POST'])
@jwt_required()
def add_product():
    data = request.get_json()
    product = Product(name=data['name'], description=data['description'], price=data['price'], stock=data['stock'], image_url=data.get('image_url'))
    db.session.add(product)
    db.session.commit()
    return jsonify({'message': 'Product added successfully', 'id': product.id}), 201

@bp.route('/orders', methods=['GET'])
@jwt_required()
def get_all_orders():
    orders = Order.query.all()
    return jsonify([{'id': o.id, 'user_id': o.user_id, 'total': o.total, 'status': o.status, 'created_at': o.created_at.isoformat()} for o in orders]), 200

@bp.route('/customers', methods=['GET'])
@jwt_required()
def get_all_customers():
    customers = Customer.query.all()
    return jsonify([{'id': c.id, 'name': c.name, 'email': c.email, 'phone': c.phone, 'address': c.address} for c in customers]), 200
