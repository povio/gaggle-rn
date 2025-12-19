import { AppRestClient } from "../configured-rest-client";
import { NeighborhoodModels } from "./neighborhood.models";

export namespace NeighborhoodApi {
export const listAvailable = () => { 
    return AppRestClient.get( 
        { resSchema: NeighborhoodModels.ListAvailableNeighborhoodsResponseDTOSchema }, 
        `/api/programs/neighborhoods`,
        
    )
};

}
