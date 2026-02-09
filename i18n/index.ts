import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import sr from './locales/sr.json';
import ru from './locales/ru.json';

const i18n = new I18n({
  en,
  sr,
  ru,
});

// Set the locale once at the beginning of your app
i18n.defaultLocale = 'en';
i18n.enableFallback = true;

// Storage key for persisted language
const LANGUAGE_KEY = '@app_language';

// Initialize locale from storage or device
export const initializeLocale = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    } else {
      // Get device locale and extract language code
      const deviceLocale = Localization.getLocales()[0]?.languageCode || 'en';
      // Check if device locale is supported, otherwise use English
      i18n.locale = ['en', 'sr', 'ru'].includes(deviceLocale)
        ? deviceLocale
        : 'en';
    }
  } catch (error) {
    console.error('Error loading language:', error);
    i18n.locale = 'en';
  }
};

// Change language and persist
export const setLanguage = async (languageCode: string) => {
  try {
    i18n.locale = languageCode;
    await AsyncStorage.setItem(LANGUAGE_KEY, languageCode);
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

// Get current language
export const getCurrentLanguage = () => i18n.locale;

// Available languages
export const AVAILABLE_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
];

export default i18n;
