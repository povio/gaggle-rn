import { AppRestClient } from "../configured-rest-client";
import { z } from "zod";
import { ZodExtended } from "../zod.extended";
import { CommonModels } from "../common/common.models";
import { UserAuthModels } from "./userAuth.models";

export namespace UserAuthApi {
export const generate = (email: string, ) => { 
    return AppRestClient.get( 
        { resSchema: CommonModels.StatusResponseDtoSchema }, 
        `/api/user/auth/magic-link`,
        {
    params: {
        email: ZodExtended.parse(z.email(), email, { type: "query", name: "email" })
, 
    },
}
    )
};

export const userAuthMagicLinkConsume = (code: string, ) => { 
    return AppRestClient.get( 
        { resSchema: UserAuthModels.AuthnTokenResponseSchema }, 
        `/api/user/auth/magic-link/callback`,
        {
    params: {
        code: ZodExtended.parse(z.string(), code, { type: "query", name: "code" })
, 
    },
}
    )
};

export const accessToken = (data: UserAuthModels.AuthnTokenRequest, ) => { 
    return AppRestClient.post( 
        { resSchema: UserAuthModels.AuthnTokenResponseSchema }, 
        `/api/user/auth/refresh`,
        ZodExtended.parse(UserAuthModels.AuthnTokenRequestSchema, data)
, 
        
    )
};

export const request = (data: UserAuthModels.UserAuthEmailGenerateRequest, ) => { 
    return AppRestClient.post( 
        { resSchema: CommonModels.StatusResponseDtoSchema }, 
        `/api/user/auth/forgot-password`,
        ZodExtended.parse(UserAuthModels.UserAuthEmailGenerateRequestSchema, data)
, 
        
    )
};

export const userAuthForgotPasswordConsume = (data: UserAuthModels.UserAuthForgotPasswordConsumeRequest, ) => { 
    return AppRestClient.post( 
        { resSchema: CommonModels.StatusResponseDtoSchema }, 
        `/api/user/auth/forgot-password/callback`,
        ZodExtended.parse(UserAuthModels.UserAuthForgotPasswordConsumeRequestSchema, data)
, 
        
    )
};

export const register = (data: UserAuthModels.UserAuthPasswordRegisterRequest, ) => { 
    return AppRestClient.post( 
        { resSchema: UserAuthModels.AuthnTokenResponseSchema }, 
        `/api/user/auth/register`,
        ZodExtended.parse(UserAuthModels.UserAuthPasswordRegisterRequestSchema, data)
, 
        
    )
};

export const login = (data: UserAuthModels.UserAuthPasswordLoginRequest, ) => { 
    return AppRestClient.post( 
        { resSchema: UserAuthModels.AuthnTokenResponseSchema }, 
        `/api/user/auth/login`,
        ZodExtended.parse(UserAuthModels.UserAuthPasswordLoginRequestSchema, data)
, 
        
    )
};

export const password = (data: UserAuthModels.UserAuthPasswordChangeRequest, ) => { 
    return AppRestClient.post( 
        { resSchema: z.void() }, 
        `/api/user/auth/password`,
        ZodExtended.parse(UserAuthModels.UserAuthPasswordChangeRequestSchema, data)
, 
        
    )
};

}
