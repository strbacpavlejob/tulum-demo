import React from 'react';
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
import { useAuthStore } from '@/stores/authStore';
import { useUser } from '@clerk/clerk-expo';
import { AVAILABLE_HOBBIES } from '@/types/User';
import { ChevronLeft, Check, Sparkles } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitch from '@/components/LanguageSwitch';
import { FONTS } from '@/config/typography';

const MIN_HOBBIES = 3;

export default function OnboardingStep5() {
  const router = useRouter();
  const { onboardingData, toggleHobby, completeOnboarding } = useUserStore();
  const { userId, email } = useAuthStore();
  const { user } = useUser();
  const { t } = useLanguage();
  const selectedHobbies = onboardingData.hobbies;

  const handleComplete = () => {
    // Use Clerk user data as fallback if authStore is not set
    const finalUserId = userId || user?.id;
    const finalEmail = email || user?.primaryEmailAddress?.emailAddress;

    if (finalUserId && finalEmail) {
      completeOnboarding(finalUserId, finalEmail);
      // Navigate immediately - AuthNavigator will handle redirection based on profile state
      router.replace('/(tabs)' as Href);
    } else {
      console.error('Missing user data:', { finalUserId, finalEmail });
    }
  };

  const handleBack = () => {
    router.back();
  };

  const isFormValid = selectedHobbies.length >= MIN_HOBBIES;

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
            {t('onboarding.step5.stepIndicator')}
          </Text>
          <Text style={styles.title}>{t('onboarding.step5.title')}</Text>
          <Text style={styles.subtitle}>
            {t('onboarding.step5.subtitle', { count: MIN_HOBBIES.toString() })}
          </Text>
        </View>

        <View style={styles.hobbiesContainer}>
          {AVAILABLE_HOBBIES.map((hobby) => {
            const isSelected = selectedHobbies.includes(hobby);
            return (
              <TouchableOpacity
                key={hobby}
                style={[
                  styles.hobbyChip,
                  isSelected && styles.hobbyChipSelected,
                ]}
                onPress={() => toggleHobby(hobby)}
              >
                {isSelected && (
                  <Check size={16} color="#000" style={styles.checkIcon} />
                )}
                <Text
                  style={[
                    styles.hobbyText,
                    isSelected && styles.hobbyTextSelected,
                  ]}
                >
                  {hobby}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.countContainer}>
          <Text style={styles.countText}>
            {selectedHobbies.length} selected
            {selectedHobbies.length < MIN_HOBBIES && (
              <Text style={styles.countHint}>
                {' '}
                (need {MIN_HOBBIES - selectedHobbies.length} more)
              </Text>
            )}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ChevronLeft size={24} color="#000" />
            <Text style={styles.backButtonText}>{t('common.back')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.completeButton,
              !isFormValid && styles.completeButtonDisabled,
            ]}
            onPress={handleComplete}
            disabled={!isFormValid}
          >
            <Sparkles size={24} color="#000" />
            <Text style={styles.completeButtonText}>
              {t('onboarding.step5.getStarted')}
            </Text>
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
  hobbiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  hobbyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
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
  hobbyChipSelected: {
    backgroundColor: '#FFF9C4',
    borderWidth: 3,
    borderColor: '#000',
  },
  checkIcon: {
    marginRight: 6,
  },
  hobbyText: {
    fontSize: 14,
    fontFamily: FONTS.extraBold,
    color: '#000',
    textTransform: 'uppercase',
  },
  hobbyTextSelected: {
    color: '#000',
  },
  countContainer: {
    marginBottom: 24,
  },
  countText: {
    fontSize: 16,
    fontFamily: FONTS.extraBold,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  countHint: {
    fontFamily: FONTS.bold,
    color: '#fff',
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
  completeButton: {
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
    elevation: 8,
  },
  completeButtonDisabled: {
    opacity: 0.6,
    shadowOffset: { width: 2, height: 2 },
  },
  completeButtonText: {
    color: '#000',
    fontSize: 18,
    fontFamily: FONTS.extraBold,
    textTransform: 'uppercase',
  },
});
