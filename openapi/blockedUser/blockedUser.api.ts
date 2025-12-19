import { AppRestClient } from "../configured-rest-client";
import { BlockedUserModels } from "./blockedUser.models";

export namespace BlockedUserApi {
export const listIds = () => { 
    return AppRestClient.get( 
        { resSchema: BlockedUserModels.ListBlockedUsersMetaResponseDTOSchema }, 
        `/api/users/blocked/ids`,
        
    )
};

}
