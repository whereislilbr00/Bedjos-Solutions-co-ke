from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Fix CORS - exact user spec
    CORS(app, 
         origins=["http://localhost:5173"],
         allow_headers=["Content-Type", "Authorization"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
         supports_credentials=True)

    db.init_app(app)
    jwt.init_app(app)

    # Import & register ONLY EXISTING blueprints
    from .routes.orders import orders_bp
    from .routes.mpesa import mpesa_bp
    from .routes.orders_simple import orders_simple_bp
    from .routes.admin import bp as admin_bp
    from .routes.auth import bp as auth_bp
    from .routes.customers import bp as customers_bp  
    from .routes.contact import bp as contact_bp
    from .routes.inventory import bp as inventory_bp

    app.register_blueprint(orders_bp, url_prefix="/api")
    app.register_blueprint(mpesa_bp, url_prefix="/api")
    app.register_blueprint(orders_simple_bp, url_prefix="/api")
    app.register_blueprint(admin_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(customers_bp, url_prefix="/api")
    app.register_blueprint(contact_bp, url_prefix="/api")
    app.register_blueprint(inventory_bp, url_prefix="/api")

    # Root endpoint
    @app.route("/", methods=["GET"])
    def root():
        return jsonify({
            "status": "success", 
            "message": "Bedjos Backend + M-Pesa API",
            "endpoints": ["/api/mpesa/stkpush", "/api/orders"]
        }), 200

    with app.app_context():
        db.create_all()
        from .models import Admin
        if not Admin.query.filter_by(email="admin@bedjos.co.ke").first():
            admin = Admin(email="admin@bedjos.co.ke")
            admin.set_password("Admin@123")
            db.session.add(admin)
            db.session.commit()
            print("✅ Admin created")

    return app

