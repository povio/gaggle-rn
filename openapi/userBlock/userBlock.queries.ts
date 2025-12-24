import { useQuery, useMutation } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { MutationEffectsOptions, useMutationEffects } from "../useMutationEffects";
import { AppQueryOptions, AppMutationOptions } from "../react-query.types";
import { UserBlockApi } from "./userBlock.api";

export namespace UserBlockQueries {

export const moduleName = QueryModule.UserBlock;

export const keys = {
    all: [moduleName] as const,
    listBlockedUserIds: () => [...keys.all, "/api/users/blocked/ids", ] as const,
};




 /** 
 * Mutation `useBlockUser`
 * @param { string } mutation.userId Path parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<void> } 
 * @statusCodes [204, 401]
 */
export const useBlockUser = (options?: AppMutationOptions<typeof UserBlockApi.blockUser, { userId: string,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { userId } ) => 
      
            UserBlockApi.blockUser(userId)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




 /** 
 * Query `useListBlockedUserIds`
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<UserBlockModels.ListBlockedUsersMetaResponseDTO> } 
 * @statusCodes [200, 401]
 */
export const useListBlockedUserIds = <TData>(options?: AppQueryOptions<typeof UserBlockApi.listBlockedUserIds, TData>) => {
  
  
  return useQuery({
    queryKey: keys.listBlockedUserIds(),
    queryFn: UserBlockApi.listBlockedUserIds
    ,
    ...options,
  });
};






}
