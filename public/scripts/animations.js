// Animations for Astro - public/scripts/animations.js

// Animations for Astro - public/scripts/animations.js

// Wait for GSAP to be available
function waitForGSAP(callback) {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        callback();
    } else {
        setTimeout(() => waitForGSAP(callback), 50);
    }
}

window.BugoAnimations = {
    initialized: false,
    
    init() {
        // Prevent double initialization
        if (this.initialized) return;
        
        console.log('BugoAnimations init called');
        
        // Wait for GSAP to be available
        waitForGSAP(() => {
            try {
                console.log('GSAP available, setting up animations');
                gsap.registerPlugin(ScrollTrigger);
                this.setupHeroAnimations();
                this.setupScrollAnimations();
                this.setupParallaxEffects();
                this.setupScrollReveal();
                this.initialized = true;
                console.log('BugoAnimations initialized successfully');
            } catch (error) {
                console.error('Error initializing animations:', error);
                this.setupFallbackAnimations();
            }
        });
    },

    setupHeroAnimations() {
        // Set initial states for hero elements
        gsap.set('.hero-text h1', { y: 100, opacity: 0 });
        gsap.set('.hero-text p', { y: 50, opacity: 0 });
        gsap.set('.cta-button', { y: 30, opacity: 0, scale: 0.9 });
        gsap.set('.phone-mockup', { scale: 0.7, opacity: 0, rotation: 10 });
        
        // Hero section entrance animation
        const heroTl = gsap.timeline({ delay: 0.5 });
        
        heroTl
            .to('.hero-text h1', { 
                duration: 1.2, 
                y: 0,
                opacity: 1, 
                ease: 'power3.out' 
            })
            .to('.hero-text p', { 
                duration: 1, 
                y: 0,
                opacity: 1, 
                ease: 'power3.out' 
            }, '-=0.6')
            .to('.cta-button', { 
                duration: 1, 
                y: 0,
                opacity: 1, 
                scale: 1,
                ease: 'back.out(1.7)' 
            }, '-=0.5')
            .to('.phone-mockup', { 
                duration: 1.5, 
                scale: 1, 
                opacity: 1, 
                rotation: 0,
                ease: 'elastic.out(1, 0.5)' 
            }, '-=0.8');

        // Floating elements animation
        gsap.set('.floating-element', { opacity: 0, scale: 0 });
        gsap.to('.floating-element', {
            opacity: 0.7,
            scale: 1,
            duration: 2,
            stagger: 0.3,
            ease: 'elastic.out(1, 0.3)',
            delay: 2
        });
    },

    setupScrollAnimations() {
        // Set initial states for feature cards
        gsap.set('.feature-card', { y: 100, opacity: 0 });
        
        ScrollTrigger.create({
            trigger: '.features-grid',
            start: 'top 80%',
            onEnter: () => {
                gsap.to('.feature-card', {
                    duration: 1,
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    ease: 'power3.out'
                });
            }
        });

        // Set initial states for comparison section
        gsap.set('.comparison-content', { x: -100, opacity: 0 });
        gsap.set('.comparison-phones', { x: 100, opacity: 0 });
        
        ScrollTrigger.create({
            trigger: '.comparison-grid',
            start: 'top 80%',
            onEnter: () => {
                const tl = gsap.timeline();
                tl.to('.comparison-content', {
                    duration: 1,
                    x: 0,
                    opacity: 1,
                    ease: 'power3.out'
                })
                .to('.comparison-phones', {
                    duration: 1.2,
                    x: 0,
                    opacity: 1,
                    ease: 'back.out(1.7)'
                }, '-=0.7');
            }
        });

        // Set initial states for download section
        gsap.set('.download .section-header', { y: 50, opacity: 0 });
        gsap.set('.download-buttons', { y: 50, opacity: 0 });
        
        ScrollTrigger.create({
            trigger: '.download',
            start: 'top 80%',
            onEnter: () => {
                const tl = gsap.timeline();
                tl.to('.download .section-header', {
                    duration: 1,
                    y: 0,
                    opacity: 1,
                    ease: 'power3.out'
                })
                .to('.download-buttons', {
                    duration: 1,
                    y: 0,
                    opacity: 1,
                    ease: 'power3.out'
                }, '-=0.5');
            }
        });
    },

    setupParallaxEffects() {
        // Parallax scrolling for floating elements
        let floatingElements = document.querySelectorAll('.floating-element');
        
        if (floatingElements.length > 0) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                
                floatingElements.forEach((element, index) => {
                    const speed = (index + 1) * 0.3;
                    element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.02}deg)`;
                });
            });
        }

        // Parallax for hero background elements
        ScrollTrigger.create({
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                const heroVisual = document.querySelector('.hero-visual');
                if (heroVisual) {
                    gsap.to(heroVisual, {
                        y: progress * 100,
                        duration: 0.3,
                        ease: 'none'
                    });
                }
            }
        });
    },

    setupScrollReveal() {
        // Generic scroll reveal for elements with reveal classes
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
        
        revealElements.forEach(element => {
            ScrollTrigger.create({
                trigger: element,
                start: 'top 85%',
                onEnter: () => {
                    element.classList.add('revealed');
                }
            });
        });

        // Staggered animations for lists
        const listItems = document.querySelectorAll('.comparison-list li');
        if (listItems.length > 0) {
            gsap.set(listItems, { opacity: 0, x: -50 });
            
            ScrollTrigger.create({
                trigger: '.comparison-list',
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(listItems, {
                        opacity: 1,
                        x: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power2.out'
                    });
                }
            });
        }
    },

    setupFallbackAnimations() {
        // CSS-based fallback animations when GSAP is not available
        console.log('Setting up fallback animations');
        
        // Add CSS classes for basic animations
        const style = document.createElement('style');
        style.textContent = `
            .fallback-fade-in {
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.8s ease;
            }
            .fallback-fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);

        // Apply fallback animations
        const elements = document.querySelectorAll('.hero-text h1, .hero-text p, .feature-card, .comparison-content');
        elements.forEach(el => el.classList.add('fallback-fade-in'));

        // Intersection Observer for fallback animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => observer.observe(el));
        
        // Immediate visibility for hero elements
        setTimeout(() => {
            document.querySelectorAll('.hero .fallback-fade-in').forEach(el => {
                el.classList.add('visible');
            });
        }, 500);
    },

    refresh() {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    },

    destroy() {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
        this.initialized = false;
    }
};