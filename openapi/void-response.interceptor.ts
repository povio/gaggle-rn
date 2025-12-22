import { AxiosInstance, AxiosResponse } from "axios";

import { RestInterceptor } from "./rest-interceptor";

const applyVoidResponseInterceptor = (client: AxiosInstance): number => {
  return client.interceptors.response.use(
    (response: AxiosResponse) => {
      // If response data is an empty string or empty object, convert to null for void schemas
      if (
        response.data === "" ||
        (typeof response.data === "object" &&
          response.data !== null &&
          Object.keys(response.data).length === 0)
      ) {
        response.data = null;
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

export const voidResponseInterceptor = new RestInterceptor(applyVoidResponseInterceptor);
