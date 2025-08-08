// Product Analytics Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Analytics Dashboard loaded successfully!');
    
    // Update last updated time
    function updateLastUpdated() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        document.getElementById('lastUpdated').textContent = timeString;
    }
    
    updateLastUpdated();
    setInterval(updateLastUpdated, 30000); // Update every 30 seconds

    // User Engagement Chart
    const engagementCtx = document.getElementById('engagementChart').getContext('2d');
    const engagementChart = new Chart(engagementCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Active Users',
                data: [1200, 1350, 1420, 1380, 1560, 1680, 1840],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Engagement Score',
                data: [65, 72, 78, 75, 82, 88, 92],
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            layout: {
                padding: {
                    top: 10,
                    bottom: 10
                }
            }
        }
    });

    // Conversion Funnel Chart
    const funnelCtx = document.getElementById('funnelChart').getContext('2d');
    const funnelChart = new Chart(funnelCtx, {
        type: 'doughnut',
        data: {
            labels: ['Visitors', 'Engaged', 'Interested', 'Converted'],
            datasets: [{
                data: [100000, 45000, 12000, 3240],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            },
            layout: {
                padding: {
                    top: 10,
                    bottom: 10
                }
            }
        }
    });

    // Customer Segmentation Chart
    const segmentationCtx = document.getElementById('segmentationChart').getContext('2d');
    const segmentationChart = new Chart(segmentationCtx, {
        type: 'pie',
        data: {
            labels: ['Power Users (25%)', 'Regular Users (45%)', 'Casual Users (20%)', 'New Users (10%)'],
            datasets: [{
                data: [25, 45, 20, 10],
                backgroundColor: [
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            },
            layout: {
                padding: {
                    top: 10,
                    bottom: 10
                }
            }
        }
    });

    // Revenue by Channel Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'bar',
        data: {
            labels: ['Direct', 'Organic Search', 'Social Media', 'Email', 'Referral'],
            datasets: [{
                label: 'Revenue ($K)',
                data: [320, 280, 180, 95, 17],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderWidth: 0,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'K';
                        }
                    }
                }
            },
            layout: {
                padding: {
                    top: 10,
                    bottom: 10
                }
            }
        }
    });

    // Add interactive features
    const timeButtons = document.querySelectorAll('button');
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            timeButtons.forEach(btn => {
                btn.classList.remove('bg-blue-100', 'text-blue-700');
                btn.classList.add('bg-slate-100', 'text-slate-600');
            });
            
            // Add active class to clicked button
            this.classList.remove('bg-slate-100', 'text-slate-600');
            this.classList.add('bg-blue-100', 'text-blue-700');
            
            // Simulate data update
            console.log('Time period changed to:', this.textContent);
        });
    });

    // Add real-time data simulation
    function simulateRealTimeData() {
        // Simulate live data updates
        const engagementData = engagementChart.data.datasets[0].data;
        const newValue = engagementData[engagementData.length - 1] + Math.floor(Math.random() * 100 - 50);
        engagementData.push(newValue);
        engagementData.shift();
        
        const engagementLabels = engagementChart.data.labels;
        const newLabel = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
        engagementLabels.push(newLabel);
        engagementLabels.shift();
        
        engagementChart.update('none');
    }

    // Update charts every 5 seconds for demo
    setInterval(simulateRealTimeData, 5000);

    // Add export functionality
    function exportData() {
        const data = {
            timestamp: new Date().toISOString(),
            metrics: {
                totalUsers: 124892,
                conversionRate: 3.24,
                revenue: 892000,
                activeSessions: 2847
            },
            charts: {
                engagement: engagementChart.data,
                funnel: funnelChart.data,
                segmentation: segmentationChart.data,
                revenue: revenueChart.data
            }
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'analytics-dashboard-data.json';
        link.click();
        
        console.log('Analytics data exported successfully!');
    }

    // Add export button functionality
    window.exportAnalyticsData = exportData;
});
