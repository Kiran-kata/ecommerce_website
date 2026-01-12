// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Check if user is logged in
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        updateUserName(userEmail);
    }
    
    // Initialize cart page if on cart.html
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
    
    // Carousel functionality
    initCarousels();
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Add to Cart Function
function addToCart(productName, price) {
    const product = {
        id: Date.now(),
        name: productName,
        price: price,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
    };
    
    // Check if product already exists
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification('Added to cart!');
}

// Update Cart Count
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Render Cart Items
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCart = document.getElementById('empty-cart');
    
    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        updateCartSummary();
        return;
    }
    
    if (emptyCart) emptyCart.style.display = 'none';
    
    let cartHTML = '';
    cart.forEach(item => {
        cartHTML += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-stock">In Stock</p>
                    <div class="cart-item-actions">
                        <select onchange="updateQuantity(${item.id}, this.value)">
                            ${generateQuantityOptions(item.quantity)}
                        </select>
                        <a onclick="removeFromCart(${item.id})">Delete</a>
                        <a>Save for later</a>
                    </div>
                </div>
                <div class="cart-item-price">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = cartHTML;
    updateCartSummary();
}

// Generate Quantity Options
function generateQuantityOptions(currentQty) {
    let options = '';
    for (let i = 1; i <= 10; i++) {
        options += `<option value="${i}" ${i === currentQty ? 'selected' : ''}>Qty: ${i}</option>`;
    }
    return options;
}

// Update Quantity
function updateQuantity(productId, newQuantity) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity = parseInt(newQuantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
    showNotification('Item removed from cart');
}

// Update Cart Summary
function updateCartSummary() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Update all elements
    const itemCountElements = [
        document.getElementById('cart-item-count'),
        document.getElementById('summary-item-count')
    ];
    
    const subtotalElements = [
        document.getElementById('cart-subtotal'),
        document.getElementById('summary-subtotal')
    ];
    
    itemCountElements.forEach(element => {
        if (element) element.textContent = totalItems;
    });
    
    subtotalElements.forEach(element => {
        if (element) element.textContent = subtotal.toFixed(2);
    });
}

// Show Notification
function showNotification(message) {
    // Create notification element
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
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize Carousels
function initCarousels() {
    const carousels = document.querySelectorAll('.product-carousel');
    
    carousels.forEach(carousel => {
        const container = carousel.querySelector('.carousel-container');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        
        if (prevBtn && nextBtn && container) {
            prevBtn.addEventListener('click', () => {
                container.scrollBy({
                    left: -300,
                    behavior: 'smooth'
                });
            });
            
            nextBtn.addEventListener('click', () => {
                container.scrollBy({
                    left: 300,
                    behavior: 'smooth'
                });
            });
        }
    });
}

// Search Functionality
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

if (searchButton && searchInput) {
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // Redirect to products page with search term
        window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

// Filter functionality for products page
function applyFilters() {
    // Get all checked filters
    const priceFilters = document.querySelectorAll('.price-filter input:checked');
    const brandFilters = document.querySelectorAll('.filter-list input:checked');
    const ratingFilters = document.querySelectorAll('.rating-filter input:checked');
    
    // Filter logic would go here
    console.log('Filters applied');
}

// Sort functionality
const sortSelect = document.querySelector('.products-sort select');
if (sortSelect) {
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        console.log('Sorting by:', sortValue);
        // Sorting logic would go here
    });
}

// Product Card Click
document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('click', function() {
        // Navigate to product detail page
        console.log('Product clicked');
    });
});

// Checkout Button
const checkoutBtn = document.querySelector('.btn-checkout');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        alert('Proceeding to checkout... (This is a demo)');
        // In a real application, this would redirect to checkout page
    });
}

// Account dropdown - Sign In/Sign Up
const accountSection = document.querySelector('.header-account');
if (accountSection) {
    accountSection.addEventListener('click', function() {
        showSignInModal();
    });
}

// Sign In Modal
function showSignInModal() {
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-modal-content">
            <span class="auth-modal-close">&times;</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" style="width: 120px; margin-bottom: 20px; filter: brightness(0);">
            <h2>Sign in</h2>
            <form id="signInForm">
                <label>Email or mobile phone number</label>
                <input type="text" id="signInEmail" required>
                <button type="submit" class="btn-primary">Continue</button>
            </form>
            <p class="auth-divider">New to Amazon?</p>
            <button class="btn-secondary" onclick="showSignUpModal()">Create your Amazon account</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.auth-modal-close');
    closeBtn.onclick = () => modal.remove();
    
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    const form = modal.querySelector('#signInForm');
    form.onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('signInEmail').value;
        localStorage.setItem('userEmail', email);
        updateUserName(email);
        modal.remove();
        showNotification('Signed in successfully!');
    };
}

// Sign Up Modal
function showSignUpModal() {
    document.querySelector('.auth-modal')?.remove();
    
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-modal-content">
            <span class="auth-modal-close">&times;</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" style="width: 120px; margin-bottom: 20px; filter: brightness(0);">
            <h2>Create account</h2>
            <form id="signUpForm">
                <label>Your name</label>
                <input type="text" id="signUpName" required>
                <label>Email</label>
                <input type="email" id="signUpEmail" required>
                <label>Password</label>
                <input type="password" id="signUpPassword" required minlength="6">
                <label>Re-enter password</label>
                <input type="password" id="signUpPasswordConfirm" required>
                <button type="submit" class="btn-primary">Create your Amazon account</button>
            </form>
            <p class="auth-terms">By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
            <p class="auth-divider">Already have an account? <a href="#" onclick="showSignInModal(); return false;">Sign in</a></p>
        </div>
    `;
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.auth-modal-close');
    closeBtn.onclick = () => modal.remove();
    
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    const form = modal.querySelector('#signUpForm');
    form.onsubmit = (e) => {
        e.preventDefault();
        const password = document.getElementById('signUpPassword').value;
        const confirmPassword = document.getElementById('signUpPasswordConfirm').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        const name = document.getElementById('signUpName').value;
        const email = document.getElementById('signUpEmail').value;
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        updateUserName(email);
        modal.remove();
        showNotification('Account created successfully!');
    };
}

// Update user name in header
function updateUserName(email) {
    const accountHello = document.querySelectorAll('.account-hello');
    accountHello.forEach(element => {
        element.textContent = `Hello, ${email.split('@')[0]}`;
    });
}

// Mobile menu toggle
const navAll = document.querySelector('.nav-all');
if (navAll) {
    navAll.addEventListener('click', function() {
        console.log('Menu clicked');
        // Mobile menu logic would go here
    });
}

// Delivery location
const locationSection = document.querySelector('.header-location');
if (locationSection) {
    locationSection.addEventListener('click', function() {
        const newLocation = prompt('Enter your ZIP code:', '10001');
        if (newLocation) {
            document.querySelector('.location-country').textContent = `New York ${newLocation}`;
        }
    });
}

// Product rating click
document.querySelectorAll('.product-rating').forEach(rating => {
    rating.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('Rating clicked');
    });
});

// Image lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Add hover effect for product cards
document.querySelectorAll('.product-card, .category-card, .product-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Console welcome message
console.log('%c Welcome to Amazon Clone! ', 'background: #232f3e; color: #fff; font-size: 20px; padding: 10px;');
console.log('%c This is a demo e-commerce website ', 'background: #febd69; color: #000; font-size: 14px; padding: 5px;');
