import { useQuery, useMutation } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { MutationEffectsOptions, useMutationEffects } from "../useMutationEffects";
import { AppQueryOptions, AppMutationOptions } from "../react-query.types";
import { UserAuthModels } from "./userAuth.models";
import { UserAuthApi } from "./userAuth.api";

export namespace UserAuthQueries {

export const moduleName = QueryModule.UserAuth;

export const keys = {
    all: [moduleName] as const,
    generate: (email?: string, ) => [...keys.all, "/api/user/auth/magic-link", email] as const,
    userAuthMagicLinkConsume: (code?: string, ) => [...keys.all, "/api/user/auth/magic-link/callback", code] as const,
};


 /** 
 * Query `useGenerate`
 * @summary Request a new magic link
 * @param { string } object.email Query parameter. Email address of the user requesting the nonce
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<CommonModels.StatusResponseDto> } 
 * @statusCodes [200]
 */
export const useGenerate = <TData>({ email }: { email: string,  }, options?: AppQueryOptions<typeof UserAuthApi.generate, TData>) => {
  
  
  return useQuery({
    queryKey: keys.generate(email),
    queryFn: () =>  
    
    UserAuthApi.generate(email)
    ,
    ...options,
  });
};






 /** 
 * Query `useUserAuthMagicLinkConsume`
 * @summary Magic link callback
 * when a user clicks the link in an email
 * or the frontend makes a request
 * @param { string } object.code Query parameter
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<UserAuthModels.AuthnTokenResponse> } Magic link callback
 * @statusCodes [200, 302]
 */
export const useUserAuthMagicLinkConsume = <TData>({ code }: { code: string,  }, options?: AppQueryOptions<typeof UserAuthApi.userAuthMagicLinkConsume, TData>) => {
  
  
  return useQuery({
    queryKey: keys.userAuthMagicLinkConsume(code),
    queryFn: () =>  
    
    UserAuthApi.userAuthMagicLinkConsume(code)
    ,
    ...options,
  });
};








 /** 
 * Mutation `useAccessToken`
 * @summary Get a new access token
 * @param { UserAuthModels.AuthnTokenRequest } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<UserAuthModels.AuthnTokenResponse> } 
 * @statusCodes [200]
 */
export const useAccessToken = (options?: AppMutationOptions<typeof UserAuthApi.accessToken, { data: UserAuthModels.AuthnTokenRequest,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { data } ) => 
      
            UserAuthApi.accessToken(data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};






 /** 
 * Mutation `useRequest`
 * @summary Initiate the forgot password process
 * @param { UserAuthModels.UserAuthEmailGenerateRequest } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<CommonModels.StatusResponseDto> } 
 * @statusCodes [200]
 */
export const useRequest = (options?: AppMutationOptions<typeof UserAuthApi.request, { data: UserAuthModels.UserAuthEmailGenerateRequest,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { data } ) => 
      
            UserAuthApi.request(data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};






 /** 
 * Mutation `useUserAuthForgotPasswordConsume`
 * @summary Change the user&#x27;s password using the emailed code
 * @param { UserAuthModels.UserAuthForgotPasswordConsumeRequest } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<CommonModels.StatusResponseDto> } 
 * @statusCodes [200]
 */
export const useUserAuthForgotPasswordConsume = (options?: AppMutationOptions<typeof UserAuthApi.userAuthForgotPasswordConsume, { data: UserAuthModels.UserAuthForgotPasswordConsumeRequest,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { data } ) => 
      
            UserAuthApi.userAuthForgotPasswordConsume(data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};






 /** 
 * Mutation `useRegister`
 * @summary Register a new local user with email, invitation code and password
 * Returns auth tokens
 * @param { UserAuthModels.UserAuthPasswordRegisterRequest } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<UserAuthModels.AuthnTokenResponse> } 
 * @statusCodes [201]
 */
export const useRegister = (options?: AppMutationOptions<typeof UserAuthApi.register, { data: UserAuthModels.UserAuthPasswordRegisterRequest,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { data } ) => 
      
            UserAuthApi.register(data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};






 /** 
 * Mutation `useLogin`
 * @summary Login with username and password
 * @param { UserAuthModels.UserAuthPasswordLoginRequest } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<UserAuthModels.AuthnTokenResponse> } 
 * @statusCodes [200]
 */
export const useLogin = (options?: AppMutationOptions<typeof UserAuthApi.login, { data: UserAuthModels.UserAuthPasswordLoginRequest,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { data } ) => 
      
            UserAuthApi.login(data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};






 /** 
 * Mutation `usePassword`
 * @summary Change the password
 * @param { UserAuthModels.UserAuthPasswordChangeRequest } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<void> } 
 * @statusCodes [204, 401]
 */
export const usePassword = (options?: AppMutationOptions<typeof UserAuthApi.password, { data: UserAuthModels.UserAuthPasswordChangeRequest,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { data } ) => 
      
            UserAuthApi.password(data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




}
