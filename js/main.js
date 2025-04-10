document.addEventListener('DOMContentLoaded', () => {
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const body = document.body;

    // Animation d'entrée de la barre de navigation
    setTimeout(() => {
        navbar.classList.add('visible');
    }, 100);

    // Toggle menu mobile
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Empêcher le défilement quand le menu est ouvert
        if (navLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            body.style.overflow = ''; // Réactiver le défilement
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Animation de chargement
    window.addEventListener('load', () => {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.style.display = 'none';
        }
    });

    // Animation au scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fruit-card, .value-card, .team-member');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialiser les styles pour l'animation
    document.querySelectorAll('.fruit-card, .value-card, .team-member').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
    });

    // Écouter l'événement de scroll
    window.addEventListener('scroll', animateOnScroll);
    // Appeler une première fois pour les éléments visibles au chargement
    animateOnScroll();

    // Gestion des appels téléphoniques
    document.querySelectorAll('.order-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const phoneNumber = button.getAttribute('href').replace('tel:', '');
            if (confirm(`Voulez-vous appeler ${phoneNumber} ?`)) {
                window.location.href = `tel:${phoneNumber}`;
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Ici vous pouvez ajouter la logique d'envoi du formulaire
            alert('Message envoyé avec succès !');
            contactForm.reset();
        });
    }
}); 