class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.arrow.prev');
        this.nextBtn = document.querySelector('.arrow.next');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.autoSlideDelay = 5000; // 5 secondes
        this.isAnimating = false;

        this.init();
    }

    init() {
        // Événements pour les boutons de navigation
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Événements pour les points de navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Démarrer le défilement automatique
        this.startAutoSlide();

        // Arrêter le défilement automatique au survol
        const heroSection = document.querySelector('.hero-section');
        heroSection.addEventListener('mouseenter', () => this.stopAutoSlide());
        heroSection.addEventListener('mouseleave', () => this.startAutoSlide());

        // Gestion des touches du clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Gestion du swipe sur mobile
        this.initTouchEvents();
    }

    initTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        const heroSection = document.querySelector('.hero-section');

        heroSection.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        heroSection.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }

    handleSwipe(startX, endX) {
        const diff = startX - endX;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }

    updateSlides() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.slides.forEach((slide, index) => {
            if (index === this.currentSlide) {
                slide.classList.add('active');
                this.dots[index].classList.add('active');
            } else {
                slide.classList.remove('active');
                this.dots[index].classList.remove('active');
            }
        });

        setTimeout(() => {
            this.isAnimating = false;
        }, 1000);
    }

    nextSlide() {
        if (this.isAnimating) return;
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlides();
    }

    prevSlide() {
        if (this.isAnimating) return;
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlides();
    }

    goToSlide(index) {
        if (this.isAnimating) return;
        this.currentSlide = index;
        this.updateSlides();
    }

    startAutoSlide() {
        this.stopAutoSlide();
        this.slideInterval = setInterval(() => this.nextSlide(), this.autoSlideDelay);
    }

    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// Initialiser le slider quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
}); 