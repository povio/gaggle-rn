import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { STORAGE_KEYS } from "@/constants/storage";
import { getStorageItemAsync, setStorageItemAsync } from "@/utils/secureStore";

interface JWTPayload {
  exp: number;
  iat: number;
}

const REFRESH_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes before expiration

// Create a separate axios instance for token refresh to avoid circular dependency
const tokenRefreshClient = axios.create({
  baseURL: "https://gaggle.povio.dev/",
});

export const isTokenExpiringSoon = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;

    return timeUntilExpiration < REFRESH_THRESHOLD_MS;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true; // If we can't decode, assume it's expired
  }
};

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await getStorageItemAsync(STORAGE_KEYS.REFRESH_TOKEN);

    if (!refreshToken) {
      console.error("No refresh token available");
      return null;
    }

    // Use direct axios call to avoid circular dependency with AppRestClient
    const response = await tokenRefreshClient.post<{
      accessToken: string;
      refreshToken?: string;
    }>("/api/user/auth/refresh", {
      refreshToken,
    });

    if (response.data?.accessToken) {
      await setStorageItemAsync(STORAGE_KEYS.AUTH_TOKEN, response.data.accessToken);

      if (response.data.refreshToken) {
        await setStorageItemAsync(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
      }

      return response.data.accessToken;
    }

    return null;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};
