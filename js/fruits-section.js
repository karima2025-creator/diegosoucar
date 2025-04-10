document.addEventListener('DOMContentLoaded', () => {
    const fruitsSection = document.querySelector('.fruits-section');
    const fruitCards = document.querySelectorAll('.fruit-card');
    const modals = document.querySelectorAll('.fruit-modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Animation au défilement
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fruitsSection.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    observer.observe(fruitsSection);

    // Animation des cartes au survol
    fruitCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0)';
        });
    });

    // Optimisation des performances
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Ajustements responsifs si nécessaire
        }, 250);
    });

    // Données des fruits
    const fruitsData = {
        mangue: {
            title: 'Mangue',
            price: '200 FCFA/kg',
            description: 'La mangue sénégalaise est réputée pour sa douceur et son arôme unique. Cultivée dans les régions tropicales du pays, elle est riche en vitamines A et C, parfaite pour vos jus et desserts.'
        },
        banane: {
            title: 'Banane',
            price: '150 FCFA/kg',
            description: 'Nos bananes sont cultivées localement avec soin. Elles sont une excellente source d\'énergie naturelle, riches en potassium et en fibres. Parfaites pour les collations saines et les smoothies.'
        },
        orange: {
            title: 'Orange',
            price: '300 FCFA/kg',
            description: 'Nos oranges sont juteuses et pleines de saveur. Cultivées dans les meilleures conditions, elles sont riches en vitamine C et en antioxydants. Idéales pour les jus frais et les desserts.'
        },
        ananas: {
            title: 'Ananas',
            price: '250 FCFA/kg',
            description: 'L\'ananas sénégalais est connu pour sa douceur et son goût unique. Riche en bromélaïne et en vitamines, il est parfait pour les jus, les salades de fruits et les plats exotiques.'
        },
        papaye: {
            title: 'Papaye',
            price: '180 FCFA/kg',
            description: 'La papaye sénégalaise est douce et parfumée. Riche en enzymes digestives et en vitamines, elle est excellente pour la santé digestive et le système immunitaire.'
        },
        pasteque: {
            title: 'Pastèque',
            price: '220 FCFA/kg',
            description: 'Nos pastèques sont fraîches et juteuses, parfaites pour se désaltérer. Riches en eau et en antioxydants, elles sont idéales pour les journées chaudes.'
        },
        citron: {
            title: 'Citron',
            price: '150 FCFA/kg',
            description: 'Nos citrons sont acidulés et riches en vitamine C. Parfaits pour assaisonner vos plats, préparer des boissons rafraîchissantes ou des desserts.'
        },
        pamplemousse: {
            title: 'Pamplemousse',
            price: '280 FCFA/kg',
            description: 'Le pamplemousse sénégalais est juteux et légèrement amer. Riche en vitamine C et en fibres, il est excellent pour la santé cardiovasculaire.'
        },
        goyave: {
            title: 'Goyave',
            price: '200 FCFA/kg',
            description: 'La goyave est un fruit tropical sucré et parfumé. Riche en vitamine C et en fibres, elle est parfaite pour les jus, les confitures et les desserts.'
        },
        corossol: {
            title: 'Corossol',
            price: '300 FCFA/kg',
            description: 'Le corossol est un fruit exotique à la saveur unique, à la fois sucrée et acidulée. Riche en nutriments, il est apprécié pour ses bienfaits sur la santé.'
        }
    };

    // Sélectionner les éléments
    const viewButtons = document.querySelectorAll('.view-details');
    const modal = document.getElementById('fruit-modal');
    const closeButton = document.querySelector('.close-modal');
    const orderButton = document.querySelector('.order-button');
    const modalTitle = document.querySelector('.modal-title');
    const modalPrice = document.querySelector('.price');
    const modalDescription = document.querySelector('.description');
    const modalImage = document.querySelector('.modal-image');

    // Gérer les appels directs
    orderButton.addEventListener('click', function() {
        const phoneNumber = this.getAttribute('data-phone');
        window.open(`tel:${phoneNumber}`, '_self');
    });

    // Ajouter les événements aux boutons "Voir"
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const fruitCard = this.closest('.fruit-card');
            const fruitType = fruitCard.getAttribute('data-fruit');
            const fruitData = fruitsData[fruitType];
            
            if (fruitData) {
                // Mettre à jour le contenu de la modale
                modalTitle.textContent = fruitData.title;
                modalPrice.textContent = fruitData.price;
                modalDescription.textContent = fruitData.description;
                
                // Copier l'image de la carte vers la modale
                const cardImage = fruitCard.querySelector('.fruit-image img');
                const imageCopy = cardImage.cloneNode(true);
                modalImage.innerHTML = '';
                modalImage.appendChild(imageCopy);
                
                // Afficher la modale
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Fermer la modale
    closeButton.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Fermer la modale en cliquant en dehors
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Fermer la modale avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}); 