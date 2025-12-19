import { AppRestClient } from "../configured-rest-client";
import { HomeModels } from "./home.models";

export namespace HomeApi {
export const getInformation = () => { 
    return AppRestClient.get( 
        { resSchema: HomeModels.GetHomeInformationResponseDTOSchema }, 
        `/api/home`,
        
    )
};

}
