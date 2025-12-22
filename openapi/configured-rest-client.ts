import { AppRestClient } from "./app-rest-client";
import { authInterceptor } from "./auth.interceptor";
import { voidResponseInterceptor } from "./void-response.interceptor";

// Apply interceptors to the generated client
AppRestClient.attachInterceptor(voidResponseInterceptor);
AppRestClient.attachInterceptor(authInterceptor);

export { AppRestClient };
