// Main JavaScript for School #37 Website
// Interactive functionality and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initScrollAnimations();
    initStatsCounters();
    initVideoGallery();
    initAchievementsSlider();
    initParticles();
    initMobileMenu();
});

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animation for multiple elements
                const siblings = entry.target.parentElement.querySelectorAll('.animate-fade-in');
                siblings.forEach((sibling, index) => {
                    setTimeout(() => {
                        sibling.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in animation
    document.querySelectorAll('.animate-fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Animated statistics counters
function initStatsCounters() {
    const counters = document.querySelectorAll('.stats-counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

// Video gallery functionality
function initVideoGallery() {
    const videoItems = document.querySelectorAll('.video-item');
    const mainVideo = document.getElementById('main-video');
    const videoTitle = document.getElementById('video-title');
    const videoDescription = document.getElementById('video-description');

    videoItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            videoItems.forEach(v => v.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Update video
            const videoId = this.getAttribute('data-video');
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            
            // Update iframe src
            mainVideo.src = `https://www.youtube.com/embed/${videoId}`;
            
            // Update text content with animation
            anime({
                targets: [videoTitle, videoDescription],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInOutQuad',
                complete: function() {
                    videoTitle.textContent = title;
                    videoDescription.textContent = description;
                    
                    anime({
                        targets: [videoTitle, videoDescription],
                        opacity: [0, 1],
                        duration: 300,
                        easing: 'easeInOutQuad'
                    });
                }
            });
        });
    });
}

// Achievements slider
function initAchievementsSlider() {
    if (document.getElementById('achievements-slider')) {
        new Splide('#achievements-slider', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
                1024: {
                    perPage: 2,
                },
                640: {
                    perPage: 1,
                }
            }
        }).mount();
    }
}

// Particle system for hero section
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // Create p5.js sketch for particles
    const sketch = (p) => {
        let particles = [];
        const numParticles = 50;

        p.setup = function() {
            const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
            canvas.parent('particles');
            
            // Create particles
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle(p));
            }
        };

        p.draw = function() {
            p.clear();
            
            // Update and display particles
            particles.forEach(particle => {
                particle.update();
                particle.display();
            });
        };

        p.windowResized = function() {
            p.resizeCanvas(window.innerWidth, window.innerHeight);
        };

        class Particle {
            constructor(p) {
                this.p = p;
                this.x = p.random(p.width);
                this.y = p.random(p.height);
                this.vx = p.random(-0.5, 0.5);
                this.vy = p.random(-0.5, 0.5);
                this.alpha = p.random(50, 150);
                this.size = p.random(2, 6);
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around edges
                if (this.x < 0) this.x = this.p.width;
                if (this.x > this.p.width) this.x = 0;
                if (this.y < 0) this.y = this.p.height;
                if (this.y > this.p.height) this.y = 0;
            }

            display() {
                this.p.fill(255, 193, 71, this.alpha); // Golden amber color
                this.p.noStroke();
                this.p.ellipse(this.x, this.y, this.size);
            }
        }
    };

    new p5(sketch);
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.md\\:hidden button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                createMobileMenu();
            }
            
            const menu = document.querySelector('.mobile-menu');
            menu.classList.toggle('hidden');
        });
    }
}

function createMobileMenu() {
    const nav = document.querySelector('nav');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu hidden md:hidden bg-white border-t border-orange-200';
    mobileMenu.innerHTML = `
        <div class="px-4 py-2 space-y-1">
            <a href="index.html" class="block px-3 py-2 text-orange-600 font-medium">Home</a>
            <a href="about.html" class="block px-3 py-2 text-gray-700 hover:text-orange-600">About</a>
            <a href="achievements.html" class="block px-3 py-2 text-gray-700 hover:text-orange-600">Achievements</a>
            <a href="contact.html" class="block px-3 py-2 text-gray-700 hover:text-orange-600">Contact</a>
        </div>
    `;
    nav.appendChild(mobileMenu);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    // Animate hero elements
    anime({
        targets: '.hero-gradient h1',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 500
    });

    anime({
        targets: '.hero-gradient p',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo',
        delay: 800
    });

    anime({
        targets: '.hero-gradient .flex',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutExpo',
        delay: 1100
    });
});

// Form validation and submission (for future forms)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });

    return isValid;
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutExpo'
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInExpo',
            complete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 3000);
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Reinitialize components that need resize handling
    if (window.innerWidth >= 768) {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    }
}, 250));

// Add CSS custom properties for dynamic theming
document.documentElement.style.setProperty('--primary-color', '#D2691E');
document.documentElement.style.setProperty('--secondary-color', '#2F4F4F');
document.documentElement.style.setProperty('--accent-color', '#FFB347');
document.documentElement.style.setProperty('--neutral-color', '#FDF5E6');
document.documentElement.style.setProperty('--text-color', '#36454F');