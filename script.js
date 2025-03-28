// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your public key
    emailjs.init("CJYofw80zIO6e09mp"); // Replace with your actual public key
    
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

// BACKGROUND SLIDESHOW
function initSlideshow() {
    const slides = document.querySelectorAll('.background-slideshow .slide');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;

    // Make first slide visible initially
    slides[0].classList.add('active');

    function nextSlide() {
        // Fade out current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Fade in next slide
        slides[currentSlide].classList.add('active');
    }

    // Change slide every 8 seconds
    setInterval(nextSlide, 8000);
}

// NAVIGATION FUNCTIONALITY
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

// SCROLL ANIMATIONS
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

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// TYPING ANIMATION
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

    // Start typing animation after a delay
    setTimeout(typeWriter, 1500);
}

// TESTIMONIALS SLIDER
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
        
        // Add click event to each dot
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
        
        dotsContainer.appendChild(dot);
    });
    
    // Add dots container to testimonials section
    testimonialsContainer.appendChild(dotsContainer);
    
    // Show all testimonials initially, then hide all except first
    testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
            testimonial.style.display = 'none';
        }
    });
    
    // Function to show a specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        // Show selected testimonial
        testimonials[index].style.display = 'block';
        
        // Update active dot
        document.querySelectorAll('.dot').forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === index);
        });
    }
    
    // Auto-rotate testimonials
    let currentTestimonial = 0;
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Change testimonial every 5 seconds
    setInterval(nextTestimonial, 5000);
}

// CONTACT FORM
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = form.querySelector('input[name="name"]');
        const emailInput = form.querySelector('input[name="email"]');
        const messageInput = form.querySelector('textarea[name="message"]');
        const formStatus = document.querySelector('.form-status');
        
        if (!nameInput || !emailInput || !messageInput || !formStatus) return;
        
        // Simple validation
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            formStatus.textContent = 'Please fill in all fields';
            formStatus.classList.add('error');
            formStatus.classList.remove('success');
            formStatus.style.display = 'block';
            return;
        }
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            formStatus.textContent = 'Please enter a valid email address';
            formStatus.classList.add('error');
            formStatus.classList.remove('success');
            formStatus.style.display = 'block';
            return;
        }
        
        // Prepare data for EmailJS
        const templateParams = {
            from_name: nameInput.value,
            from_email: emailInput.value,
            message: messageInput.value
        };
        
        // Use EmailJS to send email
        emailjs.send('service_zlc9ojc', 'template_r2m3q9h', templateParams)
            .then(function() {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.classList.add('success');
                formStatus.classList.remove('error');
                formStatus.style.display = 'block';
                
                // Reset form
                form.reset();
                
                // Hide status message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }, function(error) {
                formStatus.textContent = 'Failed to send message. Please try again.';
                formStatus.classList.add('error');
                formStatus.classList.remove('success');
                formStatus.style.display = 'block';
            });
    });
} 