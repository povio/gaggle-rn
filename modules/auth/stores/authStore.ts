import { create } from "zustand";

import { STORAGE_KEYS } from "@/constants/storage";
import { removeStorageItemAsync, setStorageItemAsync } from "@/utils/secureStore";
import { supabase } from "@/utils/supabase";

interface AuthState {
  token?: string | null;
  isLoading: boolean;
}

interface AuthActions {
  login: (token: string) => void;
  logout: () => void;
  restore: (token: string | null) => void;
}

const createInitialState = (): AuthState => ({
  token: null,
  isLoading: true,
});

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...createInitialState(),
  login: (token: string) => {
    set({ token, isLoading: false });
    void setStorageItemAsync(STORAGE_KEYS.AUTH_TOKEN, token);
  },
  logout: () => {
    console.log("[authStore] logout called");
    set({ token: null, isLoading: false });
    console.log("[authStore] state set to token: null, isLoading: false");
    void supabase.auth.signOut();
    void removeStorageItemAsync(STORAGE_KEYS.AUTH_TOKEN);
    console.log("[authStore] cleanup initiated");
  },
  restore: (token: string | null) => {
    set({ token, isLoading: false });
  },
}));
