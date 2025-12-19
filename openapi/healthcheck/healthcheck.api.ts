import { AppRestClient } from "../configured-rest-client";
import { HealthcheckModels } from "./healthcheck.models";

export namespace HealthcheckApi {
export const getStatus = () => { 
    return AppRestClient.get( 
        { resSchema: HealthcheckModels.HttpHealthDtoSchema }, 
        `/api`,
        
    )
};

}
