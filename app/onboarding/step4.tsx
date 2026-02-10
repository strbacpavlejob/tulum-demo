import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Href } from 'expo-router';
import { useUserStore } from '@/stores/userStore';
import { Gender } from '@/types/User';
import {
  ChevronRight,
  ChevronLeft,
  Mars,
  Venus,
  CircleDot,
} from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitch from '@/components/LanguageSwitch';
import { FONTS } from '@/config/typography';

const GENDER_OPTIONS: {
  value: Gender;
  labelKey: string;
  icon: (selected: boolean) => React.ReactNode;
}[] = [
  {
    value: 'male',
    labelKey: 'gender.men',
    icon: (selected) => <Mars size={32} color="#000" />,
  },
  {
    value: 'female',
    labelKey: 'gender.women',
    icon: (selected) => <Venus size={32} color="#000" />,
  },
  {
    value: 'other',
    labelKey: 'gender.other',
    icon: (selected) => <CircleDot size={32} color="#000" />,
  },
];

export default function OnboardingStep4() {
  const router = useRouter();
  const { onboardingData, updateOnboardingData, setOnboardingStep } =
    useUserStore();
  const { t } = useLanguage();

  const [genderPreference, setGenderPreference] = useState<Gender[]>(
    onboardingData.preferences.genderPreference,
  );
  const [minAge, setMinAge] = useState(onboardingData.preferences.minAge);
  const [maxAge, setMaxAge] = useState(onboardingData.preferences.maxAge);

  const toggleGenderPreference = (gender: Gender) => {
    setGenderPreference((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender],
    );
  };

  const adjustAge = (type: 'min' | 'max', direction: 'up' | 'down') => {
    if (type === 'min') {
      const newValue = direction === 'up' ? minAge + 1 : minAge - 1;
      if (newValue >= 18 && newValue < maxAge) {
        setMinAge(newValue);
      }
    } else {
      const newValue = direction === 'up' ? maxAge + 1 : maxAge - 1;
      if (newValue <= 99 && newValue > minAge) {
        setMaxAge(newValue);
      }
    }
  };

  const handleNext = () => {
    updateOnboardingData({
      preferences: {
        ...onboardingData.preferences,
        genderPreference,
        minAge,
        maxAge,
      },
    });
    setOnboardingStep(5);
    router.push('/onboarding/step5' as Href);
  };

  const handleBack = () => {
    router.back();
  };

  const isFormValid = genderPreference.length > 0;

  const GridBackground = () => {
    const { width, height } = Dimensions.get('window');
    const gridSize = 30;
    const horizontalLines = Math.ceil(height / gridSize);
    const verticalLines = Math.ceil(width / gridSize);

    return (
      <View style={styles.gridContainer}>
        {Array.from({ length: horizontalLines }).map((_, i) => (
          <View
            key={`h-${i}`}
            style={[
              styles.gridLine,
              styles.horizontalLine,
              { top: i * gridSize },
            ]}
          />
        ))}
        {Array.from({ length: verticalLines }).map((_, i) => (
          <View
            key={`v-${i}`}
            style={[
              styles.gridLine,
              styles.verticalLine,
              { left: i * gridSize },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <LinearGradient colors={['#cebdff', '#cebdff']} style={styles.container}>
      <GridBackground />
      <View style={styles.languageSwitchContainer}>
        <LanguageSwitch />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.stepIndicator}>
            {t('onboarding.step4.stepIndicator')}
          </Text>
          <Text style={styles.title}>{t('onboarding.step4.title')}</Text>
          <Text style={styles.subtitle}>{t('onboarding.step4.subtitle')}</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>
              {t('onboarding.step4.showMe')}
            </Text>
            <View style={styles.genderContainer}>
              {GENDER_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.genderBox,
                    genderPreference.includes(option.value) &&
                      styles.genderBoxSelected,
                  ]}
                  onPress={() => toggleGenderPreference(option.value)}
                >
                  <View style={styles.genderIconContainer}>
                    {option.icon(genderPreference.includes(option.value))}
                  </View>
                  <Text
                    style={[
                      styles.genderBoxText,
                      genderPreference.includes(option.value) &&
                        styles.genderBoxTextSelected,
                    ]}
                  >
                    {t(option.labelKey)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>
              {t('onboarding.step4.ageRange')}
            </Text>
            <View style={styles.rangeContainer}>
              <View style={styles.rangeItem}>
                <Text style={styles.rangeLabel}>
                  {t('onboarding.step4.min')}
                </Text>
                <View style={styles.stepper}>
                  <TouchableOpacity
                    style={styles.stepperButton}
                    onPress={() => adjustAge('min', 'down')}
                  >
                    <Text style={styles.stepperButtonText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.stepperValue}>{minAge}</Text>
                  <TouchableOpacity
                    style={styles.stepperButton}
                    onPress={() => adjustAge('min', 'up')}
                  >
                    <Text style={styles.stepperButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.rangeSeparator}>
                {t('onboarding.step4.to')}
              </Text>

              <View style={styles.rangeItem}>
                <Text style={styles.rangeLabel}>
                  {t('onboarding.step4.max')}
                </Text>
                <View style={styles.stepper}>
                  <TouchableOpacity
                    style={styles.stepperButton}
                    onPress={() => adjustAge('max', 'down')}
                  >
                    <Text style={styles.stepperButtonText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.stepperValue}>{maxAge}</Text>
                  <TouchableOpacity
                    style={styles.stepperButton}
                    onPress={() => adjustAge('max', 'up')}
                  >
                    <Text style={styles.stepperButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ChevronLeft size={24} color="#000" />
            <Text style={styles.backButtonText}>{t('common.back')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.nextButton,
              !isFormValid && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={!isFormValid}
          >
            <Text style={styles.nextButtonText}>{t('common.continue')}</Text>
            <ChevronRight size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  languageSwitchContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 100,
  },
  gridContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  horizontalLine: {
    left: 0,
    right: 0,
    height: 1,
  },
  verticalLine: {
    top: 0,
    bottom: 0,
    width: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
  },
  stepIndicator: {
    fontSize: 14,
    fontFamily: FONTS.extraBold,
    color: '#fff',
    marginBottom: 8,
    textTransform: 'uppercase',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  title: {
    fontSize: 32,
    fontFamily: FONTS.extraBold,
    color: '#fff',
    marginBottom: 8,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: FONTS.extraBold,
    color: '#000',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  genderBox: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  genderBoxSelected: {
    backgroundColor: '#FFF9C4',
    borderColor: '#000',
  },
  genderIconContainer: {
    marginBottom: 8,
  },
  genderBoxText: {
    fontSize: 12,
    fontFamily: FONTS.extraBold,
    color: '#000',
    textTransform: 'uppercase',
  },
  genderBoxTextSelected: {
    color: '#000',
  },
  rangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rangeItem: {
    alignItems: 'center',
  },
  rangeLabel: {
    fontSize: 12,
    fontFamily: FONTS.bold,
    color: '#000',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  rangeSeparator: {
    fontSize: 16,
    fontFamily: FONTS.extraBold,
    color: '#000',
    marginHorizontal: 20,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    borderWidth: 3,
    borderColor: '#000',
  },
  stepperButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#cebdff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  stepperButtonText: {
    fontSize: 24,
    fontFamily: FONTS.extraBold,
    color: '#000',
  },
  stepperValue: {
    fontSize: 20,
    fontFamily: FONTS.extraBold,
    color: '#000',
    minWidth: 50,
    textAlign: 'center',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  distanceValue: {
    alignItems: 'center',
  },
  distanceNumber: {
    fontSize: 32,
    fontFamily: FONTS.extraBold,
    color: '#000',
  },
  distanceUnit: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: '#000',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 'auto',
  },
  backButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  backButtonText: {
    color: '#000',
    fontSize: 18,
    fontFamily: FONTS.extraBold,
    textTransform: 'uppercase',
  },
  nextButton: {
    flex: 2,
    backgroundColor: '#cebdff',
    borderRadius: 50,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  nextButtonDisabled: {
    opacity: 0.6,
    shadowOffset: { width: 2, height: 2 },
  },
  nextButtonText: {
    color: '#000',
    fontSize: 18,
    fontFamily: FONTS.extraBold,
    textTransform: 'uppercase',
  },
});
