import { AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { STORAGE_KEYS } from "@/constants/storage";
import { getStorageItemAsync } from "@/utils/secureStore";
import { isTokenExpiringSoon, refreshAccessToken } from "@/utils/tokenRefresh";

import { RestInterceptor } from "./rest-interceptor";

const applyAuthInterceptor = (client: AxiosInstance): number => {
  return client.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // Skip auth interceptor for refresh token endpoint to prevent infinite loop
      if (config.url?.includes("/api/user/auth/refresh")) {
        return config;
      }

      let token = await getStorageItemAsync(STORAGE_KEYS.AUTH_TOKEN);

      if (token && isTokenExpiringSoon(token)) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          token = newToken;
        }
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

export const authInterceptor = new RestInterceptor(applyAuthInterceptor);
