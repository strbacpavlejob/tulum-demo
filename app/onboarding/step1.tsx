import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Href } from 'expo-router';
import { useUserStore } from '@/stores/userStore';
import { Gender } from '@/types/User';
import { ChevronRight, Circle } from 'lucide-react-native';
import { Mars, Venus } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@clerk/clerk-expo';
import LanguageSwitch from '@/components/LanguageSwitch';
import { FONTS } from '@/config/typography';

const GENDER_OPTIONS: {
  value: Gender;
  label: string;
  icon: (selected: boolean) => React.ReactNode;
}[] = [
  {
    value: 'male',
    label: 'Male',
    icon: (selected) => <Mars size={32} color={selected ? '#000' : '#000'} />,
  },
  {
    value: 'female',
    label: 'Female',
    icon: (selected) => <Venus size={32} color={selected ? '#000' : '#000'} />,
  },
  {
    value: 'other',
    label: 'Other',
    icon: (selected) => <Circle size={32} color={selected ? '#000' : '#000'} />,
  },
];

export default function OnboardingStep1() {
  const router = useRouter();
  const { onboardingData, updateOnboardingData, setOnboardingStep } =
    useUserStore();
  const { t } = useLanguage();
  const { user } = useUser();

  const firstName = user?.firstName || user?.fullName?.split(' ')[0] || '';
  const [age, setAge] = useState(onboardingData.age.toString());
  const [gender, setGender] = useState<Gender | null>(onboardingData.gender);

  const isFormValid =
    parseInt(age) >= 18 && parseInt(age) <= 120 && gender !== null;

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

  const handleNext = () => {
    updateOnboardingData({
      name: firstName,
      age: parseInt(age),
      gender,
    });
    setOnboardingStep(2);
    router.push('/onboarding/step2' as Href);
  };

  return (
    <LinearGradient colors={['#cebdff', '#cebdff']} style={styles.container}>
      <GridBackground />
      <View style={styles.languageSwitchContainer}>
        <LanguageSwitch />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.stepIndicator}>
              {t('onboarding.step1.stepIndicator')}
            </Text>
            <Text style={styles.title}>
              {firstName
                ? `${t('onboarding.step1.greeting')} ${firstName}, ${t('onboarding.step1.title')}`
                : t('onboarding.step1.titleDefault')}
            </Text>
            <Text style={styles.subtitle}>
              {t('onboarding.step1.subtitle')}
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('onboarding.step1.ageLabel')}</Text>
              <TextInput
                style={styles.input}
                placeholder={t('onboarding.step1.agePlaceholder')}
                placeholderTextColor="#999"
                value={age}
                onChangeText={(text) => setAge(text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
                maxLength={3}
              />
              {parseInt(age) < 18 && age.length > 0 && (
                <Text style={styles.errorText}>
                  {t('onboarding.step1.ageError')}
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {t('onboarding.step1.genderLabel')}
              </Text>
              <View style={styles.genderContainer}>
                {GENDER_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.genderBox,
                      gender === option.value && styles.genderBoxSelected,
                    ]}
                    onPress={() => setGender(option.value)}
                  >
                    <View style={styles.genderIconContainer}>
                      {option.icon(gender === option.value)}
                    </View>
                    <Text
                      style={[
                        styles.genderBoxText,
                        gender === option.value && styles.genderBoxTextSelected,
                      ]}
                    >
                      {t(`gender.${option.value}`)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

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
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
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
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontFamily: FONTS.extraBold,
    color: '#000',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#000',
    borderWidth: 3,
    borderColor: '#000',
    fontFamily: FONTS.semiBold,
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    marginTop: 8,
    fontFamily: FONTS.bold,
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
  nextButton: {
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
    elevation: 8,
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
