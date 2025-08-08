// Customer Journey JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Customer Journey page loaded successfully!');
    
    // Add interactive features to journey stages
    const journeyStages = document.querySelectorAll('.flex-1');
    journeyStages.forEach(stage => {
        stage.addEventListener('click', function() {
            // Add highlight effect
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Log interaction for analytics
            const stageTitle = this.querySelector('h4').textContent;
            console.log('Journey stage clicked:', stageTitle);
        });
    });

    // Add hover effects to persona cards
    const personaCards = document.querySelectorAll('.bg-white.rounded-2xl');
    personaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add interactive pain points
    const painPoints = document.querySelectorAll('.bg-red-50, .bg-yellow-50, .bg-blue-50');
    painPoints.forEach(point => {
        point.addEventListener('click', function() {
            // Toggle detailed view
            const details = this.querySelector('p');
            if (details.style.display === 'none') {
                details.style.display = 'block';
                this.style.height = 'auto';
            } else {
                details.style.display = 'none';
                this.style.height = '60px';
            }
        });
    });

    // Add solution recommendations
    const solutions = document.querySelectorAll('.bg-green-50');
    solutions.forEach(solution => {
        solution.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            const impact = this.querySelector('.text-green-600').textContent;
            
            // Show detailed recommendation
            showRecommendationModal(title, impact);
        });
    });

    function showRecommendationModal(title, impact) {
        // Create modal for detailed recommendation
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl p-6 max-w-md mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-slate-900">${title}</h3>
                    <button class="text-slate-400 hover:text-slate-600 text-2xl" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
                </div>
                <p class="text-slate-600 mb-4">Detailed implementation plan and expected outcomes for this optimization.</p>
                <div class="bg-green-50 p-3 rounded-lg mb-4">
                    <div class="text-sm font-medium text-green-800">Expected Impact: ${impact}</div>
                </div>
                <div class="flex justify-end space-x-3">
                    <button class="px-4 py-2 text-slate-600 hover:text-slate-800" onclick="this.parentElement.parentElement.parentElement.remove()">Close</button>
                    <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Implement</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Remove modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Add real-time satisfaction updates
    function updateSatisfactionScores() {
        const satisfactionElements = document.querySelectorAll('.text-green-600');
        satisfactionElements.forEach(element => {
            if (element.textContent.includes('/5.0')) {
                const currentScore = parseFloat(element.textContent);
                const newScore = Math.min(5.0, currentScore + (Math.random() - 0.5) * 0.1);
                element.textContent = newScore.toFixed(1) + '/5.0';
            }
        });
    }

    // Update satisfaction scores every 30 seconds
    setInterval(updateSatisfactionScores, 30000);

    // Add journey optimization calculator
    function calculateOptimizationROI() {
        const improvements = [
            { name: 'Interactive Tutorial', impact: 25 },
            { name: '24/7 Chat Support', impact: 18 },
            { name: 'Smart Recommendations', impact: 22 }
        ];
        
        const totalImpact = improvements.reduce((sum, item) => sum + item.impact, 0);
        const averageImpact = totalImpact / improvements.length;
        
        console.log('Average optimization impact:', averageImpact + '%');
        console.log('Total potential improvement:', totalImpact + '%');
        
        return { averageImpact, totalImpact };
    }

    // Calculate ROI on page load
    const roi = calculateOptimizationROI();
    
    // Add export functionality
    function exportJourneyData() {
        const journeyData = {
            timestamp: new Date().toISOString(),
            personas: [
                { name: 'Sarah', role: 'Product Manager', engagement: 'High' },
                { name: 'Mike', role: 'Marketing Director', engagement: 'Medium' },
                { name: 'Lisa', role: 'VP of Operations', engagement: 'Low' }
            ],
            stages: [
                { name: 'Awareness', satisfaction: 4.6 },
                { name: 'Consideration', satisfaction: 4.8 },
                { name: 'Decision', satisfaction: 4.9 },
                { name: 'Retention', satisfaction: 4.7 }
            ],
            painPoints: [
                { name: 'Complex Onboarding', impact: -15 },
                { name: 'Limited Support', impact: -8 },
                { name: 'Feature Discovery', impact: -12 }
            ],
            solutions: [
                { name: 'Interactive Tutorial', impact: 25 },
                { name: '24/7 Chat Support', impact: 18 },
                { name: 'Smart Recommendations', impact: 22 }
            ],
            roi: roi
        };
        
        const dataStr = JSON.stringify(journeyData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'customer-journey-data.json';
        link.click();
        
        console.log('Customer journey data exported successfully!');
    }

    // Add export functionality to window
    window.exportJourneyData = exportJourneyData;
});
