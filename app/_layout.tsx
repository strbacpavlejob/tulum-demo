import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments, Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';
import { LanguageProvider } from '@/contexts/LanguageContext';

function AuthNavigator() {
  const router = useRouter();
  const segments = useSegments();
  const { status, token } = useAuthStore();
  const { profile } = useUserStore();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure navigation is mounted
    const timer = setTimeout(() => {
      setIsNavigationReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isNavigationReady) return;
    if (status === 'loading' || status === 'idle') return;

    const inAuthGroup = (segments[0] as string) === '(auth)';
    const inOnboarding = (segments[0] as string) === 'onboarding';
    const inTabsGroup = (segments[0] as string) === '(tabs)';

    if (!token) {
      // Not authenticated, redirect to auth
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
        router.replace('/(tabs)' as Href);
      }
    }
  }, [status, token, profile, segments, isNavigationReady]);

  return null;
}

export default function RootLayout() {
  useFrameworkReady();
  const { status } = useAuthStore();

  // Show loading screen while checking auth status
  if (status === 'idle') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#cebdff" />
      </View>
    );
  }

  return (
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
