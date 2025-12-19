import { AppRestClient } from "../configured-rest-client";
import { ZodExtended } from "../zod.extended";
import { CommonModels } from "../common/common.models";
import { WaitlistModels } from "./waitlist.models";

export namespace WaitlistApi {
export const join = (data: WaitlistModels.WaitlistJoinRequest, ) => { 
    return AppRestClient.post( 
        { resSchema: CommonModels.StatusResponseDtoSchema }, 
        `/api/waitlist/join`,
        ZodExtended.parse(WaitlistModels.WaitlistJoinRequestSchema, data)
, 
        
    )
};

}
