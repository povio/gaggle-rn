import { AppRestClient } from "@/utils/rest";

import { flowersListDtoModel } from "./flowers.models";

export namespace FlowersApi {
  export const list = async () => {
    return AppRestClient.get("/v1/flowers", { resSchema: flowersListDtoModel });
  };
}
