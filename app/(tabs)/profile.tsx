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
  MapPin,
  Briefcase,
  GraduationCap,
} from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <LinearGradient colors={['#cebdff', '#cebdff']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
          <Settings size={24} color="#fff" strokeWidth={3} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.profileHeader}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
                }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.cameraButton}>
                <Camera size={16} color="#000" />
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>Sarah Johnson</Text>
            <Text style={styles.age}>28 years old</Text>
            <TouchableOpacity style={styles.editButton}>
              <Edit3 size={16} color="#000" />
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoCard}>
              <MapPin size={20} color="#000" />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Location</Text>
                <Text style={styles.infoValue}>San Francisco, CA</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Briefcase size={20} color="#000" />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Job</Text>
                <Text style={styles.infoValue}>
                  Product Designer at Tech Co
                </Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <GraduationCap size={20} color="#000" />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Education</Text>
                <Text style={styles.infoValue}>Stanford University</Text>
              </View>
            </View>
          </View>

          <View style={styles.bioSection}>
            <Text style={styles.bioTitle}>About Me</Text>
            <Text style={styles.bioText}>
              Love hiking, photography, and good coffee ☕ Looking for someone
              to explore the city with! Always up for trying new restaurants and
              weekend adventures. Let's create some amazing memories together!
            </Text>
          </View>

          <View style={styles.photosSection}>
            <Text style={styles.photosTitle}>My Photos</Text>
            <View style={styles.photosGrid}>
              <TouchableOpacity style={styles.photoSlot}>
                <Text style={styles.addPhotoText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.photoSlot}>
                <Text style={styles.addPhotoText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.photoSlot}>
                <Text style={styles.addPhotoText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    borderRadius: 0,
    borderWidth: 4,
    borderColor: '#000',
  },
  cameraButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 36,
    height: 36,
    borderRadius: 0,
    backgroundColor: '#FFF9C4',
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
    borderRadius: 0,
    backgroundColor: '#FFF9C4',
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
    backgroundColor: '#FFF9C4',
    borderRadius: 0,
    borderWidth: 3,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  addPhotoText: {
    fontSize: 32,
    color: '#000',
    fontWeight: '900',
  },
});
