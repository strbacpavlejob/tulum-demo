import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
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
      setCurrentCardIndex(prev => prev + 1);
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
      setCurrentCardIndex(prev => prev + 1);
    }, 300);
  };

  const handleSuperLike = () => {
    if (currentCardIndex < mockProfiles.length) {
      handleSwipeRight(mockProfiles[currentCardIndex]);
    }
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
      setCurrentCardIndex(prev => prev - 1);
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
        />
      );
    }
    
    return visibleCards.reverse(); // Reverse to show proper stacking
  };

  if (currentCardIndex >= mockProfiles.length) {
    return (
      <LinearGradient colors={['#FF6B9D', '#C44569']} style={styles.container}>
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
    <LinearGradient colors={['#FF6B9D', '#C44569']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>tinder</Text>
          <Settings size={24} color="#fff" />
        </View>

        {/* Card Stack */}
        <View style={styles.cardStack}>
          {renderCards()}
        </View>

        {/* Action Buttons */}
        <ActionButtons
          onPass={handlePass}
          onLike={handleLike}
          onSuperLike={handleSuperLike}
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
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'System',
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
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptySubtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: 26,
  },
});