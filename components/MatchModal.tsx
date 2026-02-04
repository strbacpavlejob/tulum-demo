import React, { useEffect } from 'react';
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
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

export default function MatchModal({ visible, profile, onClose }: MatchModalProps) {
  const scale = useSharedValue(0);
  const heartScale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      
      opacity.value = withSpring(1);
      scale.value = withSequence(
        withSpring(1.2),
        withSpring(1)
      );
      heartScale.value = withDelay(
        200,
        withSequence(
          withSpring(1.5),
          withSpring(1)
        )
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
          colors={['#FF6B9D', '#C44569']}
          style={styles.gradientBackground}
        >
          <Animated.View style={[styles.container, modalStyle]}>
            <Animated.View style={[styles.heartContainer, heartStyle]}>
              <Heart size={60} color="#fff" fill="#fff" />
            </Animated.View>
            
            <Text style={styles.matchText}>It's a Match!</Text>
            
            <Text style={styles.subtitle}>
              You and {profile.name} have liked each other
            </Text>
            
            <View style={styles.profileContainer}>
              <Image source={{ uri: profile.images[0] }} style={styles.profileImage} />
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.messageButton} activeOpacity={0.8}>
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
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 40,
  },
  profileContainer: {
    marginBottom: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  buttonContainer: {
    width: '100%',
  },
  messageButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    marginBottom: 16,
  },
  messageText: {
    color: '#C44569',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  continueButton: {
    borderWidth: 2,
    borderColor: '#fff',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});