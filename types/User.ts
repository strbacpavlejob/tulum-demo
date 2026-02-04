export type Gender = 'male' | 'female' | 'non-binary' | 'other';
export type LookingFor =
  | 'relationship'
  | 'casual'
  | 'friendship'
  | 'not-sure'
  | 'party';

export interface UserPreferences {
  minAge: number;
  maxAge: number;
  maxDistance: number;
  genderPreference: Gender[];
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: Gender | null;
  bio: string;
  photos: string[];
  lookingFor: LookingFor | null;
  hobbies: string[];
  preferences: UserPreferences;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingData {
  name: string;
  age: number;
  gender: Gender | null;
  photos: string[];
  lookingFor: LookingFor | null;
  hobbies: string[];
  preferences: UserPreferences;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  minAge: 18,
  maxAge: 50,
  maxDistance: 50,
  genderPreference: [],
};

export const AVAILABLE_HOBBIES = [
  'Travel',
  'Photography',
  'Cooking',
  'Fitness',
  'Reading',
  'Music',
  'Art',
  'Gaming',
  'Hiking',
  'Yoga',
  'Dancing',
  'Movies',
  'Sports',
  'Coffee',
  'Wine',
  'Nature',
  'Beach',
  'Camping',
  'Pets',
  'Fashion',
];
