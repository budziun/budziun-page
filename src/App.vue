<template>
  <div class="app">
    <NavBar />
    <Hero />
    <AboutMe />
    <Projects />
    <TechStack />
    <Contact />
    <Footer />

    <transition name="loader">
      <div v-if="isLoading" class="loader-container">
        <div class="loader">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
        <p>{{ $t('common.loading') }}</p>
      </div>
    </transition>
  </div>
</template>


<script>
import NavBar from './components/NavBar.vue';
import Hero from './components/Hero.vue';
import AboutMe from './components/AboutMe.vue';
import TechStack from './components/TechStack.vue';
import Projects from './components/Projects.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';

// Importowanie serwisu animacji
import AnimationService from './services/AnimationService';

export default {
  name: 'App',
  components: {
    NavBar,
    Hero,
    AboutMe,
    TechStack,
    Projects,
    Contact,
    Footer
  },
  data() {
    return {
      isLoading: true,
      scrollAnimationCleanup: null
    }
  },
  mounted() {
    // Symulacja ładowania strony
    window.addEventListener('load', this.onWindowLoad);

    // W przypadku, gdy strona jest już załadowana (np. z cache)
    if (document.readyState === 'complete') {
      this.onWindowLoad();
    }

    // Inicjalizacja animacji po zakończeniu ładowania
    setTimeout(() => {
      this.initAnimations();
    }, 500);
  },

  beforeUnmount() {
    // Czyszczenie event listenerów
    window.removeEventListener('load', this.onWindowLoad);

    // Czyszczenie animacji
    if (this.scrollAnimationCleanup && typeof this.scrollAnimationCleanup === 'function') {
      this.scrollAnimationCleanup();
    }
  },

  watch: {
    // Obserwowanie zmian języka
    '$i18n.locale'(newLocale) {
      // Aktualizacja atrybutu lang w HTML
      document.documentElement.lang = newLocale;

      // Aktualizacja tytułu strony
      document.title = this.$t('meta.title');

      // Aktualizacja meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', this.$t('meta.description'));
      }
    }
  },

  methods: {
    onWindowLoad() {
      // Opóźnienie ukrycia loadera aby zapewnić płynne przejście
      setTimeout(() => {
        this.isLoading = false;
      }, 800);
    },
    initAnimations() {
      try {
        // Inicjalizacja animacji
        AnimationService.initAnimations();

        // Inicjalizacja animacji dla tytułów sekcji
        AnimationService.initSectionTitles();

        // Inicjalizacja animacji
        this.scrollAnimationCleanup = AnimationService.initAppleStyleAnimations();
      } catch (error) {
        console.error('Błąd podczas inicjalizacji animacji:', error);
      }
    }
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #2a2a72;
  --secondary-color: #009ffd;
  --accent-color: #ff7b73;
  --text-color: #333;
  --bg-color: #f7f7f7;
  --card-bg: #ffffff;
  --transition: all 0.3s ease-in-out;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  overflow-x: hidden;
}

.app {
  width: 100%;
  min-height: 100vh;
}

.section {
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: var(--transition);
}

.section-title.visible {
  opacity: 1;
  transform: translateY(0);
}

.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Animation Section - styl dla sekcji z animacjami typu Apple */
.animation-section {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.animation-section.active {
  opacity: 1;
  transform: translateY(0);
}

/* Styl loadera */
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--primary-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader {
  display: flex;
}

.loader .circle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: white;
  margin: 0 8px;
  animation: bounce 0.5s ease-in-out infinite alternate;
}

.loader .circle:nth-child(2) {
  animation-delay: 0.1s;
}

.loader .circle:nth-child(3) {
  animation-delay: 0.2s;
}

.loader-container p {
  color: white;
  margin-top: 10px;
  font-size: 1.2rem;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}

/* Animacja przejścia loadera */
.loader-enter-active, .loader-leave-active {
  transition: opacity 0.5s;
}

.loader-enter-from, .loader-leave-to {
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .section {
    padding: 3rem 1rem;
  }

  .section-title {
    font-size: 2rem;
  }
}
.language-switcher {
  z-index: 1001 !important;
}

/* Dodatkowe style dla lepszej integracji */
.app {
  position: relative;
}

/* Animacja zmiany języka */
.fade-transition {
  transition: opacity 0.3s ease-in-out;
}

.fade-transition.changing {
  opacity: 0.7;
}
</style>