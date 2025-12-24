/**
 * LA COMPUTADORA DE DIOS - JavaScript
 * Interactividad minimalista y patrones vectoriales
 */

// ========================================
// Patrón de Fondo Vectorial Dinámico
// ========================================

function createVectorPattern() {
    const bgPattern = document.getElementById('bgPattern');
    if (!bgPattern) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';

    // Crear patrón de círculos conectados
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    pattern.setAttribute('id', 'vectorPattern');
    pattern.setAttribute('x', '0');
    pattern.setAttribute('y', '0');
    pattern.setAttribute('width', '100');
    pattern.setAttribute('height', '100');
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');

    // Círculos en el patrón
    const circles = [
        { cx: 10, cy: 10, r: 2 },
        { cx: 50, cy: 50, r: 2 },
        { cx: 90, cy: 90, r: 2 }
    ];

    circles.forEach(circle => {
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', circle.cx);
        c.setAttribute('cy', circle.cy);
        c.setAttribute('r', circle.r);
        c.setAttribute('fill', 'none');
        c.setAttribute('stroke', '#000');
        c.setAttribute('stroke-width', '0.5');
        c.setAttribute('opacity', '0.3');
        pattern.appendChild(c);
    });

    // Líneas conectoras
    const lines = [
        { x1: 10, y1: 10, x2: 50, y2: 50 },
        { x1: 50, y1: 50, x2: 90, y2: 90 }
    ];

    lines.forEach(line => {
        const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        l.setAttribute('x1', line.x1);
        l.setAttribute('y1', line.y1);
        l.setAttribute('x2', line.x2);
        l.setAttribute('y2', line.y2);
        l.setAttribute('stroke', '#000');
        l.setAttribute('stroke-width', '0.3');
        l.setAttribute('opacity', '0.2');
        l.setAttribute('stroke-dasharray', '2,2');
        pattern.appendChild(l);
    });

    defs.appendChild(pattern);
    svg.appendChild(defs);

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('fill', 'url(#vectorPattern)');
    svg.appendChild(rect);

    bgPattern.appendChild(svg);
}

// ========================================
// Efecto de Terminal: Scroll Suave
// ========================================

function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Cerrar menú móvil si está abierto
                const navList = document.querySelector('.nav-list');
                if (navList && navList.classList.contains('active')) {
                    navList.classList.remove('active');
                }
            }
        });
    });
}

// ========================================
// Mobile Menu Toggle
// ========================================

function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.querySelector('.nav-list');

    if (!menuToggle || !navList) return;

    menuToggle.addEventListener('click', function () {
        navList.classList.toggle('active');

        // Animar el botón hamburguesa
        const spans = this.querySelectorAll('span');
        if (navList.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function (event) {
        if (!menuToggle.contains(event.target) && !navList.contains(event.target)) {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
}

// ========================================
// Observador de Intersección para Animaciones
// ========================================

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos que deben aparecer con scroll
    const elementsToObserve = document.querySelectorAll('.code-block, .os-card, .info-box, .concept-box');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// CTA Button - Funcionalidad
// ========================================

function setupCTAButton() {
    const ctaButton = document.getElementById('ctaButton');
    if (!ctaButton) return;

    ctaButton.addEventListener('click', function () {
        window.location.href = 'https://www.patreon.com/lacomputadoradedios';
    });
}

// ========================================
// Easter Egg: Konami Code
// ========================================

function setupKonamiCode() {
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateEasterEgg();
        }
    });
}

function activateEasterEgg() {
    const body = document.body;
    body.style.transition = 'filter 0.5s ease';
    body.style.filter = 'invert(1)';

    setTimeout(() => {
        body.style.filter = 'invert(0)';
    }, 3000);

    console.log('%c> LOGOS_MODE_ACTIVATED', 'font-family: monospace; font-size: 20px; font-weight: bold;');
    console.log('%c> "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios."', 'font-family: monospace; font-size: 14px;');
}

// ========================================
// Console Art
// ========================================

function displayConsoleArt() {
    console.log('%c' + `
    ╔═══════════════════════════════════════╗
    ║   LA COMPUTADORA DE DIOS             ║
    ║   > Sistema Operativo: LOGOS v1.0    ║
    ╚═══════════════════════════════════════╝
    `, 'font-family: monospace; font-size: 12px;');

    console.log('%c> Bienvenido al modelo computacional de la realidad', 'font-family: monospace; font-size: 14px; font-weight: bold;');
    console.log('%c> Eres la inteligencia artificial del Creador', 'font-family: monospace; font-size: 12px;');
    console.log('%c> Tu decisión: ego || mundo', 'font-family: monospace; font-size: 12px;');
    console.log('%c', ''); // línea vacía
    console.log('%c> Pista: Intenta el Konami Code para una sorpresa...', 'font-family: monospace; font-size: 10px; color: #666;');
}

// ========================================
// Efecto de Parpadeo en Código
// ========================================

function setupCodeFlicker() {
    const codeElements = document.querySelectorAll('.code-content .keyword, .code-content .class-name');

    codeElements.forEach((el, index) => {
        // Agregar un brillo sutil aleatorio
        setInterval(() => {
            if (Math.random() > 0.95) {
                el.style.textShadow = '0 0 3px rgba(0,0,0,0.5)';
                setTimeout(() => {
                    el.style.textShadow = 'none';
                }, 100);
            }
        }, 2000 + (index * 100));
    });
}

// ========================================
// Cursor personalizado para hover en enlaces
// ========================================

function setupCustomCursor() {
    const interactiveElements = document.querySelectorAll('button, .os-card, a');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'crosshair';
        });

        el.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'default';
        });
    });
}

// ========================================
// Contador de visitantes (simulado)
// ========================================

function displayVisitorCount() {
    // Simulación simple - en producción usarías una API real
    let count = localStorage.getItem('visitorCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);

    console.log(`%c> Visitas al terminal: ${count}`, 'font-family: monospace; font-size: 10px; color: #666;');
}

// ========================================
// Inicialización
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar funciones
    createVectorPattern();
    smoothScroll();
    setupMobileMenu();
    setupIntersectionObserver();
    setupCTAButton();
    setupKonamiCode();
    setupCustomCursor();
    displayConsoleArt();
    displayVisitorCount();

    // Opcional: efecto de parpadeo sutil (comentado por defecto para no distraer)
    // setupCodeFlicker();

    // Log de sistema
    console.log('%c> Sistema iniciado correctamente', 'font-family: monospace; color: green;');
});

// ========================================
// Service Worker (Placeholder para PWA futuro)
// ========================================

if ('serviceWorker' in navigator) {
    // Descomentado cuando tengas un service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(() => console.log('%c> Service Worker registrado', 'font-family: monospace;'))
    //     .catch(err => console.log('%c> Error en Service Worker:', 'font-family: monospace;', err));
}
