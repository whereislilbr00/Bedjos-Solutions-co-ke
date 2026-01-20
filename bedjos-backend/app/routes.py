from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import Product, Order, Admin, CartItem, ContactMessage, Customer, db
import requests
import base64
from datetime import datetime

api = Blueprint("api", __name__)

# ==================== HEALTH CHECK ====================
@api.route("/", methods=["GET"])
def index():
    return jsonify({
        "status": "success",
        "message": "Bedjos Solutions API running",
        "version": "1.0.0"
    }), 200

# ==================== AUTHENTICATION ====================
@api.route("/auth/login", methods=["POST"])
def admin_login():
    data = request.get_json()
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password required"}), 400
    
    admin = Admin.query.filter_by(email=data["email"]).first()
    if not admin or not admin.check_password(data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401
    
    token = create_access_token(identity=str(admin.id))
    return jsonify({
        "access_token": token,
        "admin": {"email": admin.email}
    }), 200

@api.route("/auth/check", methods=["GET"])
@jwt_required()
def check_auth():
    admin_id = get_jwt_identity()
    admin = Admin.query.get(admin_id)
    return jsonify({"authenticated": True, "email": admin.email}), 200

@api.route("/auth/logout", methods=["POST"])
def logout():
    # For JWT, logout is handled on the client side by removing the token
    # This endpoint is for consistency and potential future server-side token blacklisting
    return jsonify({"message": "Logged out successfully"}), 200

# ==================== CUSTOMER AUTHENTICATION ====================
@api.route("/auth/customer/signup", methods=["POST"])
def customer_signup():
    data = request.get_json()
    if not data or not data.get("name") or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Name, email, and password required"}), 400

    # Check if customer already exists
    existing_customer = Customer.query.filter_by(email=data["email"]).first()
    if existing_customer:
        return jsonify({"error": "Email already registered"}), 400

    customer = Customer(
        name=data["name"],
        email=data["email"],
        phone=data.get("phone")
    )
    customer.set_password(data["password"])

    db.session.add(customer)
    db.session.commit()

    token = create_access_token(identity=str(customer.id))
    return jsonify({
        "access_token": token,
        "customer": {
            "id": customer.id,
            "name": customer.name,
            "email": customer.email,
            "phone": customer.phone
        }
    }), 201

@api.route("/auth/customer/login", methods=["POST"])
def customer_login():
    data = request.get_json()
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password required"}), 400

    customer = Customer.query.filter_by(email=data["email"]).first()
    if not customer or not customer.check_password(data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=str(customer.id))
    return jsonify({
        "access_token": token,
        "customer": {
            "id": customer.id,
            "name": customer.name,
            "email": customer.email,
            "phone": customer.phone
        }
    }), 200

# ==================== PRODUCTS ====================
@api.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([
        {
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "image": p.image,
            "category": p.category,
            "description": p.description
        } for p in products
    ]), 200

@api.route("/products/<int:id>", methods=["GET"])
def get_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify({
        "id": product.id,
        "name": product.name,
        "price": product.price,
        "image": product.image,
        "category": product.category,
        "description": product.description
    }), 200

# ==================== ADMIN PRODUCTS ====================
@api.route("/admin/products", methods=["POST"])
@jwt_required()
def admin_add_product():
    data = request.get_json()
    if not data or not data.get("name") or not data.get("price"):
        return jsonify({"error": "Name and price required"}), 400
    
    product = Product(
        name=data["name"],
        price=data["price"],
        image=data.get("image"),
        category=data.get("category"),
        description=data.get("description")
    )
    db.session.add(product)
    db.session.commit()
    return jsonify({"message": "Product created", "id": product.id}), 201

@api.route("/admin/products/<int:id>", methods=["PUT"])
@jwt_required()
def admin_update_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    data = request.get_json()
    if data.get("name"):
        product.name = data["name"]
    if data.get("price"):
        product.price = data["price"]
    if data.get("image"):
        product.image = data["image"]
    if data.get("category"):
        product.category = data["category"]
    if data.get("description"):
        product.description = data["description"]
    
    db.session.commit()
    return jsonify({"message": "Product updated"}), 200

@api.route("/admin/products/<int:id>", methods=["DELETE"])
@jwt_required()
def admin_delete_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted"}), 200

# ==================== ORDERS ====================
@api.route("/orders", methods=["POST"])
def create_order():
    data = request.get_json()
    if not data or not data.get("customer_name") or not data.get("phone") or not data.get("total"):
        return jsonify({"error": "Customer name, phone, and total required"}), 400
    
    order = Order(
        customer_name=data["customer_name"],
        phone=data["phone"],
        email=data.get("email"),
        total=data["total"],
        status="pending"
    )
    db.session.add(order)
    db.session.commit()
    return jsonify({"message": "Order placed", "order_id": order.id}), 201

@api.route("/orders/<int:id>", methods=["GET"])
def get_order(id):
    order = Order.query.get(id)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    return jsonify({
        "id": order.id,
        "customer_name": order.customer_name,
        "phone": order.phone,
        "email": order.email,
        "total": order.total,
        "status": order.status,
        "created_at": order.created_at.isoformat() if order.created_at else None
    }), 200

# ==================== ADMIN ORDERS ====================
@api.route("/admin/orders", methods=["GET"])
@jwt_required()
def admin_orders():
    orders = Order.query.order_by(Order.created_at.desc()).all()
    return jsonify([
        {
            "id": o.id,
            "customer_name": o.customer_name,
            "phone": o.phone,
            "email": o.email,
            "total": o.total,
            "status": o.status,
            "created_at": o.created_at.isoformat() if o.created_at else None
        } for o in orders
    ]), 200

@api.route("/admin/orders/<int:id>/status", methods=["PUT"])
@jwt_required()
def update_order_status(id):
    order = Order.query.get(id)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    
    data = request.get_json()
    if not data.get("status"):
        return jsonify({"error": "Status required"}), 400
    
    order.status = data["status"]
    db.session.commit()
    return jsonify({"message": "Order status updated"}), 200

# ==================== CART ====================
@api.route("/cart", methods=["POST"])
def add_to_cart():
    data = request.get_json()
    if not data or not data.get("product_id") or not data.get("session_id"):
        return jsonify({"error": "Product ID and session ID required"}), 400
    
    # Check if product exists
    product = Product.query.get(data["product_id"])
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    # Check if item already in cart
    existing_item = CartItem.query.filter_by(
        product_id=data["product_id"],
        session_id=data["session_id"]
    ).first()
    
    if existing_item:
        existing_item.quantity += data.get("quantity", 1)
    else:
        cart_item = CartItem(
            product_id=data["product_id"],
            quantity=data.get("quantity", 1),
            session_id=data["session_id"]
        )
        db.session.add(cart_item)
    
    db.session.commit()
    return jsonify({"message": "Added to cart"}), 201

@api.route("/cart/<session_id>", methods=["GET"])
def get_cart(session_id):
    items = CartItem.query.filter_by(session_id=session_id).all()
    cart_items = []
    total = 0
    
    for item in items:
        product = Product.query.get(item.product_id)
        if product:
            item_total = product.price * item.quantity
            total += item_total
            cart_items.append({
                "id": item.id,
                "product_id": item.product_id,
                "product_name": product.name,
                "product_price": product.price,
                "product_image": product.image,
                "quantity": item.quantity,
                "item_total": item_total
            })
    
    return jsonify({
        "items": cart_items,
        "total": total,
        "count": len(cart_items)
    }), 200

@api.route("/cart/<session_id>/item/<int:item_id>", methods=["DELETE"])
def remove_cart_item(session_id, item_id):
    item = CartItem.query.filter_by(id=item_id, session_id=session_id).first()
    if not item:
        return jsonify({"error": "Item not found in cart"}), 404
    
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Item removed from cart"}), 200

@api.route("/cart/<session_id>", methods=["DELETE"])
def clear_cart(session_id):
    CartItem.query.filter_by(session_id=session_id).delete()
    db.session.commit()
    return jsonify({"message": "Cart cleared"}), 200

# ==================== CONTACT MESSAGES ====================
@api.route("/contact", methods=["POST"])
def contact_message():
    data = request.get_json()
    if not data or not data.get("name") or not data.get("email") or not data.get("message"):
        return jsonify({"error": "Name, email, and message required"}), 400

    message = ContactMessage(
        name=data["name"],
        email=data["email"],
        phone=data.get("phone"),
        message=data["message"]
    )
    db.session.add(message)
    db.session.commit()

    # Send email notification
    try:
        from flask_mail import Message
        from . import mail

        msg = Message(
            subject=f"New Contact Message from {data['name']}",
            sender=data["email"],
            recipients=["admin@bedjos.co.ke"],  # Change this to your admin email
            body=f"""
New contact message received:

Name: {data['name']}
Email: {data['email']}
Phone: {data.get('phone', 'Not provided')}

Message:
{data['message']}

Sent at: {message.created_at}
            """
        )
        mail.send(msg)
        print(f"📧 Email sent to admin about contact from {data['name']}")
    except Exception as e:
        print(f"❌ Failed to send email: {str(e)}")
        # Don't fail the request if email fails

    return jsonify({"message": "Message sent successfully"}), 201

@api.route("/admin/messages", methods=["GET"])
@jwt_required()
def get_messages():
    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return jsonify([
        {
            "id": m.id,
            "name": m.name,
            "email": m.email,
            "phone": m.phone,
            "message": m.message,
            "created_at": m.created_at.isoformat() if m.created_at else None
        } for m in messages
    ]), 200

# ==================== M-PESA PAYMENTS ====================
@api.route("/payments/mpesa/stk-push", methods=["POST"])
def mpesa_stk_push():
    """
    Simplified M-Pesa STK Push endpoint
    In production, you would integrate with Safaricom Daraja API
    """
    data = request.get_json()
    
    if not data or not data.get("phone") or not data.get("amount"):
        return jsonify({"error": "Phone and amount required"}), 400
    
    # Simulate M-Pesa payment process
    # In production, you would:
    # 1. Generate timestamp
    # 2. Generate password (Base64 encoded)
    # 3. Make request to Safaricom API
    # 4. Handle callback
    
    phone = data["phone"]
    amount = data["amount"]
    
    # Remove leading '0' and add country code
    if phone.startswith("0"):
        phone = "254" + phone[1:]
    
    return jsonify({
        "success": True,
        "message": "STK Push initiated. Enter PIN on your phone to complete payment.",
        "payment_data": {
            "phone": phone,
            "amount": amount,
            "reference": f"BEDJOS{datetime.now().strftime('%Y%m%d%H%M%S')}",
            "timestamp": datetime.now().isoformat()
        }
    }), 200

@api.route("/payments/verify/<reference>", methods=["GET"])
def verify_payment(reference):
    """
    Verify payment status (mock for now)
    """
    return jsonify({
        "status": "completed",  # or "pending", "failed"
        "reference": reference,
        "verified_at": datetime.now().isoformat()
    }), 200

# ==================== STATS & DASHBOARD ====================
@api.route("/admin/stats", methods=["GET"])
@jwt_required()
def get_stats():
    total_orders = Order.query.count()
    total_revenue = db.session.query(db.func.sum(Order.total)).scalar() or 0
    pending_orders = Order.query.filter_by(status="pending").count()
    total_products = Product.query.count()
    
    return jsonify({
        "total_orders": total_orders,
        "total_revenue": float(total_revenue),
        "pending_orders": pending_orders,
        "total_products": total_products
    }), 200
