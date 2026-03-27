from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Product, Order, ContactMessage

bp = Blueprint('admin', __name__, url_prefix='/admin')

@bp.route('/stats', methods=['GET'])
@jwt_required()
def get_stats():
    total_orders = Order.query.count()
    pending_orders = Order.query.filter_by(status='pending').count()
    total_products = Product.query.count()
    total_revenue = db.session.query(db.func.sum(Order.total)).scalar() or 0
    
    return jsonify({
        'total_orders': total_orders,
        'pending_orders': pending_orders,
        'total_products': total_products,
        'total_revenue': float(total_revenue)
    })

@bp.route('/orders', methods=['GET'])
@jwt_required()
def get_all_orders():
    orders = Order.query.order_by(Order.created_at.desc()).all()
    return jsonify([{
        'id': o.id,
        'customer_name': o.customer_name,
        'phone': o.phone,
        'email': o.email,
        'total': float(o.total),
        'status': o.status,
        'payment_method': o.payment_method,
        'created_at': o.created_at.isoformat()
    } for o in orders])

@bp.route('/messages', methods=['GET'])
@jwt_required()
def get_all_messages():
    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return jsonify([{
        'id': m.id,
        'name': m.name,
        'email': m.email,
        'phone': m.phone,
        'message': m.message,
        'created_at': m.created_at.isoformat()
    } for m in messages])

@bp.route('/products', methods=['POST'])
@jwt_required()
def add_product():
    data = request.get_json()
    product = Product(
        name=data['name'],
        description=data['description'],
        price=float(data['price']),
        image=data.get('image'),
        category=data.get('category', '')
    )
    db.session.add(product)
    db.session.commit()
    return jsonify({'message': 'Product added successfully', 'id': product.id}), 201

@bp.route('/products/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'})

@bp.route('/orders/<int:id>/status', methods=['PUT'])
@jwt_required()
def update_order_status(id):
    order = Order.query.get_or_404(id)
    data = request.get_json()
    order.status = data['status']
    db.session.commit()
    return jsonify({'message': 'Order status updated successfully'})

@bp.route('/customers', methods=['GET'])
@jwt_required()
def get_all_customers():
    customers = Customer.query.all()
    return jsonify([{
        'id': c.id,
        'name': c.name,
        'email': c.email,
        'phone': c.phone
    } for c in customers])

