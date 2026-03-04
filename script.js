// script.js - Animaciones e interacciones de Isaias Avila

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PARTICLE SYSTEM
    const particlesContainer = document.getElementById('particles');
    if(particlesContainer) {
        const particleCount = window.innerWidth < 768 ? 20 : 50; // Menos en mobile
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // 2. STICKY NAVBAR
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled'); // Force scrolled state for dark aesthetics slightly
            if(window.scrollY === 0) {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // 3. ACTUALIZAR AÑO FOOTER
    document.getElementById('year').textContent = new Date().getFullYear();

    // 4. INTERSECTION OBSERVER (Animaciones de Scroll)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Si es contador, iniciarlo
                if(entry.target.classList.contains('metric-item') || entry.target.querySelector('.counter')) {
                   const counters = entry.target.querySelectorAll('.counter');
                   counters.forEach(counter => {
                       if(!counter.classList.contains('counted')) {
                           animateCounter(counter);
                           counter.classList.add('counted');
                       }
                   });
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos
    document.querySelectorAll('.fade-in-up, .fade-in-rotate, .card-reveal').forEach(el => {
        observer.observe(el);
    });

    // 5. COUNTER ANIMATION
    function animateCounter(element, duration = 2000) {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = Math.round(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current);
            }
        }, 16);
    }

    // 6. FLIP CARDS MOBILE FIX (Touch events)
    const flipCards = document.querySelectorAll('.service-card-flip');
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            if(window.innerWidth <= 768) {
                this.classList.toggle('flipped');
            }
        });
    });

    // 7. SMOOTH SCROLL PARA ANCHORS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Activar animaciones iniciales en hero
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-in-up, .hero .fade-in-rotate').forEach(el => {
            el.classList.add('animate-in');
        });
    }, 100);
});
