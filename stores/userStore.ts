import { create } from 'zustand';
import {
  UserProfile,
  UserPreferences,
  Gender,
  LookingFor,
  OnboardingData,
  DEFAULT_PREFERENCES,
} from '@/types/User';

interface UserState {
  profile: UserProfile | null;
  onboardingStep: number;
  onboardingData: OnboardingData;
  isLoading: boolean;

  // Actions
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  clearProfile: () => void;

  // Onboarding actions
  setOnboardingStep: (step: number) => void;
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  completeOnboarding: (userId: string, email: string) => void;
  resetOnboarding: () => void;

  // Preference actions
  updatePreferences: (preferences: Partial<UserPreferences>) => void;

  // Photo actions
  addPhoto: (photoUri: string) => void;
  removePhoto: (index: number) => void;
  reorderPhotos: (fromIndex: number, toIndex: number) => void;

  // Hobby actions
  toggleHobby: (hobby: string) => void;
  setHobbies: (hobbies: string[]) => void;
}

const initialOnboardingData: OnboardingData = {
  name: '',
  age: 18,
  gender: null,
  photos: [],
  lookingFor: null,
  hobbies: [],
  preferences: DEFAULT_PREFERENCES,
};

export const useUserStore = create<UserState>()((set, get) => ({
  profile: null,
  onboardingStep: 1,
  onboardingData: initialOnboardingData,
  isLoading: false,

  setProfile: (profile) => set({ profile }),

  updateProfile: (updates) =>
    set((state) => ({
      profile: state.profile
        ? {
            ...state.profile,
            ...updates,
            updatedAt: new Date().toISOString(),
          }
        : null,
    })),

  clearProfile: () =>
    set({
      profile: null,
      onboardingStep: 1,
      onboardingData: initialOnboardingData,
    }),

  setOnboardingStep: (step) => set({ onboardingStep: step }),

  updateOnboardingData: (data) =>
    set((state) => ({
      onboardingData: { ...state.onboardingData, ...data },
    })),

  completeOnboarding: (userId: string, email: string) => {
    const { onboardingData } = get();
    const now = new Date().toISOString();

    const profile: UserProfile = {
      id: userId,
      email,
      name: onboardingData.name,
      age: onboardingData.age,
      gender: onboardingData.gender,
      bio: '',
      photos: onboardingData.photos,
      lookingFor: onboardingData.lookingFor,
      hobbies: onboardingData.hobbies,
      preferences: onboardingData.preferences,
      onboardingCompleted: true,
      createdAt: now,
      updatedAt: now,
    };

    set({
      profile,
      onboardingStep: 1,
      onboardingData: initialOnboardingData,
    });
  },

  resetOnboarding: () =>
    set({
      onboardingStep: 1,
      onboardingData: initialOnboardingData,
    }),

  updatePreferences: (preferences) =>
    set((state) => ({
      onboardingData: {
        ...state.onboardingData,
        preferences: {
          ...state.onboardingData.preferences,
          ...preferences,
        },
      },
      profile: state.profile
        ? {
            ...state.profile,
            preferences: { ...state.profile.preferences, ...preferences },
            updatedAt: new Date().toISOString(),
          }
        : null,
    })),

  addPhoto: (photoUri) =>
    set((state) => ({
      onboardingData: {
        ...state.onboardingData,
        photos: [...state.onboardingData.photos, photoUri],
      },
    })),

  removePhoto: (index) =>
    set((state) => ({
      onboardingData: {
        ...state.onboardingData,
        photos: state.onboardingData.photos.filter((_, i) => i !== index),
      },
    })),

  reorderPhotos: (fromIndex, toIndex) =>
    set((state) => {
      const photos = [...state.onboardingData.photos];
      const [removed] = photos.splice(fromIndex, 1);
      photos.splice(toIndex, 0, removed);
      return {
        onboardingData: {
          ...state.onboardingData,
          photos,
        },
      };
    }),

  toggleHobby: (hobby) =>
    set((state) => {
      const hobbies = state.onboardingData.hobbies.includes(hobby)
        ? state.onboardingData.hobbies.filter((h) => h !== hobby)
        : [...state.onboardingData.hobbies, hobby];
      return {
        onboardingData: {
          ...state.onboardingData,
          hobbies,
        },
      };
    }),

  setHobbies: (hobbies) =>
    set((state) => ({
      onboardingData: {
        ...state.onboardingData,
        hobbies,
      },
    })),
}));
