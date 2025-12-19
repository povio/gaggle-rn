import { AppRestClient } from "./app-rest-client";
import { authInterceptor } from "./auth.interceptor";

// Apply auth interceptor to the generated client
AppRestClient.attachInterceptor(authInterceptor);

export { AppRestClient };
