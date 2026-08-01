/* ==========================================
   CoxFuture - Modern IT Solutions Website
   JavaScript for Interactions & Animations
   ========================================== */

// ==========================================
// Theme Toggle Functionality
// ==========================================
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

document.addEventListener("keydown", function (e) {
    if (e.key === "F12") {
        e.preventDefault();
    }
});

document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
    }
});

document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
    }
});

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

// Theme toggle event
themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Add rotation animation
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// ==========================================
// Unified Scroll Handlers & Listeners (Optimized)
// ==========================================
const navbar = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const heroSection = document.querySelector('.hero-section');
const parallaxElements = document.querySelectorAll('.hero-shapes .shape');
const timelineItems = document.querySelectorAll('.timeline-item');

const handleNavbarScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};



const handleScrollTopBtn = () => {
    if (!scrollTopBtn) return;
    if ((window.pageYOffset || document.documentElement.scrollTop) > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
};

const handleParallax = () => {
    if (!heroSection || !parallaxElements.length) return;
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    parallaxElements.forEach((el, index) => {
        const speed = 0.3 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
};

const revealTimeline = () => {
    if (!timelineItems.length) return;
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        if (itemTop < triggerPoint) {
            item.classList.add('show');
        }
    });
};

// Single throttled scroll event listener
const onScroll = () => {
    handleNavbarScroll();
    handleScrollTopBtn();
    handleParallax();
    revealTimeline();
};

// Initial triggers
handleNavbarScroll();
revealTimeline();

const throttledScroll = throttle(onScroll, 50);
window.addEventListener('scroll', throttledScroll);

// ==========================================
// Smooth Scroll Navigation
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        }
    });
});

// ==========================================
// Active Navigation Link on Scroll (Moved to unified handler)
// ==========================================

// ==========================================
// Scroll Reveal Animation (Intersection Observer)
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Optional: unobserve after revealing to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with scroll-reveal class
const revealElements = document.querySelectorAll('.scroll-reveal');
revealElements.forEach(el => observer.observe(el));

// ==========================================
// Animated Number Counters
// ==========================================
const counters = document.querySelectorAll('.counter');
let counterAnimated = false;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;

            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
};

// Trigger counter animation when hero stats are visible
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                animateCounters();
                counterAnimated = true;
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counterObserver.observe(heroStats);
}

// ==========================================
// Particles Animation
// ==========================================
const particlesContainer = document.getElementById('particles');

if (particlesContainer) {
    const createParticles = () => {
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 6 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(0, 212, 255, ${Math.random() * 0.5 + 0.2})`;
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.pointerEvents = 'none';

            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;

            particle.style.animation = `particleFloat ${duration}s ${delay}s infinite ease-in-out`;

            particlesContainer.appendChild(particle);
        }
    };

    createParticles();

    // Add particle animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translate(0, 0);
                opacity: 0;
            }
            10%, 90% {
                opacity: 1;
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// Typing Text Effect for Hero
// ==========================================
const typingText = document.querySelector('.typing-text');

if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    typingText.style.borderRight = '3px solid';
    typingText.style.paddingRight = '5px';

    let charIndex = 0;

    const typeWriter = () => {
        if (charIndex < text.length) {
            typingText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                typingText.style.borderRight = 'none';
            }, 500);
        }
    };

    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
}

// ==========================================
// Form Validation
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const service = document.getElementById('service');
        const message = document.getElementById('message');

        let isValid = true;

        // Reset previous error states
        contactForm.querySelectorAll('.form-control').forEach(field => {
            field.style.borderColor = '';
        });

        // Validate name
        if (!name.value.trim()) {
            name.style.borderColor = '#ef4444';
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            email.style.borderColor = '#ef4444';
            isValid = false;
        }

        // Validate service selection
        if (!service.value) {
            service.style.borderColor = '#ef4444';
            isValid = false;
        }

        // Validate message
        if (!message.value.trim()) {
            message.style.borderColor = '#ef4444';
            isValid = false;
        }

        if (isValid) {

            const submitBtn = contactForm.querySelector('button[type="submit"]');

            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';

            fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm)
            })
                .then(response => response.text())
                .then(data => {
                    if (data.trim() === "success") {

                        showNotification(
                            "Thank you! Your message has been sent successfully.",
                            "success"
                        );

                        contactForm.reset();

                    } else {

                        showNotification(
                            "Unable to send your message.",
                            "error"
                        );

                    }

                })
                .catch(() => {

                    showNotification(
                        "Server Error. Please try again.",
                        "error"
                    );

                })
                .finally(() => {

                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `
            <span>Send Message</span>
            <i class="fas fa-paper-plane"></i>
        `;

                });

        }
    });
}

// Newsletter form validation
const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailInput && emailInput.value.trim() && emailRegex.test(emailInput.value)) {
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            form.reset();
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
});

// ==========================================
// Notification System
// ==========================================
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

    document.body.appendChild(notification);

    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 30px;
            background: white;
            padding: 20px 25px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 400px;
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification.success {
            border-left: 4px solid #10b981;
        }

        .notification.error {
            border-left: 4px solid #ef4444;
        }

        .notification i:first-child {
            font-size: 24px;
        }

        .notification.success i:first-child {
            color: #10b981;
        }

        .notification.error i:first-child {
            color: #ef4444;
        }

        .notification span {
            color: #1a202c;
            font-size: 14px;
            font-weight: 500;
            flex: 1;
        }

        .notification-close {
            background: none;
            border: none;
            color: #718096;
            cursor: pointer;
            padding: 0;
            font-size: 16px;
            transition: color 0.2s ease;
        }

        .notification-close:hover {
            color: #1a202c;
        }

        @media (max-width: 767px) {
            .notification {
                right: 15px;
                left: 15px;
                max-width: none;
            }
        }
    `;

    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });

    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ==========================================
// Scroll to Top Button Click Listener
// ==========================================
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// Responsive Mega Menu Click Handlers
// ==========================================
const initResponsiveMegaMenu = () => {
    const servicesToggle = document.querySelector('.mega-dropdown > .nav-link');
    const servicesMenu = document.querySelector('.mega-menu');
    const industriesToggle = document.querySelector('.industries-menu > .nav-link');
    const industriesMenu = document.querySelector('.industries-dropdown');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (!servicesToggle || !servicesMenu || !industriesToggle || !industriesMenu) return;

    // Set accessibility attributes
    servicesToggle.setAttribute('role', 'button');
    servicesToggle.setAttribute('aria-haspopup', 'true');
    servicesToggle.setAttribute('aria-expanded', 'false');

    industriesToggle.setAttribute('role', 'button');
    industriesToggle.setAttribute('aria-haspopup', 'true');
    industriesToggle.setAttribute('aria-expanded', 'false');

    const expandAccordion = (menu, button) => {
        closeAllSubmenus(menu);
        menu.classList.add('show');
        button.setAttribute('aria-expanded', 'true');
        button.classList.add('show');
        const parentItem = button.closest('.nav-item');
        if (parentItem) parentItem.classList.add('show');

        menu.style.maxHeight = '0px';
        menu.offsetHeight; // force reflow
        menu.style.maxHeight = menu.scrollHeight + 'px';

        const onTransitionEnd = (e) => {
            if (e.propertyName === 'max-height') {
                menu.style.maxHeight = 'none';
                menu.removeEventListener('transitionend', onTransitionEnd);
            }
        };
        menu.addEventListener('transitionend', onTransitionEnd);
    };

    const collapseAccordion = (menu, button) => {
        button.setAttribute('aria-expanded', 'false');
        button.classList.remove('show');
        const parentItem = button.closest('.nav-item');
        if (parentItem) parentItem.classList.remove('show');

        menu.style.maxHeight = menu.scrollHeight + 'px';
        menu.offsetHeight; // force reflow
        menu.style.maxHeight = '0px';
        menu.classList.remove('show');
    };

    const closeAllSubmenus = (exceptMenu) => {
        if (servicesMenu.classList.contains('show') && servicesMenu !== exceptMenu) {
            collapseAccordion(servicesMenu, servicesToggle);
        }
        if (industriesMenu.classList.contains('show') && industriesMenu !== exceptMenu) {
            collapseAccordion(industriesMenu, industriesToggle);
        }
    };

    const resetAllSubmenus = () => {
        servicesMenu.style.maxHeight = '0px';
        servicesMenu.classList.remove('show');
        servicesToggle.setAttribute('aria-expanded', 'false');
        servicesToggle.classList.remove('show');
        const servicesParent = servicesToggle.closest('.nav-item');
        if (servicesParent) servicesParent.classList.remove('show');

        industriesMenu.style.maxHeight = '0px';
        industriesMenu.classList.remove('show');
        industriesToggle.setAttribute('aria-expanded', 'false');
        industriesToggle.classList.remove('show');
        const industriesParent = industriesToggle.closest('.nav-item');
        if (industriesParent) industriesParent.classList.remove('show');
    };

    // Services Click
    servicesToggle.addEventListener('click', (e) => {
        if (window.innerWidth < 992) {
            e.preventDefault();
            e.stopPropagation();
            if (servicesMenu.classList.contains('show')) {
                collapseAccordion(servicesMenu, servicesToggle);
            } else {
                expandAccordion(servicesMenu, servicesToggle);
            }
        }
    });

    // Industries Click
    industriesToggle.addEventListener('click', (e) => {
        if (window.innerWidth < 992) {
            e.preventDefault();
            e.stopPropagation();
            if (industriesMenu.classList.contains('show')) {
                collapseAccordion(industriesMenu, industriesToggle);
            } else {
                expandAccordion(industriesMenu, industriesToggle);
            }
        }
    });

    // Handle outside clicks
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 992) {
            const insideToggle = servicesToggle.contains(e.target) || industriesToggle.contains(e.target);
            const insideMenu = servicesMenu.contains(e.target) || industriesMenu.contains(e.target);

            if (!insideToggle && !insideMenu) {
                closeAllSubmenus();
            }
        }
    });

    // Escape Key Closure
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllSubmenus();
        }
    });

    // Reset when mobile menu collapses
    if (navbarCollapse) {
        navbarCollapse.addEventListener('show.bs.collapse', () => {
            document.body.classList.add('navbar-open');
        });
        navbarCollapse.addEventListener('hidden.bs.collapse', () => {
            document.body.classList.remove('navbar-open');
            resetAllSubmenus();
        });
    }

    // Reset inline styles when resizing to desktop
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth >= 992) {
            document.body.classList.remove('navbar-open');
            servicesMenu.style.maxHeight = '';
            industriesMenu.style.maxHeight = '';
            servicesMenu.classList.remove('show');
            industriesMenu.classList.remove('show');
            servicesToggle.setAttribute('aria-expanded', 'false');
            industriesToggle.setAttribute('aria-expanded', 'false');
            const servicesParent = servicesToggle.closest('.nav-item');
            if (servicesParent) servicesParent.classList.remove('show');
            const industriesParent = industriesToggle.closest('.nav-item');
            if (industriesParent) industriesParent.classList.remove('show');
        }
    }, 100));
};

initResponsiveMegaMenu();

// ==========================================
// Mobile Menu Auto Close on Outside Click
// ==========================================
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

document.addEventListener('click', (e) => {
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    }
});

// ==========================================
// Lazy Loading Images
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }

                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// Performance Monitoring
// ==========================================
window.addEventListener('load', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');
});

// ==========================================
// Keyboard Navigation Support
// ==========================================
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
            bsCollapse.hide();
        }
    }

    // Ctrl/Cmd + K for quick actions (placeholder)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
    }
});

// ==========================================
// Testimonials Carousel Auto Play
// ==========================================
const testimonialsCarousel = document.getElementById('testimonialsCarousel');

if (testimonialsCarousel) {
    const carousel = new bootstrap.Carousel(testimonialsCarousel, {
        interval: 4000,
        wrap: true,
        keyboard: true
    });
}

// ==========================================
// Form Input Focus Effects
// ==========================================
const formInputs = document.querySelectorAll('.form-control');

formInputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function () {
        this.parentElement.classList.remove('focused');

        // Add filled class if input has value
        if (this.value.trim() !== '') {
            this.parentElement.classList.add('filled');
        } else {
            this.parentElement.classList.remove('filled');
        }
    });
});

// ==========================================
// Debounce Function for Performance
// ==========================================
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

// ==========================================
// Throttle Function for Scroll Events
// ==========================================
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Throttled scroll is registered above globally.

// ==========================================
// Browser Compatibility Check
// ==========================================
const checkBrowserCompatibility = () => {
    const ua = navigator.userAgent;
    const isIE = ua.indexOf('MSIE') !== -1 || ua.indexOf('Trident/') !== -1;

    if (isIE) {
        console.warn('You are using an outdated browser. Please upgrade for the best experience.');

        // Show notification for IE users
        showNotification('Your browser is outdated. Please upgrade for the best experience.', 'error');
    }
};

checkBrowserCompatibility();

// ==========================================
// Error Handling
// ==========================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // Optional: Send error to analytics or logging service
});

// ==========================================
// Ready State Check
// ==========================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function initializeApp() {

    // Initialize the dynamic hero background banner slideshow
    initHeroBanner();

    // Trigger initial animations
    setTimeout(() => {
        document.body.classList.add('app-ready');
    }, 100);
}

// ==========================================
// Hero Banner Slideshow Functionality
// ==========================================
function initHeroBanner() {
    const bannerContainer = document.getElementById('heroBannerSlides');
    if (!bannerContainer) return;

    // High resolution tech-themed background images from Unsplash
    const images = [

        'https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1661160094555-a798a7df499f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwJTIwaWNvbnN8ZW58MHx8MHx8fDA%3D',
        'https://images.unsplash.com/photo-1694903110330-cc64b7e1d21d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ];

    // Create slide elements dynamically
    images.forEach((url, index) => {
        const slide = document.createElement('div');
        slide.className = `hero-banner-slide${index === 0 ? ' active' : ''}`;
        slide.style.backgroundImage = `url('${url}')`;
        bannerContainer.appendChild(slide);
    });

    const slides = bannerContainer.querySelectorAll('.hero-banner-slide');
    if (slides.length <= 1) return;

    let currentSlide = 0;
    const intervalTime = 6000; // Transition every 6 seconds

    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, intervalTime);
}

// ==========================================
// Service Worker Registration (Optional)
// ==========================================
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker for PWA
}

// ==========================================
// Analytics Tracking (Placeholder)
// ==========================================
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    // Integrate with Google Analytics, Mixpanel, etc.
    /*
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    */
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const btnText = this.textContent.trim();
        trackEvent('Button', 'Click', btnText);
    });
});

// Develpment and planning

// Timeline scroll observer is handled in unified handler.
// Trigger initial check on window load:
window.addEventListener('load', revealTimeline);

// Filter for portfolio

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.portfolio-card').forEach(card => {
            if (filter === 'all' || card.dataset.cat === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

/* ==========================================================
   Career Page JavaScript
   ========================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ==========================================
       1. Current Openings — Job Filtering
       ========================================== */
    const deptButtons = document.querySelectorAll('.dept-filter .dept-btn');
    const jobCards = document.querySelectorAll('.job-card');
    const noJobsMsg = document.querySelector('.no-jobs-msg');

    if (deptButtons.length && jobCards.length) {
        deptButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                // Toggle active state on filter buttons
                deptButtons.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                const category = btn.dataset.category;
                let visibleCount = 0;

                jobCards.forEach(function (card) {
                    const matches = category === 'all' || card.dataset.category === category;
                    card.classList.toggle('hidden', !matches);
                    if (matches) visibleCount++;
                });

                if (noJobsMsg) {
                    noJobsMsg.classList.toggle('d-none', visibleCount !== 0);
                }
            });
        });
    }


    /* ==========================================
       2. Life At CoxFuture — Gallery Lightbox
       ========================================== */
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('galleryLightboxImg');
    const lightboxCaption = document.getElementById('galleryLightboxCaption');
    const lightboxClose = document.getElementById('galleryLightboxClose');
    const lightboxPrev = document.getElementById('galleryPrev');
    const lightboxNext = document.getElementById('galleryNext');
    let currentGalleryIndex = 0;

    function openLightbox(index) {
        if (!lightbox || !galleryItems[index]) return;
        currentGalleryIndex = index;
        const img = galleryItems[index].querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = galleryItems[index].dataset.caption || img.alt;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
    }

    function showNextImage(step) {
        const total = galleryItems.length;
        currentGalleryIndex = (currentGalleryIndex + step + total) % total;
        openLightbox(currentGalleryIndex);
    }

    galleryItems.forEach(function (item, index) {
        item.addEventListener('click', function () {
            openLightbox(index);
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', function () { showNextImage(-1); });
    if (lightboxNext) lightboxNext.addEventListener('click', function () { showNextImage(1); });

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (!lightbox || !lightbox.classList.contains('show')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showNextImage(-1);
        if (e.key === 'ArrowRight') showNextImage(1);
    });

    /* ==========================================
       3. Resume Upload — Show Selected File Name
       ========================================== */
    const resumeInput = document.getElementById('appResume');
    const resumeFileName = document.getElementById('resumeFileName');

    if (resumeInput && resumeFileName) {
        resumeInput.addEventListener('change', function () {
            if (resumeInput.files && resumeInput.files.length > 0) {
                resumeFileName.textContent = resumeInput.files[0].name;
            } else {
                resumeFileName.textContent = 'No file selected';
            }
        });
    }

    /* ==========================================
       4. Career Application Form — Client-Side Validation
       ========================================== */
       console.log("JS Loaded");
    const applicationForm = document.getElementById('careerApplicationForm');

    if (applicationForm) {
        applicationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;

            // Required text/select/file fields
            const requiredFields = applicationForm.querySelectorAll('[required]');
            requiredFields.forEach(function (field) {
                const group = field.closest('.form-group');
                let fieldValid = true;

                if (field.type === 'file') {
                    fieldValid = field.files && field.files.length > 0;
                } else {
                    fieldValid = field.value.trim() !== '';
                }

                if (group) {
                    group.classList.toggle('has-error', !fieldValid);
                }

                if (!fieldValid) isValid = false;
            });

            // Email format check
            const emailField = document.getElementById('appEmail');
            if (emailField && emailField.value.trim() !== '') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const emailGroup = emailField.closest('.form-group');
                if (!emailPattern.test(emailField.value.trim())) {
                    if (emailGroup) emailGroup.classList.add('has-error');
                    isValid = false;
                }
            }

            // Phone format check (digits, spaces, +, -, min 7 digits)
            const phoneField = document.getElementById('appPhone');
            if (phoneField && phoneField.value.trim() !== '') {
                const digitsOnly = phoneField.value.replace(/\D/g, '');
                const phoneGroup = phoneField.closest('.form-group');
                if (digitsOnly.length < 7) {
                    if (phoneGroup) phoneGroup.classList.add('has-error');
                    isValid = false;
                }
            }

            if (!isValid) {
                if (typeof showNotification === 'function') {
                    showNotification('Please fix the highlighted fields before submitting.', 'error');
                }
                const firstError = applicationForm.querySelector('.has-error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            // Simulate successful submission (no backend wired up in this template)
            const submitBtn = applicationForm.querySelector("button[type='submit']");
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML =
                '<span>Submitting...</span> <i class="fas fa-spinner fa-spin"></i>';

            const formData = new FormData(applicationForm);

            fetch(applicationForm.action, {
                method: "POST",
                body: formData
            })
                .then(response => response.text())
                .then(data => {

                    if (data.trim() === "success") {

                        showNotification(
                            "Application submitted successfully!",
                            "success"
                        );

                        applicationForm.reset();

                        if (resumeFileName) {
                            resumeFileName.textContent = "No file selected";
                        }

                        applicationForm.querySelectorAll('.has-error').forEach(group => {
                            group.classList.remove('has-error');
                        });

                    } else {

                        showNotification(data, "error");

                    }

                })
                .catch(error => {

                    console.error(error);

                    showNotification(
                        "Something went wrong. Please try again.",
                        "error"
                    );

                })
                .finally(() => {

                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;

                });
        });

        // Clear error state as the user corrects a field
        applicationForm.querySelectorAll('.form-control').forEach(function (field) {
            field.addEventListener('input', function () {
                const group = field.closest('.form-group');
                if (group) group.classList.remove('has-error');
            });
            field.addEventListener('change', function () {
                const group = field.closest('.form-group');
                if (group) group.classList.remove('has-error');
            });
        });
    }

});



// ==========================================
// End of JavaScript File
// ==========================================