// ===== DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== Initialize Application =====
function initializeApp() {
    initThemeToggle();
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initProgressBar();
    initBackToTop();
    initPublicationSearch();
    initPublicationFilter();
    initContactForm();
    initSidebarToggle();
    initNavigationActive();
    initAnimations();
    initAccessibility();
    initAnalytics();
}

// ===== Theme Toggle =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.className = savedTheme + '-theme';
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.className.includes('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.className = newTheme + '-theme';
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);

        // Add animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');

        // Update aria-expanded for accessibility
        const isExpanded = navMenu.classList.contains('active');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when clicking on links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active navigation
                updateActiveNavigation(targetId);
            }
        });
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.research-card, .publication-item, .project-card, .course-item, .award-item, .blog-card');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== Progress Bar =====
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;

        progressBar.style.width = scrolled + '%';

        // Header scroll effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active navigation based on scroll position
        updateNavigationOnScroll();
    });
}

// ===== Back to Top Button =====
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Publication Search =====
function initPublicationSearch() {
    const searchInput = document.getElementById('publicationSearch');
    const publicationItems = document.querySelectorAll('.publication-item');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        publicationItems.forEach(item => {
            const title = item.querySelector('.publication-title').textContent.toLowerCase();
            const authors = item.querySelector('.publication-authors').textContent.toLowerCase();
            const abstract = item.querySelector('.publication-abstract').textContent.toLowerCase();

            const isVisible = title.includes(searchTerm) ||
                            authors.includes(searchTerm) ||
                            abstract.includes(searchTerm);

            item.style.display = isVisible ? 'grid' : 'none';
        });
    });
}

// ===== Publication Filter =====
function initPublicationFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publicationItems = document.querySelectorAll('.publication-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter publications
            publicationItems.forEach(item => {
                const type = item.dataset.type;
                const isVisible = filter === 'all' || type === filter;
                item.style.display = isVisible ? 'grid' : 'none';
            });
        });
    });
}

// ===== Contact Form =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Validate form
            if (validateContactForm(data)) {
                // Simulate form submission
                showNotification('Thank you for your message! I will get back to you soon.', 'success');
                contactForm.reset();
            }
        });
    }
}

function validateContactForm(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long.');
    }

    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address.');
    }

    if (!data.subject || data.subject.trim().length < 3) {
        errors.push('Subject must be at least 3 characters long.');
    }

    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long.');
    }

    if (errors.length > 0) {
        showNotification(errors.join(' '), 'error');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== Sidebar Toggle =====
function initSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    let sidebarTimer;

    // Show sidebar after initial delay
    setTimeout(() => {
        sidebar.classList.add('visible');
    }, 2000);

    // Hide sidebar on inactivity
    document.addEventListener('mousemove', () => {
        sidebar.classList.add('visible');

        clearTimeout(sidebarTimer);
        sidebarTimer = setTimeout(() => {
            if (window.scrollY > 500) {
                sidebar.classList.remove('visible');
            }
        }, 5000);
    });
}

// ===== Navigation Active State =====
function initNavigationActive() {
    updateActiveNavigation();
    window.addEventListener('scroll', () => updateNavigationOnScroll());
}

function updateNavigationOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            updateActiveNavigation(sectionId);
        }
    });
}

function updateActiveNavigation(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkId = link.getAttribute('href').substring(1);
        if (linkId === activeId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== Animations =====
function initAnimations() {
    // Animated typing effect for hero title
    const heroTitle = document.querySelector('.name');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';

        let index = 0;
        const typeWriter = () => {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        };

        setTimeout(typeWriter, 1000);
    }

    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // Counter animation for statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => statsObserver.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = element.textContent.includes('$') ?
            `$${Math.floor(current)}M+` : `${Math.floor(current)}+`;
    }, 16);
}

// ===== Accessibility =====
function initAccessibility() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Tab key navigation
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // ARIA live regions for notifications
    createAriaLiveRegion();

    // Focus trap for mobile menu
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    mobileMenuToggle.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            trapFocus(navMenu);
        } else {
            removeFocusTrap();
        }
    });
}

function createAriaLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    document.body.appendChild(liveRegion);
}

function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="email"], input[type="tel"], input[type="submit"], [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });

    firstFocusableElement.focus();
}

function removeFocusTrap() {
    // Implementation for removing focus trap
}

// ===== Analytics =====
function initAnalytics() {
    // Track page views
    trackPageView();

    // Track scroll depth
    initScrollTracking();

    // Track external link clicks
    initExternalLinkTracking();

    // Track publication downloads
    initPublicationTracking();
}

function trackPageView() {
    // Simple analytics tracking
    console.log('Page view tracked:', window.location.pathname);
}

function initScrollTracking() {
    const scrollThresholds = [25, 50, 75, 100];
    const trackedThresholds = new Set();

    window.addEventListener('scroll', () => {
        const scrollDepth = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);

        scrollThresholds.forEach(threshold => {
            if (scrollDepth >= threshold && !trackedThresholds.has(threshold)) {
                trackedThresholds.add(threshold);
                console.log(`Scroll depth tracked: ${threshold}%`);
            }
        });
    });
}

function initExternalLinkTracking() {
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');

    externalLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('External link clicked:', link.href);
        });
    });
}

function initPublicationTracking() {
    const publicationLinks = document.querySelectorAll('.publication-link');

    publicationLinks.forEach(link => {
        link.addEventListener('click', () => {
            const publicationTitle = link.closest('.publication-item').querySelector('.publication-title').textContent;
            console.log('Publication link clicked:', publicationTitle, '-', link.textContent);
        });
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        backgroundColor: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3',
        color: 'white',
        borderRadius: '5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: '10000',
        maxWidth: '300px',
        wordWrap: 'break-word',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ===== Performance Optimization =====
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

// Initialize image optimization
document.addEventListener('DOMContentLoaded', optimizeImages);

// ===== Error Handling =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// ===== Service Worker Registration =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// ===== Utility Functions =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Scroll-related operations
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

// ===== Feature Detection =====
function checkFeatures() {
    const features = {
        intersectionObserver: 'IntersectionObserver' in window,
        localStorage: 'localStorage' in window,
        serviceWorker: 'serviceWorker' in navigator,
        webp: checkWebPSupport()
    };

    console.log('Feature support:', features);
    return features;
}

function checkWebPSupport() {
    return new Promise(resolve => {
        const webP = new Image();
        webP.onload = webP.onerror = () => {
            resolve(webP.height === 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
}

// Initialize feature detection
checkFeatures();