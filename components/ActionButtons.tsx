import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { X, Heart, RotateCcw, Star } from 'lucide-react-native';

interface ActionButtonsProps {
  onPass: () => void;
  onLike: () => void;
  onSuperLike: () => void;
  onRewind: () => void;
}

export default function ActionButtons({ onPass, onLike, onSuperLike, onRewind }: ActionButtonsProps) {
  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handlePress = (action: () => void) => {
    triggerHaptic();
    action();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.rewindButton]}
        onPress={() => handlePress(onRewind)}
        activeOpacity={0.8}
      >
        <RotateCcw size={24} color="#FFC107" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.passButton]}
        onPress={() => handlePress(onPass)}
        activeOpacity={0.8}
      >
        <X size={30} color="#FF4458" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.superLikeButton]}
        onPress={() => handlePress(onSuperLike)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#4FC3F7', '#29B6F6']}
          style={styles.gradientButton}
        >
          <Star size={24} color="#fff" fill="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.likeButton]}
        onPress={() => handlePress(onLike)}
        activeOpacity={0.8}
      >
        <Heart size={30} color="#4ECDC4" fill="#4ECDC4" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.boostButton]}
        onPress={() => handlePress(() => {})}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#AB47BC', '#8E24AA']}
          style={styles.gradientButton}
        >
          <View style={styles.lightning}>
            <View style={styles.lightningBolt} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 20,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rewindButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  passButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  superLikeButton: {
    padding: 0,
    overflow: 'hidden',
  },
  likeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  boostButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    padding: 0,
    overflow: 'hidden',
  },
  gradientButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightning: {
    width: 16,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightningBolt: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 4,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
    transform: [{ rotate: '15deg' }],
  },
});