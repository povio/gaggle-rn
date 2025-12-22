import { jwtDecode } from "jwt-decode";

import { STORAGE_KEYS } from "@/constants/storage";
import { UserAuthApi } from "@/openapi/userAuth/userAuth.api";
import { getStorageItemAsync, setStorageItemAsync } from "@/utils/secureStore";

interface JWTPayload {
  exp: number;
  iat: number;
}

const REFRESH_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes before expiration

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

    const response = await UserAuthApi.accessToken({ refreshToken });

    if (response.accessToken) {
      await setStorageItemAsync(STORAGE_KEYS.AUTH_TOKEN, response.accessToken);

      if (response.refreshToken) {
        await setStorageItemAsync(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
      }

      return response.accessToken;
    }

    return null;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};
