import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Href } from 'expo-router';
import { useUserStore } from '@/stores/userStore';
import * as ImagePicker from 'expo-image-picker';
import {
  ChevronRight,
  ChevronLeft,
  Camera,
  X,
  Plus,
} from 'lucide-react-native';

const MAX_PHOTOS = 6;

export default function OnboardingStep2() {
  const router = useRouter();
  const { onboardingData, addPhoto, removePhoto, setOnboardingStep } =
    useUserStore();
  const photos = onboardingData.photos;

  const pickImage = async () => {
    if (photos.length >= MAX_PHOTOS) {
      Alert.alert(
        'Maximum photos reached',
        `You can only add up to ${MAX_PHOTOS} photos.`,
      );
      return;
    }

    // Permission request is not needed on web
    if (Platform.OS !== 'web') {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          'Permission required',
          'Please allow access to your photo library.',
        );
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      addPhoto(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    if (photos.length >= MAX_PHOTOS) {
      Alert.alert(
        'Maximum photos reached',
        `You can only add up to ${MAX_PHOTOS} photos.`,
      );
      return;
    }

    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Please allow access to your camera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      addPhoto(result.assets[0].uri);
    }
  };

  const handleRemovePhoto = (index: number) => {
    Alert.alert('Remove Photo', 'Are you sure you want to remove this photo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => removePhoto(index),
      },
    ]);
  };

  const showImageOptions = () => {
    // On web, Alert.alert with buttons doesn't work, so directly pick from library
    if (Platform.OS === 'web') {
      pickImage();
      return;
    }

    Alert.alert('Add Photo', 'Choose an option', [
      { text: 'Take Photo', onPress: takePhoto },
      { text: 'Choose from Library', onPress: pickImage },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleNext = () => {
    setOnboardingStep(3);
    router.push('/onboarding/step3' as Href);
  };

  const handleBack = () => {
    router.back();
  };

  const isFormValid = photos.length >= 1;

  const GridBackground = () => {
    const { width, height } = Dimensions.get('window');
    const gridSize = 30;
    const horizontalLines = Math.ceil(height / gridSize);
    const verticalLines = Math.ceil(width / gridSize);

    return (
      <View style={styles.gridContainer}>
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

  return (
    <LinearGradient colors={['#cebdff', '#cebdff']} style={styles.container}>
      <GridBackground />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.stepIndicator}>Step 2 of 5</Text>
          <Text style={styles.title}>Add your photos</Text>
          <Text style={styles.subtitle}>Add at least 1 photo to continue</Text>
        </View>

        <View style={styles.photoGrid}>
          {[...Array(MAX_PHOTOS)].map((_, index) => (
            <View key={index} style={styles.photoCell}>
              {photos[index] ? (
                <View style={styles.photoContainer}>
                  <Image source={{ uri: photos[index] }} style={styles.photo} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemovePhoto(index)}
                  >
                    <X size={16} color="#fff" />
                  </TouchableOpacity>
                  {index === 0 && (
                    <View style={styles.mainBadge}>
                      <Text style={styles.mainBadgeText}>Main</Text>
                    </View>
                  )}
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addPhotoButton}
                  onPress={showImageOptions}
                >
                  {index === 0 ? (
                    <Camera size={32} color="#000" />
                  ) : (
                    <Plus size={32} color="#CCC" />
                  )}
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <Text style={styles.hint}>
          Tip: Profiles with more photos get more matches!
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ChevronLeft size={24} color="#000" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.nextButton,
              !isFormValid && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={!isFormValid}
          >
            <Text style={styles.nextButtonText}>Continue</Text>
            <ChevronRight size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
  },
  stepIndicator: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    textTransform: 'uppercase',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  photoCell: {
    width: '31%',
    aspectRatio: 0.75,
    marginBottom: 12,
  },
  photoContainer: {
    flex: 1,
    borderRadius: 0,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#000',
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 0,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  mainBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#FFF9C4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 0,
    borderWidth: 2,
    borderColor: '#000',
  },
  mainBadgeText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  addPhotoButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  hint: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  backButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  nextButton: {
    flex: 2,
    backgroundColor: '#FFF9C4',
    borderRadius: 0,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  nextButtonDisabled: {
    opacity: 0.6,
    shadowOffset: { width: 2, height: 2 },
  },
  nextButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});
