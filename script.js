document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="preloader-spinner"></div>';
    document.body.appendChild(preloader);

    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navbarLinks = document.getElementById('navbarLinks');
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    
    navToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navbarLinks.classList.toggle('active');
        this.classList.toggle('active');
        document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
    });
    
    // Mobile dropdown functionality
    navDropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.dropdown-btn');
        
        btn.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                // Close other dropdowns
                navDropdowns.forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                        d.querySelector('.dropdown-btn').setAttribute('aria-expanded', 'false');
                    }
                });
                
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                navbarLinks.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Scroll behavior for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.creative-navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.creative-navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Portfolio carousel with improved controls
    const portfolioCarousel = document.querySelector('.portfolio-carousel');
    const portfolioPrev = document.querySelector('.portfolio-prev');
    const portfolioNext = document.querySelector('.portfolio-next');
    
    if (portfolioCarousel) {
        const updateCarouselControls = () => {
            const scrollLeft = portfolioCarousel.scrollLeft;
            const maxScroll = portfolioCarousel.scrollWidth - portfolioCarousel.clientWidth;
            
            portfolioPrev.disabled = scrollLeft <= 0;
            portfolioNext.disabled = scrollLeft >= maxScroll - 1;
        };
        
        portfolioCarousel.addEventListener('scroll', updateCarouselControls);
        
        portfolioPrev.addEventListener('click', function() {
            portfolioCarousel.scrollBy({
                left: -portfolioCarousel.offsetWidth * 0.8,
                behavior: 'smooth'
            });
        });
        
        portfolioNext.addEventListener('click', function() {
            portfolioCarousel.scrollBy({
                left: portfolioCarousel.offsetWidth * 0.8,
                behavior: 'smooth'
            });
        });
        
        // Initialize controls
        updateCarouselControls();
    }
    
    // Animate stats counting with improved performance
    const animateStats = function() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const speed = 200;
        let animationRunning = false;
        
        const animate = () => {
            animationRunning = false;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const count = parseInt(stat.textContent);
                const increment = target / speed;
                
                if (count < target) {
                    stat.textContent = Math.floor(count + increment);
                    animationRunning = true;
                } else {
                    stat.textContent = target + '+';
                }
            });
            
            if (animationRunning) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    };
    
    // Intersection Observer for animations and lazy loading
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'nosotros') {
                    animateStats();
                }
                
                entry.target.classList.add('fade-in');
                
                // Lazy load images
                const lazyImages = entry.target.querySelectorAll('img[loading="lazy"]');
                lazyImages.forEach(img => {
                    img.src = img.dataset.src || img.src;
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections and lazy images
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Initialize particles.js with improved loading
    function loadParticlesJS() {
        return new Promise((resolve) => {
            if (window.particlesJS) {
                resolve();
            } else {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
                script.onload = resolve;
                document.head.appendChild(script);
            }
        });
    }
    
    function initParticles(elementId, color, density) {
        particlesJS(elementId, {
            "particles": {
                "number": {
                    "value": density * 10,
                    "density": {
                        "enable": true,
                        "value_area": density * 100
                    }
                },
                "color": {
                    "value": color
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": color,
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    const particleElements = [
        { id: 'navbar-particles', color: '#6c63ff', density: 5 },
        { id: 'hero-particles', color: '#6c63ff', density: 8 },
        { id: 'portfolio-particles', color: '#6c63ff', density: 5 },
        { id: 'contact-particles', color: '#ffffff', density: 8 },
        { id: 'footer-particles', color: '#ffffff', density: 5 }
    ];
    
    loadParticlesJS().then(() => {
        particleElements.forEach(config => {
            const element = document.getElementById(config.id);
            if (element) {
                initParticles(config.id, config.color, config.density);
            }
        });
    }).catch(error => {
        console.error('Error loading particles.js:', error);
    });
    
    // Form submission with validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const validateForm = (formData) => {
            const errors = {};
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!formData.get('name').trim()) {
                errors.name = 'Por favor ingresa tu nombre';
            }
            
            if (!formData.get('email').trim()) {
                errors.email = 'Por favor ingresa tu email';
            } else if (!emailRegex.test(formData.get('email'))) {
                errors.email = 'Por favor ingresa un email válido';
            }
            
            if (!formData.get('service')) {
                errors.service = 'Por favor selecciona un servicio';
            }
            
            if (!formData.get('message').trim()) {
                errors.message = 'Por favor ingresa tu mensaje';
            }
            
            return errors;
        };
        
        const showFormErrors = (errors) => {
            Object.keys(errors).forEach(key => {
                const errorElement = document.getElementById(`${key}-error`);
                if (errorElement) {
                    errorElement.textContent = errors[key];
                }
            });
        };
        
        const clearFormErrors = () => {
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
        };
        
        const showSuccessMessage = () => {
            const successElement = document.getElementById('formSuccess');
            if (successElement) {
                contactForm.reset();
                clearFormErrors();
                successElement.style.display = 'block';
                setTimeout(() => {
                    successElement.style.display = 'none';
                }, 5000);
            }
        };
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            clearFormErrors();
            
            const formData = new FormData(this);
            const errors = validateForm(formData);
            
            if (Object.keys(errors).length === 0) {
                // Simular envío del formulario
                const submitBtn = document.getElementById('submitBtn');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
                
                // Aquí iría la llamada real a tu backend
                setTimeout(() => {
                    showSuccessMessage();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar Mensaje';
                }, 1500);
            } else {
                showFormErrors(errors);
            }
        });
    }
    
    // Hide preloader when everything is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    });
});
// Agrega esto a tu script.js existente

// Tabs de servicios
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover active de todos los botones y contenidos
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Agregar active al botón clickeado
        btn.classList.add('active');
        
        // Mostrar el contenido correspondiente
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Animación de números en resultados
function animateResults() {
    const resultNumbers = document.querySelectorAll('.result-number');
    const speed = 200;
    
    resultNumbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-count'));
        const count = parseInt(number.textContent);
        const increment = target / speed;
        
        if (count < target) {
            number.textContent = Math.floor(count + increment);
            setTimeout(animateResults, 1);
        } else {
            if (number.getAttribute('data-count').includes('.')) {
                number.textContent = target.toFixed(1);
            } else {
                number.textContent = target;
            }
            
            if (number.getAttribute('data-count') === '1.5') {
                number.textContent += 'M';
            } else if (target >= 1000) {
                number.textContent = (target / 1000).toFixed(1) + 'K';
            }
        }
    });
}

// Observar cuando la sección de resultados entra en el viewport
const resultsSection = document.querySelector('.results-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateResults();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (resultsSection) {
    observer.observe(resultsSection);
}

// Inicializar partículas para marketing
function initMarketingParticles() {
    if (window.particlesJS) {
        particlesJS('marketing-particles', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    }
                }
            }
        });
        
        particlesJS('strategy-particles', {
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.3,
                    random: true
                },
                size: {
                    value: 2,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 200,
                    color: "#ffffff",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out"
                }
            }
        });
    }
}

// Llamar a la función cuando particles.js esté cargado
document.addEventListener('DOMContentLoaded', function() {
    if (window.particlesJS) {
        initMarketingParticles();
    } else {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = initMarketingParticles;
        document.head.appendChild(script);
    }
});