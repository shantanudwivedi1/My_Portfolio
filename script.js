// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu if open
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.2
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

// Initialize EmailJS with error handling
(function() {
    try {
        emailjs.init("CJYofw80zIO6e09mp");
        console.log("EmailJS initialized successfully");
    } catch (error) {
        console.error("EmailJS initialization error:", error);
    }
})();

// Form Submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

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

// Add CSS animation class for scroll reveal
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });
});

// Typing animation for the hero section
const text = "Full Stack Developer";
const typingSpeed = 100;
let i = 0;

function typeWriter() {
    if (i < text.length) {
        document.querySelector('.hero p').textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
    }
}

// Start typing animation after a delay
setTimeout(typeWriter, 1500);

// Testimonial Slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach(card => {
        card.style.display = 'none';
    });
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

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
    });
});

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}, 5000); 