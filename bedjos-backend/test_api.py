import requests
import json

BASE_URL = "http://localhost:5000/api"

print("=== TESTING BEDJOS SOLUTIONS BACKEND ===")

# 1. Health Check
print("\n1. Testing Health Check...")
try:
    response = requests.get(f"{BASE_URL}/")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"❌ Error: {e}")

# 2. Admin Login
print("\n2. Testing Admin Login...")
try:
    login_data = {
        "email": "admin@bedjos.co.ke",
        "password": "Admin@123"
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        token = response.json()["access_token"]
        print("✅ Login successful!")
        headers = {"Authorization": f"Bearer {token}"}
    else:
        print("❌ Login failed")
        print(response.json())
except Exception as e:
    print(f"❌ Error: {e}")

# 3. Add Sample Product
print("\n3. Adding Sample Product...")
try:
    product_data = {
        "name": "Premium Business Cards",
        "price": 1500.00,
        "image": "/images/business-cards.jpg",
        "category": "Printing",
        "description": "High-quality business cards with glossy finish"
    }
    response = requests.post(f"{BASE_URL}/admin/products",
                            json=product_data,
                            headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"❌ Error: {e}")

# 4. Get Products
print("\n4. Getting Products...")
try:
    response = requests.get(f"{BASE_URL}/products")
    print(f"Status: {response.status_code}")
    products = response.json()
    print(f"Found {len(products)} products")
except Exception as e:
    print(f"❌ Error: {e}")

# 5. Create Order
print("\n5. Creating Order...")
try:
    order_data = {
        "customer_name": "John Doe",
        "phone": "0712345678",
        "email": "john@example.com",
        "total": 1500.00
    }
    response = requests.post(f"{BASE_URL}/orders", json=order_data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"❌ Error: {e}")

# 6. Test Cart
print("\n6. Testing Cart...")
try:
    session_id = "test-session-123"
    cart_data = {
        "product_id": 1,
        "quantity": 2,
        "session_id": session_id
    }
    response = requests.post(f"{BASE_URL}/cart", json=cart_data)
    print(f"Add to cart: {response.status_code}")

    response = requests.get(f"{BASE_URL}/cart/{session_id}")
    print(f"Get cart: {response.status_code}")
    print(f"Cart contents: {response.json()}")
except Exception as e:
    print(f"❌ Error: {e}")

# 7. Contact Message
print("\n7. Testing Contact Form...")
try:
    contact_data = {
        "name": "Test User",
        "email": "test@example.com",
        "phone": "0723456789",
        "message": "This is a test message from the API"
    }
    response = requests.post(f"{BASE_URL}/contact", json=contact_data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"❌ Error: {e}")

# 8. M-Pesa Payment
print("\n8. Testing M-Pesa Payment...")
try:
    mpesa_data = {
        "phone": "0712345678",
        "amount": 1500
    }
    response = requests.post(f"{BASE_URL}/payments/mpesa/stk-push", json=mpesa_data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"❌ Error: {e}")

# 9. Admin Stats
print("\n9. Testing Admin Stats...")
try:
    response = requests.get(f"{BASE_URL}/admin/stats", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"❌ Error: {e}")

print("\n=== ALL TESTS COMPLETED ===")
