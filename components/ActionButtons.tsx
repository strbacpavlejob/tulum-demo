import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { X, Heart, RotateCcw } from 'lucide-react-native';

interface ActionButtonsProps {
  onPass: () => void;
  onLike: () => void;
  onRewind: () => void;
}

export default function ActionButtons({
  onPass,
  onLike,
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
        style={[styles.button, styles.passButton]}
        onPress={() => handlePress(onPass)}
        activeOpacity={0.8}
      >
        <X size={30} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.rewindButton]}
        onPress={() => handlePress(onRewind)}
        activeOpacity={0.8}
      >
        <RotateCcw size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.likeButton]}
        onPress={() => handlePress(onLike)}
        activeOpacity={0.8}
      >
        <Heart size={30} color="#000" fill="#000" />
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
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#000',
  },
  rewindButton: {
    width: 56,
    height: 56,
    backgroundColor: '#cebdff',
  },
  passButton: {
    width: 64,
    height: 64,
    backgroundColor: '#FF6B6B',
  },
  likeButton: {
    width: 64,
    height: 64,
    backgroundColor: '#4ECDC4',
  },
});
