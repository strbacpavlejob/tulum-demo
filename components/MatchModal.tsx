import React, { useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Profile } from '@/types/Profile';
import { Heart, MessageCircle } from 'lucide-react-native';

interface MatchModalProps {
  visible: boolean;
  profile: Profile | null;
  onClose: () => void;
}

export default function MatchModal({
  visible,
  profile,
  onClose,
}: MatchModalProps) {
  const scale = useSharedValue(0);
  const heartScale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      opacity.value = withSpring(1);
      scale.value = withSequence(withSpring(1.2), withSpring(1));
      heartScale.value = withDelay(
        200,
        withSequence(withSpring(1.5), withSpring(1)),
      );
    } else {
      opacity.value = 0;
      scale.value = 0;
      heartScale.value = 0;
    }
  }, [visible]);

  const modalStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  if (!profile) return null;

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.overlay}>
        <LinearGradient
          colors={['#cebdff', '#cebdff']}
          style={styles.gradientBackground}
        >
          <Animated.View style={[styles.container, modalStyle]}>
            <Animated.View style={[styles.heartContainer, heartStyle]}>
              <Heart size={60} color="#000" fill="#000" />
            </Animated.View>

            <Text style={styles.matchText}>It's a Match!</Text>

            <Text style={styles.subtitle}>
              You and {profile.name} have liked each other
            </Text>

            <View style={styles.profileContainer}>
              <Image
                source={{ uri: profile.images[0] }}
                style={styles.profileImage}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.messageButton}
                activeOpacity={0.8}
              >
                <MessageCircle size={24} color="#fff" />
                <Text style={styles.messageText}>Send Message</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.continueButton}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Text style={styles.continueText}>Keep Swiping</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  heartContainer: {
    marginBottom: 30,
  },
  matchText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 18,
    color: '#000',
    opacity: 1,
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '700',
  },
  profileContainer: {
    marginBottom: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: '#000',
  },
  buttonContainer: {
    width: '100%',
  },
  messageButton: {
    backgroundColor: '#cebdff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  messageText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '900',
    marginLeft: 8,
    textTransform: 'uppercase',
  },
  continueButton: {
    borderWidth: 3,
    borderColor: '#000',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  continueText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});
