import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments, Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { tokenCache } from '@/lib/tokenCache';
import { CLERK_PUBLISHABLE_KEY } from '@/config/clerk';
import {
  useFonts,
  Sora_100Thin,
  Sora_200ExtraLight,
  Sora_300Light,
  Sora_400Regular,
  Sora_500Medium,
  Sora_600SemiBold,
  Sora_700Bold,
  Sora_800ExtraBold,
} from '@expo-google-fonts/sora';
import * as SplashScreen from 'expo-splash-screen';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function AuthNavigator() {
  const router = useRouter();
  const segments = useSegments();
  const { isSignedIn, isLoaded } = useAuth();
  const { profile } = useUserStore();
  const { setAuthenticated, logout } = useAuthStore();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure navigation is mounted
    const timer = setTimeout(() => {
      setIsNavigationReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isNavigationReady || !isLoaded) return;

    const inAuthGroup = (segments[0] as string) === '(auth)';
    const inOnboarding = (segments[0] as string) === 'onboarding';
    const inTabsGroup = (segments[0] as string) === '(tabs)';

    console.log('Navigation check:', {
      isSignedIn,
      onboardingCompleted: profile?.onboardingCompleted,
      currentSegment: segments[0],
    });

    if (!isSignedIn) {
      // Not authenticated, redirect to auth
      logout();
      if (!inAuthGroup) {
        router.replace('/(auth)' as Href);
      }
    } else if (!profile?.onboardingCompleted) {
      // Authenticated but onboarding not complete
      if (!inOnboarding) {
        router.replace('/onboarding/step1' as Href);
      }
    } else {
      // Authenticated and onboarding complete
      if (!inTabsGroup) {
        console.log('Navigating to tabs after onboarding complete');
        router.replace('/(tabs)' as Href);
      }
    }
  }, [
    isSignedIn,
    isLoaded,
    profile,
    segments,
    isNavigationReady,
    router,
    logout,
  ]);

  return null;
}

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    Sora_100Thin,
    Sora_200ExtraLight,
    Sora_300Light,
    Sora_400Regular,
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <ClerkLoaded>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <LanguageProvider>
            <AuthNavigator />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </LanguageProvider>
        </GestureHandlerRootView>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
