import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../locales/en';
import vi from '../locales/vi';

// the translations
const resources = {
    en: {
        translation: en
    },
    vi: {
        translation: vi
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'vi',
        debug: true,
        detection: {
            order: ['localStorage', 'cookie', 'navigator'],
            caches: ['localStorage', 'cookie'],
            lookupLocalStorage: 'i18nextLng',
            cookieMinutes: 10080, 
        },
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;

