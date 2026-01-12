# Amazon Clone - Full-Featured E-Commerce Website

A comprehensive, fully functional e-commerce website that replicates Amazon's core features and user experience. Built with vanilla HTML, CSS, and JavaScript, this project demonstrates a complete online shopping workflow from product browsing to order completion.

![Amazon Clone](https://img.shields.io/badge/Status-Complete-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 🚀 Live Demo

**[View Live Demo](https://kiran-kata.github.io/ecommerce_website/)**

Experience the full e-commerce functionality:
- Browse products across multiple categories
- Sign in/Sign up with authentication
- Add items to cart and manage quantities
- Complete checkout process
- Track your orders

## 🌟 Features

### Core Functionality
- **User Authentication System**
  - Sign in/Sign up modal forms
  - User data persistence with localStorage
  - Dynamic username display in header

- **Product Browsing**
  - Homepage with hero banner and featured categories
  - 8 category-specific pages (Electronics, Fashion, Gaming, Toys, Books, Beauty, Home, Sports)
  - Product carousels with navigation controls
  - Product filters (price, brand, rating)
  - Search functionality across all products

- **Product Details**
  - Comprehensive product detail pages
  - Image gallery with thumbnail navigation
  - Product specifications and features
  - Customer reviews with ratings
  - Related products section

- **Shopping Cart**
  - Add/remove products
  - Quantity adjustment
  - Real-time price calculations
  - Cart persistence across sessions
  - Cart count badge in header

- **Checkout Process**
  - Multi-step checkout flow:
    1. Delivery address with form validation
    2. Payment method selection (Card/UPI/Net Banking/COD)
    3. Order review and confirmation
  - Order summary sidebar with price breakdown
  - Secure transaction messaging

- **Order Management**
  - Order confirmation page with details
  - Order history tracking
  - Filter orders by status (All, Processing, Shipped, Delivered)
  - Order tracking functionality
  - Estimated delivery dates

### Design Features
- **Responsive Design**
  - Mobile-friendly layout
  - Tablet and desktop optimization
  - Flexible grid systems

- **UI/UX**
  - Amazon-inspired color scheme (#131921, #232f3e, #febd69)
  - Font Awesome icons integration
  - Smooth hover effects and transitions
  - Toast notifications for user actions
  - Loading states and feedback

## 📁 Project Structure

```
ecommerce/
├── index.html              # Homepage
├── products.html           # General products listing
├── cart.html              # Shopping cart page
├── electronics.html       # Electronics category page
├── fashion.html          # Fashion category page
├── gaming.html           # Gaming category page
├── toys.html             # Toys category page
├── product-detail.html   # Product detail page
├── checkout.html         # Checkout process page
├── order-confirmation.html # Order success page
├── orders.html           # Order history page
├── css/
│   └── styles.css        # Comprehensive styling (1500+ lines)
└── js/
    ├── main.js           # Core functionality (cart, auth, UI)
    ├── product-detail.js # Product detail interactions
    └── checkout.js       # Checkout workflow logic
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kiran-kata/ecommerce_website.git
   cd ecommerce_website
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```

3. **Start shopping!**
   - Browse products
   - Sign in to your account
   - Add items to cart
   - Complete checkout process
   - Track your orders

## 💻 Technical Implementation

### Data Persistence
- **localStorage API** for client-side data storage
  - Cart items: `cart` key
  - User authentication: `currentUser` key
  - Order history: `orders` key

### Key JavaScript Functions

#### Cart Management (`main.js`)
```javascript
- addToCart(product)       // Add product to cart
- updateCartCount()        // Update cart badge
- renderCart()             // Display cart items
- updateQuantity(id, qty)  // Modify item quantity
- removeFromCart(id)       // Remove item from cart
```

#### Authentication (`main.js`)
```javascript
- showSignInModal()        // Display sign-in form
- showSignUpModal()        // Display sign-up form
- handleSignIn()           // Process login
- handleSignUp()           // Process registration
- updateUserName()         // Update header with username
```

#### Checkout (`checkout.js`)
```javascript
- calculateOrderSummary()  // Calculate totals
- saveAddress()            // Store delivery address
- continueToReview()       // Move to review step
- placeOrder()             // Complete purchase
```

### CSS Architecture
- **Modular styling** organized by component
- **CSS Grid & Flexbox** for layouts
- **Custom properties** for theming
- **Media queries** for responsive design
- **BEM-inspired** class naming

## 🎨 Design System

### Color Palette
- Primary Dark: `#131921` (Header background)
- Secondary Dark: `#232f3e` (Navigation bar)
- Accent Orange: `#febd69` (Logo accent)
- Amazon Yellow: `#ffd814` (Primary buttons)
- Amazon Orange: `#ffa41c` (Secondary buttons)
- Price Red: `#b12704` (Price text)
- Success Green: `#007600` (Stock/delivery)
- Link Blue: `#007185` (Links)

### Typography
- Font Family: Arial, sans-serif
- Headings: 700 weight
- Body: 400 weight
- Links: Underline on hover

### Spacing
- Container max-width: 1500px
- Standard gap: 15-20px
- Section padding: 20px
- Card border-radius: 4-8px

## 📱 Pages Overview

### 1. Homepage (`index.html`)
- Hero banner with promotional content
- 8 category cards with images
- Multiple product carousels
- Quick navigation to all sections

### 2. Category Pages
- **Electronics** - Tech products, laptops, phones
- **Fashion** - Clothing and accessories
- **Gaming** - Consoles, games, accessories
- **Toys** - Kids' toys and games
- Sidebar filters (price, brand, rating)
- Breadcrumb navigation

### 3. Product Detail Page
- High-quality product images
- Thumbnail gallery
- Detailed specifications
- Customer reviews section
- Buy box with quantity selector
- Add to cart and Buy Now options

### 4. Shopping Cart
- List of added products
- Image thumbnails
- Price per item
- Quantity controls
- Remove item option
- Subtotal calculation
- Proceed to checkout button

### 5. Checkout Page
- **Step 1**: Delivery address form
- **Step 2**: Payment method selection
- **Step 3**: Order review
- Sticky order summary sidebar
- Form validation
- Price breakdown (items, shipping, tax, total)

### 6. Order Confirmation
- Success message with checkmark
- Order number and details
- Delivery estimate
- Items summary
- Order tracking options
- Continue shopping link

### 7. Order History
- All orders display
- Status filters (Processing, Shipped, Delivered)
- Order cards with key details
- Track order button
- Order details view
- Reorder functionality

## 🔧 Customization

### Adding New Products
Edit the product arrays in respective HTML files:

```javascript
const products = [
    {
        id: 1,
        name: "Product Name",
        image: "image-url",
        price: 999,
        rating: 4.5,
        reviews: 120
    }
];
```

### Modifying Colors
Update CSS custom properties in `styles.css`:

```css
:root {
    --primary-dark: #131921;
    --accent-yellow: #ffd814;
    --price-red: #b12704;
}
```

### Changing Categories
Update category cards in `index.html` and create corresponding pages.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 📊 Performance Features

- Optimized images (using Unsplash CDN)
- Efficient localStorage usage
- Minimal external dependencies
- Lazy loading ready
- Mobile-first approach

## 🔐 Security Considerations

**Note**: This is a frontend-only demo project. For production use:
- Implement backend authentication
- Use secure payment gateways
- Encrypt sensitive data
- Validate all inputs server-side
- Use HTTPS
- Implement CSRF protection

## 🚧 Future Enhancements

- [ ] Backend integration (Node.js/Express)
- [ ] Real payment gateway (Stripe/PayPal)
- [ ] User profile management
- [ ] Wishlist functionality
- [ ] Product comparison feature
- [ ] Advanced search filters
- [ ] Email notifications
- [ ] Live chat support
- [ ] Product recommendations AI
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Progressive Web App (PWA)

## 📝 Known Limitations

- No backend server (frontend only)
- Data stored in localStorage (not persistent across devices)
- No real payment processing
- No email notifications
- Images sourced from Unsplash (placeholder content)
- No database integration

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Kiran**
- GitHub: [@Kiran-kata](https://github.com/Kiran-kata)

## 🙏 Acknowledgments

- Design inspired by Amazon.com
- Icons from Font Awesome
- Images from Unsplash
- Built as a learning project to demonstrate full-stack e-commerce concepts

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub

## 🎯 Project Goals

This project was created to:
- Demonstrate proficiency in HTML, CSS, and JavaScript
- Understand e-commerce workflows
- Practice responsive web design
- Implement local storage for state management
- Create a portfolio-worthy project
- Learn UI/UX best practices

---

**⭐ Star this repository if you found it helpful!**

**Made with ❤️ by Kiran**
- Product images are from Unsplash (free to use)
- No actual payment processing
- Cart data stored locally in browser

## Credits

- Design inspiration: Amazon.com
- Images: Unsplash
- Icons: Font Awesome
- Developed as a learning project

---

**Enjoy shopping! 🛒**
