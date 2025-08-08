// Main JavaScript for Product Management Showcase
document.addEventListener('DOMContentLoaded', function() {
    console.log('Product Management Showcase loaded successfully!');
    
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects for cards
    const cards = document.querySelectorAll('.group');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading animation for buttons
    const buttons = document.querySelectorAll('a[href], button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add loading state
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.style.opacity = '0.7';
            
            // Reset after a short delay (for demo purposes)
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
            }, 1000);
        });
    });

    // Add console logging for analytics tracking
    console.log('Analytics tracking initialized');
    console.log('User engagement metrics ready');
    console.log('Product management showcase active');
});

// Scroll reveal animation functionality
function initScrollReveal() {
    // IntersectionObserver options with small rootMargin for snappy feel
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px' // Small margin for early triggering
    };

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const stagger = parseInt(element.getAttribute('data-stagger')) || 0;
                
                // Add stagger delay
                setTimeout(() => {
                    element.classList.add('revealed');
                }, stagger);
                
                // Stop observing after animation
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(element => {
        observer.observe(element);
    });

    console.log(`Initialized scroll reveal for ${revealElements.length} elements`);
}

// Toast system functionality
let toastCounter = 0;

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) {
        console.error('Toast container not found');
        return;
    }

    const toastId = `toast-${++toastCounter}`;
    
    // Define toast variants
    const variants = {
        success: {
            bg: 'bg-green-500',
            border: 'border-green-600',
            icon: '✓',
            iconBg: 'bg-green-600'
        },
        error: {
            bg: 'bg-red-500',
            border: 'border-red-600',
            icon: '✕',
            iconBg: 'bg-red-600'
        },
        info: {
            bg: 'bg-blue-500',
            border: 'border-blue-600',
            icon: 'ℹ',
            iconBg: 'bg-blue-600'
        }
    };

    const variant = variants[type] || variants.info;

    // Create toast element
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast ${variant.bg} ${variant.border} border-l-4 text-white p-4 rounded-lg shadow-lg max-w-sm backdrop-blur-sm`;
    toast.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <div class="${variant.iconBg} w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                    ${variant.icon}
                </div>
                <p class="text-sm font-medium">${message}</p>
            </div>
            <button 
                onclick="closeToast('${toastId}')" 
                class="text-white/80 hover:text-white text-lg font-light transition-colors duration-200 ml-3"
                aria-label="Close toast"
            >
                ×
            </button>
        </div>
    `;

    // Add to container
    container.appendChild(toast);

    // Trigger slide-in animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Auto-dismiss after 3 seconds
    const autoDismissTimer = setTimeout(() => {
        closeToast(toastId);
    }, 3000);

    // Store timer reference for manual close
    toast.dataset.dismissTimer = autoDismissTimer;

    console.log(`Toast shown: ${type} - ${message}`);
}

function closeToast(toastId) {
    const toast = document.getElementById(toastId);
    if (!toast) return;

    // Clear auto-dismiss timer
    if (toast.dataset.dismissTimer) {
        clearTimeout(parseInt(toast.dataset.dismissTimer));
    }

    // Trigger slide-out animation
    toast.classList.remove('show');
    toast.classList.add('hide');

    // Remove from DOM after animation
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);

    console.log(`Toast closed: ${toastId}`);
}

// Make functions globally available
window.showToast = showToast;
window.closeToast = closeToast;
