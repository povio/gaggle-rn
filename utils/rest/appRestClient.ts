import { flowrspotApiUrl } from "@/constants/flowrspot";

import { RestClient } from "./restClient";

export const AppRestClient = new RestClient({ config: { baseURL: flowrspotApiUrl } });
