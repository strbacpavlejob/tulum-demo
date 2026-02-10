import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { FONTS } from '@/config/typography';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart } from 'lucide-react-native';
import Logo from '@/components/Logo';
import AppleIcon from '@/components/AppleIcon';
import GoogleIcon from '@/components/GoogleIcon';
import { useRouter, Href } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitch from '@/components/LanguageSwitch';
import { useOAuth, useUser } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { useAuthStore } from '@/stores/authStore';

// Handle OAuth redirects
WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  useWarmUpBrowser();

  const { t } = useLanguage();
  const router = useRouter();
  const { setAuthenticated, setError, error, clearError, status } =
    useAuthStore();
  const { user } = useUser();

  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: 'oauth_google',
  });
  const { startOAuthFlow: startAppleOAuthFlow } = useOAuth({
    strategy: 'oauth_apple',
  });

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);

  const isLoading = status === 'loading' || isGoogleLoading || isAppleLoading;

  const handleOAuthSuccess = useCallback(
    async (userId: string, email: string | null) => {
      setAuthenticated(userId, email);
      router.replace('/onboarding/step1' as Href);
    },
    [setAuthenticated, router],
  );

  const handleGoogleSignIn = useCallback(async () => {
    try {
      setIsGoogleLoading(true);
      clearError();

      const { createdSessionId, setActive, signUp, signIn } =
        await startGoogleOAuthFlow();

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });

        // Get user info from the session
        const userData = signUp?.createdUserId || signIn?.createdSessionId;
        const userEmail = signUp?.emailAddress || signIn?.identifier;

        await handleOAuthSuccess(
          userData || createdSessionId,
          userEmail || null,
        );
      }
    } catch (err) {
      console.error('Google OAuth error:', err);
      setError(err instanceof Error ? err.message : 'Google sign in failed');
    } finally {
      setIsGoogleLoading(false);
    }
  }, [startGoogleOAuthFlow, handleOAuthSuccess, clearError, setError]);

  const handleAppleSignIn = useCallback(async () => {
    try {
      setIsAppleLoading(true);
      clearError();

      const { createdSessionId, setActive, signUp, signIn } =
        await startAppleOAuthFlow();

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });

        // Get user info from the session
        const userData = signUp?.createdUserId || signIn?.createdSessionId;
        const userEmail = signUp?.emailAddress || signIn?.identifier;

        await handleOAuthSuccess(
          userData || createdSessionId,
          userEmail || null,
        );
      }
    } catch (err) {
      console.error('Apple OAuth error:', err);
      setError(err instanceof Error ? err.message : 'Apple sign in failed');
    } finally {
      setIsAppleLoading(false);
    }
  }, [startAppleOAuthFlow, handleOAuthSuccess, clearError, setError]);

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
      <View style={styles.languageSwitchContainer}>
        <LanguageSwitch />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Logo width={96} height={96} style={styles.neoLogo} />
          <Text style={styles.appName}>{t('auth.appName')}</Text>
          <Text style={styles.tagline}>{t('auth.tagline')}</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>{t('auth.welcomeBack')}</Text>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Google Sign In Button */}
          <TouchableOpacity
            style={[styles.ssoButton, styles.googleButton]}
            onPress={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isGoogleLoading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <View style={styles.ssoIcon}>
                  <GoogleIcon width={24} height={24} />
                </View>
                <Text style={styles.ssoButtonText}>
                  {t('auth.continueWithGoogle')}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Apple Sign In Button */}
          <TouchableOpacity
            style={[styles.ssoButton, styles.appleButton]}
            onPress={handleAppleSignIn}
            disabled={isLoading}
          >
            {isAppleLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <View style={styles.appleIconContainer}>
                  <AppleIcon width={24} height={24} color="#fff" />
                </View>
                <Text style={[styles.ssoButtonText, styles.appleButtonText]}>
                  {t('auth.continueWithApple')}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.termsText}>
            {t('auth.termsAgreement')}
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  languageSwitchContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 100,
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
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  neoLogo: {
    // Drop shadow is now handled in the SVG itself
  },
  appName: {
    fontSize: 42,
    fontFamily: FONTS.extraBold,
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
    fontFamily: FONTS.extraBold,
    color: '#000',
    marginTop: 8,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
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
    fontFamily: FONTS.extraBold,
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
    textTransform: 'uppercase',
  },
  errorContainer: {
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#000',
  },
  errorText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: FONTS.bold,
  },
  ssoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  googleButton: {
    backgroundColor: '#fff',
  },
  appleButton: {
    backgroundColor: '#000',
  },
  ssoIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  appleIconContainer: {
    marginRight: 12,
  },
  appleIcon: {
    fontSize: 24,
    color: '#fff',
  },
  ssoButtonText: {
    fontSize: 16,
    fontFamily: FONTS.extraBold,
    color: '#000',
    textTransform: 'uppercase',
  },
  appleButtonText: {
    color: '#fff',
  },
  divider: {
    marginVertical: 20,
  },
  dividerLine: {
    height: 2,
    backgroundColor: '#000',
  },
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    fontFamily: FONTS.semiBold,
    marginTop: 16,
    lineHeight: 18,
  },
});
