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
import Projects from './components/Projects.vue';
import TechStack from './components/TechStack.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';
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
    document.documentElement.lang = this.$i18n.locale;
    document.title = this.$t('meta.title');

    // Ukryj loader od razu po zamontowaniu DOM (nie czekaj na pobranie wszystkich mediów w tle)
    requestAnimationFrame(() => {
      this.isLoading = false;
      this.initAnimations();
    });
  },

  beforeUnmount() {
    if (this.scrollAnimationCleanup && typeof this.scrollAnimationCleanup === 'function') {
      this.scrollAnimationCleanup();
    }
  },

  watch: {
    '$i18n.locale'(newLocale) {
      document.documentElement.lang = newLocale;
      document.title = this.$t('meta.title');

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', this.$t('meta.description'));
      }
    }
  },

  methods: {
    initAnimations() {
      try {
        AnimationService.initAnimations();
        AnimationService.initSectionTitles();
        this.scrollAnimationCleanup = AnimationService.initAppleStyleAnimations();
      } catch (error) {
        console.error('Błąd podczas inicjalizacji animacji:', error);
      }
    }
  }
}
</script>

<style>
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

html {
  scroll-behavior: smooth;
  scroll-padding-top: 70px;
}

body {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  overflow-x: hidden;
}

.app {
  width: 100%;
  min-height: 100vh;
  position: relative;
}

.section {
  padding: 4.5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.3rem;
  color: var(--primary-color);
  margin-bottom: 1.25rem;
  text-align: center;
  opacity: 0;
  transform: translateY(25px);
  transition: var(--transition);
}

.section-title.visible {
  opacity: 1;
  transform: translateY(0);
}

.fade-in {
  opacity: 0;
  transform: translateY(25px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

.animation-section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s ease, transform 0.7s ease;
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

.loader-enter-active, .loader-leave-active {
  transition: opacity 0.35s ease;
}

.loader-enter-from, .loader-leave-to {
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .section {
    padding: 3.25rem 1.25rem;
  }

  .section-title {
    font-size: 1.9rem;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 2.75rem 1rem;
  }

  .section-title {
    font-size: 1.65rem;
  }
}

.language-switcher {
  z-index: 1001 !important;
}

.fade-transition {
  transition: opacity 0.3s ease-in-out;
}

.fade-transition.changing {
  opacity: 0.7;
}
</style>
