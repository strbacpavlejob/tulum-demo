import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import i18n, {
  setLanguage,
  getCurrentLanguage,
  initializeLocale,
  AVAILABLE_LANGUAGES,
} from '@/i18n';

interface LanguageContextType {
  t: (key: string, options?: Record<string, string | number>) => string;
  locale: string;
  changeLanguage: (languageCode: string) => Promise<void>;
  availableLanguages: typeof AVAILABLE_LANGUAGES;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocale] = useState(getCurrentLanguage());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initializeLocale();
      setLocale(getCurrentLanguage());
      setIsReady(true);
    };
    init();
  }, []);

  const t = useCallback(
    (key: string, options?: Record<string, string | number>) => {
      return i18n.t(key, options);
    },
    [locale], // Re-create when locale changes
  );

  const changeLanguage = useCallback(async (languageCode: string) => {
    await setLanguage(languageCode);
    setLocale(languageCode);
  }, []);

  const value: LanguageContextType = {
    t,
    locale,
    changeLanguage,
    availableLanguages: AVAILABLE_LANGUAGES,
    isReady,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageProvider;
