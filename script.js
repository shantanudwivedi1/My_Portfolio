// Initialize EmailJS with your public key
emailjs.init("CJYofw80zIO6e09mp").then(() => {
    console.log('EmailJS initialized successfully');
}).catch(error => {
    console.error('EmailJS initialization failed:', error);
});

document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    initNavigation();
    initScrollAnimations();
    initTypingAnimation();
    initTestimonials();
    initContactForm();
    
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
    });
});

// Slideshow functionality
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const overlay = document.querySelector('.slide-overlay');
    let currentSlide = 0;
    
    // Show first slide
    slides[0].classList.add('active');
    
    // Change slide every 5 seconds
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

// Navigation functionality
function initNavigation() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const navbar = document.querySelector('.navbar');

    // Handle scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Handle active link highlighting
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(li => {
            li.querySelector('a').classList.remove('active');
            if (li.querySelector(`a[href="#${current}"]`)) {
                li.querySelector('a').classList.add('active');
            }
        });
    });

    // Toggle mobile navigation
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
        
        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
            
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    burger.classList.remove('toggle');
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Typing animation
function initTypingAnimation() {
    const typingElement = document.querySelector('.hero p');
    
    if (!typingElement) return;
    
    const text = "Full Stack Developer";
    const typingSpeed = 100;
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    setTimeout(typeWriter, 1500);
}

// Testimonials slider
function initTestimonials() {
    const testimonialsContainer = document.querySelector('.testimonials-slider');
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    if (!testimonialsContainer || testimonials.length === 0) return;
    
    // Create dots container
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('testimonial-dots');
    
    // Add dots based on number of testimonials
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
        
        dotsContainer.appendChild(dot);
    });
    
    testimonialsContainer.appendChild(dotsContainer);
    
    // Show all testimonials initially, then hide all except first
    testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
            testimonial.style.display = 'none';
        }
    });
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        testimonials[index].style.display = 'block';
        
        document.querySelectorAll('.dot').forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === index);
        });
    }
    
    let currentTestimonial = 0;
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    setInterval(nextTestimonial, 5000);
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (!form) {
        console.error('Contact form not found');
        return;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        const nameInput = form.querySelector('input[name="name"]');
        const emailInput = form.querySelector('input[name="email"]');
        const messageInput = form.querySelector('textarea[name="message"]');
        
        if (!nameInput || !emailInput || !messageInput) {
            console.error('Form inputs not found');
            return;
        }
        
        // Form validation
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            formStatus.textContent = 'Please fill in all fields';
            formStatus.classList.add('error');
            formStatus.classList.remove('success');
            formStatus.style.display = 'block';
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            formStatus.textContent = 'Please enter a valid email address';
            formStatus.classList.add('error');
            formStatus.classList.remove('success');
            formStatus.style.display = 'block';
            return;
        }
        
        const templateParams = {
            from_name: nameInput.value,
            from_email: emailInput.value,
            message: messageInput.value
        };
        
        console.log('Sending email with params:', templateParams);
        
        // Send email to you
        emailjs.send('service_zlc9ojc', 'template_llnnvfg', templateParams)
            .then(function() {
                console.log('Main email sent successfully');
                
                // Send auto-reply
                return emailjs.send('service_zlc9ojc', 'template_hrlzntf', {
                    from_name: nameInput.value,
                    from_email: emailInput.value,
                    message: messageInput.value
                });
            })
            .then(function() {
                console.log('Auto-reply sent successfully');
                formStatus.textContent = 'Message sent successfully!';
                formStatus.classList.add('success');
                formStatus.classList.remove('error');
                formStatus.style.display = 'block';
                
                form.reset();
                
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            })
            .catch(function(error) {
                console.error('Email sending failed:', error);
                formStatus.textContent = 'Failed to send message. Please try again.';
                formStatus.classList.add('error');
                formStatus.classList.remove('success');
                formStatus.style.display = 'block';
            });
    });
} 