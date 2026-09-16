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

// True when the visitor has asked the OS for reduced motion
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Reveal every animated element immediately. Used as the fallback whenever
// the scroll animation cannot run, so content is never left invisible.
function revealAll() {
    document.querySelectorAll('.animate-fade-in').forEach(el => el.classList.add('visible'));
}

// Scroll-triggered animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-fade-in');
    if (!elements.length) return;

    // No observer support, or the visitor prefers reduced motion: show everything.
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
        revealAll();
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(el => observer.observe(el));

    // Safety net: if the observer has not reported anything shortly after load
    // (a backgrounded tab throttles its callbacks), reveal the page anyway.
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (!document.querySelector('.animate-fade-in.visible')) revealAll();
        }, 1200);
    });
}

// Animated statistics counters
function initStatsCounters() {
    const counters = document.querySelectorAll('.stats-counter');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
        counters.forEach(c => {
            c.textContent = c.getAttribute('data-target');
        });
        return;
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'), 10);
                counterObserver.unobserve(counter);
                if (Number.isNaN(target)) return;
                animateCounter(counter, target);
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

    if (!videoItems.length || !mainVideo) return;

    function selectVideo(item) {
        // Move the active state to the chosen item
        videoItems.forEach(v => {
            v.classList.remove('active');
            v.setAttribute('aria-selected', 'false');
        });
        item.classList.add('active');
        item.setAttribute('aria-selected', 'true');

        const videoId = item.getAttribute('data-video');
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');

        mainVideo.src = `https://www.youtube-nocookie.com/embed/${videoId}`;
        mainVideo.title = title;

        if (!videoTitle || !videoDescription) return;

        if (prefersReducedMotion() || typeof anime === 'undefined') {
            videoTitle.textContent = title;
            videoDescription.textContent = description;
            return;
        }

        // Cross-fade the caption
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
    }

    videoItems.forEach(item => {
        item.addEventListener('click', function() {
            selectVideo(this);
        });
        // Keyboard support: the playlist items behave like a tab list
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectVideo(this);
            }
        });
    });
}

// Achievements slider
function initAchievementsSlider() {
    if (typeof Splide === 'undefined') return;
    if (document.getElementById('achievements-slider')) {
        new Splide('#achievements-slider', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: !prefersReducedMotion(),
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
    // The particles are pure decoration: skip them entirely when the visitor
    // prefers reduced motion, or when p5 failed to load from the CDN.
    if (prefersReducedMotion() || typeof p5 === 'undefined') return;

    // Create p5.js sketch for particles
    const sketch = (p) => {
        let particles = [];
        // Fewer particles on phones, where the battery cost matters most
        const numParticles = window.innerWidth < 768 ? 25 : 50;

        p.setup = function() {
            const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
            canvas.parent('particles');
            p.frameRate(30);

            // Create particles
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle(p));
            }
        };

        p.draw = function() {
            // Stop burning frames while the tab is in the background
            if (document.hidden) return;

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
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    if (!mobileMenuButton) return;

    mobileMenuButton.addEventListener('click', function() {
        // Create mobile menu if it doesn't exist
        if (!document.querySelector('.mobile-menu')) {
            createMobileMenu();
        }

        const menu = document.querySelector('.mobile-menu');
        const nowHidden = menu.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', String(!nowHidden));
    });
}

function createMobileMenu() {
    const nav = document.querySelector('nav');
    const pages = [
        { href: 'index.html', label: 'Home' },
        { href: 'about.html', label: 'About' },
        { href: 'achievements.html', label: 'Achievements' },
        { href: 'contact.html', label: 'Contact' }
    ];

    // Mark the page we are actually on, rather than always highlighting Home
    let current = window.location.pathname.split('/').pop();
    if (!current) current = 'index.html';

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu hidden md:hidden bg-white border-t border-orange-200';
    mobileMenu.id = 'mobile-menu';

    const inner = document.createElement('div');
    inner.className = 'px-4 py-2 space-y-1';

    pages.forEach(page => {
        const link = document.createElement('a');
        link.href = page.href;
        link.textContent = page.label;
        const isCurrent = page.href === current;
        link.className = isCurrent
            ? 'block px-3 py-2 text-orange-600 font-medium'
            : 'block px-3 py-2 text-gray-700 hover:text-orange-600';
        if (isCurrent) link.setAttribute('aria-current', 'page');
        inner.appendChild(link);
    });

    mobileMenu.appendChild(inner);
    nav.appendChild(mobileMenu);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: prefersReducedMotion() ? 'auto' : 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    if (prefersReducedMotion() || typeof anime === 'undefined') return;

    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    anime({
        targets: '.hero-section h1',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 500
    });

    anime({
        targets: '.hero-section p',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo',
        delay: 800
    });

    anime({
        targets: '.hero-section .hero-actions',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutExpo',
        delay: 1100
    });
});

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
        const button = document.querySelector('.mobile-menu-button');
        if (button) button.setAttribute('aria-expanded', 'false');
    }
}, 250));

// Add CSS custom properties for dynamic theming
document.documentElement.style.setProperty('--primary-color', '#D2691E');
document.documentElement.style.setProperty('--secondary-color', '#2F4F4F');
document.documentElement.style.setProperty('--accent-color', '#FFB347');
document.documentElement.style.setProperty('--neutral-color', '#FDF5E6');
document.documentElement.style.setProperty('--text-color', '#36454F');
