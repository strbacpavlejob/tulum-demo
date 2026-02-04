import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { X, Heart, RotateCcw, Star } from 'lucide-react-native';

interface ActionButtonsProps {
  onPass: () => void;
  onLike: () => void;
  onSuperLike: () => void;
  onRewind: () => void;
}

export default function ActionButtons({
  onPass,
  onLike,
  onSuperLike,
  onRewind,
}: ActionButtonsProps) {
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
        <RotateCcw size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.passButton]}
        onPress={() => handlePress(onPass)}
        activeOpacity={0.8}
      >
        <X size={30} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.superLikeButton]}
        onPress={() => handlePress(onSuperLike)}
        activeOpacity={0.8}
      >
        <Star size={24} color="#000" fill="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.likeButton]}
        onPress={() => handlePress(onLike)}
        activeOpacity={0.8}
      >
        <Heart size={30} color="#000" fill="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.boostButton]}
        onPress={() => handlePress(() => {})}
        activeOpacity={0.8}
      >
        <View style={styles.lightning}>
          <View style={styles.lightningBolt} />
        </View>
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
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  rewindButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FFF9C4',
  },
  passButton: {
    width: 64,
    height: 64,
    backgroundColor: '#FF6B6B',
  },
  superLikeButton: {
    padding: 0,
    overflow: 'hidden',
    backgroundColor: '#4FC3F7',
  },
  likeButton: {
    width: 64,
    height: 64,
    backgroundColor: '#4ECDC4',
  },
  boostButton: {
    width: 48,
    height: 48,
    padding: 0,
    overflow: 'hidden',
    backgroundColor: '#AB47BC',
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
