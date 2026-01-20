from flask import Blueprint, request, jsonify
from app import db
from app.models import Customer

bp = Blueprint('customers', __name__, url_prefix='/customers')

@bp.route('/', methods=['GET'])
def get_customers():
    customers = Customer.query.all()
    return jsonify([{'id': c.id, 'name': c.name, 'email': c.email, 'phone': c.phone, 'address': c.address} for c in customers]), 200

@bp.route('/', methods=['POST'])
def add_customer():
    data = request.get_json()
    customer = Customer(name=data['name'], email=data['email'], phone=data.get('phone'), address=data.get('address'))
    db.session.add(customer)
    db.session.commit()
    return jsonify({'message': 'Customer added successfully', 'id': customer.id}), 201
