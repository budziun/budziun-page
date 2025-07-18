import { createI18n } from 'vue-i18n'

// Importuj pliki z tłumaczeniami
import pl from './locales/pl.json'
import en from './locales/en.json'

// Funkcja wykrywania języka przeglądarki
const getBrowserLanguage = () => {
    const browserLang = navigator.language || navigator.userLanguage
    return browserLang.startsWith('en') ? 'en' : 'pl'
}

// Konfiguracja i18n
const i18n = createI18n({
    legacy: false, // Ważne dla Vue 3!
    locale: localStorage.getItem('selectedLanguage') || getBrowserLanguage(),
    fallbackLocale: 'pl',
    globalInjection: true,
    messages: {
        pl,
        en
    }
})

export default i18n
