import { AppRestClient } from "../configured-rest-client";
import { z } from "zod";
import { UserBlockModels } from "./userBlock.models";

export namespace UserBlockApi {
export const blockUser = (userId: string, ) => { 
    return AppRestClient.post( 
        { resSchema: z.void() }, 
        `/api/users/${userId}/block`,
        
    )
};

export const listBlockedUserIds = () => { 
    return AppRestClient.get( 
        { resSchema: UserBlockModels.ListBlockedUsersMetaResponseDTOSchema }, 
        `/api/users/blocked/ids`,
        
    )
};

}
