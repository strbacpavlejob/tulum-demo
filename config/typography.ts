import { StyleSheet, TextStyle } from 'react-native';

// Font family constants
export const FONTS = {
  regular: 'Sora_400Regular',
  medium: 'Sora_500Medium',
  semiBold: 'Sora_600SemiBold',
  bold: 'Sora_700Bold',
  extraBold: 'Sora_800ExtraBold',
  light: 'Sora_300Light',
  thin: 'Sora_200Thin',
  extraLight: 'Sora_100ExtraLight',
} as const;

// Typography styles
export const typography = StyleSheet.create({
  // Headers
  h1: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    lineHeight: 40,
  } as TextStyle,
  h2: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    lineHeight: 36,
  } as TextStyle,
  h3: {
    fontFamily: FONTS.semiBold,
    fontSize: 24,
    lineHeight: 32,
  } as TextStyle,
  h4: {
    fontFamily: FONTS.semiBold,
    fontSize: 20,
    lineHeight: 28,
  } as TextStyle,
  h5: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 26,
  } as TextStyle,
  h6: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    lineHeight: 24,
  } as TextStyle,

  // Body text
  body: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    lineHeight: 24,
  } as TextStyle,
  bodyLarge: {
    fontFamily: FONTS.regular,
    fontSize: 18,
    lineHeight: 28,
  } as TextStyle,
  bodySmall: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,

  // Special text
  caption: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 16,
  } as TextStyle,
  button: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    lineHeight: 24,
  } as TextStyle,
  label: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,

  // Emphasized text
  bodyBold: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    lineHeight: 24,
  } as TextStyle,
  bodyMedium: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    lineHeight: 24,
  } as TextStyle,
});

// Helper function to get font family based on weight
export const getFontFamily = (
  weight?:
    | 'light'
    | 'regular'
    | 'medium'
    | 'semiBold'
    | 'bold'
    | 'extraBold'
    | 'thin'
    | 'extraLight',
): string => {
  switch (weight) {
    case 'thin':
      return FONTS.thin;
    case 'extraLight':
      return FONTS.extraLight;
    case 'light':
      return FONTS.light;
    case 'medium':
      return FONTS.medium;
    case 'semiBold':
      return FONTS.semiBold;
    case 'bold':
      return FONTS.bold;
    case 'extraBold':
      return FONTS.extraBold;
    case 'regular':
    default:
      return FONTS.regular;
  }
};
