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
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  setAuthenticated: (userId: string, email: string, token: string) => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'unauthenticated',
  userId: null,
  email: null,
  token: null,
  error: null,

  setLoading: () => set({ status: 'loading', error: null }),

  login: async (email: string, password: string) => {
    set({ status: 'loading', error: null });

    try {
      // Simulate API call - in production, replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation
      if (!email || !password) {
        set({
          status: 'unauthenticated',
          error: 'Email and password are required',
        });
        return false;
      }

      if (password.length < 6) {
        set({ status: 'unauthenticated', error: 'Invalid credentials' });
        return false;
      }

      // Mock successful login
      const userId = `user_${Date.now()}`;
      const token = `token_${Date.now()}`;

      set({
        status: 'authenticated',
        userId,
        email,
        token,
        error: null,
      });

      return true;
    } catch (error) {
      set({
        status: 'unauthenticated',
        error: error instanceof Error ? error.message : 'Login failed',
      });
      return false;
    }
  },

  register: async (email: string, password: string) => {
    set({ status: 'loading', error: null });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation
      if (!email || !password) {
        set({
          status: 'unauthenticated',
          error: 'Email and password are required',
        });
        return false;
      }

      if (!email.includes('@')) {
        set({ status: 'unauthenticated', error: 'Invalid email format' });
        return false;
      }

      if (password.length < 6) {
        set({
          status: 'unauthenticated',
          error: 'Password must be at least 6 characters',
        });
        return false;
      }

      // Mock successful registration
      const userId = `user_${Date.now()}`;
      const token = `token_${Date.now()}`;

      set({
        status: 'authenticated',
        userId,
        email,
        token,
        error: null,
      });

      return true;
    } catch (error) {
      set({
        status: 'unauthenticated',
        error: error instanceof Error ? error.message : 'Registration failed',
      });
      return false;
    }
  },

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

  setAuthenticated: (userId: string, email: string, token: string) => {
    set({
      status: 'authenticated',
      userId,
      email,
      token,
      error: null,
    });
  },
}));
