import { AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { STORAGE_KEYS } from "@/constants/storage";
import { getStorageItemAsync } from "@/utils/secureStore";

import { RestInterceptor } from "./rest-interceptor";

const applyAuthInterceptor = (client: AxiosInstance): number => {
  return client.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // Get token from secure storage
      const token = await getStorageItemAsync(STORAGE_KEYS.AUTH_TOKEN);

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
