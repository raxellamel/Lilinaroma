// Cart State
let cart = [];

// DOM Elements
const cartModal = document.getElementById('cart-modal');
const cartPanel = document.getElementById('cart-panel');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutPanel = document.getElementById('checkout-panel');
const cartCountElement = document.getElementById('cart-count');
const navCartCountElement = document.getElementById('nav-cart-count');
const cartItemsElement = document.getElementById('cart-items');
const cartSubtotalElement = document.getElementById('cart-subtotal');
const cartTotalElement = document.getElementById('cart-total');
const checkoutSubtotalElement = document.getElementById('checkout-subtotal');
const checkoutTotalElement = document.getElementById('checkout-total');
const floatingCart = document.getElementById('floating-cart');

// Format Currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
};

// Toggle Cart Modal
function toggleCart() {
    const isHidden = cartModal.classList.contains('hidden');
    
    if (isHidden) {
        cartModal.classList.remove('hidden');
        // Small delay to allow display:block to apply before transition
        setTimeout(() => {
            cartPanel.classList.remove('translate-y-full', 'md:translate-x-full');
        }, 10);
    } else {
        cartPanel.classList.add('translate-y-full', 'md:translate-x-full');
        setTimeout(() => {
            cartModal.classList.add('hidden');
        }, 300);
    }
}

// Toggle Checkout Modal
function toggleCheckout() {
    const isHidden = checkoutModal.classList.contains('hidden');
    
    if (isHidden) {
        // Close cart first if open
        if (!cartModal.classList.contains('hidden')) {
            toggleCart();
        }
        
        checkoutModal.classList.remove('hidden');
        setTimeout(() => {
            checkoutPanel.classList.remove('translate-y-full', 'md:translate-x-full');
        }, 10);
        
        updateCheckoutSummary();
    } else {
        checkoutPanel.classList.add('translate-y-full', 'md:translate-x-full');
        setTimeout(() => {
            checkoutModal.classList.add('hidden');
        }, 300);
    }
}

// Show Checkout (alias for clarity in HTML)
function showCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    toggleCheckout();
}

// Notification Elements
const centerNotification = document.getElementById('center-notification');
const notificationIconContainer = document.getElementById('notification-icon-container');
const notificationIcon = document.getElementById('notification-icon');
const notificationTitle = document.getElementById('notification-title');
const notificationMessage = document.getElementById('notification-message');
const cartTooltip = document.getElementById('cart-tooltip');

function showNotification(title = 'Berhasil!', message = 'Barang ditambahkan ke keranjang', iconClass = 'bi-bag-check-fill', iconColorClass = 'text-green-600', bgColorClass = 'bg-green-100') {
    if (centerNotification) {
        // Update Content
        if (notificationTitle) notificationTitle.textContent = title;
        if (notificationMessage) notificationMessage.textContent = message;
        
        if (notificationIcon) {
            notificationIcon.className = `bi ${iconClass}`;
        }
        
        if (notificationIconContainer) {
            // Reset classes and add new ones
            notificationIconContainer.className = `w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-inner ${bgColorClass} ${iconColorClass}`;
        }

        // Show Center Notification
        centerNotification.classList.remove('opacity-0', 'pointer-events-none', 'scale-90');
        centerNotification.classList.add('opacity-100', 'scale-100');
        
        // Show Cart Tooltip only if it's an add to cart action (default icon)
        if (iconClass === 'bi-bag-check-fill' && cartTooltip) {
            cartTooltip.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
            cartTooltip.classList.add('opacity-100', 'translate-y-0');
        }

        // Hide after delay
        setTimeout(() => {
            centerNotification.classList.remove('opacity-100', 'scale-100');
            centerNotification.classList.add('opacity-0', 'pointer-events-none', 'scale-90');
            
            if (cartTooltip) {
                cartTooltip.classList.remove('opacity-100', 'translate-y-0');
                cartTooltip.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
            }
        }, 2000);
    }
}

// Add to Cart
function addToCart(name, price, img) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            img,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification('Berhasil!', 'Barang ditambahkan ke keranjang', 'bi-bag-check-fill', 'text-green-600', 'bg-green-100');
    
    // Show feedback
    const btn = event.currentTarget;
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-check-lg"></i>';
    btn.classList.remove('bg-green-500');
    btn.classList.add('bg-gray-800');
    
    setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.classList.add('bg-green-500');
        btn.classList.remove('bg-gray-800');
    }, 1000);

    // Show floating cart if hidden
    if (floatingCart.classList.contains('hidden')) {
        floatingCart.classList.remove('hidden');
    }
}

// Remove from Cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
    
    if (cart.length === 0) {
        toggleCart();
        floatingCart.classList.add('hidden');
    }
}

// Update Quantity
function updateQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            updateCartUI();
        }
    }
}

// Clear Cart
function clearCart() {
    cart = [];
    updateCartUI();
    toggleCart();
    floatingCart.classList.add('hidden');
}

// Update Cart UI
function updateCartUI() {
    // Update Count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountElement) cartCountElement.textContent = totalItems;
    if (navCartCountElement) navCartCountElement.textContent = totalItems;
    
    // Update Items List
    cartItemsElement.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsElement.innerHTML = `
            <div class="flex flex-col items-center justify-center h-64 text-gray-500">
                <i class="bi bi-cart-x text-4xl mb-2"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            const el = document.createElement('div');
            el.className = 'flex items-center bg-white p-3 rounded-xl shadow-sm border border-gray-100';
            el.innerHTML = `
                <div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                    <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover">
                </div>
                <div class="ml-3 flex-grow">
                    <h4 class="font-bold text-sm text-gray-800">${item.name}</h4>
                    <p class="text-xs text-gray-500 mb-1">${formatCurrency(item.price)}</p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <button onclick="updateQuantity('${item.name}', -1)" class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                                <i class="bi bi-dash"></i>
                            </button>
                            <span class="text-sm font-bold w-4 text-center">${item.quantity}</span>
                            <button onclick="updateQuantity('${item.name}', 1)" class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                                <i class="bi bi-plus"></i>
                            </button>
                        </div>
                        <button onclick="removeFromCart('${item.name}')" class="text-red-500 hover:text-red-700 transition-colors">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItemsElement.appendChild(el);
        });
    }
    
    // Update Totals
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSubtotalElement.textContent = formatCurrency(total);
    cartTotalElement.textContent = formatCurrency(total);
}

// Voucher State
let discount = 0;
let appliedVoucherCode = null;
const validVouchers = ["zura", "musgun", "Amell", "ramell", "Lapiww", "kapiww"];

// Apply Voucher
function applyVoucher() {
    const input = document.getElementById('voucher-input');
    const message = document.getElementById('voucher-message');
    const btn = document.getElementById('btn-apply-voucher');
    const code = input.value.trim();

    if (!code) return;

    // Reset state
    message.classList.remove('hidden', 'text-green-600', 'text-red-500');
    
    if (validVouchers.includes(code)) {
        if (appliedVoucherCode === code) {
            message.textContent = "Voucher already applied!";
            message.classList.add('text-blue-500');
            return;
        }

        discount = 0.20; // 20%
        appliedVoucherCode = code;
        
        message.textContent = `Voucher "${code}" applied! You get 20% off.`;
        message.classList.add('text-green-600');
        
        // Visual feedback
        input.classList.add('border-green-500', 'bg-green-50');
        btn.innerHTML = '<i class="bi bi-check-lg"></i>';
        btn.classList.remove('bg-gray-800');
        btn.classList.add('bg-green-600');
        
        updateCheckoutSummary();
    } else {
        discount = 0;
        appliedVoucherCode = null;
        
        message.textContent = "Invalid voucher code.";
        message.classList.add('text-red-500');
        
        // Visual feedback
        input.classList.remove('border-green-500', 'bg-green-50');
        input.classList.add('border-red-500', 'bg-red-50');
        btn.innerHTML = 'Apply';
        btn.classList.add('bg-gray-800');
        btn.classList.remove('bg-green-600');
        
        updateCheckoutSummary();
    }
}

// Update Checkout Summary
function updateCheckoutSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = subtotal * discount;
    const total = subtotal - discountAmount;

    checkoutSubtotalElement.textContent = formatCurrency(subtotal);
    
    const discountElement = document.getElementById('checkout-discount');
    if (discountElement) {
        discountElement.textContent = `-${formatCurrency(discountAmount)}`;
    }
    
    checkoutTotalElement.textContent = formatCurrency(total);
}

// Process Payment (Mock)
function processPayment() {
    const form = document.getElementById('checkout-form');
    if (form.checkValidity()) {
        const btn = event.target;
        const originalText = btn.innerHTML;
        
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
        
        setTimeout(() => {
            showNotification('Pembayaran Berhasil!', 'Terima kasih atas pesanan Anda.', 'bi-check-circle-fill', 'text-blue-600', 'bg-blue-100');
            cart = [];
            
            // Reset Voucher
            discount = 0;
            appliedVoucherCode = null;
            const voucherInput = document.getElementById('voucher-input');
            const voucherMessage = document.getElementById('voucher-message');
            const voucherBtn = document.getElementById('btn-apply-voucher');
            
            if(voucherInput) {
                voucherInput.value = '';
                voucherInput.classList.remove('border-green-500', 'bg-green-50', 'border-red-500', 'bg-red-50');
            }
            if(voucherMessage) voucherMessage.classList.add('hidden');
            if(voucherBtn) {
                voucherBtn.innerHTML = 'Apply';
                voucherBtn.classList.add('bg-gray-800');
                voucherBtn.classList.remove('bg-green-600');
            }

            updateCartUI();
            toggleCheckout();
            floatingCart.classList.add('hidden');
            btn.disabled = false;
            btn.innerHTML = originalText;
            form.reset();
        }, 2000);
    } else {
        form.reportValidity();
    }
}

// Event Listeners for Add to Cart Buttons
document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.btn-add-cart');
    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = btn.dataset.name;
            const price = parseInt(btn.dataset.price);
            const img = btn.dataset.img;
            addToCart(name, price, img);
        });
    });
});
