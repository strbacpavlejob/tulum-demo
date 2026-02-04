import React from 'react';
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
                  <Check size={16} color="#FF6B6B" style={styles.checkIcon} />
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
            <ChevronLeft size={24} color="#FF6B6B" />
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
            <Sparkles size={24} color="#fff" />
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
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hobbyChipSelected: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  checkIcon: {
    marginRight: 6,
  },
  hobbyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  hobbyTextSelected: {
    color: '#FF6B6B',
  },
  countContainer: {
    marginBottom: 24,
  },
  countText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  countHint: {
    fontWeight: 'normal',
    color: 'rgba(255, 255, 255, 0.8)',
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
  completeButton: {
    flex: 2,
    backgroundColor: '#FF6B6B',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  completeButtonDisabled: {
    opacity: 0.6,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
