// Main Script for Astro - public/scripts/main.js

class BugoMain {
    constructor() {
        this.header = null;
        this.scrollOffset = 100;
        this.isScrolling = false;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }

        // Also listen for Astro page loads (for SPA navigation)
        document.addEventListener('astro:page-load', () => this.setup());
    }

    setup() {
        console.log('BugoMain setup called');
        
        // Wait a bit for components to render, then setup everything else
        setTimeout(() => {
            this.setupEventListeners();
            this.setupScrollEffects();
            this.setupNavigation();
            
            // Initialize animations if available
            if (window.BugoAnimations) {
                console.log('Initializing BugoAnimations...');
                BugoAnimations.init();
            } else {
                console.warn('BugoAnimations not available');
            }
            
            this.setupUtilities();
        }, 100);
    }

    setupEventListeners() {
        // Header scroll effect
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Smooth scrolling for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                this.smoothScrollTo(e.target.getAttribute('href'));
            }
        });

        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());
        
        // Intersection Observer for performance
        this.setupIntersectionObserver();
    }

    handleScroll() {
        if (!this.isScrolling) {
            requestAnimationFrame(() => {
                this.updateHeader();
                this.updateParallax();
                this.isScrolling = false;
            });
            this.isScrolling = true;
        }
    }

    updateHeader() {
        const header = document.getElementById('header');
        if (!header) return;

        if (window.scrollY > this.scrollOffset) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }

    updateParallax() {
        // Optimized parallax for floating elements
        const scrolled = window.pageYOffset;
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            if (this.isInViewport(element)) {
                const speed = (index + 1) * 0.2;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }

    setupScrollEffects() {
        // Throttled scroll handler for performance
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScrollEffects();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScrollEffects() {
        // Add any additional scroll effects here
        const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        
        // Update any progress indicators
        this.updateScrollProgress(scrollProgress);
    }

    updateScrollProgress(progress) {
        // Could be used for scroll progress bar
        document.documentElement.style.setProperty('--scroll-progress', progress);
    }

    setupNavigation() {
        // Active navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav a[href^="#"]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (!element) return;

        const headerHeight = document.getElementById('header')?.offsetHeight || 0;
        const targetPosition = element.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    setupIntersectionObserver() {
        // Optimized animations using Intersection Observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        // Observe sections for performance optimization
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    setupUtilities() {
        // Loading states
        this.handleLoadingStates();
        
        // Error handling
        this.setupErrorHandling();
        
        // Performance monitoring
        this.setupPerformanceMonitoring();
        
        // Accessibility features
        this.setupAccessibility();
    }

    handleLoadingStates() {
        // Remove loading states when everything is ready
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 1000);
        
        // Handle image loading for phone mockups
        const phoneElements = document.querySelectorAll('.phone-mockup');
        phoneElements.forEach(phone => {
            // Simulate app screenshot loading
            setTimeout(() => {
                phone.classList.add('content-loaded');
            }, 2000);
        });
    }

    setupErrorHandling() {
        // Handle any JavaScript errors gracefully
        window.addEventListener('error', (e) => {
            console.warn('Bugo Website Error:', e.error);
            // Could send to analytics service
        });

        // Handle failed resource loading
        window.addEventListener('unhandledrejection', (e) => {
            console.warn('Bugo Website Promise Rejection:', e.reason);
        });
    }

    setupPerformanceMonitoring() {
        // Basic performance monitoring
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
                    }
                }, 0);
            });
        }
    }

    setupAccessibility() {
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });

        // Skip to content link
        this.addSkipLink();
        
        // Ensure proper focus management
        this.manageFocus();
    }

    addSkipLink() {
        // Check if skip link already exists
        if (document.querySelector('.skip-link')) return;

        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--green);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 9999;
            transition: top 0.3s ease;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    manageFocus() {
        // Ensure focus is visible and accessible
        const focusableElements = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
        
        document.querySelectorAll(focusableElements).forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('focused');
            });
            
            element.addEventListener('blur', () => {
                element.classList.remove('focused');
            });
        });
    }

    handleResize() {
        // Debounced resize handler
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            // Recalculate positions and refresh ScrollTrigger
            if (window.ScrollTrigger) {
                ScrollTrigger.refresh();
            }
            
            // Update any responsive calculations
            this.updateResponsiveElements();
        }, 250);
    }

    updateResponsiveElements() {
        // Handle responsive updates
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            document.body.classList.add('mobile');
            document.body.classList.remove('desktop');
        } else {
            document.body.classList.add('desktop');
            document.body.classList.remove('mobile');
        }
    }

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Initialize the application with debugging
console.log('Main.js loaded, document state:', document.readyState);

function initBugo() {
    console.log('Initializing Bugo...');
    
    // Prevent multiple initializations
    if (window.bugoApp) {
        console.log('Bugo already initialized, skipping...');
        return;
    }
    
    // Check if content exists
    const heroSection = document.querySelector('.hero');
    const headerSection = document.querySelector('header');
    
    console.log('Hero section found:', !!heroSection);
    console.log('Header section found:', !!headerSection);
    
    if (!heroSection || !headerSection) {
        console.warn('Main content not found, retrying in 500ms...');
        setTimeout(initBugo, 500);
        return;
    }
    
    console.log('Creating BugoMain instance...');
    window.bugoApp = new BugoMain();
    console.log('Bugo initialized successfully!');
}

// Multiple initialization strategies for reliability
if (document.readyState === 'loading') {
    console.log('Document still loading, waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', initBugo);
} else {
    console.log('Document already loaded, initializing immediately...');
    initBugo();
}

// Astro-specific page load event
document.addEventListener('astro:page-load', () => {
    console.log('Astro page loaded');
    initBugo();
});

// Fallback initialization after a delay
setTimeout(() => {
    if (!window.bugoApp) {
        console.log('Fallback initialization triggered');
        initBugo();
    }
}, 2000);