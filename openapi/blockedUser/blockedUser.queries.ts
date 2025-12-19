import { useQuery } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { AppQueryOptions } from "../react-query.types";
import { BlockedUserApi } from "./blockedUser.api";

export namespace BlockedUserQueries {

export const moduleName = QueryModule.BlockedUser;

export const keys = {
    all: [moduleName] as const,
    listIds: () => [...keys.all, "/api/users/blocked/ids", ] as const,
};


 /** 
 * Query `useListIds`
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<BlockedUserModels.ListBlockedUsersMetaResponseDTO> } 
 * @statusCodes [200, 401]
 */
export const useListIds = <TData>(options?: AppQueryOptions<typeof BlockedUserApi.listIds, TData>) => {
  
  
  return useQuery({
    queryKey: keys.listIds(),
    queryFn: BlockedUserApi.listIds
    ,
    ...options,
  });
};






}
