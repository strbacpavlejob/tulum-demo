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
import {
  Settings,
  CreditCard as Edit3,
  Camera,
  Heart,
  Sparkles,
  LogOut,
} from 'lucide-react-native';
import { useUserStore } from '@/stores/userStore';
import { useLanguage } from '@/contexts/LanguageContext';
import { useClerk } from '@clerk/clerk-expo';
import { useAuthStore } from '@/stores/authStore';

export default function ProfileScreen() {
  const { profile, onboardingData, resetOnboarding } = useUserStore();
  const { t } = useLanguage();
  const { signOut } = useClerk();
  const { logout } = useAuthStore();

  // Use profile if available, otherwise fall back to onboardingData
  const name = profile?.name || onboardingData.name || 'Your Name';
  const age = profile?.age || onboardingData.age || 18;
  const photos = profile?.photos || onboardingData.photos || [];
  const lookingFor = profile?.lookingFor || onboardingData.lookingFor;
  const hobbies = profile?.hobbies || onboardingData.hobbies || [];
  const bio = profile?.bio || '';

  const handleSignOut = async () => {
    try {
      await signOut();
      logout();
      resetOnboarding();
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return (
    <LinearGradient colors={['#cebdff', '#cebdff']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('profile.title')}</Text>
          <Settings size={24} color="#fff" strokeWidth={3} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.profileHeader}>
            <View style={styles.imageContainer}>
              {photos.length > 0 ? (
                <Image
                  source={{ uri: photos[0] }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={[styles.profileImage, styles.placeholderImage]}>
                  <Camera size={40} color="#999" />
                </View>
              )}
              <TouchableOpacity style={styles.cameraButton}>
                <Camera size={16} color="#000" />
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.age}>
              {t('profile.yearsOld', { age: age.toString() })}
            </Text>
            <TouchableOpacity style={styles.editButton}>
              <Edit3 size={16} color="#000" />
              <Text style={styles.editText}>{t('profile.editProfile')}</Text>
            </TouchableOpacity>
          </View>

          {lookingFor && (
            <View style={styles.infoSection}>
              <View style={styles.infoCard}>
                <Heart size={20} color="#000" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoTitle}>
                    {t('profile.lookingFor')}
                  </Text>
                  <Text style={styles.infoValue}>
                    {t(
                      `lookingFor.${lookingFor === 'not-sure' ? 'notSure' : lookingFor}`,
                    )}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {bio ? (
            <View style={styles.bioSection}>
              <Text style={styles.bioTitle}>{t('profile.aboutMe')}</Text>
              <Text style={styles.bioText}>{bio}</Text>
            </View>
          ) : null}

          {hobbies.length > 0 && (
            <View style={styles.hobbiesSection}>
              <Text style={styles.hobbiesTitle}>
                {t('profile.myInterests')}
              </Text>
              <View style={styles.hobbiesContainer}>
                {hobbies.map((hobby, index) => (
                  <View key={index} style={styles.hobbyChip}>
                    <Sparkles size={14} color="#000" />
                    <Text style={styles.hobbyText}>{hobby}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.photosSection}>
            <Text style={styles.photosTitle}>{t('profile.myPhotos')}</Text>
            <View style={styles.photosGrid}>
              {photos.slice(1, 3).map((photo, index) => (
                <View key={index} style={styles.photoSlot}>
                  <Image source={{ uri: photo }} style={styles.gridPhoto} />
                </View>
              ))}
              {Array.from({ length: Math.max(0, 2 - (photos.length - 1)) }).map(
                (_, index) => (
                  <TouchableOpacity
                    key={`empty-${index}`}
                    style={styles.photoSlot}
                  >
                    <Text style={styles.addPhotoText}>+</Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          </View>

          {/* Sign Out Button */}
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <LogOut size={20} color="#fff" />
            <Text style={styles.signOutText}>{t('profile.signOut')}</Text>
          </TouchableOpacity>
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
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: '#000',
  },
  cameraButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#cebdff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000',
  },
  name: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  age: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 50,
    backgroundColor: '#cebdff',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  editText: {
    color: '#000',
    fontWeight: '800',
    marginLeft: 8,
    textTransform: 'uppercase',
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 3,
    borderColor: '#000',
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  infoContent: {
    marginLeft: 16,
    flex: 1,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  bioSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  bioText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    lineHeight: 24,
  },
  photosSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  photosTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  photosGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  photoSlot: {
    width: 100,
    height: 140,
    backgroundColor: '#cebdff',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    overflow: 'hidden',
  },
  gridPhoto: {
    width: '100%',
    height: '100%',
  },
  addPhotoText: {
    fontSize: 32,
    color: '#000',
    fontWeight: '900',
  },
  placeholderImage: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hobbiesSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  hobbiesTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  hobbiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  hobbyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FFF9C4',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  hobbyText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#000',
    marginTop: 24,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#fff',
    textTransform: 'uppercase',
  },
});
