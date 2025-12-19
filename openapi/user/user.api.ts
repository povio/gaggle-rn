import { AppRestClient } from "../configured-rest-client";
import { ZodExtended } from "../zod.extended";
import { UserModels } from "./user.models";

export namespace UserApi {
export const get = () => { 
    return AppRestClient.get( 
        { resSchema: UserModels.UserMeResponseSchema }, 
        `/api/user/me`,
        
    )
};

export const update = (data: UserModels.UserMeUpdateRequest, ) => { 
    return AppRestClient.put( 
        { resSchema: UserModels.UserMeResponseSchema }, 
        `/api/user/me`,
        ZodExtended.parse(UserModels.UserMeUpdateRequestSchema, data)
, 
        
    )
};

export const getMyProfile = () => { 
    return AppRestClient.get( 
        { resSchema: UserModels.GetMyProfileResponseDTOSchema }, 
        `/api/users/me`,
        
    )
};

export const getMySettings = () => { 
    return AppRestClient.get( 
        { resSchema: UserModels.GetUserSettingsResponseDTOSchema }, 
        `/api/users/me/settings`,
        
    )
};

export const updateMySettings = (data: UserModels.UpdateUserSettingsRequestDTO, ) => { 
    return AppRestClient.patch( 
        { resSchema: UserModels.GetUserSettingsResponseDTOSchema }, 
        `/api/users/me/settings`,
        ZodExtended.parse(UserModels.UpdateUserSettingsRequestDTOSchema, data)
, 
        
    )
};

}
