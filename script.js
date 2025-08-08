// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the buttons and modal
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Dark mode functionality
    function initDarkMode() {
        // Check for saved dark mode preference or default to light mode
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // Apply dark mode if it was previously enabled
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        }
    }

    function toggleDarkMode() {
        const isDarkMode = document.documentElement.classList.toggle('dark');
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', isDarkMode);
        
        console.log('Dark mode:', isDarkMode ? 'enabled' : 'disabled');
    }

    // Initialize dark mode on page load
    initDarkMode();

    // Add event listener for dark mode toggle
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Button 1: Show alert message
    btn1.addEventListener('click', function() {
        alert('Hello from Cursor!');
        console.log('Button 1 was clicked! This is a logged message.');
    });

    // Button 2: Change page background color
    btn2.addEventListener('click', function() {
        const colors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-yellow-100', 'bg-pink-100', 'bg-indigo-100', 'bg-red-100'];
        
        // Remove all existing background color classes
        document.body.classList.remove('bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-yellow-100', 'bg-pink-100', 'bg-indigo-100', 'bg-red-100');
        
        // Add a random background color
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.classList.add(randomColor);
        
        console.log('Background color changed to:', randomColor);
    });

    // Button 3: Toggle modal visibility
    btn3.addEventListener('click', function() {
        const modalContent = document.getElementById('modalContent');
        if (modal.classList.contains('hidden')) {
            // Show modal
            modal.classList.remove('hidden');
            setTimeout(() => {
                modalContent.classList.remove('scale-95', 'opacity-0');
                modalContent.classList.add('scale-100', 'opacity-100');
            }, 10);
        } else {
            // Hide modal
            modalContent.classList.remove('scale-100', 'opacity-100');
            modalContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        }
        console.log('Modal visibility toggled');
    });

    // Close modal when X button is clicked
    closeModal.addEventListener('click', function() {
        const modalContent = document.getElementById('modalContent');
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    });

    // Close modal when Close button is clicked
    closeModalBtn.addEventListener('click', function() {
        const modalContent = document.getElementById('modalContent');
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    });

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            const modalContent = document.getElementById('modalContent');
            modalContent.classList.remove('scale-100', 'opacity-100');
            modalContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            const modalContent = document.getElementById('modalContent');
            modalContent.classList.remove('scale-100', 'opacity-100');
            modalContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        }
    });
});
  