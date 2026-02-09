// Clerk configuration
// Replace with your actual Clerk publishable key from https://dashboard.clerk.com
// Get your key from: https://dashboard.clerk.com/apps > [Your App] > API Keys
export const CLERK_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  'pk_test_YOUR_PUBLISHABLE_KEY';

// OAuth redirect URL for Expo - matches the scheme in app.json
// For development: exp://localhost:8081/--/oauth-callback
// For production: tulum://oauth-callback
export const OAUTH_REDIRECT_URL = 'tulum://oauth-callback';
