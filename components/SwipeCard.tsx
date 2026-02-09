import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  interpolate,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { Profile } from '@/types/Profile';
import { MapPin } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.9;
const CARD_HEIGHT = screenHeight * 0.7;
const SWIPE_THRESHOLD = screenWidth * 0.25;

interface SwipeCardProps {
  profile: Profile;
  onSwipeLeft: (profile: Profile) => void;
  onSwipeRight: (profile: Profile) => void;
  index: number;
  totalCards: number;
}

export default function SwipeCard({
  profile,
  onSwipeLeft,
  onSwipeRight,
  index,
  totalCards,
}: SwipeCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotateZ = useSharedValue(0);
  const scale = useSharedValue(1);
  const { t } = useLanguage();

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      runOnJS(triggerHaptic)();
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      rotateZ.value = interpolate(
        event.translationX,
        [-screenWidth, 0, screenWidth],
        [-30, 0, 30],
      );

      // Scale effect for feedback
      const progress = Math.abs(event.translationX) / SWIPE_THRESHOLD;
      scale.value = interpolate(progress, [0, 1], [1, 0.95]);
    })
    .onEnd((event) => {
      const shouldSwipeRight = event.translationX > SWIPE_THRESHOLD;
      const shouldSwipeLeft = event.translationX < -SWIPE_THRESHOLD;

      if (shouldSwipeRight) {
        translateX.value = withTiming(
          screenWidth * 1.5,
          { duration: 300 },
          (finished) => {
            if (finished) {
              runOnJS(onSwipeRight)(profile);
            }
          },
        );
        rotateZ.value = withTiming(30, { duration: 300 });
        runOnJS(triggerHaptic)();
      } else if (shouldSwipeLeft) {
        translateX.value = withTiming(
          -screenWidth * 1.5,
          { duration: 300 },
          (finished) => {
            if (finished) {
              runOnJS(onSwipeLeft)(profile);
            }
          },
        );
        rotateZ.value = withTiming(-30, { duration: 300 });
        runOnJS(triggerHaptic)();
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotateZ.value = withSpring(0);
        scale.value = withSpring(1);
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      Math.abs(translateX.value),
      [0, SWIPE_THRESHOLD],
      [1, 0.8],
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${rotateZ.value}deg` },
        { scale: scale.value },
      ],
      opacity,
    };
  });

  const likeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1]),
  }));

  const passOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0]),
  }));

  const cardScaleStyle = useAnimatedStyle(() => {
    const baseScale = 0.95 - index * 0.05;
    const yOffset = index * 10;

    return {
      transform: [{ scale: baseScale }, { translateY: yOffset }],
      zIndex: totalCards - index,
    };
  });

  return (
    <View style={styles.cardContainer}>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[styles.card, cardStyle, index > 0 && cardScaleStyle]}
        >
          <Image source={{ uri: profile.images[0] }} style={styles.image} />

          {/* Swipe Indicators */}
          <Animated.View style={[styles.likeIndicator, likeOpacity]}>
            <Text style={styles.likeText}>{t('discover.like')}</Text>
          </Animated.View>

          <Animated.View style={[styles.passIndicator, passOpacity]}>
            <Text style={styles.passText}>{t('discover.pass')}</Text>
          </Animated.View>

          {/* Profile Info */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}
          >
            <View style={styles.info}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.age}>, {profile.age}</Text>
              </View>

              {profile.distance && (
                <View style={styles.distanceRow}>
                  <MapPin size={16} color="#fff" />
                  <Text style={styles.distance}>
                    {t('discover.kmAway', {
                      distance: profile.distance.toString(),
                    })}
                  </Text>
                </View>
              )}

              <Text style={styles.bio} numberOfLines={3}>
                {profile.bio}
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    justifyContent: 'flex-end',
  },
  info: {
    padding: 20,
    paddingBottom: 30,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  age: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  distance: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 4,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  bio: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    lineHeight: 22,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  likeIndicator: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#000',
    zIndex: 1,
  },
  likeText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  passIndicator: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#000',
    zIndex: 1,
  },
  passText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});
