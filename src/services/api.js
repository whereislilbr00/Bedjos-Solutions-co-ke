const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
    constructor() {
        this.baseUrl = API_BASE_URL;
        this.adminToken = localStorage.getItem('admin_token');
        this.customerToken = localStorage.getItem('customer_token');
    }

    setAdminToken(token) {
        this.adminToken = token;
        localStorage.setItem('admin_token', token);
    }

    setCustomerToken(token) {
        this.customerToken = token;
        localStorage.setItem('customer_token', token);
    }

    getAdminHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (this.adminToken) {
            headers['Authorization'] = `Bearer ${this.adminToken}`;
        }

        return headers;
    }

    getCustomerHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (this.customerToken) {
            headers['Authorization'] = `Bearer ${this.customerToken}`;
        }

        return headers;
    }

    // Admin Authentication
    async adminLogin(email, password) {
        const response = await fetch(`${this.baseUrl}/auth/login`, {
            method: 'POST',
            headers: this.getAdminHeaders(),
            body: JSON.stringify({ email, password })
        });
        return response.json();
    }

    // Customer Authentication
    async customerSignup(userData) {
        const response = await fetch(`${this.baseUrl}/auth/customer/signup`, {
            method: 'POST',
            headers: this.getCustomerHeaders(),
            body: JSON.stringify(userData)
        });
        return response.json();
    }

    async customerLogin(email, password) {
        const response = await fetch(`${this.baseUrl}/auth/customer/login`, {
            method: 'POST',
            headers: this.getCustomerHeaders(),
            body: JSON.stringify({ email, password })
        });
        return response.json();
    }

    // Products
    async getProducts() {
        const response = await fetch(`${this.baseUrl}/products`);
        return response.json();
    }

    async getProduct(id) {
        const response = await fetch(`${this.baseUrl}/products/${id}`);
        return response.json();
    }

    async createProduct(productData) {
        const response = await fetch(`${this.baseUrl}/admin/products`, {
            method: 'POST',
            headers: this.getAdminHeaders(),
            body: JSON.stringify(productData)
        });
        return response.json();
    }

    async updateProduct(id, productData) {
        const response = await fetch(`${this.baseUrl}/admin/products/${id}`, {
            method: 'PUT',
            headers: this.getAdminHeaders(),
            body: JSON.stringify(productData)
        });
        return response.json();
    }

    async deleteProduct(id) {
        const response = await fetch(`${this.baseUrl}/admin/products/${id}`, {
            method: 'DELETE',
            headers: this.getAdminHeaders()
        });
        return response.json();
    }

    // Orders
    async createOrder(orderData) {
        const response = await fetch(`${this.baseUrl}/orders`, {
            method: 'POST',
            headers: this.getCustomerHeaders(),
            body: JSON.stringify(orderData)
        });
        return response.json();
    }

    async getOrder(id) {
        const response = await fetch(`${this.baseUrl}/orders/${id}`);
        return response.json();
    }

    async getAdminOrders() {
        const response = await fetch(`${this.baseUrl}/admin/orders`, {
            headers: this.getAdminHeaders()
        });
        return response.json();
    }

    async updateOrderStatus(orderId, status) {
        const response = await fetch(`${this.baseUrl}/admin/orders/${orderId}/status`, {
            method: 'PUT',
            headers: this.getAdminHeaders(),
            body: JSON.stringify({ status })
        });
        return response.json();
    }

    // Cart
    async addToCart(productId, quantity = 1) {
        const sessionId = localStorage.getItem('session_id') ||
                         `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('session_id', sessionId);

        const response = await fetch(`${this.baseUrl}/cart`, {
            method: 'POST',
            headers: this.getCustomerHeaders(),
            body: JSON.stringify({
                product_id: productId,
                quantity,
                session_id: sessionId
            })
        });
        return response.json();
    }

    async getCart() {
        const sessionId = localStorage.getItem('session_id');
        if (!sessionId) return { items: [], total: 0, count: 0 };

        const response = await fetch(`${this.baseUrl}/cart/${sessionId}`);
        return response.json();
    }

    async removeCartItem(itemId) {
        const sessionId = localStorage.getItem('session_id');
        if (!sessionId) return { error: 'No session found' };

        const response = await fetch(`${this.baseUrl}/cart/${sessionId}/item/${itemId}`, {
            method: 'DELETE'
        });
        return response.json();
    }

    async clearCart() {
        const sessionId = localStorage.getItem('session_id');
        if (!sessionId) return { error: 'No session found' };

        const response = await fetch(`${this.baseUrl}/cart/${sessionId}`, {
            method: 'DELETE'
        });
        return response.json();
    }

    // Contact
    async sendContactMessage(messageData) {
        const response = await fetch(`${this.baseUrl}/contact`, {
            method: 'POST',
            headers: this.getCustomerHeaders(),
            body: JSON.stringify(messageData)
        });
        return response.json();
    }

    async getContactMessages() {
        const response = await fetch(`${this.baseUrl}/admin/messages`, {
            headers: this.getAdminHeaders()
        });
        return response.json();
    }

    // Payments
    async initiateMpesaPayment(phone, amount) {
        const response = await fetch(`${this.baseUrl}/payments/mpesa/stk-push`, {
            method: 'POST',
            headers: this.getCustomerHeaders(),
            body: JSON.stringify({ phone, amount })
        });
        return response.json();
    }

    async verifyPayment(reference) {
        const response = await fetch(`${this.baseUrl}/payments/verify/${reference}`);
        return response.json();
    }

    // Admin Stats
    async getAdminStats() {
        const response = await fetch(`${this.baseUrl}/admin/stats`, {
            headers: this.getAdminHeaders()
        });
        return response.json();
    }
}

export default new ApiService();
