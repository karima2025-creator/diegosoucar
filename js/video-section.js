document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('main-video');
    const playButton = document.querySelector('.play-button');
    const playOverlay = document.querySelector('.play-overlay');

    // Lecture automatique au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play()
                    .then(() => {
                        playOverlay.classList.add('hidden');
                    })
                    .catch(error => {
                        console.log("Lecture automatique non autorisée:", error);
                    });
            } else {
                video.pause();
                playOverlay.classList.remove('hidden');
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(video);

    // Gestion du bouton play
    playButton.addEventListener('click', () => {
        if (video.paused) {
            video.play()
                .then(() => {
                    playOverlay.classList.add('hidden');
                })
                .catch(error => {
                    console.error('Erreur de lecture:', error);
                });
        } else {
            video.pause();
            playOverlay.classList.remove('hidden');
        }
    });

    // Gestion de la fin de la vidéo
    video.addEventListener('ended', () => {
        playOverlay.classList.remove('hidden');
    });

    // Gestion de la pause
    video.addEventListener('pause', () => {
        playOverlay.classList.remove('hidden');
    });

    // Gestion du chargement de la vidéo
    video.addEventListener('loadeddata', () => {
        console.log('Vidéo chargée');
    });

    // Gestion des erreurs
    video.addEventListener('error', (e) => {
        console.error('Erreur vidéo:', e);
    });

    // Optimisation des performances
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Ajustements responsifs si nécessaire
        }, 250);
    });

    // Préchargement de la vidéo
    if ('loading' in HTMLImageElement.prototype) {
        video.loading = 'lazy';
    }
}); 