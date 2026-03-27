from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app import db
from app.models import Admin, Customer

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=['POST'])
def register():
    from app.models import Customer
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    
    if Customer.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400
    
    customer = Customer(name=name, email=email)
    customer.set_password(password)
    db.session.add(customer)
    db.session.commit()
    return jsonify({'message': 'Registered successfully'}), 201

@bp.route('/login', methods=['POST'])
def login():
    from app.models import Admin, Customer
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No data provided'}), 400
    
    email = data.get('email')
    password = data.get('password')
    
    # Check admin first
    admin = Admin.query.filter_by(email=email).first()
    if admin and admin.check_password(password):
        token = create_access_token(identity=str(admin.id), 
                additional_claims={"role": "admin"})
        return jsonify({
            'access_token': token,
            'role': 'admin',
            'message': 'Admin login successful'
        }), 200
    
    # Check customer
    customer = Customer.query.filter_by(email=email).first()
    if customer and customer.check_password(password):
        token = create_access_token(identity=str(customer.id),
                additional_claims={"role": "customer"})
        return jsonify({
            'access_token': token,
            'role': 'customer',
            'name': customer.name,
            'message': 'Login successful'
        }), 200
    
    return jsonify({'message': 'Invalid email or password'}), 401

