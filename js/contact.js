// Contact page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                // Show loading state
                showLoadingState();
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    showSuccessMessage();
                    contactForm.reset();
                }, 2000);
            }
        });
    }
    
    // Form validation
    function validateForm(data) {
        const errors = [];
        
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.subject) {
            errors.push('Please select a subject');
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }
        
        if (errors.length > 0) {
            showErrorMessages(errors);
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showErrorMessages(errors) {
        // Remove existing error messages
        const existingErrors = document.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
        
        // Create error container
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-container';
        errorContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <div class="error-content">
                    <h4>Please fix the following errors:</h4>
                    <ul>
                        ${errors.map(error => `<li>${error}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        contactForm.insertBefore(errorContainer, contactForm.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            errorContainer.remove();
        }, 5000);
    }
    
    function showLoadingState() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Store original text for later restoration
        submitButton.dataset.originalText = originalText;
    }
    
    function showSuccessMessage() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Restore button
        submitButton.innerHTML = submitButton.dataset.originalText;
        submitButton.disabled = false;
        
        // Show success message
        const successContainer = document.createElement('div');
        successContainer.className = 'success-container';
        successContainer.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <div class="success-content">
                    <h4>Message Sent Successfully!</h4>
                    <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                </div>
            </div>
        `;
        
        contactForm.insertBefore(successContainer, contactForm.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            successContainer.remove();
        }, 5000);
    }
    
    // Real-time form validation
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        switch (field.name) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
            case 'email':
                if (!isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'subject':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a subject';
                }
                break;
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        } else {
            clearFieldError(field);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
        field.classList.add('error');
    }
    
    function clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.classList.remove('error');
    }
    
    // Social links hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const platform = this.getAttribute('data-platform');
            
            // Add platform-specific colors
            const colors = {
                linkedin: '#0077b5',
                github: '#333',
                twitter: '#1da1f2',
                discord: '#7289da',
                telegram: '#0088cc'
            };
            
            if (colors[platform]) {
                this.style.background = colors[platform];
                this.style.transform = 'translateY(-5px) scale(1.1)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.transform = '';
        });
    });
    
    // Contact cards animation
    function animateContactCards() {
        const cards = document.querySelectorAll('.contact-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                }
            });
        });
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }
    
    animateContactCards();
    
    // Availability status animation
    const statusIndicator = document.querySelector('.status-indicator');
    if (statusIndicator) {
        setInterval(() => {
            statusIndicator.style.transform = 'scale(1.2)';
            setTimeout(() => {
                statusIndicator.style.transform = 'scale(1)';
            }, 200);
        }, 2000);
    }
    
    // Add styles for form validation and messages
    const contactStyles = `
        .form-group {
            position: relative;
            margin-bottom: 2rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--text-light);
            font-weight: 500;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 1rem;
            background: rgba(0, 255, 65, 0.05);
            border: 1px solid var(--border-color);
            border-radius: 5px;
            color: var(--text-light);
            font-family: inherit;
            transition: all 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 10px rgba(0, 255, 65, 0.2);
        }
        
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: var(--accent-color);
        }
        
        .input-border {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--gradient-primary);
            transition: width 0.3s ease;
        }
        
        .form-group input:focus + .input-border,
        .form-group select:focus + .input-border,
        .form-group textarea:focus + .input-border {
            width: 100%;
        }
        
        .field-error {
            color: var(--accent-color);
            font-size: 0.9rem;
            margin-top: 0.5rem;
        }
        
        .error-message,
        .success-message {
            padding: 1rem;
            border-radius: 5px;
            margin-bottom: 2rem;
            display: flex;
            align-items: flex-start;
            gap: 1rem;
        }
        
        .error-message {
            background: rgba(255, 107, 53, 0.1);
            border: 1px solid var(--accent-color);
            color: var(--accent-color);
        }
        
        .success-message {
            background: rgba(0, 255, 65, 0.1);
            border: 1px solid var(--primary-color);
            color: var(--primary-color);
        }
        
        .error-message i,
        .success-message i {
            font-size: 1.5rem;
            margin-top: 0.2rem;
        }
        
        .error-content h4,
        .success-content h4 {
            margin: 0 0 0.5rem 0;
        }
        
        .error-content ul {
            margin: 0;
            padding-left: 1rem;
        }
        
        .success-content p {
            margin: 0;
        }
        
        .contact-card {
            background: rgba(0, 255, 65, 0.05);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            transition: all 0.3s ease;
        }
        
        .contact-card:hover {
            border-color: var(--primary-color);
            transform: translateX(10px);
        }
        
        .contact-icon {
            font-size: 2rem;
            color: var(--primary-color);
            width: 60px;
            text-align: center;
        }
        
        .contact-details h3 {
            margin: 0 0 0.5rem 0;
            color: var(--text-light);
        }
        
        .contact-details p {
            margin: 0 0 0.25rem 0;
            color: var(--primary-color);
            font-weight: 500;
        }
        
        .contact-details span {
            color: var(--text-gray);
            font-size: 0.9rem;
        }
        
        .availability-status {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .status-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            transition: transform 0.2s ease;
        }
        
        .status-indicator.available {
            background: var(--primary-color);
            box-shadow: 0 0 10px var(--primary-color);
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
        }
        
        .social-link {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1.5rem;
            border: 1px solid var(--border-color);
            border-radius: 10px;
            text-decoration: none;
            color: var(--text-light);
            transition: all 0.3s ease;
            min-width: 120px;
        }
        
        .social-link i {
            font-size: 2rem;
        }
        
        .social-link:hover {
            color: white;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = contactStyles;
    document.head.appendChild(styleSheet);
});
