import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Pressable,
  Animated,
} from 'react-native';
import { Check } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { FONTS } from '@/config/typography';

const languages = [
  {
    code: 'sr',
    label: 'Srpski',
    flagUrl: 'https://hatscripts.github.io/circle-flags/flags/rs.svg',
  },
  {
    code: 'en',
    label: 'English',
    flagUrl: 'https://hatscripts.github.io/circle-flags/flags/gb.svg',
  },
  {
    code: 'ru',
    label: 'Русский',
    flagUrl: 'https://hatscripts.github.io/circle-flags/flags/ru.svg',
  },
];

interface LanguageSwitchProps {
  style?: object;
}

export default function LanguageSwitch({ style }: LanguageSwitchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, changeLanguage } = useLanguage();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const currentLang = languages.find((lang) => lang.code === locale);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleLanguageSelect = async (langCode: string) => {
    await changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          onPress={() => setIsOpen(true)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.button}
          activeOpacity={0.8}
        >
          {currentLang?.flagUrl ? (
            <Image
              source={{ uri: currentLang.flagUrl }}
              style={styles.flagIcon}
            />
          ) : (
            <Text style={styles.fallbackText}>🌐</Text>
          )}
        </TouchableOpacity>
      </Animated.View>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setIsOpen(false)}>
          <View style={styles.dropdown}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                onPress={() => handleLanguageSelect(lang.code)}
                style={[
                  styles.languageOption,
                  locale === lang.code && styles.languageOptionSelected,
                ]}
                activeOpacity={0.7}
              >
                <Image
                  source={{ uri: lang.flagUrl }}
                  style={styles.flagImage}
                />
                <Text
                  style={[
                    styles.languageLabel,
                    locale === lang.code && styles.languageLabelSelected,
                  ]}
                >
                  {lang.label}
                </Text>
                {locale === lang.code && (
                  <Check size={20} color="#000" style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000',
    overflow: 'hidden',
  },
  flagIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  fallbackText: {
    fontSize: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 8,
    minWidth: 220,
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 2,
  },
  languageOptionSelected: {
    backgroundColor: '#FFF9C4',
    borderWidth: 2,
    borderColor: '#000',
  },
  flagImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 14,
    borderWidth: 2,
    borderColor: '#000',
  },
  languageLabel: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: '#000',
    flex: 1,
  },
  languageLabelSelected: {
    fontFamily: FONTS.extraBold,
  },
  checkIcon: {
    marginLeft: 8,
  },
});
