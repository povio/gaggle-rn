import { gaggleApiUrl } from "@/constants/gaggle";

import { RestClient } from "./restClient";

export const AppRestClient = new RestClient({ config: { baseURL: gaggleApiUrl } });
