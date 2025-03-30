// Animated Background for entire website
document.addEventListener('DOMContentLoaded', function() {
    initAnimatedBackground();

    // Navigation lock variables
    let navLock = false;
    let navLockTimer;

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Collect form data
            const formData = new FormData(contactForm);
            
            // Send to Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Hide form and show thank you message
                contactForm.style.display = 'none';
                thankYouMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // After 8 seconds, show the form again
                setTimeout(() => {
                    contactForm.style.display = 'block';
                    thankYouMessage.style.display = 'none';
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }, 8000);
            })
            .catch(error => {
                // Show error message
                alert('There was an error sending your message. Please try again.');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Close mobile menu
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            
            // Add smooth scrolling
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Always update the active class immediately when clicked
            document.querySelectorAll('.nav-links a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            link.classList.add('active');
            
            if (targetElement) {
                // Set strong navigation lock to prevent scroll handler from changing
                navLock = true;
                clearTimeout(navLockTimer);
                
                // Scroll to the target section
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Keep lock in place during scrolling animation
                navLockTimer = setTimeout(() => {
                    navLock = false;
                }, 1500); // Longer duration to ensure scrolling completes
            }
        });
    });

    // Handle scroll events to update the active nav link
    let scrollHandler = () => {
        // Don't update if navigation is locked (user just clicked a link)
        if (navLock) return;

        const scrollPosition = window.scrollY + 150; // Add offset for navbar height
        const sections = document.querySelectorAll('section');
        
        // If we're at the very top, handle specially
        if (scrollPosition < 100) {
            document.querySelectorAll('.nav-links a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            document.querySelector('.nav-links a[href="#hero"]')?.classList.add('active');
            return;
        }
        
        // Gather all section positions
        const sectionPositions = Array.from(sections).map(section => {
            return {
                id: section.id,
                top: section.offsetTop - 150, // Subtract offset
                bottom: section.offsetTop + section.offsetHeight - 150
            };
        }).sort((a, b) => a.top - b.top); // Sort by position
        
        // Find the current section
        let currentSection = null;
        
        // Special case for when we're before the first section
        if (scrollPosition < sectionPositions[0]?.top) {
            currentSection = sectionPositions[0]?.id;
        } 
        // Special case for when we're after the last section
        else if (scrollPosition >= sectionPositions[sectionPositions.length - 1]?.top) {
            currentSection = sectionPositions[sectionPositions.length - 1]?.id;
        } 
        // Normal case - find the section we're currently in
        else {
            for (const section of sectionPositions) {
                if (scrollPosition >= section.top && scrollPosition < section.bottom) {
                    currentSection = section.id;
                    break;
                }
            }
        }
        
        // Update active class if we found a current section
        if (currentSection) {
            document.querySelectorAll('.nav-links a').forEach(navLink => {
                navLink.classList.remove('active');
                if (navLink.getAttribute('href') === `#${currentSection}`) {
                    navLink.classList.add('active');
                }
            });
        }
    };

    // Debounce scroll handler for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            scrollHandler();
            // Check skill bars and reveal elements regardless of nav lock
            checkSkillBarsVisibility();
            revealOnScroll();
        }, 50);
    });
    
    // Initialize the active nav link and elements
    scrollHandler();
    checkSkillBarsVisibility();
    revealOnScroll();

    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-controls .dot');
    let currentTestimonial = 0;
    const testimonialInterval = 6000; // 6 seconds

    function changeTestimonial(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        currentTestimonial = (n + testimonialSlides.length) % testimonialSlides.length;
        
        testimonialSlides[currentTestimonial].classList.add('active');
        testimonialDots[currentTestimonial].classList.add('active');
    }

    // Initialize the testimonial slider
    changeTestimonial(0);

    // Auto slide testimonials
    let testimonialTimer = setInterval(() => {
        changeTestimonial(currentTestimonial + 1);
    }, testimonialInterval);

    // Manual testimonial control with dots
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(testimonialTimer);
            changeTestimonial(index);
            
            // Restart auto slide
            testimonialTimer = setInterval(() => {
                changeTestimonial(currentTestimonial + 1);
            }, testimonialInterval);
        });
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    let animationInitialized = false;

    function initializeSkillBars() {
        if (animationInitialized) return;
        
        const skillPercentages = [
            '95%', // HTML5
            '90%', // CSS
            '85%', // JavaScript
            '80%', // Bootstrap
            '75%', // React
            '80%', // Node.js
            '75%', // Express.js
            '70%', // MongoDB
            '85%', // GitHub
            '80%', // Git
            '75%'  // Command Line
        ];
        
        // First set all skill bars to zero width
        skillBars.forEach(bar => {
            bar.style.width = '0';
        });
        
        // Then animate each one to its target percentage with delay
        setTimeout(() => {
            skillBars.forEach((bar, index) => {
                if (index < skillPercentages.length) {
                    setTimeout(() => {
                        bar.style.width = skillPercentages[index];
                    }, index * 100);
                }
            });
            animationInitialized = true;
        }, 500);
    }

    function checkSkillBarsVisibility() {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;
        
        const sectionTop = skillsSection.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 200) {
            initializeSkillBars();
        }
    }

    // Add scroll reveal animations
    const revealElements = document.querySelectorAll('.project-card, .skill-category, .about-text, .about-education');

    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    }

    // Add CSS for reveal animation
    const style = document.createElement('style');
    style.textContent = `
        .project-card, .skill-category, .about-text, .about-education {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .project-card.revealed, .skill-category.revealed, .about-text.revealed, .about-education.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Add delay to stagger animations
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });

    document.querySelectorAll('.skill-category').forEach((category, index) => {
        category.style.transitionDelay = `${index * 0.2}s`;
    });

    // Initialize typewriter effect for hero heading
    initializeTypewriter();

    // Add Matrix-like digital rain animation to about section
    addMatrixBackground();
});

// Initialize the animated background
function initAnimatedBackground() {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Frame counter for performance optimization
    let frameCount = 0;
    let lastGridOpacity = null;
    
    // Configuration
    const config = {
        particleCount: Math.min(150, Math.floor((width * height) / 12000)),
        particleColor: 'rgba(0, 216, 255, 0.9)',
        secondaryColor: 'rgba(0, 255, 163, 0.9)',
        accentColor: 'rgba(255, 0, 122, 0.9)',
        lineColor: 'rgba(0, 255, 163, 0.5)',
        particleRadius: 2.5,
        lineWidth: 1.8,
        lineLength: 200,
        particleLife: 10,
        particleSpeed: 0.4,
        glowEffect: true,
        pulseEffect: true,
        gridLines: true,
        gridSize: 70,
        gridOpacity: 0.15,
        interactiveParticles: true
    };
    
    // Mouse position
    let mouseX = width / 2;
    let mouseY = height / 2;
    let mousePressed = false;
    
    // Listen for mouse events for particle interaction
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    document.addEventListener('mousedown', function() {
        mousePressed = true;
    });
    
    document.addEventListener('mouseup', function() {
        mousePressed = false;
    });
    
    // Add touch support for mobile
    document.addEventListener('touchmove', function(e) {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    }, { passive: true });
    
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
            mousePressed = true;
        }
    }, { passive: true });
    
    document.addEventListener('touchend', function() {
        mousePressed = false;
    }, { passive: true });
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            
            // Set velocity with slight randomization
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * config.particleSpeed;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            
            // Set radius with slight variation
            this.radius = config.particleRadius * (0.8 + Math.random() * 0.4);
            this.currentRadius = this.radius;
            this.life = Math.random() * 200 + 100; // Particle lifespan
            
            // Randomly select a color from the options
            const colorChoice = Math.random();
            if (colorChoice < 0.6) {
                this.color = config.particleColor;
            } else if (colorChoice < 0.9) {
                this.color = config.secondaryColor;
            } else {
                this.color = config.accentColor;
            }
            
            // Parameters for pulse effect
            this.pulseTime = Math.random() * Math.PI * 2; // Random starting phase
        }
        
        update() {
            if (this.life > 0) {
                // Calculate distance to mouse only if we're in interactive mode
                if (config.interactiveParticles) {
                    const dx = mouseX - this.x;
                    const dy = mouseY - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    // Only apply mouse influence if we're within range
                    const influenceRange = 150;
                    
                    if ((mousePressed && dist < influenceRange * 2) || 
                        (!mousePressed && dist < influenceRange)) {
                        
                        // If mouse is pressed, attract particles with stronger force
                        if (mousePressed) {
                            const force = (1 - dist / (influenceRange * 2)) * 1.0;
                            this.vx += (dx / dist) * force;
                            this.vy += (dy / dist) * force;
                        } 
                        // Normal cursor influence - repel particles
                        else {
                            const force = (1 - dist / influenceRange) * 0.5;
                            this.vx -= (dx / dist) * force;
                            this.vy -= (dy / dist) * force;
                        }
                    }
                }
                
                // Apply velocity with damping
                this.vx *= 0.95;
                this.vy *= 0.95;
                
                // Limit velocity
                const maxSpeed = 2;
                const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (currentSpeed > maxSpeed) {
                    this.vx = (this.vx / currentSpeed) * maxSpeed;
                    this.vy = (this.vy / currentSpeed) * maxSpeed;
                }
                
                // Add some gentle noise movement
                this.vx += (Math.random() - 0.5) * 0.05;
                this.vy += (Math.random() - 0.5) * 0.05;
                
                // Update position
                this.x += this.vx;
                this.y += this.vy;
                
                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
                
                // Update particle pulse effect
                if (config.pulseEffect) {
                    this.pulseTime += 0.03;
                    this.currentRadius = this.radius * (1 + Math.sin(this.pulseTime) * 0.2);
                }
                
                this.life--;
            } else {
                // Reset the particle when its lifetime ends
                this.reset();
            }
        }
        
        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
            
            if (config.glowEffect) {
                // Enhanced glow effect with larger radius
                const glowSize = this.currentRadius * 5;
                const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowSize);
                
                // Extract the base color to create a more intense center
                const baseColor = this.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+)/);
                if (baseColor) {
                    // Create more intense center point
                    const intenseCenterColor = `rgba(${baseColor[1]}, ${baseColor[2]}, ${baseColor[3]}, 1.0)`;
                    grd.addColorStop(0, intenseCenterColor);
                    grd.addColorStop(0.2, this.color);
                    grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
                } else {
                    grd.addColorStop(0, this.color);
                    grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
                }
                
                ctx.fillStyle = grd;
            } else {
                ctx.fillStyle = this.color;
            }
            
            ctx.fill();
        }
    }
    
    // Create particles
    let particles = [];
    function initParticles() {
        particles = [];
        // Adjust particle count based on screen size
        const count = Math.min(config.particleCount, Math.floor((width * height) / 10000));
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    
    // Draw lines between particles
    function drawLines(ctx) {
        // Set a maximum number of connections to render to maintain performance
        const maxConnections = 1500;
        let connectionCount = 0;
        
        for (let i = 0; i < particles.length && connectionCount < maxConnections; i++) {
            // For each particle, only check a limited number of neighbors
            const checkAhead = Math.min(10, particles.length - i - 1);
            for (let j = i + 1; j <= i + checkAhead && connectionCount < maxConnections; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < config.lineLength) {
                    const opacity = 1 - (dist / config.lineLength);
                    // Use line color from config with adjusted opacity
                    const color = config.lineColor.replace(/[\d\.]+\)$/, (opacity * 0.6) + ')');
                    ctx.strokeStyle = color;
                    ctx.lineWidth = config.lineWidth * (1 - 0.6 * (dist / config.lineLength));
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    connectionCount++;
                }
            }
        }
    }
    
    // Draw grid lines in background with optimizations
    function drawGrid(ctx) {
        // Only redraw grid every few frames for performance
        if (frameCount % 5 !== 0 && lastGridOpacity) {
            return; // Skip grid drawing on some frames
        }
        
        const time = Date.now() * 0.001;
        const pulseIntensity = (Math.sin(time * 0.5) * 0.4 + 0.8);
        
        // Cache the current opacity to use between updates
        lastGridOpacity = config.gridOpacity * pulseIntensity;
        
        // Set grid opacity with pulse effect
        ctx.strokeStyle = `rgba(0, 216, 255, ${lastGridOpacity})`;
        ctx.lineWidth = 0.4;
        
        // Draw fewer grid lines on mobile devices
        const gridStep = width < 768 ? config.gridSize * 2 : config.gridSize;
        
        // Draw vertical lines
        for (let x = 0; x < width; x += gridStep) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // Draw horizontal lines
        for (let y = 0; y < height; y += gridStep) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Draw highlights only on larger screens
        if (width >= 768) {
            ctx.fillStyle = `rgba(0, 216, 255, ${lastGridOpacity * 2.0})`;
            for (let x = 0; x < width; x += gridStep) {
                for (let y = 0; y < height; y += gridStep) {
                    ctx.beginPath();
                    ctx.arc(x, y, 1.0, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        // Make sure the canvas is still in the document
        if (!document.body.contains(canvas)) {
            return;
        }
        
        // Increment frame counter
        frameCount++;
        
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid if enabled
        if (config.gridLines) {
            drawGrid(ctx);
        }
        
        // Update and draw particles
        for (let particle of particles) {
            particle.update();
            particle.draw(ctx);
        }
        
        // Draw connecting lines
        drawLines(ctx);
        
        requestAnimationFrame(animate);
    }
    
    // Handle resize
    window.addEventListener('resize', function() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    });
    
    // Initialize and start animation
    initParticles();
    animate();
}

// Initialize typewriter effect for hero heading
function initializeTypewriter() {
    const heroHeading = document.querySelector('.hero-content h1');
    if (!heroHeading) return;
    
    // Set heading text directly
    if (!heroHeading.textContent.includes("Shantanu Dwivedi")) {
        heroHeading.textContent = "Hi there, I'm Shantanu Dwivedi";
    }
}

// Add Matrix-like digital rain animation to about section
function addMatrixBackground() {
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-bg';
    document.body.appendChild(canvas);
    
    const style = document.createElement('style');
    style.textContent = `
        .matrix-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            opacity: 0.05;
        }
    `;
    document.head.appendChild(style);
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Characters to display
    const characters = '01';
    const fontSize = 14;
    const columns = width / fontSize;
    
    // Array to track the y-coordinate of each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    // Function to draw the matrix effect
    function draw() {
        // Set a semi-transparent black background to create trails
        ctx.fillStyle = 'rgba(18, 18, 18, 0.05)';
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = '#00D8FF';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            // Get a random character
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            
            // Draw the character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Randomly reset a column to the top after it has fallen enough
            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move the drop down
            drops[i]++;
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
    
    // Run the animation
    setInterval(draw, 50);
} 