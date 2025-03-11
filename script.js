/**
 * Portfolio Website JavaScript
 * Author: Shantanu Dwivedi
 * Description: Handles all interactive functionality for the portfolio website
 */

// ===============================
// INITIALIZATION
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initSlideshow();
    initNavigation();
    initScrollAnimations();
    initTypingAnimation();
    initTestimonials();
    initContactForm();
    
    // Add reveal class to sections for animations
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
    });
});

// ===============================
// BACKGROUND SLIDESHOW
// ===============================
function initSlideshow() {
    const slides = document.querySelectorAll('.background-slideshow .slide');
    
    // Exit if no slides are found
    if (slides.length === 0) {
        console.error('No slides found!');
        return;
    }
    
    console.log(`Found ${slides.length} slides`);
    
    // Remove any existing active classes
    slides.forEach(slide => slide.classList.remove('active'));
    
    let currentSlide = 0;

    // Make first slide visible initially
    slides[0].classList.add('active');
    console.log('Activated first slide');

    function nextSlide() {
        // Fade out current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Fade in next slide
        slides[currentSlide].classList.add('active');
        console.log(`Showing slide ${currentSlide + 1} of ${slides.length}`);
    }

    // Change slide every 8 seconds (increased from 5 for better visibility)
    setInterval(nextSlide, 8000);
    console.log('Slideshow initialized with interval of 8 seconds');
}

// ===============================
// NAVIGATION FUNCTIONALITY
// ===============================
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

// ===============================
// SCROLL ANIMATIONS
// ===============================
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

// ===============================
// TYPING ANIMATION
// ===============================
function initTypingAnimation() {
    const typingElement = document.querySelector('.hero p');
    
    // Exit if element is not found
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

// ===============================
// TESTIMONIALS SLIDER
// ===============================
function initTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    // Exit if elements are not found
    if (testimonialCards.length === 0 || dots.length === 0) return;
    
    let currentTestimonial = 0;
    let autoSlideInterval;

    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current testimonial and activate corresponding dot
        testimonialCards[index].style.display = 'block';
        dots[index].classList.add('active');
    }

    // Initialize first testimonial
    showTestimonial(currentTestimonial);

    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
            
            // Reset auto-rotation timer
            clearInterval(autoSlideInterval);
            startAutoSlide();
        });
    });

    // Function to start auto-rotation
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Start auto-rotation
    startAutoSlide();
}

// ===============================
// CONTACT FORM
// ===============================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    // Exit if elements are not found
    if (!contactForm || !formStatus) return;

    // Initialize EmailJS
    try {
        emailjs.init("CJYofw80zIO6e09mp");
    } catch (error) {
        console.error("EmailJS initialization error:", error);
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitButton = contactForm.querySelector('button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Get form data
        const formData = new FormData(this);
        const templateParams = {
            from_name: formData.get('from_name'),
            from_email: formData.get('from_email'),
            reply_to: formData.get('from_email'),
            message: formData.get('message'),
            to_name: 'Shantanu Dwivedi'
        };

        // Send the email using EmailJS
        emailjs.send('service_zlc9ojc', 'template_r2m3q9h', templateParams)
            .then(function(response) {
                console.log("SUCCESS!", response.status, response.text);
                formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            }, function(error) {
                console.error("FAILED...", error);
                formStatus.textContent = 'Sorry, there was an error sending your message. Please try again.';
                formStatus.className = 'form-status error';
            })
            .finally(function() {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });
} 