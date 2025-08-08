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
