/**
 * Pomocnicze funkcje dla projektu portfolio
 */

/**
 * Opóźnia wykonanie funkcji o określony czas (debounce)
 * @param {Function} func - Funkcja do wykonania
 * @param {number} wait - Czas oczekiwania w milisekundach
 * @returns {Function} - Funkcja debounced
 */
export const debounce = (func, wait = 100) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

/**
 * Ogranicza częstotliwość wykonywania funkcji (throttle)
 * @param {Function} func - Funkcja do wykonania
 * @param {number} limit - Limit czasu w milisekundach
 * @returns {Function} - Funkcja throttled
 */
export const throttle = (func, limit = 100) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * Sprawdza czy element jest widoczny w viewport
 * @param {HTMLElement} element - Element do sprawdzenia
 * @param {number} offset - Offset w pikselach
 * @returns {boolean} - Czy element jest widoczny
 */
export const isElementInViewport = (element, offset = 0) => {
    if (!element) return false;

    const rect = element.getBoundingClientRect();

    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.bottom >= 0 - offset &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) + offset &&
        rect.right >= 0 - offset
    );
};

/**
 * Generuje losowy identyfikator
 * @returns {string} - Losowy identyfikator
 */
export const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

/**
 * Przenosi do określonej sekcji z płynnym przewijaniem
 * @param {string} sectionId - ID sekcji
 * @param {number} offset - Offset w pikselach (np. dla fixed navbar)
 */
export const scrollToSection = (sectionId, offset = 80) => {
    const element = document.getElementById(sectionId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

/**
 * Formatuje datę do przyjaznego formatu
 * @param {Date|string} date - Data do sformatowania
 * @returns {string} - Sformatowana data
 */
export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('pl-PL', options);
};

/**
 * Pobiera nazwę hosta z URL
 * @param {string} url - URL do przetworzenia
 * @returns {string} - Nazwa hosta
 */
export const getHostnameFromUrl = (url) => {
    try {
        return new URL(url).hostname.replace('www.', '');
    } catch (e) {
        return url;
    }
};

/**
 * Dzieli tablicę na mniejsze chunki
 * @param {Array} array - Tablica do podziału
 * @param {number} size - Rozmiar chunka
 * @returns {Array} - Tablica chunków
 */
export const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
        chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
};

/**
 * Zwraca losowy element z tablicy
 * @param {Array} array - Tablica, z której chcemy wylosować element
 * @returns {*} - Losowy element z tablicy
 */
export const getRandomFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

/**
 * Zapisuje dane w localStorage
 * @param {string} key - Klucz
 * @param {*} value - Wartość
 */
export const saveToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Error saving to localStorage', e);
    }
};

/**
 * Odczytuje dane z localStorage
 * @param {string} key - Klucz
 * @param {*} defaultValue - Domyślna wartość
 * @returns {*} - Odczytana wartość lub domyślna
 */
export const getFromLocalStorage = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error('Error reading from localStorage', e);
        return defaultValue;
    }
};