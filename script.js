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
        console.log('Dark mode toggle clicked!');
        
        const isDarkMode = document.documentElement.classList.toggle('dark');
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', isDarkMode);
        
        // Update background color to match the new theme
        const currentBgIndex = parseInt(localStorage.getItem('backgroundIndex') || '0');
        const lightColors = ['bg-gray-100', 'bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-yellow-100', 'bg-pink-100', 'bg-indigo-100', 'bg-red-100'];
        const darkColors = ['dark:bg-gray-900', 'dark:bg-blue-900', 'dark:bg-green-900', 'dark:bg-purple-900', 'dark:bg-yellow-900', 'dark:bg-pink-900', 'dark:bg-indigo-900', 'dark:bg-red-900'];
        
        // Remove all background classes
        const allColors = [...lightColors, ...darkColors];
        allColors.forEach(color => {
            if (document.body.classList.contains(color)) {
                document.body.classList.remove(color);
            }
        });
        
        // Add the appropriate background class for the new theme
        const newColor = isDarkMode ? darkColors[currentBgIndex] : lightColors[currentBgIndex];
        document.body.classList.add(newColor);
        
        console.log('Dark mode:', isDarkMode ? 'enabled' : 'disabled');
        console.log('Background updated to:', newColor);
    }

    // Initialize dark mode on page load
    initDarkMode();

    // Initialize background color on page load
    function initBackgroundColor() {
        const isDarkMode = document.documentElement.classList.contains('dark');
        const currentBgIndex = parseInt(localStorage.getItem('backgroundIndex') || '0');
        
        if (isDarkMode) {
            const darkColors = ['dark:bg-gray-900', 'dark:bg-blue-900', 'dark:bg-green-900', 'dark:bg-purple-900', 'dark:bg-yellow-900', 'dark:bg-pink-900', 'dark:bg-indigo-900', 'dark:bg-red-900'];
            darkColors.forEach(color => document.body.classList.remove(color));
            document.body.classList.add(darkColors[currentBgIndex]);
        } else {
            const lightColors = ['bg-gray-100', 'bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-yellow-100', 'bg-pink-100', 'bg-indigo-100', 'bg-red-100'];
            lightColors.forEach(color => document.body.classList.remove(color));
            document.body.classList.add(lightColors[currentBgIndex]);
        }
    }

    // Debug function to update debug panel
    function updateDebugInfo() {
        const currentBg = document.getElementById('currentBg');
        const darkModeStatus = document.getElementById('darkModeStatus');
        const bgIndex = document.getElementById('bgIndex');
        const bodyClasses = document.getElementById('bodyClasses');
        
        if (currentBg) {
            const isDarkMode = document.documentElement.classList.contains('dark');
            const lightColors = ['bg-gray-100', 'bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-yellow-100', 'bg-pink-100', 'bg-indigo-100', 'bg-red-100'];
            const darkColors = ['dark:bg-gray-900', 'dark:bg-blue-900', 'dark:bg-green-900', 'dark:bg-purple-900', 'dark:bg-yellow-900', 'dark:bg-pink-900', 'dark:bg-indigo-900', 'dark:bg-red-900'];
            
            const currentBgClass = Array.from(document.body.classList).find(cls => 
                lightColors.includes(cls) || darkColors.includes(cls)
            );
            
            currentBg.textContent = currentBgClass || 'None';
            darkModeStatus.textContent = isDarkMode ? 'Yes' : 'No';
            bgIndex.textContent = localStorage.getItem('backgroundIndex') || '0';
            bodyClasses.textContent = document.body.className.substring(0, 50) + '...';
        }
    }

    // Initialize background color
    initBackgroundColor();

    // Update version time
    const updateTimeElement = document.getElementById('updateTime');
    if (updateTimeElement) {
        const now = new Date();
        updateTimeElement.textContent = now.toLocaleString();
    }

    // Update debug info on page load
    setTimeout(updateDebugInfo, 100);
    
    // Test if dark mode toggle button exists
    if (darkModeToggle) {
        console.log('Dark mode toggle button found and ready!');
    } else {
        console.error('Dark mode toggle button not found!');
    }

    // Add event listener for dark mode toggle
    darkModeToggle.addEventListener('click', function() {
        console.log('Dark mode toggle button clicked!');
        toggleDarkMode();
        setTimeout(updateDebugInfo, 100);
    });

    // Button 1: Show alert message
    btn1.addEventListener('click', function() {
        alert('Hello from Cursor!');
        console.log('Button 1 was clicked! This is a logged message.');
    });

    // Background Toggle: Change page background color
    btn2.addEventListener('click', function() {
        console.log('Background Toggle clicked!');
        
        // Get current background index from localStorage
        let currentBgIndex = parseInt(localStorage.getItem('backgroundIndex') || '0');
        
        // Define color arrays
        const lightColors = ['bg-gray-100', 'bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-yellow-100', 'bg-pink-100', 'bg-indigo-100', 'bg-red-100'];
        const darkColors = ['dark:bg-gray-900', 'dark:bg-blue-900', 'dark:bg-green-900', 'dark:bg-purple-900', 'dark:bg-yellow-900', 'dark:bg-pink-900', 'dark:bg-indigo-900', 'dark:bg-red-900'];
        
        // Increment index
        currentBgIndex = (currentBgIndex + 1) % lightColors.length;
        
        // Remove ALL possible background classes
        const allColors = [...lightColors, ...darkColors];
        allColors.forEach(color => {
            if (document.body.classList.contains(color)) {
                document.body.classList.remove(color);
                console.log('Removed:', color);
            }
        });
        
        // Add the new background class
        const isDarkMode = document.documentElement.classList.contains('dark');
        const newColor = isDarkMode ? darkColors[currentBgIndex] : lightColors[currentBgIndex];
        document.body.classList.add(newColor);
        
        // Save to localStorage
        localStorage.setItem('backgroundIndex', currentBgIndex.toString());
        
        // Update debug info
        updateDebugInfo();
        
        console.log('Background changed to:', newColor, 'Index:', currentBgIndex, 'Dark mode:', isDarkMode);
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
  