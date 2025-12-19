import { useQuery, useMutation } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { MutationEffectsOptions, useMutationEffects } from "../useMutationEffects";
import { AppQueryOptions, AppMutationOptions } from "../react-query.types";
import { UserModels } from "./user.models";
import { UserApi } from "./user.api";

export namespace UserQueries {

export const moduleName = QueryModule.User;

export const keys = {
    all: [moduleName] as const,
    get: () => [...keys.all, "/api/user/me", ] as const,
    getMyProfile: () => [...keys.all, "/api/users/me", ] as const,
    getMySettings: () => [...keys.all, "/api/users/me/settings", ] as const,
};


 /** 
 * Query `useGet`
 * @summary Get the requesting user
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<UserModels.UserMeResponse> } 
 * @statusCodes [200, 401]
 */
export const useGet = <TData>(options?: AppQueryOptions<typeof UserApi.get, TData>) => {
  
  
  return useQuery({
    queryKey: keys.get(),
    queryFn: UserApi.get
    ,
    ...options,
  });
};








 /** 
 * Mutation `useUpdate`
 * @summary Update the requesting user
 * @param { UserModels.UserMeUpdateRequest } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<UserModels.UserMeResponse> } 
 * @statusCodes [200, 401]
 */
export const useUpdate = (options?: AppMutationOptions<typeof UserApi.update, { data: UserModels.UserMeUpdateRequest,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { data } ) => 
      
            UserApi.update(data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      
      const updateKeys = [keys.get(), ];
      await runMutationEffects(resData, options, updateKeys);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




 /** 
 * Query `useGetMyProfile`
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<UserModels.GetMyProfileResponseDTO> } 
 * @statusCodes [200, 401]
 */
export const useGetMyProfile = <TData>(options?: AppQueryOptions<typeof UserApi.getMyProfile, TData>) => {
  
  
  return useQuery({
    queryKey: keys.getMyProfile(),
    queryFn: UserApi.getMyProfile
    ,
    ...options,
  });
};






 /** 
 * Query `useGetMySettings`
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<UserModels.GetUserSettingsResponseDTO> } 
 * @statusCodes [200, 401]
 */
export const useGetMySettings = <TData>(options?: AppQueryOptions<typeof UserApi.getMySettings, TData>) => {
  
  
  return useQuery({
    queryKey: keys.getMySettings(),
    queryFn: UserApi.getMySettings
    ,
    ...options,
  });
};








 /** 
 * Mutation `useUpdateMySettings`
 * @param { UserModels.UpdateUserSettingsRequestDTO } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<void> } 
 * @statusCodes [204, 401]
 */
export const useUpdateMySettings = (options?: AppMutationOptions<typeof UserApi.updateMySettings, { data: UserModels.UpdateUserSettingsRequestDTO,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { data } ) => 
      
            UserApi.updateMySettings(data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




}
