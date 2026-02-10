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
import { LookingFor } from '@/types/User';
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  Coffee,
  Users,
  HelpCircle,
  PartyPopper,
} from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitch from '@/components/LanguageSwitch';
import { FONTS } from '@/config/typography';

const LOOKING_FOR_OPTIONS: {
  value: LookingFor;
  labelKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 'relationship',
    labelKey: 'lookingFor.relationship',
    descriptionKey: 'lookingFor.relationshipDesc',
    icon: <Heart size={32} color="#cebdff" />,
  },
  {
    value: 'casual',
    labelKey: 'lookingFor.casual',
    descriptionKey: 'lookingFor.casualDesc',
    icon: <Coffee size={32} color="#cebdff" />,
  },
  {
    value: 'friendship',
    labelKey: 'lookingFor.friendship',
    descriptionKey: 'lookingFor.friendshipDesc',
    icon: <Users size={32} color="#cebdff" />,
  },
  {
    value: 'not-sure',
    labelKey: 'lookingFor.notSure',
    descriptionKey: 'lookingFor.notSureDesc',
    icon: <HelpCircle size={32} color="#cebdff" />,
  },
  {
    value: 'party',
    labelKey: 'lookingFor.party',
    descriptionKey: 'lookingFor.partyDesc',
    icon: <PartyPopper size={32} color="#cebdff" />,
  },
];

export default function OnboardingStep3() {
  const router = useRouter();
  const { onboardingData, updateOnboardingData, setOnboardingStep } =
    useUserStore();
  const { t } = useLanguage();
  const [lookingFor, setLookingFor] = useState<LookingFor | null>(
    onboardingData.lookingFor,
  );

  const handleNext = () => {
    updateOnboardingData({ lookingFor });
    setOnboardingStep(4);
    router.push('/onboarding/step4' as Href);
  };

  const handleBack = () => {
    router.back();
  };

  const isFormValid = lookingFor !== null;

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
            {t('onboarding.step3.stepIndicator')}
          </Text>
          <Text style={styles.title}>{t('onboarding.step3.title')}</Text>
          <Text style={styles.subtitle}>{t('onboarding.step3.subtitle')}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {LOOKING_FOR_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionCard,
                lookingFor === option.value && styles.optionCardSelected,
              ]}
              onPress={() => setLookingFor(option.value)}
            >
              <View style={styles.optionIcon}>{option.icon}</View>
              <View style={styles.optionContent}>
                <Text
                  style={[
                    styles.optionLabel,
                    lookingFor === option.value && styles.optionLabelSelected,
                  ]}
                >
                  {t(option.labelKey)}
                </Text>
                <Text style={styles.optionDescription}>
                  {t(option.descriptionKey)}
                </Text>
              </View>
              <View
                style={[
                  styles.radioButton,
                  lookingFor === option.value && styles.radioButtonSelected,
                ]}
              >
                {lookingFor === option.value && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
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
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  optionCardSelected: {
    borderColor: '#000',
    backgroundColor: '#FFF9C4',
  },
  optionIcon: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 18,
    fontFamily: FONTS.extraBold,
    color: '#000',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  optionLabelSelected: {
    color: '#000',
  },
  optionDescription: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: '#333',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  radioButtonSelected: {
    borderColor: '#000',
    backgroundColor: '#FFF9C4',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: '#000',
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
