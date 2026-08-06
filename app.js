// TikTok Live TTS Landing Page Interactivity

document.addEventListener('DOMContentLoaded', () => {
    // 1. Alternador automático de Capturas (Mockup de Teléfono)
    const screenshots = document.querySelectorAll('.screenshot');
    const dots = document.querySelectorAll('.mockup-indicator .dot');
    let currentIndex = 0;
    let autoplayInterval;

    function showScreenshot(index) {
        // Remover clases activas
        screenshots.forEach(sc => sc.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        // Añadir a elemento seleccionado
        screenshots[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextScreenshot() {
        let nextIndex = (currentIndex + 1) % screenshots.length;
        showScreenshot(nextIndex);
    }

    // Iniciar autoplay cada 4 segundos
    function startAutoplay() {
        autoplayInterval = setInterval(nextScreenshot, 4000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Eventos para los puntos indicadores
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            stopAutoplay();
            showScreenshot(idx);
            startAutoplay(); // reiniciar temporizador
        });
    });

    startAutoplay();

    // 2. Efecto de cabecera translúcida al hacer scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            navbar.style.height = '70px';
            navbar.style.backgroundColor = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.height = '80px';
            navbar.style.backgroundColor = 'rgba(10, 10, 15, 0.8)';
        }
    });

    // 3. Revelar elementos al hacer scroll (animaciones al entrar)
    const revealElements = document.querySelectorAll('.feature-card, .step-item, .pricing-card');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Inicializar estilos de animación
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // disparo inicial
});
