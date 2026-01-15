<template>
  <div class="language-switcher">
    <button
        @click="setLanguage('pl')"
        :class="{ active: currentLocale === 'pl' }"
        class="lang-btn"
        :title="$t('common.switchToPolish')"
    >
      PL
    </button>
    <button
        @click="setLanguage('en')"
        :class="{ active: currentLocale === 'en' }"
        class="lang-btn"
        :title="$t('common.switchToEnglish')"
    >
      EN
    </button>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

export default {
  name: 'LanguageSwitcher',
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
  }
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: 2rem;
  align-items: center;
  height: fit-content;
  transition: all 0.3s ease;
}

.lang-btn {
  padding: 0.4rem 0.8rem;
  border: 2px solid transparent;
  background: transparent;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.85rem;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lang-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.lang-btn.active {
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
  box-shadow: 0 2px 10px rgba(255, 123, 115, 0.4);
  text-shadow: none;
}

.lang-btn.active:hover {
  background: var(--accent-color);
  transform: translateY(-1px);
}

/* Style dla stanu scrolled */
.navbar-scrolled .language-switcher {
  background: rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.navbar-scrolled .lang-btn {
  color: var(--text-color);
  text-shadow: none;
  font-size: 0.8rem;
  padding: 0.3rem 0.7rem;
}

.navbar-scrolled .lang-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.navbar-scrolled .lang-btn.active {
  background: var(--accent-color);
  color: white;
}

/* Responsywność - ukryj na mobile */
@media (max-width: 768px) {
  .language-switcher {
    display: none; /* Ukryj na mobile - będzie w hamburgerze */
  }
}
</style>
