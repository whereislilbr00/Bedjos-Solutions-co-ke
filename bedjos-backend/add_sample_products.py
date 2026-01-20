import requests
import json

BASE_URL = "http://localhost:5000/api"

print("=== ADDING SAMPLE PRODUCTS TO BEDJOS SOLUTIONS ===")

# Admin login
login_data = {
    "email": "admin@bedjos.co.ke",
    "password": "Admin@123"
}

print("\n1. Logging in as admin...")
response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
if response.status_code != 200:
    print("❌ Login failed!")
    print(response.json())
    exit(1)

token = response.json()["access_token"]
headers = {"Authorization": f"Bearer {token}"}
print("✅ Admin login successful!")

# Sample products data
sample_products = [
    {
        "name": "Premium Business Cards",
        "price": 1500.00,
        "image": "/images/business-cards.jpg",
        "category": "Printing",
        "description": "High-quality business cards with glossy finish, perfect for professional branding"
    },
    {
        "name": "Custom Letterheads",
        "price": 2500.00,
        "image": "/images/letterheads.jpg",
        "category": "Printing",
        "description": "Professional letterheads with company branding and contact information"
    },
    {
        "name": "Flyers & Brochures",
        "price": 3000.00,
        "image": "/images/flyers.jpg",
        "category": "Printing",
        "description": "Eye-catching flyers and brochures for marketing campaigns"
    },
    {
        "name": "ID Card Holders",
        "price": 800.00,
        "image": "/images/id-holders.jpg",
        "category": "Accessories",
        "description": "Durable ID card holders with lanyard for professional use"
    },
    {
        "name": "Custom T-Shirts",
        "price": 1200.00,
        "image": "/images/tshirts.jpg",
        "category": "Branding",
        "description": "Custom printed t-shirts for team uniforms and promotional events"
    },
    {
        "name": "Website Development",
        "price": 25000.00,
        "image": "/images/website.jpg",
        "category": "Digital Services",
        "description": "Professional website development with responsive design and SEO optimization"
    },
    {
        "name": "Logo Design Package",
        "price": 15000.00,
        "image": "/images/logo-design.jpg",
        "category": "Design Services",
        "description": "Complete logo design package including multiple formats and brand guidelines"
    },
    {
        "name": "Social Media Management",
        "price": 10000.00,
        "image": "/images/social-media.jpg",
        "category": "Digital Marketing",
        "description": "Monthly social media management and content creation service"
    }
]

print("\n2. Adding sample products...")
for i, product in enumerate(sample_products, 1):
    print(f"   Adding product {i}: {product['name']}")
    response = requests.post(f"{BASE_URL}/admin/products", json=product, headers=headers)

    if response.status_code == 201:
        print(f"   ✅ {product['name']} added successfully!")
    else:
        print(f"   ❌ Failed to add {product['name']}: {response.json()}")

print("\n3. Verifying products were added...")
response = requests.get(f"{BASE_URL}/products")
if response.status_code == 200:
    products = response.json()
    print(f"✅ Total products in database: {len(products)}")
    print("\n📋 Current Products:")
    for product in products:
        print(f"   - {product['name']}: KES {product['price']} ({product['category']})")
else:
    print("❌ Failed to retrieve products!")

print("\n=== SAMPLE PRODUCTS ADDED SUCCESSFULLY ===")
print("You can now view these products on your website and place orders!")
