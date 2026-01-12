// Checkout Page JavaScript

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    updateCartCount();
    calculateOrderSummary();
    
    // Address form submission
    document.getElementById('addressForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveAddress();
        enablePaymentSection();
    });
});

// Calculate order summary
function calculateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    document.getElementById('summary-items').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('summary-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('summary-before-tax').textContent = subtotal.toFixed(2);
    document.getElementById('summary-tax').textContent = tax.toFixed(2);
    document.getElementById('summary-total').textContent = total.toFixed(2);
}

// Save address
function saveAddress() {
    const address = {
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value
    };
    
    localStorage.setItem('deliveryAddress', JSON.stringify(address));
    
    // Show address summary
    const addressSection = document.getElementById('address-section');
    addressSection.innerHTML = `
        <div class="address-summary">
            <p><strong>${address.fullName}</strong></p>
            <p>${address.address}</p>
            <p>${address.city}, ${address.state} ${address.zip}</p>
            <p>Phone: ${address.phone}</p>
            <button class="btn-change" onclick="editAddress()">Change</button>
        </div>
    `;
}

// Edit address
function editAddress() {
    const address = JSON.parse(localStorage.getItem('deliveryAddress'));
    const addressSection = document.getElementById('address-section');
    
    addressSection.innerHTML = `
        <form id="addressForm">
            <input type="text" id="fullName" placeholder="Full Name" value="${address.fullName}" required>
            <input type="tel" id="phone" placeholder="Phone Number" value="${address.phone}" required>
            <input type="text" id="address" placeholder="Street Address" value="${address.address}" required>
            <input type="text" id="city" placeholder="City" value="${address.city}" required>
            <div class="form-row">
                <input type="text" id="state" placeholder="State" value="${address.state}" required>
                <input type="text" id="zip" placeholder="ZIP Code" value="${address.zip}" required>
            </div>
            <button type="submit" class="btn-continue">Use this address</button>
        </form>
    `;
    
    document.getElementById('addressForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveAddress();
        enablePaymentSection();
    });
}

// Enable payment section
function enablePaymentSection() {
    document.getElementById('payment-section-container').classList.remove('disabled');
    document.getElementById('payment-section-container').scrollIntoView({ behavior: 'smooth' });
}

// Continue to review
function continueToReview() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    localStorage.setItem('paymentMethod', paymentMethod);
    
    // Show payment summary
    const paymentSection = document.getElementById('payment-section');
    let paymentText = '';
    
    switch(paymentMethod) {
        case 'card':
            const cardNumber = document.getElementById('cardNumber').value;
            paymentText = `Credit/Debit Card ending in ${cardNumber.slice(-4)}`;
            break;
        case 'upi':
            paymentText = 'UPI Payment';
            break;
        case 'netbanking':
            paymentText = 'Net Banking';
            break;
        case 'cod':
            paymentText = 'Cash on Delivery';
            break;
    }
    
    paymentSection.innerHTML = `
        <div class="payment-summary">
            <p><strong>${paymentText}</strong></p>
            <button class="btn-change" onclick="editPayment()">Change</button>
        </div>
    `;
    
    // Enable review section
    document.getElementById('review-section-container').classList.remove('disabled');
    renderReviewItems();
    document.getElementById('review-section-container').scrollIntoView({ behavior: 'smooth' });
}

// Edit payment
function editPayment() {
    const paymentMethod = localStorage.getItem('paymentMethod');
    const paymentSection = document.getElementById('payment-section');
    
    paymentSection.innerHTML = `
        <div class="payment-options">
            <label class="payment-option">
                <input type="radio" name="payment" value="card" ${paymentMethod === 'card' ? 'checked' : ''}>
                <span><i class="fas fa-credit-card"></i> Credit or Debit Card</span>
            </label>
            <label class="payment-option">
                <input type="radio" name="payment" value="upi" ${paymentMethod === 'upi' ? 'checked' : ''}>
                <span><i class="fas fa-mobile-alt"></i> UPI</span>
            </label>
            <label class="payment-option">
                <input type="radio" name="payment" value="netbanking" ${paymentMethod === 'netbanking' ? 'checked' : ''}>
                <span><i class="fas fa-university"></i> Net Banking</span>
            </label>
            <label class="payment-option">
                <input type="radio" name="payment" value="cod" ${paymentMethod === 'cod' ? 'checked' : ''}>
                <span><i class="fas fa-money-bill-wave"></i> Cash on Delivery</span>
            </label>
        </div>
        
        <div id="card-details" class="payment-details">
            <input type="text" id="cardNumber" placeholder="Card Number" maxlength="19">
            <input type="text" id="cardName" placeholder="Name on Card">
            <div class="form-row">
                <input type="text" id="expiry" placeholder="MM/YY" maxlength="5">
                <input type="text" id="cvv" placeholder="CVV" maxlength="3">
            </div>
        </div>
        
        <button class="btn-continue" onclick="continueToReview()">Continue</button>
    `;
}

// Render review items
function renderReviewItems() {
    const reviewItems = document.getElementById('review-items');
    let html = '';
    
    cart.forEach(item => {
        html += `
            <div class="review-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="review-item-details">
                    <h4>${item.name}</h4>
                    <p class="review-item-price">$${item.price.toFixed(2)}</p>
                    <p class="review-item-qty">Qty: ${item.quantity}</p>
                </div>
            </div>
        `;
    });
    
    reviewItems.innerHTML = html;
}

// Place order
function placeOrder() {
    const address = localStorage.getItem('deliveryAddress');
    const payment = localStorage.getItem('paymentMethod');
    
    if (!address) {
        alert('Please add a delivery address');
        return;
    }
    
    if (!payment) {
        alert('Please select a payment method');
        return;
    }
    
    // Create order
    const order = {
        id: 'AMZ-' + Date.now(),
        items: cart,
        address: JSON.parse(address),
        payment: payment,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        tax: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.08,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.08,
        date: new Date().toISOString(),
        status: 'Processing'
    };
    
    // Save order
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    localStorage.removeItem('cart');
    
    // Redirect to order confirmation
    window.location.href = `order-confirmation.html?orderId=${order.id}`;
}

// Update cart count
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}
