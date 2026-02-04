import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart } from 'lucide-react-native';
import { useAuthStore } from '@/stores/authStore';
import { useRouter, Href } from 'expo-router';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { login, register, status, error, clearError } = useAuthStore();
  const router = useRouter();

  const isLoading = status === 'loading';

  const handleSubmit = async () => {
    if (isLogin) {
      const success = await login(email, password);
      if (success) {
        router.replace('/onboarding/step1' as Href);
      }
    } else {
      if (password !== confirmPassword) {
        return;
      }
      const success = await register(email, password);
      if (success) {
        router.replace('/onboarding/step1' as Href);
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    clearError();
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const isFormValid = isLogin
    ? email.length > 0 && password.length >= 6
    : email.length > 0 && password.length >= 6 && password === confirmPassword;

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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Heart size={48} color="#000" fill="#000" />
            </View>
            <Text style={styles.appName}>Tulum</Text>
            <Text style={styles.tagline}>Find your perfect match</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </Text>

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            {!isLogin && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={[
                    styles.input,
                    password !== confirmPassword && confirmPassword.length > 0
                      ? styles.inputError
                      : null,
                  ]}
                  placeholder="Confirm your password"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  editable={!isLoading}
                />
                {password !== confirmPassword && confirmPassword.length > 0 && (
                  <Text style={styles.fieldError}>Passwords do not match</Text>
                )}
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.submitButton,
                !isFormValid && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleMode} disabled={isLoading}>
              <Text style={styles.toggleText}>
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Sign In'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  appName: {
    fontSize: 42,
    fontWeight: '900',
    color: '#fff',
    marginTop: 16,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 24,
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
    textTransform: 'uppercase',
  },
  errorContainer: {
    backgroundColor: '#cebdff',
    padding: 12,
    borderRadius: 0,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#000',
  },
  errorText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#FFF9C4',
    borderRadius: 0,
    padding: 16,
    fontSize: 16,
    color: '#000',
    borderWidth: 3,
    borderColor: '#000',
    fontWeight: '600',
  },
  inputError: {
    borderColor: '#FF4444',
    backgroundColor: '#FFE5E5',
  },
  fieldError: {
    color: '#FF4444',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '700',
  },
  submitButton: {
    backgroundColor: '#cebdff',
    borderRadius: 0,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#CCCCCC',
    shadowOffset: { width: 2, height: 2 },
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  toggleText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
