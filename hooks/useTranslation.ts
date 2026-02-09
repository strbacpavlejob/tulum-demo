import { useState, useCallback, useEffect } from 'react';
import i18n, {
  setLanguage,
  getCurrentLanguage,
  AVAILABLE_LANGUAGES,
} from '@/i18n';

/**
 * Hook for using translations in components
 * Returns the translate function and language utilities
 */
export function useTranslation() {
  const [, setUpdate] = useState(0);

  // Force re-render when language changes
  const forceUpdate = useCallback(() => {
    setUpdate((prev) => prev + 1);
  }, []);

  // Translate function with interpolation support
  const t = useCallback(
    (key: string, options?: Record<string, string | number>) => {
      return i18n.t(key, options);
    },
    [],
  );

  // Change language and force re-render
  const changeLanguage = useCallback(
    async (languageCode: string) => {
      await setLanguage(languageCode);
      forceUpdate();
    },
    [forceUpdate],
  );

  return {
    t,
    locale: getCurrentLanguage(),
    changeLanguage,
    availableLanguages: AVAILABLE_LANGUAGES,
  };
}

export default useTranslation;
