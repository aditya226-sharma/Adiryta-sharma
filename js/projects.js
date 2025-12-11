// Projects page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'flex';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    // Animate in
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add glow effect
            this.style.boxShadow = '0 10px 30px rgba(0, 255, 65, 0.3)';
            this.style.transform = 'translateY(-10px)';
            
            // Animate tech tags
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.1)';
                    tag.style.background = 'var(--gradient-primary)';
                    tag.style.color = 'var(--bg-dark)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
            this.style.transform = 'translateY(0)';
            
            // Reset tech tags
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = 'scale(1)';
                tag.style.background = 'rgba(0, 255, 65, 0.1)';
                tag.style.color = 'var(--primary-color)';
            });
        });
    });
    
    // Project modal functionality
    function createProjectModal() {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-header">
                        <h2 class="modal-title"></h2>
                        <div class="modal-tech"></div>
                    </div>
                    <div class="modal-body">
                        <div class="modal-description"></div>
                        <div class="modal-features"></div>
                        <div class="modal-gallery"></div>
                    </div>
                    <div class="modal-footer">
                        <div class="modal-links"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Modal styles
        const modalStyles = `
            .project-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .project-modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            }
            
            .modal-content {
                background: var(--bg-dark);
                border: 1px solid var(--primary-color);
                border-radius: 15px;
                max-width: 800px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                transform: scale(0.8);
                transition: transform 0.3s ease;
            }
            
            .project-modal.active .modal-content {
                transform: scale(1);
            }
            
            .modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                color: var(--primary-color);
                font-size: 2rem;
                cursor: pointer;
                z-index: 1;
            }
            
            .modal-header {
                padding: 2rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .modal-title {
                color: var(--primary-color);
                margin-bottom: 1rem;
            }
            
            .modal-tech {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .modal-body {
                padding: 2rem;
            }
            
            .modal-description {
                color: var(--text-gray);
                line-height: 1.6;
                margin-bottom: 2rem;
            }
            
            .modal-features ul {
                list-style: none;
                padding: 0;
            }
            
            .modal-features li {
                color: var(--text-gray);
                margin-bottom: 0.5rem;
                padding-left: 1.5rem;
                position: relative;
            }
            
            .modal-features li::before {
                content: '▶';
                position: absolute;
                left: 0;
                color: var(--primary-color);
            }
            
            .modal-footer {
                padding: 2rem;
                border-top: 1px solid var(--border-color);
            }
            
            .modal-links {
                display: flex;
                gap: 1rem;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
        
        return modal;
    }
    
    const projectModal = createProjectModal();
    
    // Project data
    const projectData = {
        'network-vulnerability-scanner': {
            title: 'Network Vulnerability Scanner',
            description: 'A comprehensive network vulnerability scanner built with Python that automatically discovers network hosts, identifies open ports, and detects potential security vulnerabilities. The tool integrates with multiple vulnerability databases and provides detailed reporting capabilities.',
            tech: ['Python', 'Nmap', 'Socket Programming', 'JSON', 'SQLite'],
            features: [
                'Automated network discovery using ARP and ICMP',
                'Multi-threaded port scanning for improved performance',
                'Service version detection and banner grabbing',
                'Integration with CVE database for vulnerability matching',
                'Detailed HTML and PDF report generation',
                'Command-line interface with multiple scan options',
                'False positive reduction algorithms',
                'Network topology mapping'
            ],
            links: [
                { text: 'View on GitHub', url: '#', icon: 'fab fa-github' },
                { text: 'Live Demo', url: '#', icon: 'fas fa-external-link-alt' },
                { text: 'Documentation', url: '#', icon: 'fas fa-book' }
            ]
        },
        'password-analyzer': {
            title: 'Password Security Analyzer',
            description: 'An advanced password strength analyzer that evaluates password security using multiple algorithms including entropy calculation, dictionary attacks, and pattern recognition. Provides actionable recommendations for password improvement.',
            tech: ['Python', 'Regex', 'Entropy Calculation', 'Machine Learning'],
            features: [
                'Shannon entropy calculation for randomness assessment',
                'Dictionary attack simulation with common passwords',
                'Pattern recognition for keyboard walks and sequences',
                'Strength scoring with detailed breakdown',
                'Password generation with customizable criteria',
                'Batch analysis for multiple passwords',
                'Integration with HaveIBeenPwned API',
                'Real-time strength feedback'
            ],
            links: [
                { text: 'View on GitHub', url: '#', icon: 'fab fa-github' },
                { text: 'Try Online', url: '#', icon: 'fas fa-external-link-alt' }
            ]
        }
    };
    
    // Open modal functionality
    function openProjectModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;
        
        const modal = document.querySelector('.project-modal');
        const title = modal.querySelector('.modal-title');
        const tech = modal.querySelector('.modal-tech');
        const description = modal.querySelector('.modal-description');
        const features = modal.querySelector('.modal-features');
        const links = modal.querySelector('.modal-links');
        
        title.textContent = project.title;
        description.textContent = project.description;
        
        // Tech tags
        tech.innerHTML = project.tech.map(t => 
            `<span class="tech-tag">${t}</span>`
        ).join('');
        
        // Features
        features.innerHTML = `
            <h3>Key Features:</h3>
            <ul>
                ${project.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
        `;
        
        // Links
        links.innerHTML = project.links.map(link => 
            `<a href="${link.url}" class="btn btn-primary" target="_blank">
                <i class="${link.icon}"></i> ${link.text}
            </a>`
        ).join('');
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal functionality
    function closeProjectModal() {
        const modal = document.querySelector('.project-modal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners for modal
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-close') || 
            e.target.classList.contains('modal-overlay')) {
            closeProjectModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
    
    // Add click handlers to project cards
    projectCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '');
        
        card.addEventListener('click', () => {
            openProjectModal(title);
        });
        
        card.style.cursor = 'pointer';
    });
    
    // Animate project stats on scroll
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-card .stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                    
                    if (numericValue) {
                        animateNumber(target, 0, numericValue, finalValue);
                    }
                }
            });
        });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
    
    function animateNumber(element, start, end, suffix) {
        const duration = 2000;
        const increment = (end - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (suffix.includes('+') ? '+' : '');
            }
        }, 16);
    }
    
    animateStats();
    
    // Add project card entrance animations
    function addEntranceAnimations() {
        const cards = document.querySelectorAll('.project-card, .project-item');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Initialize entrance animations after a short delay
    setTimeout(addEntranceAnimations, 500);
});
