import I18n from 'i18n-js';
import { LOCALES } from '@/common';

//default locale
I18n.defaultLocale = LOCALES.ENGLISH.name;

// Enable fallbacks  to `en`
I18n.fallbacks = true;

//current locale
I18n.locale = LOCALES.VIETNAMESE.name;

I18n.translations = {
  en: require('./languages/english.json'),
  vn: require('./languages/vietnamese.json'),
};
