import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { MutationEffectsOptions, useMutationEffects } from "../useMutationEffects";
import { AppQueryOptions, AppInfiniteQueryOptions, AppMutationOptions } from "../react-query.types";
import { FavoriteModels } from "./favorite.models";
import { FavoriteApi } from "./favorite.api";

export namespace FavoriteQueries {

export const moduleName = QueryModule.Favorite;

export const keys = {
    all: [moduleName] as const,
    listUser: (limit?: number, page?: number, cursor?: string, ) => [...keys.all, "/api/favorites", limit, page, cursor] as const,
    listUserInfinite: (limit?: number, cursor?: string, ) => [...keys.all, "/api/favorites", "infinite", limit, cursor] as const,
    listUserIds: () => [...keys.all, "/api/favorites/ids", ] as const,
};


 /** 
 * Query `useListUser`
 * @param { number } object.limit Query parameter. Items per response. Minimum: `1`. Maximum: `20`. Default: `20`
 * @param { number } object.page Query parameter. 1-indexed page number to begin from
 * @param { string } object.cursor Query parameter. ID of item to start after
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<FavoriteModels.ListUserResponse> } 
 * @statusCodes [200, 401]
 */
export const useListUser = <TData>({ limit, page, cursor }: { limit: number, page?: number, cursor?: string,  }, options?: AppQueryOptions<typeof FavoriteApi.listUser, TData>) => {
  
  
  return useQuery({
    queryKey: keys.listUser(limit, page, cursor),
    queryFn: () =>  
    
    FavoriteApi.listUser(limit, page, cursor)
    ,
    ...options,
  });
};



/** 
 * Infinite query `useListUserInfinite
 * @param { number } object.limit Query parameter. Items per response. Minimum: `1`. Maximum: `20`. Default: `20`
 * @param { number } object.page Query parameter. 1-indexed page number to begin from
 * @param { string } object.cursor Query parameter. ID of item to start after
 * @param { AppInfiniteQueryOptions } options Infinite query options
 * @returns { UseInfiniteQueryResult<FavoriteModels.ListUserResponse> } 
 * @statusCodes [200, 401]
 */
export const useListUserInfinite = <TData>({ limit, cursor }: { limit: number, cursor?: string,  }, options?: AppInfiniteQueryOptions<typeof FavoriteApi.listUser, TData>) => {
  

  return useInfiniteQuery({
    queryKey: keys.listUserInfinite(limit, cursor),
    queryFn: ({ pageParam }) =>  
    
    FavoriteApi.listUser(limit, pageParam, cursor)
    ,
    initialPageParam: 1,
    getNextPageParam: ({ page, totalItems, limit: limitParam }) => {
      const pageParam = page ?? 1;
      return pageParam * limitParam < totalItems ? pageParam + 1 : null;
    },
    ...options,
  });
};




 /** 
 * Mutation `useProgram`
 * @param { FavoriteModels.FavoriteProgramRequestDTO } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<void> } 
 * @statusCodes [201, 401]
 */
export const useProgram = (options?: AppMutationOptions<typeof FavoriteApi.program, { data: FavoriteModels.FavoriteProgramRequestDTO,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { data } ) => 
      
            FavoriteApi.program(data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};






 /** 
 * Mutation `useUnProgram`
 * @param { FavoriteModels.UnfavoriteProgramRequestDTO } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<void> } 
 * @statusCodes [204, 401]
 */
export const useUnProgram = (options?: AppMutationOptions<typeof FavoriteApi.unProgram, { data: FavoriteModels.UnfavoriteProgramRequestDTO,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { data } ) => 
      
            FavoriteApi.unProgram(data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




 /** 
 * Query `useListUserIds`
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<FavoriteModels.ListUserFavoritesMetaResponseDTO> } 
 * @statusCodes [200, 401]
 */
export const useListUserIds = <TData>(options?: AppQueryOptions<typeof FavoriteApi.listUserIds, TData>) => {
  
  
  return useQuery({
    queryKey: keys.listUserIds(),
    queryFn: FavoriteApi.listUserIds
    ,
    ...options,
  });
};






}
