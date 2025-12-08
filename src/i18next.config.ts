import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';  // Giả sử bạn có một file en.json
import vi from './locales/vi';  // Nhập đúng file vi.json

const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,  
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',  
  fallbackLng: 'en', 
  debug: true,  
});

export default i18n;
