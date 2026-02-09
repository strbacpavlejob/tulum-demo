import { create } from 'zustand';

export type AuthStatus =
  | 'idle'
  | 'loading'
  | 'authenticated'
  | 'unauthenticated';

interface AuthState {
  status: AuthStatus;
  userId: string | null;
  email: string | null;
  token: string | null;
  error: string | null;

  // Actions
  setLoading: () => void;
  setError: (error: string) => void;
  logout: () => void;
  clearError: () => void;
  setAuthenticated: (
    userId: string,
    email: string | null,
    token?: string,
  ) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  status: 'unauthenticated',
  userId: null,
  email: null,
  token: null,
  error: null,

  setLoading: () => set({ status: 'loading', error: null }),

  setError: (error: string) =>
    set({
      status: 'unauthenticated',
      error,
    }),

  logout: () => {
    set({
      status: 'unauthenticated',
      userId: null,
      email: null,
      token: null,
      error: null,
    });
  },

  clearError: () => set({ error: null }),

  setAuthenticated: (userId: string, email: string | null, token?: string) => {
    set({
      status: 'authenticated',
      userId,
      email,
      token: token || `clerk_${Date.now()}`,
      error: null,
    });
  },
}));
