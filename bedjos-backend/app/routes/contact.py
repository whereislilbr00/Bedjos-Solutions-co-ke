from flask import Blueprint, request, jsonify
from app import db
from app.models import ContactMessage

bp = Blueprint('contact', __name__, url_prefix='/contact')

@bp.route('/', methods=['POST'])
def submit_contact():
    data = request.get_json()
    message = ContactMessage(
        name=data['name'],
        email=data['email'],
        message=data['message']
    )
    db.session.add(message)
    db.session.commit()
    return jsonify({'message': 'Contact message submitted successfully'}), 201

@bp.route('/', methods=['GET'])
def get_contacts():
    messages = ContactMessage.query.all()
    return jsonify([{
        'id': m.id,
        'name': m.name,
        'email': m.email,
        'message': m.message,
        'created_at': m.created_at.isoformat()
    } for m in messages]), 200
