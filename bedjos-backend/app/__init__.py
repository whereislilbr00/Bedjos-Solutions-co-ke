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

    # Allow frontend from Vercel and localhost
    CORS(app, origins=[
        "https://bedjos-solutions-co-ke.vercel.app",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:3000"
    ])

    db.init_app(app)
    jwt.init_app(app)

    from .routes import api
    app.register_blueprint(api, url_prefix="/api")

    # Root route
    @app.route("/", methods=["GET"])
    def root():
        return jsonify({
            "status": "success",
            "message": "Bedjos Solutions Backend API",
            "version": "1.0.0",
            "api_url": "/api",
            "docs": {
                "health_check": "GET /api/",
                "products": "GET /api/products",
                "admin_login": "POST /api/auth/login"
            }
        }), 200

    with app.app_context():
        db.create_all()
        # Create default admin if none exists
        from .models import Admin
        if not Admin.query.filter_by(email="admin@bedjos.co.ke").first():
            admin = Admin(email="admin@bedjos.co.ke")
            admin.set_password("Admin@123")
            db.session.add(admin)
            db.session.commit()
            print("✅ Default admin created: admin@bedjos.co.ke / Admin@123")

    return app
