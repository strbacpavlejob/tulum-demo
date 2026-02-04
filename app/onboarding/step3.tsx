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
            <ChevronLeft size={24} color="#000" />
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
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    textTransform: 'uppercase',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
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
    fontWeight: '800',
    color: '#000',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  optionLabelSelected: {
    color: '#000',
  },
  optionDescription: {
    fontSize: 14,
    fontWeight: '600',
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
    fontWeight: '900',
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
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});
