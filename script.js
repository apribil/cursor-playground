// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing application...');
    
    // Get references to the buttons and modal
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Debug: Check if buttons are found
    console.log('Button references:', { btn1, btn2, btn3, modal, closeModal, closeModalBtn });
    
    if (!btn1) console.error('Button 1 not found!');
    if (!btn2) console.error('Button 2 not found!');
    if (!btn3) console.error('Button 3 not found!');
    if (!modal) console.error('Modal not found!');

    // Debug function to update debug panel
    function updateDebugInfo() {
        const currentBg = document.getElementById('currentBg');
        
        if (currentBg) {
            currentBg.textContent = 'Default';
        }
    }

    // Update version time
    const updateTimeElement = document.getElementById('updateTime');
    if (updateTimeElement) {
        const now = new Date();
        updateTimeElement.textContent = now.toLocaleString();
    }

    // Update debug info on page load
    setTimeout(updateDebugInfo, 100);

    // Button 1: Show alert message
    if (btn1) {
        btn1.addEventListener('click', function() {
            alert('Hello from Cursor!');
            console.log('Button 1 was clicked! This is a logged message.');
        });
    }



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
    if (btn2) {
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
    }

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

    // Enhanced Modal Management
    let modalFocusableElements = [];
    let lastFocusedElement = null;

    // Button 3: Toggle modal visibility with enhanced animations
    if (btn3) {
        btn3.addEventListener('click', function() {
            if (modal && modal.classList.contains('hidden')) {
                openModal();
            } else if (modal) {
                closeModal();
            }
            console.log('Modal visibility toggled');
        });
    }

    // Enhanced modal open function
    function openModal() {
        // Store the currently focused element
        lastFocusedElement = document.activeElement;
        
        // Show modal backdrop
        modal.classList.remove('hidden');
        
        // Trigger backdrop animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Trigger content animation
        setTimeout(() => {
            const modalContent = document.getElementById('modalContent');
            modalContent.classList.add('show');
        }, 50);
        
        // Set up focus trap
        setupFocusTrap();
        
        // Focus the modal
        modal.focus();
    }

    // Enhanced modal close function
    function closeModal() {
        const modalContent = document.getElementById('modalContent');
        
        // Trigger content animation (reverse)
        modalContent.classList.remove('show');
        
        // Trigger backdrop animation (reverse)
        setTimeout(() => {
            modal.classList.remove('show');
        }, 50);
        
        // Hide modal after animations complete
        setTimeout(() => {
            modal.classList.add('hidden');
            
            // Restore focus to the last focused element
            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }
            
            // Clean up focus trap
            cleanupFocusTrap();
        }, 250);
    }

    // Focus trap setup
    function setupFocusTrap() {
        // Get all focusable elements within the modal
        modalFocusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = modalFocusableElements[0];
        const lastElement = modalFocusableElements[modalFocusableElements.length - 1];
        
        // Focus the first element
        if (firstElement) {
            firstElement.focus();
        }
        
        // Add keyboard event listener for focus trap
        modal.addEventListener('keydown', handleModalKeydown);
    }

    // Focus trap cleanup
    function cleanupFocusTrap() {
        modal.removeEventListener('keydown', handleModalKeydown);
        modalFocusableElements = [];
    }

    // Handle keyboard navigation within modal
    function handleModalKeydown(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            
            const firstElement = modalFocusableElements[0];
            const lastElement = modalFocusableElements[modalFocusableElements.length - 1];
            
            if (e.shiftKey) {
                // Shift + Tab: move backwards
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                } else {
                    const currentIndex = Array.from(modalFocusableElements).indexOf(document.activeElement);
                    const previousElement = modalFocusableElements[currentIndex - 1];
                    if (previousElement) {
                        previousElement.focus();
                    }
                }
            } else {
                // Tab: move forwards
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                } else {
                    const currentIndex = Array.from(modalFocusableElements).indexOf(document.activeElement);
                    const nextElement = modalFocusableElements[currentIndex + 1];
                    if (nextElement) {
                        nextElement.focus();
                    }
                }
            }
        } else if (e.key === 'Escape') {
            closeModal();
        }
    }

    // Close modal when X button is clicked
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            closeModal();
        });
    }

    // Close modal when Close button is clicked
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            closeModal();
        });
    }

    // Close modal when clicking outside the modal content
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
  