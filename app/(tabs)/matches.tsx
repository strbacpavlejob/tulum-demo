import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageCircle, Heart } from 'lucide-react-native';

const matches = [
  {
    id: '1',
    name: 'Sarah',
    image:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'Hey! How are you?',
    time: '2h',
    isNew: true,
  },
  {
    id: '2',
    name: 'Emma',
    image:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'Thanks for the super like! 😊',
    time: '1d',
    isNew: false,
  },
];

export default function MatchesScreen() {
  return (
    <LinearGradient colors={['#cebdff', '#cebdff']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Matches</Text>
          <Heart size={24} color="#fff" fill="#fff" strokeWidth={3} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.newMatchesSection}>
            <Text style={styles.sectionTitle}>New Matches</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.newMatchesScroll}
            >
              {matches
                .filter((match) => match.isNew)
                .map((match) => (
                  <TouchableOpacity key={match.id} style={styles.newMatchCard}>
                    <Image
                      source={{ uri: match.image }}
                      style={styles.newMatchImage}
                    />
                    <Text style={styles.newMatchName}>{match.name}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>

          <View style={styles.messagesSection}>
            <Text style={styles.sectionTitle}>Messages</Text>
            {matches.map((match) => (
              <TouchableOpacity key={match.id} style={styles.messageCard}>
                <Image
                  source={{ uri: match.image }}
                  style={styles.messageImage}
                />
                <View style={styles.messageContent}>
                  <View style={styles.messageHeader}>
                    <Text style={styles.messageName}>{match.name}</Text>
                    <Text style={styles.messageTime}>{match.time}</Text>
                  </View>
                  <Text style={styles.messageText}>{match.lastMessage}</Text>
                </View>
                <MessageCircle size={20} color="#000" />
              </TouchableOpacity>
            ))}
          </View>

          {matches.length === 0 && (
            <View style={styles.emptyState}>
              <Heart size={60} color="#fff" opacity={0.5} />
              <Text style={styles.emptyTitle}>No matches yet</Text>
              <Text style={styles.emptySubtitle}>
                Keep swiping to find your perfect match!
              </Text>
            </View>
          )}
        </ScrollView>
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
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    textTransform: 'uppercase',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: 3,
    borderTopColor: '#000',
    paddingTop: 20,
  },
  newMatchesSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  newMatchesScroll: {
    flexDirection: 'row',
  },
  newMatchCard: {
    alignItems: 'center',
    marginRight: 20,
  },
  newMatchImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: '#000',
  },
  newMatchName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000',
    textTransform: 'uppercase',
  },
  messagesSection: {
    paddingHorizontal: 20,
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 3,
    borderBottomColor: '#000',
    backgroundColor: '#fff',
    marginBottom: 12,
    paddingHorizontal: 12,
    borderWidth: 3,
    borderColor: '#000',
  },
  messageImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
    borderWidth: 3,
    borderColor: '#000',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
    textTransform: 'uppercase',
  },
  messageTime: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
  },
  messageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  emptySubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
});
