import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Href } from 'expo-router';
import { useUserStore } from '@/stores/userStore';
import { Gender } from '@/types/User';
import { ChevronRight, ChevronLeft } from 'lucide-react-native';

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Men' },
  { value: 'female', label: 'Women' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'other', label: 'Everyone' },
];

export default function OnboardingStep4() {
  const router = useRouter();
  const { onboardingData, updateOnboardingData, setOnboardingStep } =
    useUserStore();

  const [genderPreference, setGenderPreference] = useState<Gender[]>(
    onboardingData.preferences.genderPreference,
  );
  const [minAge, setMinAge] = useState(onboardingData.preferences.minAge);
  const [maxAge, setMaxAge] = useState(onboardingData.preferences.maxAge);
  const [maxDistance, setMaxDistance] = useState(
    onboardingData.preferences.maxDistance,
  );

  const toggleGenderPreference = (gender: Gender) => {
    if (gender === 'other') {
      // "Everyone" toggles all options
      if (genderPreference.length === GENDER_OPTIONS.length) {
        setGenderPreference([]);
      } else {
        setGenderPreference(GENDER_OPTIONS.map((g) => g.value));
      }
    } else {
      setGenderPreference((prev) =>
        prev.includes(gender)
          ? prev.filter((g) => g !== gender)
          : [...prev, gender],
      );
    }
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

  const adjustDistance = (direction: 'up' | 'down') => {
    const step = 5;
    const newValue =
      direction === 'up' ? maxDistance + step : maxDistance - step;
    if (newValue >= 5 && newValue <= 100) {
      setMaxDistance(newValue);
    }
  };

  const handleNext = () => {
    updateOnboardingData({
      preferences: {
        ...onboardingData.preferences,
        genderPreference,
        minAge,
        maxAge,
        maxDistance,
      },
    });
    setOnboardingStep(5);
    router.push('/onboarding/step5' as Href);
  };

  const handleBack = () => {
    router.back();
  };

  const isFormValid = genderPreference.length > 0;

  return (
    <LinearGradient
      colors={['#FF6B6B', '#FF8E8E', '#FFB4B4']}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.stepIndicator}>Step 4 of 5</Text>
          <Text style={styles.title}>Your preferences</Text>
          <Text style={styles.subtitle}>Who would you like to meet?</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Show me</Text>
            <View style={styles.genderContainer}>
              {GENDER_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.genderButton,
                    genderPreference.includes(option.value) &&
                      styles.genderButtonSelected,
                  ]}
                  onPress={() => toggleGenderPreference(option.value)}
                >
                  <Text
                    style={[
                      styles.genderButtonText,
                      genderPreference.includes(option.value) &&
                        styles.genderButtonTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Age range</Text>
            <View style={styles.rangeContainer}>
              <View style={styles.rangeItem}>
                <Text style={styles.rangeLabel}>Min</Text>
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

              <Text style={styles.rangeSeparator}>to</Text>

              <View style={styles.rangeItem}>
                <Text style={styles.rangeLabel}>Max</Text>
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

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Maximum distance</Text>
            <View style={styles.distanceContainer}>
              <TouchableOpacity
                style={styles.stepperButton}
                onPress={() => adjustDistance('down')}
              >
                <Text style={styles.stepperButtonText}>−</Text>
              </TouchableOpacity>
              <View style={styles.distanceValue}>
                <Text style={styles.distanceNumber}>{maxDistance}</Text>
                <Text style={styles.distanceUnit}>km</Text>
              </View>
              <TouchableOpacity
                style={styles.stepperButton}
                onPress={() => adjustDistance('up')}
              >
                <Text style={styles.stepperButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ChevronLeft size={24} color="#FF6B6B" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.nextButton,
              !isFormValid && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={!isFormValid}
          >
            <Text style={styles.nextButtonText}>Continue</Text>
            <ChevronRight size={24} color="#fff" />
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
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  genderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  genderButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  genderButtonSelected: {
    backgroundColor: '#FFE5E5',
    borderColor: '#FF6B6B',
  },
  genderButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  genderButtonTextSelected: {
    color: '#FF6B6B',
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
    color: '#999',
    marginBottom: 8,
  },
  rangeSeparator: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 20,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
  },
  stepperButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stepperButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  stepperValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
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
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  distanceUnit: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 'auto',
  },
  backButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  backButtonText: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButton: {
    flex: 2,
    backgroundColor: '#333',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  nextButtonDisabled: {
    opacity: 0.6,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
