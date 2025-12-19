import { RestClient } from "./rest-client";

export const AppRestClient = new RestClient({
  config: {
    baseURL: "https://gaggle.povio.dev/"
  },
});