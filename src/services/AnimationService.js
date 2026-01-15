// src/services/AnimationService.js
/**
 * Uproszczona wersja serwisu obsługującego animacje oparte na Intersection Observer API
 */
export default {
    /**
     * Inicjalizuje Intersection Observer dla elementów z określoną klasą
     * @param {string} targetClass - Klasa dla elementów, które mają być obserwowane
     * @param {string} activeClass - Klasa do dodania, gdy element jest widoczny
     */
    initAnimations(targetClass = 'fade-in', activeClass = 'visible') {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(activeClass);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Obserwacja wszystkich elementów z określoną klasą
        const elements = document.querySelectorAll(`.${targetClass}`);
        elements.forEach(el => {
            observer.observe(el);
        });

        return {
            observer,
            elements
        };
    },

    /**
     * Inicjalizuje efekt parallax dla podanych elementów
     * @param {string} selector - Selektor CSS dla elementów z efektem parallax
     */
    initParallaxEffect(selector) {
        const elements = document.querySelectorAll(selector);

        if (!elements.length) return;

        const handleScroll = () => {
            // Uproszczony efekt parallax
            console.log('Parallax effect active');
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },

    /**
     * Dodaje animację zjawiania się elementów podczas przewijania
     * @param {string} selector - Selektor dla sekcji z animowanymi elementami
     */
    initAppleStyleAnimations(selector = '.animation-section') {
        const sections = document.querySelectorAll(selector);

        if (!sections.length) return;

        const handleScroll = () => {
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop < window.innerHeight * 0.8) {
                    section.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        handleScroll(); // Wywołanie na start

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },

    /**
     * Inicjalizuje efekt zjawiania się tytułów sekcji
     * @param {string} selector - Selektor dla tytułów sekcji
     */
    initSectionTitles(selector = '.section-title') {
        const titles = document.querySelectorAll(selector);

        if (!titles.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        titles.forEach(title => {
            observer.observe(title);
        });

        return {
            observer,
            elements: titles
        };
    }
};