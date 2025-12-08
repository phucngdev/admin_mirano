import 'react-i18next';
import en from './locales/en';
import vi from './locales/vi';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof en;
      vi: typeof vi;
    };
  }
}
