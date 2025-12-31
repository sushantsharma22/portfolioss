/* ============================================
   CINEMATIC SCROLL ANIMATIONS
   Awwwards-worthy scroll experience using GSAP
   ============================================ */

'use strict';

/**
 * PERFORMANCE NOTES:
 * - All animations use GPU-accelerated properties (transform, opacity)
 * - ScrollTrigger instances are destroyed on route change
 * - Mobile gets simplified animations for 60fps
 * - prefers-reduced-motion respected throughout
 */

// Wait for DOM and GSAP to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Check for GSAP
    if (typeof gsap === 'undefined') {
        console.error('GSAP not loaded');
        return;
    }

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Initialize cinematic experience
    const CinematicPortfolio = {
        // Configuration
        config: {
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            isMobile: window.innerWidth <= 768,
            isTouch: 'ontouchstart' in window,
            smoothScrollEnabled: true
        },

        // Initialize all modules
        init() {
            console.log('🎬 Initializing Cinematic Portfolio...');

            // Respect user preferences
            if (this.config.reducedMotion) {
                console.log('Reduced motion preferred - using instant reveals');
                this.initInstantReveals();
                return;
            }

            // Initialize modules
            this.initSmoothScroll();
            this.initChapterNavigation();
            this.initHeroAnimations();
            this.initAboutAnimations();
            this.initExperienceHorizontalScroll();
            this.initProjectsAnimations();
            this.initSkillsAnimations();
            this.initEducationAnimations();
            this.initCertificatesAnimations();
            this.initContactAnimations();
            this.initParallaxBackgrounds();
            this.initScrollProgress();
            this.initTextSplits();

            console.log('✨ Cinematic Portfolio Ready!');
        },

        // ==========================================
        // SMOOTH SCROLL (Lenis-like experience)
        // ==========================================
        initSmoothScroll() {
            // Use GSAP's native smooth scrolling
            // This creates a premium feel without heavy libraries

            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');

            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const target = document.querySelector(targetId);

                    if (target) {
                        gsap.to(window, {
                            duration: 1.2,
                            scrollTo: {
                                y: target,
                                offsetY: 80
                            },
                            ease: 'power3.inOut'
                        });
                    }
                });
            });
        },

        // ==========================================
        // CHAPTER NAVIGATION (Fixed right side dots)
        // ==========================================
        initChapterNavigation() {
            const chapterNav = document.querySelector('.chapter-nav');
            if (!chapterNav) return;

            const sections = document.querySelectorAll('section[id]');
            const dots = chapterNav.querySelectorAll('.chapter-dot');

            // Create progress line that fills
            sections.forEach((section, index) => {
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => this.setActiveChapter(index, dots),
                    onEnterBack: () => this.setActiveChapter(index, dots)
                });
            });
        },

        setActiveChapter(index, dots) {
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                    gsap.to(dot, {
                        scale: 1.5,
                        backgroundColor: '#10b981', // emerald
                        duration: 0.3
                    });
                } else {
                    dot.classList.remove('active');
                    gsap.to(dot, {
                        scale: 1,
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        duration: 0.3
                    });
                }
            });
        },

        // ==========================================
        // HERO SECTION - Dramatic entrance
        // ==========================================
        initHeroAnimations() {
            const hero = document.querySelector('#home');
            if (!hero) return;

            // Create master timeline for hero
            const heroTl = gsap.timeline({
                defaults: { ease: 'power3.out' }
            });

            // Split name into words for directional animation
            const heroTitle = hero.querySelector('.hero-title, .gradient-text, h1');
            const heroSubtitle = hero.querySelector('.hero-subtitle, .typing-container');
            const heroDescription = hero.querySelector('.hero-description, .hero-info p');
            const heroButtons = hero.querySelectorAll('.hero-btn, .btn');
            const heroStats = hero.querySelectorAll('.stat-item, .stat-card');

            // Title: First word from LEFT, second from RIGHT (Euveka style)
            if (heroTitle) {
                const words = heroTitle.textContent.trim().split(' ');
                if (words.length >= 2) {
                    heroTitle.innerHTML = `
                        <span class="word word-left">${words[0]}</span> 
                        <span class="word word-right">${words.slice(1).join(' ')}</span>
                    `;

                    heroTl.fromTo('.word-left',
                        { x: -150, opacity: 0, rotateY: -30 },
                        { x: 0, opacity: 1, rotateY: 0, duration: 1.2 },
                        0
                    );
                    heroTl.fromTo('.word-right',
                        { x: 150, opacity: 0, rotateY: 30 },
                        { x: 0, opacity: 1, rotateY: 0, duration: 1.2 },
                        0.2
                    );
                }
            }

            // Subtitle fades up with delay
            if (heroSubtitle) {
                heroTl.fromTo(heroSubtitle,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    0.6
                );
            }

            // Description slides up
            if (heroDescription) {
                heroTl.fromTo(heroDescription,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    0.8
                );
            }

            // Buttons stagger from bottom
            if (heroButtons.length) {
                heroTl.fromTo(heroButtons,
                    { y: 60, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.15
                    },
                    1
                );
            }

            // Stats counters with scroll trigger
            if (heroStats.length) {
                heroStats.forEach((stat, i) => {
                    ScrollTrigger.create({
                        trigger: stat,
                        start: 'top 85%',
                        onEnter: () => {
                            gsap.fromTo(stat,
                                { y: 50, opacity: 0, scale: 0.8 },
                                {
                                    y: 0,
                                    opacity: 1,
                                    scale: 1,
                                    duration: 0.8,
                                    delay: i * 0.1,
                                    ease: 'back.out(1.2)'
                                }
                            );
                        },
                        once: true
                    });
                });
            }

            // Scroll hint animation
            const scrollHint = hero.querySelector('.scroll-indicator, .scroll-hint');
            if (scrollHint) {
                gsap.to(scrollHint, {
                    y: 10,
                    repeat: -1,
                    yoyo: true,
                    duration: 0.8,
                    ease: 'power1.inOut'
                });
            }
        },

        // ==========================================
        // ABOUT SECTION - Left/Right split reveal
        // ==========================================
        initAboutAnimations() {
            const about = document.querySelector('#about');
            if (!about) return;

            // Left side (image/card) - slides from LEFT with rotation
            const aboutImage = about.querySelector('.about-image, .about-visual, .about-card');
            if (aboutImage) {
                gsap.fromTo(aboutImage,
                    {
                        x: -200,
                        opacity: 0,
                        rotation: -15,
                        scale: 0.9
                    },
                    {
                        x: 0,
                        opacity: 1,
                        rotation: 0,
                        scale: 1,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: about,
                            start: 'top 70%',
                            end: 'top 30%',
                            scrub: 1
                        }
                    }
                );
            }

            // Right side (text) - slides from RIGHT with stagger
            const aboutText = about.querySelectorAll('.about-content p, .about-text p');
            if (aboutText.length) {
                aboutText.forEach((p, i) => {
                    gsap.fromTo(p,
                        { x: 150, opacity: 0 },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 1,
                            delay: i * 0.15,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: p,
                                start: 'top 80%',
                                toggleActions: 'play none none reverse'
                            }
                        }
                    );
                });
            }

            // Tech badges pop from BOTTOM with scale
            const badges = about.querySelectorAll('.about-badge, .tech-badge, .highlight-item');
            if (badges.length) {
                gsap.fromTo(badges,
                    { y: 80, opacity: 0, scale: 0.7 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'back.out(1.5)',
                        scrollTrigger: {
                            trigger: badges[0]?.parentElement,
                            start: 'top 75%'
                        }
                    }
                );
            }

            // Stat cards at bottom - scale + fade reveal
            const statCards = about.querySelectorAll('.stat-card, .about-stat');
            if (statCards.length) {
                gsap.fromTo(statCards,
                    { scale: 0.8, opacity: 0, y: 50 },
                    {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: statCards[0]?.parentElement,
                            start: 'top 80%'
                        }
                    }
                );
            }
        },

        // ==========================================
        // EXPERIENCE - Horizontal scroll section
        // ==========================================
        initExperienceHorizontalScroll() {
            const experience = document.querySelector('#experience');
            if (!experience) return;
            if (this.config.isMobile) {
                // Mobile fallback - vertical scroll with stagger
                this.initExperienceVertical();
                return;
            }

            const timeline = experience.querySelector('.experience-timeline');
            const cards = experience.querySelectorAll('.timeline-item, .timeline-card');

            if (!timeline || cards.length === 0) {
                this.initExperienceVertical();
                return;
            }

            // Calculate the scroll distance needed
            const scrollDistance = timeline.scrollWidth - window.innerWidth + 200;

            // Create horizontal scroll effect
            gsap.to(timeline, {
                x: -scrollDistance,
                ease: 'none',
                scrollTrigger: {
                    trigger: experience,
                    start: 'top top',
                    end: `+=${scrollDistance}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            });

            // Animate each card as it enters viewport
            cards.forEach((card, i) => {
                gsap.fromTo(card,
                    {
                        x: 200,
                        opacity: 0,
                        rotateY: -20,
                        scale: 0.9
                    },
                    {
                        x: 0,
                        opacity: 1,
                        rotateY: 0,
                        scale: 1,
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'left 90%',
                            end: 'left 60%',
                            scrub: 1,
                            containerAnimation: gsap.getById('experience-scroll')
                        }
                    }
                );
            });

            // Timeline line draws progressively
            const timelineLine = experience.querySelector('.timeline-line, .timeline-connector');
            if (timelineLine) {
                gsap.fromTo(timelineLine,
                    { scaleX: 0, transformOrigin: 'left center' },
                    {
                        scaleX: 1,
                        duration: 2,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: experience,
                            start: 'top 60%',
                            end: 'bottom 40%',
                            scrub: true
                        }
                    }
                );
            }
        },

        initExperienceVertical() {
            // Fallback for mobile or when horizontal not possible
            const cards = document.querySelectorAll('#experience .timeline-item, #experience .timeline-card');

            cards.forEach((card, i) => {
                const direction = i % 2 === 0 ? -100 : 100; // Alternate left/right

                gsap.fromTo(card,
                    {
                        x: direction,
                        opacity: 0,
                        rotateY: direction > 0 ? 20 : -20
                    },
                    {
                        x: 0,
                        opacity: 1,
                        rotateY: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        },

        // ==========================================
        // PROJECTS - Staggered grid reveal
        // ==========================================
        initProjectsAnimations() {
            const projects = document.querySelector('#projects');
            if (!projects) return;

            const cards = projects.querySelectorAll('.project-card');
            const filterButtons = projects.querySelectorAll('.filter-btn');

            // Filter buttons slide down from top
            if (filterButtons.length) {
                gsap.fromTo(filterButtons,
                    { y: -50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: projects,
                            start: 'top 70%'
                        }
                    }
                );
            }

            // Project cards with alternating directions
            cards.forEach((card, i) => {
                const isEven = i % 2 === 0;

                gsap.fromTo(card,
                    {
                        x: isEven ? -100 : 100,
                        y: 80,
                        opacity: 0,
                        scale: 0.85,
                        rotateY: isEven ? -15 : 15
                    },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotateY: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            end: 'top 50%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );

                // 3D tilt hover effect
                this.initCardTilt(card);
            });
        },

        initCardTilt(card) {
            // Simple 3D tilt on hover (VanillaTilt alternative)
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.03,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    duration: 0.3
                });
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    duration: 0.3
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    rotateX: 0,
                    rotateY: 0,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    duration: 0.5
                });
            });
        },

        // ==========================================
        // SKILLS - Animated bars and icons
        // ==========================================
        initSkillsAnimations() {
            const skills = document.querySelector('#skills');
            if (!skills) return;

            // Skill category cards slide from BOTTOM-LEFT diagonal
            const categories = skills.querySelectorAll('.skill-category, .skills-category');
            categories.forEach((cat, i) => {
                gsap.fromTo(cat,
                    {
                        x: -80,
                        y: 80,
                        opacity: 0,
                        scale: 0.9
                    },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        delay: i * 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: cat,
                            start: 'top 85%'
                        }
                    }
                );
            });

            // Skill bars fill with scroll (using scaleX for GPU acceleration)
            const skillBars = skills.querySelectorAll('.skill-progress, .progress-bar');
            skillBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-width') || bar.style.width || '100%';
                const targetPercent = parseInt(targetWidth) / 100;

                gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' });

                ScrollTrigger.create({
                    trigger: bar,
                    start: 'top 85%',
                    onEnter: () => {
                        gsap.to(bar, {
                            scaleX: targetPercent,
                            duration: 1.2,
                            ease: 'power2.out'
                        });
                    },
                    once: true
                });
            });

            // Percentage numbers count up
            const percentages = skills.querySelectorAll('.skill-percentage, [data-count]');
            percentages.forEach(el => {
                const target = parseInt(el.getAttribute('data-count') || el.textContent);

                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 85%',
                    onEnter: () => {
                        gsap.fromTo(el,
                            { textContent: 0 },
                            {
                                textContent: target,
                                duration: 1.5,
                                ease: 'power1.out',
                                snap: { textContent: 1 },
                                onUpdate: function () {
                                    el.textContent = Math.floor(this.targets()[0].textContent);
                                }
                            }
                        );
                    },
                    once: true
                });
            });

            // Icons bounce-in with elastic easing
            const icons = skills.querySelectorAll('.skill-icon, .proficiency-icon');
            gsap.fromTo(icons,
                { scale: 0, rotation: -180 },
                {
                    scale: 1,
                    rotation: 0,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: 'elastic.out(1, 0.5)',
                    scrollTrigger: {
                        trigger: icons[0]?.parentElement,
                        start: 'top 80%'
                    }
                }
            );
        },

        // ==========================================
        // EDUCATION - Timeline reveal
        // ==========================================
        initEducationAnimations() {
            const education = document.querySelector('#education');
            if (!education) return;

            const cards = education.querySelectorAll('.education-card, .education-item');

            cards.forEach((card, i) => {
                gsap.fromTo(card,
                    {
                        x: i % 2 === 0 ? -100 : 100,
                        y: 50,
                        opacity: 0,
                        scale: 0.9
                    },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%'
                        }
                    }
                );
            });
        },

        // ==========================================
        // CERTIFICATES - Flip-in animation
        // ==========================================
        initCertificatesAnimations() {
            const certificates = document.querySelector('#certificates');
            if (!certificates) return;

            const cards = certificates.querySelectorAll('.certificate-card');

            // Flip-in animation (rotateY: 90deg → 0)
            cards.forEach((card, i) => {
                gsap.fromTo(card,
                    {
                        rotateY: 90,
                        opacity: 0,
                        transformPerspective: 1000
                    },
                    {
                        rotateY: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: i * 0.1, // 100ms stagger
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%'
                        }
                    }
                );

                // Hover glow effect
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        scale: 1.05,
                        boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)',
                        duration: 0.3
                    });
                });
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        scale: 1,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        duration: 0.3
                    });
                });
            });
        },

        // ==========================================
        // CONTACT - Form and social icons
        // ==========================================
        initContactAnimations() {
            const contact = document.querySelector('#contact');
            if (!contact) return;

            // Form slides up from BOTTOM
            const form = contact.querySelector('.contact-form, form');
            if (form) {
                gsap.fromTo(form,
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: contact,
                            start: 'top 70%'
                        }
                    }
                );
            }

            // Contact info cards stagger from LEFT
            const infoCards = contact.querySelectorAll('.contact-item, .contact-info-item');
            if (infoCards.length) {
                gsap.fromTo(infoCards,
                    { x: -80, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: infoCards[0]?.parentElement,
                            start: 'top 75%'
                        }
                    }
                );
            }

            // Social icons pop-in with scale bounce
            const socialIcons = contact.querySelectorAll('.social-link, .social-icon');
            if (socialIcons.length) {
                gsap.fromTo(socialIcons,
                    { scale: 0, rotation: -45 },
                    {
                        scale: 1,
                        rotation: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'back.out(2)',
                        scrollTrigger: {
                            trigger: socialIcons[0]?.parentElement,
                            start: 'top 80%'
                        }
                    }
                );
            }
        },

        // ==========================================
        // PARALLAX BACKGROUNDS
        // ==========================================
        initParallaxBackgrounds() {
            // Create floating gradient orbs that move at 0.3-0.5x scroll speed
            const sections = document.querySelectorAll('section');

            sections.forEach(section => {
                // Check if section already has parallax elements
                const existingOrbs = section.querySelectorAll('.parallax-orb');
                if (existingOrbs.length) {
                    existingOrbs.forEach((orb, i) => {
                        gsap.to(orb, {
                            y: () => -100 * (0.3 + i * 0.1),
                            ease: 'none',
                            scrollTrigger: {
                                trigger: section,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 1
                            }
                        });
                    });
                }
            });
        },

        // ==========================================
        // SCROLL PROGRESS BAR
        // ==========================================
        initScrollProgress() {
            const progressBar = document.querySelector('#progressBar, .progress-bar-fill');
            if (!progressBar) return;

            gsap.to(progressBar, {
                scaleX: 1,
                transformOrigin: 'left center',
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.3
                }
            });

            // Set initial state
            gsap.set(progressBar, { scaleX: 0 });
        },

        // ==========================================
        // TEXT SPLITS (Euveka-style reveals)
        // ==========================================
        initTextSplits() {
            // Find large section titles for dramatic reveals
            const sectionTitles = document.querySelectorAll('.section-header h2, .section-title');

            sectionTitles.forEach(title => {
                // Create word split effect
                const text = title.textContent;
                const words = text.split(' ');

                title.innerHTML = words.map((word, i) =>
                    `<span class="split-word" style="display: inline-block; overflow: hidden;">
                        <span class="word-inner" style="display: inline-block;">${word}</span>
                    </span>`
                ).join(' ');

                const wordInners = title.querySelectorAll('.word-inner');

                gsap.fromTo(wordInners,
                    { y: '100%', opacity: 0 },
                    {
                        y: '0%',
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: title,
                            start: 'top 80%'
                        }
                    }
                );
            });
        },

        // ==========================================
        // INSTANT REVEALS (for reduced motion)
        // ==========================================
        initInstantReveals() {
            // Simple fade-in without motion for accessibility
            const allElements = document.querySelectorAll(
                '.timeline-card, .project-card, .skill-category, .certificate-card, .stat-card'
            );

            allElements.forEach(el => {
                gsap.set(el, { opacity: 0 });

                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 80%',
                    onEnter: () => gsap.to(el, { opacity: 1, duration: 0.3 }),
                    once: true
                });
            });
        }
    };

    // Initialize when page is fully loaded
    if (document.readyState === 'complete') {
        CinematicPortfolio.init();
    } else {
        window.addEventListener('load', () => {
            // Wait for loading screen to finish
            setTimeout(() => CinematicPortfolio.init(), 2600);
        });
    }

    // Expose for debugging
    window.CinematicPortfolio = CinematicPortfolio;
});
