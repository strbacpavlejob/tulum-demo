import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, CreditCard as Edit3, Camera, MapPin, Briefcase, GraduationCap } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <LinearGradient colors={['#FF6B9D', '#C44569']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
          <Settings size={24} color="#fff" />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.profileHeader}>
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400' }} 
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.cameraButton}>
                <Camera size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>Sarah Johnson</Text>
            <Text style={styles.age}>28 years old</Text>
            <TouchableOpacity style={styles.editButton}>
              <Edit3 size={16} color="#FF4458" />
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoCard}>
              <MapPin size={20} color="#FF4458" />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Location</Text>
                <Text style={styles.infoValue}>San Francisco, CA</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Briefcase size={20} color="#FF4458" />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Job</Text>
                <Text style={styles.infoValue}>Product Designer at Tech Co</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <GraduationCap size={20} color="#FF4458" />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Education</Text>
                <Text style={styles.infoValue}>Stanford University</Text>
              </View>
            </View>
          </View>

          <View style={styles.bioSection}>
            <Text style={styles.bioTitle}>About Me</Text>
            <Text style={styles.bioText}>
              Love hiking, photography, and good coffee ☕ Looking for someone to explore the city with! 
              Always up for trying new restaurants and weekend adventures. Let's create some amazing memories together!
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FF4458',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF4458',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  age: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#FF4458',
    borderRadius: 20,
  },
  editText: {
    color: '#FF4458',
    fontWeight: '500',
    marginLeft: 4,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoContent: {
    marginLeft: 16,
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  bioSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  photosSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  photosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  photosGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  photoSlot: {
    width: 100,
    height: 140,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    fontSize: 24,
    color: '#ccc',
    fontWeight: '300',
  },
});