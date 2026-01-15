<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': scrolled }">
    <div class="navbar-container">
      <div class="logo">
        <a href="#" @click.prevent="scrollToTop" class="logo">
          <span class="logo-text">budziun</span>
        </a>
      </div>

      <!-- LanguageSwitcher dla desktop - w prawym górnym rogu -->
      <LanguageSwitcher />

      <div class="nav-toggle" @click="toggleMenu">
        <div class="bar" :class="{ active: menuActive }"></div>
        <div class="bar" :class="{ active: menuActive }"></div>
        <div class="bar" :class="{ active: menuActive }"></div>
      </div>

      <ul class="nav-menu" :class="{ active: menuActive }">
        <!-- Przycisk zamykania menu na mobile -->
        <li class="mobile-close-btn">
          <button @click="toggleMenu" class="close-menu-btn">
            <span class="close-icon">&times;</span>
          </button>
        </li>

        <li v-for="item in navItems" :key="item.id">
          <a href="#" @click.prevent="scrollToSection(item.section)"
             :class="{ active: activeSection === item.section }">
            {{ $t(`nav.${item.section}`) }}
          </a>
        </li>

        <!-- Przełącznik języków w menu mobilnym -->
        <li class="mobile-language-switcher">
          <div class="mobile-lang-buttons">
            <button
                @click="setLanguage('pl')"
                :class="{ active: currentLocale === 'pl' }"
                class="mobile-lang-btn"
            >
              🇵🇱 Polski
            </button>
            <button
                @click="setLanguage('en')"
                :class="{ active: currentLocale === 'en' }"
                class="mobile-lang-btn"
            >
              🇬🇧 English
            </button>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import LanguageSwitcher from './LanguageSwitcher.vue'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

export default {
  name: 'NavBar',
  components: {
    LanguageSwitcher
  },
  setup() {
    const { locale } = useI18n()

    const currentLocale = computed(() => locale.value)

    const setLanguage = (newLang) => {
      locale.value = newLang
      localStorage.setItem('selectedLanguage', newLang)
    }

    return {
      currentLocale,
      setLanguage
    }
  },
  data() {
    return {
      menuActive: false,
      scrolled: false,
      activeSection: 'hero',
      navItems: [
        { id: 1, section: 'about' },
        { id: 2, section: 'projects' },
        { id: 3, section: 'tech' },
        { id: 4, section: 'contact' }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.checkSectionVisibility();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  watch: {
    '$i18n.locale'() {
      this.$nextTick(() => {
      });
    }
  },
  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive;
    },
    handleScroll() {
      this.scrolled = window.scrollY > 50;
      this.checkSectionVisibility();
    },
    checkSectionVisibility() {
      const sections = ['hero', 'about', 'projects', 'tech', 'contact'];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          if (rect.top <= windowHeight / 3 && rect.bottom >= windowHeight / 3) {
            this.activeSection = section;
            break;
          }
        }
      }
    },
    scrollToSection(section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
      this.menuActive = false;
    },
    scrollToTop() {
      this.menuActive = false;
      setTimeout(() => {
        const hero = document.getElementById('hero');
        if (hero) {
          hero.scrollIntoView({behavior: 'smooth', block: 'start'});
        } else {
          window.scrollTo({top: 0, behavior: 'smooth'});
        }
      }, window.innerWidth <= 768 ? 300 : 0);
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: transparent;
  padding: 1.5rem 0;
  transition: var(--transition);
}

.navbar-scrolled {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 0.8rem 0;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  min-height: 60px;
}

.navbar-scrolled .navbar-container {
  min-height: 50px;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
}

.logo a {
  text-decoration: none;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.navbar-scrolled .logo a {
  color: var(--primary-color);
  text-shadow: none;
}

.nav-menu {
  display: flex;
  list-style: none;
}

.nav-menu li {
  margin-left: 2rem;
}

.nav-menu a {
  text-decoration: none;
  color: #ffffff;
  font-weight: 600;
  padding: 0.5rem 0;
  position: relative;
  transition: var(--transition);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.navbar-scrolled .nav-menu a {
  color: var(--text-color);
  text-shadow: none;
  font-weight: 500;
}

.nav-menu a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--secondary-color);
  transition: var(--transition);
}

.nav-menu a:hover, .nav-menu a.active {
  color: #ff9800;
}

.navbar-scrolled .nav-menu a:hover, .navbar-scrolled .nav-menu a.active {
  color: var(--secondary-color);
}

.nav-menu a:hover::after, .nav-menu a.active::after {
  width: 100%;
}

.nav-toggle {
  display: none;
  cursor: pointer;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: #ffffff;
  margin: 5px 0;
  transition: var(--transition);
}

.navbar-scrolled .bar {
  background-color: var(--primary-color);
}

/* Przycisk zamykania menu na mobile */
.mobile-close-btn {
  display: none;
  position: absolute;
  top: 20px;
  right: 20px;
  margin: 0 !important;
}

.close-menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.1);
}

.close-menu-btn:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.close-icon {
  font-size: 24px;
  color: var(--text-color);
  font-weight: bold;
  line-height: 1;
}

/* Style dla mobilnego przełącznika języków */
.mobile-language-switcher {
  display: none;
  margin-top: 3rem; /* Zwiększona przerwa */
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  width: 80%;
}

.mobile-lang-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.mobile-lang-btn {
  padding: 1rem 2rem;
  border: 2px solid var(--primary-color);
  background: transparent;
  color: var(--primary-color);
  border-radius: 25px;
  cursor: pointer;
  transition: var(--transition);
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
  text-align: center;
}

.mobile-lang-btn.active,
.mobile-lang-btn:hover {
  background-color: var(--accent-color);
  color: white;
  border-color: var(--accent-color);
}

@media (max-width: 768px) {
  .nav-toggle {
    display: block;
  }

  .mobile-close-btn {
    display: block; /* Pokaż przycisk zamykania na mobile */
  }

  .mobile-language-switcher {
    display: block;
  }

  .nav-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    height: 100vh;
    background-color: var(--card-bg);
    flex-direction: column;
    justify-content: flex-start; /* Zmienione z center na flex-start */
    align-items: center;
    transition: var(--transition);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    padding-top: 80px; /* Dodana większa przerwa u góry */
    overflow-y: auto;
  }

  .nav-menu.active {
    right: 0;
  }

  .nav-menu li {
    margin: 2rem 0; /* Zwiększone odstępy między elementami menu */
  }

  .bar.active:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
  }

  .bar.active:nth-child(2) {
    opacity: 0;
  }

  .bar.active:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
  }

  .nav-menu a {
    color: var(--text-color);
    text-shadow: none;
    font-weight: 500;
    padding: 1rem 0; /* Zwiększony padding */
    position: relative;
    transition: var(--transition);
    font-size: 1.1rem; /* Zwiększony rozmiar czcionki */
  }
}
</style>
