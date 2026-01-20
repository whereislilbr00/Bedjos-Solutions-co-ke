from flask import Blueprint, request, jsonify
from app import db
from app.models import Product

bp = Blueprint('inventory', __name__, url_prefix='/inventory')

@bp.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{'id': p.id, 'name': p.name, 'description': p.description, 'price': p.price, 'stock': p.stock, 'image_url': p.image_url} for p in products]), 200

@bp.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify({'id': product.id, 'name': product.name, 'description': product.description, 'price': product.price, 'stock': product.stock, 'image_url': product.image_url}), 200

@bp.route('/products', methods=['POST'])
def add_product():
    data = request.get_json()
    product = Product(name=data['name'], description=data['description'], price=data['price'], stock=data['stock'], image_url=data.get('image_url'))
    db.session.add(product)
    db.session.commit()
    return jsonify({'message': 'Product added successfully', 'id': product.id}), 201
