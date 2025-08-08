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

    // Simple dark mode toggle function
    function toggleDarkMode() {
        console.log('Dark mode toggle clicked!');
        
        const isDarkMode = document.documentElement.classList.toggle('dark');
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', isDarkMode);
        
        console.log('Dark mode:', isDarkMode ? 'enabled (night)' : 'disabled (day)');
    }

    // Initialize dark mode on page load
    initDarkMode();

    // Initialize dark mode on page load
    function initDarkMode() {
        // Check for saved dark mode preference or default to light mode
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // Apply dark mode if it was previously enabled
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
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
            
            currentBg.textContent = 'Default';
            darkModeStatus.textContent = isDarkMode ? 'Night' : 'Day';
            bgIndex.textContent = 'N/A';
            bodyClasses.textContent = document.body.className.substring(0, 50) + '...';
        }
    }

    // Initialize dark mode
    initDarkMode();

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

    // Pac-Man Game Variables
    let gameRunning = false;
    let gameScore = 0;
    let pacman = { x: 200, y: 150, size: 10, direction: 0, speed: 3 };
    let dots = [];
    let ghosts = [];
    let gameLoop;

    // Initialize Pac-Man Game
    function initPacManGame() {
        const canvas = document.getElementById('gameCanvas');
        
        if (!canvas) {
            console.error('Game canvas not found!');
            alert('Game canvas not found. Please refresh the page.');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Create dots
        dots = [];
        for (let i = 0; i < 20; i++) {
            dots.push({
                x: Math.random() * (canvas.width - 20) + 10,
                y: Math.random() * (canvas.height - 20) + 10,
                size: 3,
                collected: false
            });
        }
        
        // Create ghosts
        ghosts = [];
        for (let i = 0; i < 3; i++) {
            ghosts.push({
                x: Math.random() * (canvas.width - 20) + 10,
                y: Math.random() * (canvas.height - 20) + 10,
                size: 8,
                speed: 2,
                direction: Math.random() * Math.PI * 2
            });
        }
        
        // Reset Pac-Man
        pacman.x = 200;
        pacman.y = 150;
        pacman.direction = 0;
        gameScore = 0;
        document.getElementById('gameScore').textContent = gameScore;
        
        // Start game loop
        gameRunning = true;
        gameLoop = setInterval(updateGame, 50);
    }

    // Update game state
    function updateGame() {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw dots
        ctx.fillStyle = '#FFFF00';
        dots.forEach(dot => {
            if (!dot.collected) {
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        // Draw Pac-Man
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.arc(pacman.x, pacman.y, pacman.size, pacman.direction + 0.2, pacman.direction + Math.PI * 2 - 0.2);
        ctx.lineTo(pacman.x, pacman.y);
        ctx.fill();
        
        // Draw ghosts
        ctx.fillStyle = '#FF0000';
        ghosts.forEach(ghost => {
            ctx.beginPath();
            ctx.arc(ghost.x, ghost.y, ghost.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Check dot collisions
        dots.forEach(dot => {
            if (!dot.collected) {
                const distance = Math.sqrt((pacman.x - dot.x) ** 2 + (pacman.y - dot.y) ** 2);
                if (distance < pacman.size + dot.size) {
                    dot.collected = true;
                    gameScore += 10;
                    document.getElementById('gameScore').textContent = gameScore;
                }
            }
        });
        
        // Check ghost collisions
        ghosts.forEach(ghost => {
            const distance = Math.sqrt((pacman.x - ghost.x) ** 2 + (pacman.y - ghost.y) ** 2);
            if (distance < pacman.size + ghost.size) {
                gameOver();
            }
        });
        
        // Move ghosts randomly
        ghosts.forEach(ghost => {
            ghost.x += Math.cos(ghost.direction) * ghost.speed;
            ghost.y += Math.sin(ghost.direction) * ghost.speed;
            
            // Bounce off walls
            if (ghost.x < ghost.size || ghost.x > canvas.width - ghost.size) {
                ghost.direction = Math.PI - ghost.direction;
            }
            if (ghost.y < ghost.size || ghost.y > canvas.height - ghost.size) {
                ghost.direction = -ghost.direction;
            }
            
            // Random direction change
            if (Math.random() < 0.02) {
                ghost.direction = Math.random() * Math.PI * 2;
            }
        });
        
        // Check win condition
        if (dots.every(dot => dot.collected)) {
            alert('You win! Score: ' + gameScore);
            gameOver();
        }
    }

    // Game over function
    function gameOver() {
        gameRunning = false;
        clearInterval(gameLoop);
        alert('Game Over! Final Score: ' + gameScore);
    }

    // Handle keyboard input for Pac-Man game
    function handleGameKeys(e) {
        if (!gameRunning) return;
        
        switch(e.key) {
            case 'ArrowUp':
                pacman.y -= pacman.speed;
                pacman.direction = -Math.PI / 2;
                break;
            case 'ArrowDown':
                pacman.y += pacman.speed;
                pacman.direction = Math.PI / 2;
                break;
            case 'ArrowLeft':
                pacman.x -= pacman.speed;
                pacman.direction = Math.PI;
                break;
            case 'ArrowRight':
                pacman.x += pacman.speed;
                pacman.direction = 0;
                break;
        }
        
        // Keep Pac-Man in bounds
        pacman.x = Math.max(pacman.size, Math.min(400 - pacman.size, pacman.x));
        pacman.y = Math.max(pacman.size, Math.min(300 - pacman.size, pacman.y));
    }

    // Pac-Man Game Button
    btn2.addEventListener('click', function() {
        console.log('Pac-Man Game clicked!');
        const gameContainer = document.getElementById('gameContainer');
        
        if (gameContainer) {
            console.log('Game container found, showing game...');
            gameContainer.classList.remove('hidden');
            initPacManGame();
            
            // Add keyboard listener for game
            document.addEventListener('keydown', handleGameKeys);
        } else {
            console.error('Game container not found!');
            alert('Game container not found. Please refresh the page.');
        }
    });

    // Close game button
    const closeGame = document.getElementById('closeGame');
    closeGame.addEventListener('click', function() {
        console.log('Close game clicked!');
        const gameContainer = document.getElementById('gameContainer');
        gameContainer.classList.add('hidden');
        if (gameRunning) {
            gameOver();
        }
        
        // Remove keyboard listener for game
        document.removeEventListener('keydown', handleGameKeys);
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
  