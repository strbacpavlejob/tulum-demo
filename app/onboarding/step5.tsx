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
import { AVAILABLE_HOBBIES } from '@/types/User';
import { ChevronLeft, Check, Sparkles } from 'lucide-react-native';

const MIN_HOBBIES = 3;

export default function OnboardingStep5() {
  const router = useRouter();
  const { onboardingData, toggleHobby, completeOnboarding } = useUserStore();
  const { userId, email } = useAuthStore();
  const selectedHobbies = onboardingData.hobbies;

  const handleComplete = () => {
    if (userId && email) {
      completeOnboarding(userId, email);
      router.replace('/(tabs)' as Href);
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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.stepIndicator}>Step 5 of 5</Text>
          <Text style={styles.title}>Your interests</Text>
          <Text style={styles.subtitle}>
            Select at least {MIN_HOBBIES} hobbies you enjoy
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
            <Text style={styles.backButtonText}>Back</Text>
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
            <Text style={styles.completeButtonText}>Complete</Text>
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
    fontWeight: '800',
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
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  countHint: {
    fontWeight: '700',
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
    fontWeight: '900',
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
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});
