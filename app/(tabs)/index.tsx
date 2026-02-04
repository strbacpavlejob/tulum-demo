import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SwipeCard from '@/components/SwipeCard';
import ActionButtons from '@/components/ActionButtons';
import MatchModal from '@/components/MatchModal';
import { mockProfiles } from '@/data/profiles';
import { Profile } from '@/types/Profile';
import { Settings } from 'lucide-react-native';

export default function DiscoverScreen() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [showMatch, setShowMatch] = useState(false);

  const handleSwipeLeft = (profile: Profile) => {
    console.log('Passed on:', profile.name);
    setTimeout(() => {
      setCurrentCardIndex((prev) => prev + 1);
    }, 300);
  };

  const handleSwipeRight = (profile: Profile) => {
    console.log('Liked:', profile.name);

    // Simulate match (30% chance)
    const isMatch = Math.random() > 0.7;

    if (isMatch) {
      setMatchedProfile(profile);
      setShowMatch(true);
    }

    setTimeout(() => {
      setCurrentCardIndex((prev) => prev + 1);
    }, 300);
  };

  const handlePass = () => {
    if (currentCardIndex < mockProfiles.length) {
      handleSwipeLeft(mockProfiles[currentCardIndex]);
    }
  };

  const handleLike = () => {
    if (currentCardIndex < mockProfiles.length) {
      handleSwipeRight(mockProfiles[currentCardIndex]);
    }
  };

  const handleRewind = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
    }
  };

  const renderCards = () => {
    const cardsToShow = 3;
    const visibleCards = [];

    for (let i = 0; i < cardsToShow; i++) {
      const cardIndex = currentCardIndex + i;
      if (cardIndex >= mockProfiles.length) break;

      visibleCards.push(
        <SwipeCard
          key={mockProfiles[cardIndex].id}
          profile={mockProfiles[cardIndex]}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          index={i}
          totalCards={cardsToShow}
        />,
      );
    }

    return visibleCards.reverse(); // Reverse to show proper stacking
  };

  const GridBackground = () => {
    const { width, height } = Dimensions.get('window');
    const gridSize = 30;
    const horizontalLines = Math.ceil(height / gridSize);
    const verticalLines = Math.ceil(width / gridSize);

    return (
      <View style={styles.gridContainer}>
        {/* Horizontal lines */}
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
        {/* Vertical lines */}
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

  if (currentCardIndex >= mockProfiles.length) {
    return (
      <LinearGradient colors={['#cebdff', '#cebdff']} style={styles.container}>
        <GridBackground />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No More Profiles!</Text>
            <Text style={styles.emptySubtitle}>
              Check back later for new people in your area
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#cebdff', '#cebdff']} style={styles.container}>
      <GridBackground />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>tinder</Text>
          <Settings size={24} color="#000" />
        </View>

        {/* Card Stack */}
        <View style={styles.cardStack}>{renderCards()}</View>

        {/* Action Buttons */}
        <ActionButtons
          onPass={handlePass}
          onLike={handleLike}
          onRewind={handleRewind}
        />

        {/* Match Modal */}
        <MatchModal
          visible={showMatch}
          profile={matchedProfile}
          onClose={() => setShowMatch(false)}
        />
      </SafeAreaView>
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
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
    fontFamily: 'System',
    textTransform: 'uppercase',
  },
  cardStack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  emptySubtitle: {
    fontSize: 18,
    color: '#000',
    opacity: 1,
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '700',
  },
});
