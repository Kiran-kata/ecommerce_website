// Product Detail Page JavaScript

// Change main image when thumbnail is clicked
function changeMainImage(src) {
    document.getElementById('main-product-image').src = src;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Add to cart from product detail page
function addToCartFromDetail() {
    const productName = document.getElementById('product-name').textContent;
    const price = parseFloat(document.querySelector('.buy-price').textContent.replace('$', ''));
    const quantity = parseInt(document.getElementById('quantity').value);
    const image = document.getElementById('main-product-image').src;
    
    // Add to cart with quantity
    for (let i = 0; i < quantity; i++) {
        const product = {
            id: Date.now() + i,
            name: productName,
            price: price,
            quantity: 1,
            image: image
        };
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already exists
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct && i === 0) {
            existingProduct.quantity += quantity;
            break;
        } else if (!existingProduct && i === 0) {
            product.quantity = quantity;
            cart.push(product);
            break;
        }
    }
    
    // Save to localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification(`Added ${quantity} item(s) to cart!`);
}

// Buy now - add to cart and go to checkout
function buyNow() {
    addToCartFromDetail();
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 500);
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: #232f3e;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Check for logged in user
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        const accountHello = document.querySelectorAll('.account-hello');
        accountHello.forEach(element => {
            element.textContent = `Hello, ${userEmail.split('@')[0]}`;
        });
    }
});
