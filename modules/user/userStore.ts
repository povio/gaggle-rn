import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

import type { UserModels } from "@/openapi/user/user.models";

interface UserState {
  user: UserModels.UserMeResponse | null;
  settings: UserModels.GetUserSettingsResponseDTO | null;
  isLoading: boolean;
}

interface UserActions {
  setUser: (user: UserModels.UserMeResponse | null) => void;
  setSettings: (settings: UserModels.GetUserSettingsResponseDTO | null) => void;
  clearUser: () => void;
}

const STORAGE_KEY = "user-storage";

const loadFromStorage = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { user: null, settings: null, isLoading: false };
  } catch {
    return { user: null, settings: null, isLoading: false };
  }
};

const saveToStorage = async (state: UserState) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save user store:", error);
  }
};

export const useUserStore = create<UserState & UserActions>((set) => ({
  user: null,
  settings: null,
  isLoading: true,
  setUser: (user: UserModels.UserMeResponse | null) => {
    set((state) => {
      const newState = { ...state, user, isLoading: false };
      saveToStorage(newState);
      return newState;
    });
  },
  setSettings: (settings: UserModels.GetUserSettingsResponseDTO | null) => {
    set((state) => {
      const newState = { ...state, settings, isLoading: false };
      saveToStorage(newState);
      return newState;
    });
  },
  clearUser: () => {
    set((state) => {
      const newState = { ...state, user: null, settings: null, isLoading: false };
      saveToStorage(newState);
      return newState;
    });
  },
}));

// Initialize from storage
loadFromStorage().then((data) => {
  useUserStore.setState(data);
});
