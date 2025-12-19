import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { MutationEffectsOptions, useMutationEffects } from "../useMutationEffects";
import { AppQueryOptions, AppInfiniteQueryOptions, AppMutationOptions } from "../react-query.types";
import { ProviderModels } from "./provider.models";
import { ProviderApi } from "./provider.api";

export namespace ProviderQueries {

export const moduleName = QueryModule.Provider;

export const keys = {
    all: [moduleName] as const,
    getDetails: (providerId: string, ) => [...keys.all, "/api/providers/:providerId", providerId] as const,
    listPrograms: (providerId: string, limit?: number, page?: number, cursor?: string, ) => [...keys.all, "/api/providers/:providerId/programs", providerId, limit, page, cursor] as const,
    listProgramsInfinite: (providerId: string, limit?: number, cursor?: string, ) => [...keys.all, "/api/providers/:providerId/programs", "infinite", providerId, limit, cursor] as const,
    listFollowedIds: () => [...keys.all, "/api/providers/followed/ids", ] as const,
    listAvailable: () => [...keys.all, "/api/programs/providers", ] as const,
    findByWebsiteUrl: (websiteUrl?: string, ) => [...keys.all, "/api/import/providers/find", websiteUrl] as const,
    getById: (providerId: string, ) => [...keys.all, "/api/import/providers/:providerId", providerId] as const,
};


 /** 
 * Query `useGetDetails`
 * @param { string } object.providerId Path parameter
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<ProviderModels.GetProviderDetailsResponseDTO> } 
 * @statusCodes [200]
 */
export const useGetDetails = <TData>({ providerId }: { providerId: string,  }, options?: AppQueryOptions<typeof ProviderApi.getDetails, TData>) => {
  
  
  return useQuery({
    queryKey: keys.getDetails(providerId),
    queryFn: () =>  
    
    ProviderApi.getDetails(providerId)
    ,
    ...options,
  });
};






 /** 
 * Query `useListPrograms`
 * @param { string } object.providerId Path parameter
 * @param { number } object.limit Query parameter. Items per response. Minimum: `1`. Maximum: `20`. Default: `20`
 * @param { number } object.page Query parameter. 1-indexed page number to begin from
 * @param { string } object.cursor Query parameter. ID of item to start after
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<ProviderModels.ListProgramsResponse> } 
 * @statusCodes [200]
 */
export const useListPrograms = <TData>({ providerId, limit, page, cursor }: { providerId: string, limit: number, page?: number, cursor?: string,  }, options?: AppQueryOptions<typeof ProviderApi.listPrograms, TData>) => {
  
  
  return useQuery({
    queryKey: keys.listPrograms(providerId, limit, page, cursor),
    queryFn: () =>  
    
    ProviderApi.listPrograms(providerId, limit, page, cursor)
    ,
    ...options,
  });
};



/** 
 * Infinite query `useListProgramsInfinite
 * @param { string } object.providerId Path parameter
 * @param { number } object.limit Query parameter. Items per response. Minimum: `1`. Maximum: `20`. Default: `20`
 * @param { number } object.page Query parameter. 1-indexed page number to begin from
 * @param { string } object.cursor Query parameter. ID of item to start after
 * @param { AppInfiniteQueryOptions } options Infinite query options
 * @returns { UseInfiniteQueryResult<ProviderModels.ListProgramsResponse> } 
 * @statusCodes [200]
 */
export const useListProgramsInfinite = <TData>({ providerId, limit, cursor }: { providerId: string, limit: number, cursor?: string,  }, options?: AppInfiniteQueryOptions<typeof ProviderApi.listPrograms, TData>) => {
  

  return useInfiniteQuery({
    queryKey: keys.listProgramsInfinite(providerId, limit, cursor),
    queryFn: ({ pageParam }) =>  
    
    ProviderApi.listPrograms(providerId, limit, pageParam, cursor)
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
 * Mutation `useFollow`
 * @param { string } mutation.providerId Path parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<void> } 
 * @statusCodes [204, 401]
 */
export const useFollow = (options?: AppMutationOptions<typeof ProviderApi.follow, { providerId: string,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { providerId } ) => 
      
            ProviderApi.follow(providerId)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};






 /** 
 * Mutation `useUnfollow`
 * @param { string } mutation.providerId Path parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<void> } 
 * @statusCodes [204, 401]
 */
export const useUnfollow = (options?: AppMutationOptions<typeof ProviderApi.unfollow, { providerId: string,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { providerId } ) => 
      
            ProviderApi.unfollow(providerId)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




 /** 
 * Query `useListFollowedIds`
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<ProviderModels.ListFollowedProvidersMetaResponseDTO> } 
 * @statusCodes [200, 401]
 */
export const useListFollowedIds = <TData>(options?: AppQueryOptions<typeof ProviderApi.listFollowedIds, TData>) => {
  
  
  return useQuery({
    queryKey: keys.listFollowedIds(),
    queryFn: ProviderApi.listFollowedIds
    ,
    ...options,
  });
};






 /** 
 * Query `useListAvailable`
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<ProviderModels.ListAvailableProvidersResponseDTO> } 
 * @statusCodes [200]
 */
export const useListAvailable = <TData>(options?: AppQueryOptions<typeof ProviderApi.listAvailable, TData>) => {
  
  
  return useQuery({
    queryKey: keys.listAvailable(),
    queryFn: ProviderApi.listAvailable
    ,
    ...options,
  });
};






 /** 
 * Query `useFindByWebsiteUrl`
 * @param { string } object.websiteUrl Query parameter
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<ProviderModels.ImportFindProviderByWebsiteUrlResponseDTO> } 
 * @statusCodes [200, 401]
 */
export const useFindByWebsiteUrl = <TData>({ websiteUrl }: { websiteUrl: string,  }, options?: AppQueryOptions<typeof ProviderApi.findByWebsiteUrl, TData>) => {
  
  
  return useQuery({
    queryKey: keys.findByWebsiteUrl(websiteUrl),
    queryFn: () =>  
    
    ProviderApi.findByWebsiteUrl(websiteUrl)
    ,
    ...options,
  });
};






 /** 
 * Query `useGetById`
 * @param { string } object.providerId Path parameter
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<ProviderModels.ImportGetProviderByIdResponseDTO> } 
 * @statusCodes [200, 401]
 */
export const useGetById = <TData>({ providerId }: { providerId: string,  }, options?: AppQueryOptions<typeof ProviderApi.getById, TData>) => {
  
  
  return useQuery({
    queryKey: keys.getById(providerId),
    queryFn: () =>  
    
    ProviderApi.getById(providerId)
    ,
    ...options,
  });
};








 /** 
 * Mutation `useUpdate`
 * @param { string } mutation.providerId Path parameter
 * @param { ProviderModels.ImportUpdateProviderRequestDTO } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<void> } 
 * @statusCodes [204, 401]
 */
export const useUpdate = (options?: AppMutationOptions<typeof ProviderApi.update, { providerId: string, data: ProviderModels.ImportUpdateProviderRequestDTO,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { providerId, data } ) => 
      
            ProviderApi.update(providerId, data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




}
