import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useReducer } from "react";
import { Platform } from "react-native";

import { removeStorageItemAsync, setStorageItemAsync } from "@/utils/secureStore";

type StorageState<T> = { isLoading: boolean; value: T | null };
type UseStateHook<T> = [StorageState<T>, (value: T | null) => void];

function useAsyncState<T>(initialValue: StorageState<T> = { isLoading: true, value: null }): UseStateHook<T> {
  return useReducer(
    (_state: StorageState<T>, action: T | null = null): StorageState<T> => ({ isLoading: false, value: action }),
    initialValue,
  ) as UseStateHook<T>;
}

export function useSecureStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();

  // Get
  useEffect(() => {
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      SecureStore.getItemAsync(key)
        .then((value) => {
          setState(value);
        })
        .catch(() => null);
    }
  }, [key]);

  // Set
  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      if (value) {
        void setStorageItemAsync(key, value);
      } else {
        void removeStorageItemAsync(key);
      }
    },
    [key],
  );

  return [state, setValue];
}
