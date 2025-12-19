import { AppRestClient } from "../configured-rest-client";
import { z } from "zod";

export namespace UserBlockApi {
export const blockUser = (userId: string, ) => { 
    return AppRestClient.post( 
        { resSchema: z.void() }, 
        `/api/users/${userId}/block`,
        
    )
};

}
