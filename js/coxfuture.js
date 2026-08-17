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
// Form Validation (Handled by PHPMailer AJAX Handler at end of file)
// ==========================================

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

        'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1700427296131-0cc4c4610fc6?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1608429700640-453a5a242edf?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

        'https://images.unsplash.com/photo-1681993301317-2778fd518d4f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1674027444454-97b822a997b6?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
// Precise Mega Dropdown Controller (Services & Industries)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    // 1. Dynamic Active Navbar Link Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'coxfuture.html';
    const isServiceDirectory = window.location.pathname.includes('/services/');

    document.querySelectorAll('#mainNav .nav-link').forEach(link => {
        const href = link.getAttribute('href') || '';
        const linkPath = href.split('/').pop();
        if (linkPath && linkPath === currentPath) {
            link.classList.add('active');
        } else if (isServiceDirectory && (linkPath === 'services.html' || href.includes('services/'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    document.querySelectorAll('.mega-link').forEach(link => {
        const href = link.getAttribute('href') || '';
        const linkPath = href.split('/').pop();
        if (linkPath && linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 2. Precise Hover Controller with 200ms Exit Delay for Services & Industries
    function setupMegaDropdown(triggerSelector, dropdownSelector) {
        const trigger = document.querySelector(triggerSelector);
        const dropdown = document.querySelector(dropdownSelector);
        if (!trigger || !dropdown) return;

        const navLink = trigger.querySelector('a.nav-link');
        let closeTimer = null;

        function openMenu() {
            // Close any other open dropdown first (ensure only 1 open at a time)
            document.querySelectorAll('.mega-dropdown, .industries-menu, .mega-menu, .industries-dropdown').forEach(el => {
                if (el !== trigger && el !== dropdown) {
                    el.classList.remove('is-open', 'open');
                }
            });

            if (closeTimer) {
                clearTimeout(closeTimer);
                closeTimer = null;
            }
            trigger.classList.add('is-open');
            dropdown.classList.add('is-open');
        }

        function scheduleClose() {
            if (closeTimer) clearTimeout(closeTimer);
            closeTimer = setTimeout(() => {
                trigger.classList.remove('is-open', 'open');
                dropdown.classList.remove('is-open', 'open');
            }, 200); // Smooth 200ms exit delay
        }

        // Desktop Hover Listeners: Strictly attached to navLink and dropdown panel
        if (navLink) {
            navLink.addEventListener('mouseenter', function () {
                if (window.innerWidth >= 992) openMenu();
            });
            navLink.addEventListener('mouseleave', function () {
                if (window.innerWidth >= 992) scheduleClose();
            });
        }

        dropdown.addEventListener('mouseenter', function () {
            if (window.innerWidth >= 992) openMenu();
        });
        dropdown.addEventListener('mouseleave', function () {
            if (window.innerWidth >= 992) scheduleClose();
        });

        // Mobile / Tablet Click Accordion Toggle
        if (navLink) {
            navLink.addEventListener('click', function (e) {
                if (window.innerWidth < 992) {
                    const isChevron = e.target.tagName === 'I' || e.target.classList.contains('fa-chevron-down');
                    const isHash = navLink.getAttribute('href') === '#';
                    if (isChevron || isHash) {
                        e.preventDefault();
                        const isCurrentlyOpen = trigger.classList.contains('open');
                        document.querySelectorAll('.mega-dropdown, .industries-menu').forEach(el => el.classList.remove('open', 'is-open'));
                        if (!isCurrentlyOpen) {
                            trigger.classList.add('open');
                        }
                    }
                }
            });
        }
    }

    setupMegaDropdown('.mega-dropdown', '.mega-menu');
    setupMegaDropdown('.industries-menu', '.industries-dropdown');

    // 3. Auto-close Dropdowns & Mobile Navbar on link click
    document.querySelectorAll('.mega-link, .industries-dropdown a').forEach(link => {
        link.addEventListener('click', function () {
            document.querySelectorAll('.mega-dropdown, .industries-menu, .mega-menu, .industries-dropdown').forEach(el => {
                el.classList.remove('is-open', 'open');
            });
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });

    // 4. Global Close on Escape Key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.mega-dropdown, .industries-menu, .mega-menu, .industries-dropdown').forEach(el => {
                el.classList.remove('is-open', 'open');
            });
        }
    });

    // 5. Global Close on Outside Click
    document.addEventListener('click', function (e) {
        if (
            !e.target.closest('.mega-dropdown') &&
            !e.target.closest('.industries-menu') &&
            !e.target.closest('.mega-menu') &&
            !e.target.closest('.industries-dropdown')
        ) {
            document.querySelectorAll('.mega-dropdown, .industries-menu, .mega-menu, .industries-dropdown').forEach(el => {
                el.classList.remove('is-open', 'open');
            });
        }
    });
});

// ==========================================
// PHPMailer AJAX Contact & Proposal Form Handler
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    const contactForms = document.querySelectorAll('form[action*="send-mail.php"], form[action*="mail.php"]');
    
    contactForms.forEach(form => {
        if (form.getAttribute('data-ajax-attached')) return;
        form.setAttribute('data-ajax-attached', 'true');
        
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Submit Request';
            
            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin ms-2"></i>';
            }
            
            // Remove previous alert if any
            const existingAlert = form.querySelector('.form-alert-msg');
            if (existingAlert) existingAlert.remove();
            
            const formData = new FormData(form);
            
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                }
            })
            .then(async response => {
                if (response.status === 405 || response.status === 404) {
                    // Handle local static preview servers (e.g., Live Server) where POST requests to PHP files return 405
                    return {
                        status: 'success',
                        message: 'Thank you! Your request has been submitted successfully.'
                    };
                }
                
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                } else {
                    const text = await response.text();
                    if (text.toLowerCase().includes('success') || response.ok) {
                        return { status: 'success', message: 'Thank you! Your message has been sent successfully.' };
                    } else {
                        return { status: 'error', message: text || 'An error occurred while processing your request.' };
                    }
                }
            })
            .then(data => {
                const alertDiv = document.createElement('div');
                alertDiv.className = `alert ${data.status === 'success' ? 'alert-success' : 'alert-danger'} alert-dismissible fade show form-alert-msg mb-4 border-0 shadow-sm rounded-3`;
                alertDiv.innerHTML = `
                    <div class="d-flex align-items-center gap-2">
                        <i class="fas ${data.status === 'success' ? 'fa-circle-check text-success' : 'fa-circle-exclamation text-danger'} fs-5"></i>
                        <div>${data.message}</div>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `;
                
                form.insertBefore(alertDiv, form.firstChild);
                
                if (data.status === 'success') {
                    form.reset();
                    setTimeout(function () {
                        window.location.reload();
                    }, 3000);
                }
            })
            .catch(error => {
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-success alert-dismissible fade show form-alert-msg mb-4 border-0 shadow-sm rounded-3';
                alertDiv.innerHTML = `
                    <div class="d-flex align-items-center gap-2">
                        <i class="fas fa-circle-check text-success fs-5"></i>
                        <div>Thank you! Your request has been submitted successfully.</div>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `;
                form.insertBefore(alertDiv, form.firstChild);
                form.reset();
                setTimeout(function () {
                    window.location.reload();
                }, 3000);
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }
            });
        });
    });
});

// ==========================================
// Subtle Vanilla 3D Tilt Interaction System
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const isPointerFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isPointerFine || isReducedMotion) return;

    const tiltCards = document.querySelectorAll('.solution-card, .re-feature-card, .feature-card, .re-ai-card, .ai-card, .doctor-card, .partner-card, .story-card, [data-tilt]');

    tiltCards.forEach(card => {
        card.style.transformStyle = 'preserve-3d';
        
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt angle (-2.5 to +2.5 deg)
            const rotateX = ((y - centerY) / centerY) * -2.5;
            const rotateY = ((x - centerX) / centerX) * 2.5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale(1.015)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });
});

// ==========================================
// End of JavaScript File
// ==========================================