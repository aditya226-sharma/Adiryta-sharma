// Advanced animations and effects
document.addEventListener('DOMContentLoaded', function() {
    
    // Glitch effect for text elements
    function createGlitchEffect(element) {
        const text = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        function glitch() {
            let glitchedText = '';
            for (let i = 0; i < text.length; i++) {
                if (Math.random() < 0.1) {
                    glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitchedText += text[i];
                }
            }
            element.textContent = glitchedText;
            
            setTimeout(() => {
                element.textContent = text;
            }, 50);
        }
        
        element.addEventListener('mouseenter', () => {
            const glitchInterval = setInterval(glitch, 100);
            setTimeout(() => clearInterval(glitchInterval), 500);
        });
    }
    
    // Apply glitch effect to navigation links
    document.querySelectorAll('.nav-link').forEach(createGlitchEffect);
    
    // Particle system for background
    class ParticleSystem {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.particles = [];
            this.particleCount = 50;
            
            this.resize();
            this.createParticles();
            this.animate();
            
            window.addEventListener('resize', () => this.resize());
        }
        
        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        
        createParticles() {
            for (let i = 0; i < this.particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }
        
        updateParticles() {
            this.particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            });
        }
        
        drawParticles() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.particles.forEach(particle => {
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(0, 255, 65, ${particle.opacity})`;
                this.ctx.fill();
            });
            
            // Draw connections
            this.particles.forEach((particle, i) => {
                this.particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.strokeStyle = `rgba(0, 255, 65, ${0.1 * (1 - distance / 100)})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.stroke();
                    }
                });
            });
        }
        
        animate() {
            this.updateParticles();
            this.drawParticles();
            requestAnimationFrame(() => this.animate());
        }
    }
    
    // Initialize particle system
    const particleCanvas = document.createElement('canvas');
    particleCanvas.style.position = 'fixed';
    particleCanvas.style.top = '0';
    particleCanvas.style.left = '0';
    particleCanvas.style.width = '100%';
    particleCanvas.style.height = '100%';
    particleCanvas.style.zIndex = '-2';
    particleCanvas.style.pointerEvents = 'none';
    document.body.appendChild(particleCanvas);
    
    new ParticleSystem(particleCanvas);
    
    // Hover effects for cards
    function addHoverEffects() {
        const cards = document.querySelectorAll('.project-card, .cert-card, .interest-card, .resource-card, .achievement-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0, 255, 65, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    addHoverEffects();
    
    // Scroll-triggered animations
    function createScrollAnimations() {
        const animatedElements = document.querySelectorAll('.project-card, .cert-card, .timeline-item, .skill-category');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.style.transition = 'all 0.6s ease';
            observer.observe(element);
        });
    }
    
    createScrollAnimations();
    
    // Terminal typing effect
    function createTerminalEffect(element, commands) {
        let commandIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentCommand = commands[commandIndex];
            
            if (isDeleting) {
                element.textContent = currentCommand.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentCommand.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentCommand.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                commandIndex = (commandIndex + 1) % commands.length;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        type();
    }
    
    // Apply terminal effect to specific elements
    const terminalElement = document.querySelector('.terminal-text');
    if (terminalElement) {
        const commands = [
            'nmap -sS target.com',
            'python vuln_scanner.py',
            'wireshark -i eth0',
            'metasploit framework',
            'burp suite proxy'
        ];
        createTerminalEffect(terminalElement, commands);
    }
    
    // Loading screen animation
    function createLoadingScreen() {
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="loading-logo">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <div class="loading-text">INITIALIZING SECURITY PROTOCOLS</div>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
            </div>
        `;
        
        const loadingStyles = `
            .loading-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--bg-darker);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }
            
            .loading-content {
                text-align: center;
            }
            
            .loading-logo {
                font-size: 4rem;
                color: var(--primary-color);
                margin-bottom: 2rem;
                animation: pulse 2s ease-in-out infinite;
            }
            
            .loading-text {
                font-family: var(--font-primary);
                color: var(--text-light);
                margin-bottom: 2rem;
                letter-spacing: 2px;
            }
            
            .loading-bar {
                width: 300px;
                height: 4px;
                background: var(--border-color);
                border-radius: 2px;
                overflow: hidden;
                margin: 0 auto;
            }
            
            .loading-progress {
                width: 0%;
                height: 100%;
                background: var(--gradient-primary);
                animation: loadingProgress 3s ease-in-out forwards;
            }
            
            @keyframes loadingProgress {
                to { width: 100%; }
            }
            
            .loaded .loading-screen {
                opacity: 0;
                pointer-events: none;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = loadingStyles;
        document.head.appendChild(styleSheet);
        
        document.body.appendChild(loadingScreen);
        
        // Remove loading screen after animation
        setTimeout(() => {
            document.body.classList.add('loaded');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 3000);
    }
    
    // Initialize loading screen
    createLoadingScreen();
    
    // Cursor trail effect
    function createCursorTrail() {
        const trail = [];
        const trailLength = 10;
        
        document.addEventListener('mousemove', (e) => {
            trail.push({ x: e.clientX, y: e.clientY });
            
            if (trail.length > trailLength) {
                trail.shift();
            }
            
            updateTrail();
        });
        
        function updateTrail() {
            const existingTrails = document.querySelectorAll('.cursor-trail');
            existingTrails.forEach(t => t.remove());
            
            trail.forEach((point, index) => {
                const trailElement = document.createElement('div');
                trailElement.className = 'cursor-trail';
                trailElement.style.cssText = `
                    position: fixed;
                    left: ${point.x}px;
                    top: ${point.y}px;
                    width: ${10 - index}px;
                    height: ${10 - index}px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9998;
                    opacity: ${(trailLength - index) / trailLength};
                    transform: translate(-50%, -50%);
                `;
                document.body.appendChild(trailElement);
                
                setTimeout(() => trailElement.remove(), 100);
            });
        }
    }
    
    // Initialize cursor trail (uncomment to enable)
    // createCursorTrail();
});
