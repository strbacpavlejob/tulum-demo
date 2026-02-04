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
import { LookingFor } from '@/types/User';
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  Coffee,
  Users,
  HelpCircle,
} from 'lucide-react-native';

const LOOKING_FOR_OPTIONS: {
  value: LookingFor;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 'relationship',
    label: 'Relationship',
    description: 'Looking for something serious',
    icon: <Heart size={32} color="#FF6B6B" />,
  },
  {
    value: 'casual',
    label: 'Casual',
    description: 'Open to see where things go',
    icon: <Coffee size={32} color="#FF6B6B" />,
  },
  {
    value: 'friendship',
    label: 'Friendship',
    description: 'Looking to make new friends',
    icon: <Users size={32} color="#FF6B6B" />,
  },
  {
    value: 'not-sure',
    label: 'Not Sure Yet',
    description: 'Still figuring things out',
    icon: <HelpCircle size={32} color="#FF6B6B" />,
  },
];

export default function OnboardingStep3() {
  const router = useRouter();
  const { onboardingData, updateOnboardingData, setOnboardingStep } =
    useUserStore();
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
          <Text style={styles.stepIndicator}>Step 3 of 5</Text>
          <Text style={styles.title}>What are you looking for?</Text>
          <Text style={styles.subtitle}>
            This helps us find better matches for you
          </Text>
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
                  {option.label}
                </Text>
                <Text style={styles.optionDescription}>
                  {option.description}
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
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionCardSelected: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF5F5',
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
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  optionLabelSelected: {
    color: '#FF6B6B',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#FF6B6B',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF6B6B',
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
