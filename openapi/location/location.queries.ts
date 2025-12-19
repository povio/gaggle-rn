import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { MutationEffectsOptions, useMutationEffects } from "../useMutationEffects";
import { AppQueryOptions, AppInfiniteQueryOptions, AppMutationOptions } from "../react-query.types";
import { LocationModels } from "./location.models";
import { LocationApi } from "./location.api";

export namespace LocationQueries {

export const moduleName = QueryModule.Location;

export const keys = {
    all: [moduleName] as const,
    findByName: (providerId?: string, name?: string, ) => [...keys.all, "/api/import/locations/find", providerId, name] as const,
    paginate: (limit?: number, order?: string, filter?: LocationModels.LocationPaginationFilterDto, page?: number, cursor?: string, ) => [...keys.all, "/api/import/locations", limit, order, filter, page, cursor] as const,
    paginateInfinite: (limit?: number, order?: string, filter?: LocationModels.LocationPaginationFilterDto, cursor?: string, ) => [...keys.all, "/api/import/locations", "infinite", limit, order, filter, cursor] as const,
    getById: (locationId: string, ) => [...keys.all, "/api/import/locations/:locationId", locationId] as const,
};


 /** 
 * Query `useFindByName`
 * @param { string } object.providerId Query parameter
 * @param { string } object.name Query parameter
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<LocationModels.ImportFindLocationByNameResponseDTO> } 
 * @statusCodes [200, 401]
 */
export const useFindByName = <TData>({ providerId, name }: { providerId: string, name: string,  }, options?: AppQueryOptions<typeof LocationApi.findByName, TData>) => {
  
  
  return useQuery({
    queryKey: keys.findByName(providerId, name),
    queryFn: () =>  
    
    LocationApi.findByName(providerId, name)
    ,
    ...options,
  });
};






 /** 
 * Query `usePaginate`
 * @param { number } object.limit Query parameter. Items per response. Minimum: `1`. Maximum: `20`. Default: `20`
 * @param { string } object.order Query parameter. Order by fields (comma separated with +/- prefix): name, createdAt. Example: `name`
 * @param { LocationModels.LocationPaginationFilterDto } object.filter Query parameter
 * @param { number } object.page Query parameter. 1-indexed page number to begin from
 * @param { string } object.cursor Query parameter. ID of item to start after
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<LocationModels.LocationPaginateResponse> } 
 * @statusCodes [200, 401]
 */
export const usePaginate = <TData>({ limit, order, filter, page, cursor }: { limit: number, order?: string, filter?: LocationModels.LocationPaginationFilterDto, page?: number, cursor?: string,  }, options?: AppQueryOptions<typeof LocationApi.paginate, TData>) => {
  
  
  return useQuery({
    queryKey: keys.paginate(limit, order, filter, page, cursor),
    queryFn: () =>  
    
    LocationApi.paginate(limit, order, filter, page, cursor)
    ,
    ...options,
  });
};



/** 
 * Infinite query `usePaginateInfinite
 * @param { number } object.limit Query parameter. Items per response. Minimum: `1`. Maximum: `20`. Default: `20`
 * @param { string } object.order Query parameter. Order by fields (comma separated with +/- prefix): name, createdAt. Example: `name`
 * @param { LocationModels.LocationPaginationFilterDto } object.filter Query parameter
 * @param { number } object.page Query parameter. 1-indexed page number to begin from
 * @param { string } object.cursor Query parameter. ID of item to start after
 * @param { AppInfiniteQueryOptions } options Infinite query options
 * @returns { UseInfiniteQueryResult<LocationModels.LocationPaginateResponse> } 
 * @statusCodes [200, 401]
 */
export const usePaginateInfinite = <TData>({ limit, order, filter, cursor }: { limit: number, order?: string, filter?: LocationModels.LocationPaginationFilterDto, cursor?: string,  }, options?: AppInfiniteQueryOptions<typeof LocationApi.paginate, TData>) => {
  

  return useInfiniteQuery({
    queryKey: keys.paginateInfinite(limit, order, filter, cursor),
    queryFn: ({ pageParam }) =>  
    
    LocationApi.paginate(limit, order, filter, pageParam, cursor)
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
 * Mutation `useCreate`
 * @param { LocationModels.ImportUpdateLocationRequestDTO } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<LocationModels.ImportGetLocationByIdResponseDTO> } 
 * @statusCodes [201, 401]
 */
export const useCreate = (options?: AppMutationOptions<typeof LocationApi.create, { data: LocationModels.ImportUpdateLocationRequestDTO,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { data } ) => 
      
            LocationApi.create(data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




 /** 
 * Query `useGetById`
 * @param { string } object.locationId Path parameter
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<LocationModels.ImportGetLocationByIdResponseDTO> } 
 * @statusCodes [200, 401]
 */
export const useGetById = <TData>({ locationId }: { locationId: string,  }, options?: AppQueryOptions<typeof LocationApi.getById, TData>) => {
  
  
  return useQuery({
    queryKey: keys.getById(locationId),
    queryFn: () =>  
    
    LocationApi.getById(locationId)
    ,
    ...options,
  });
};








 /** 
 * Mutation `useUpdate`
 * @param { string } mutation.locationId Path parameter
 * @param { LocationModels.ImportUpdateLocationRequestDTO } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<void> } 
 * @statusCodes [204, 401]
 */
export const useUpdate = (options?: AppMutationOptions<typeof LocationApi.update, { locationId: string, data: LocationModels.ImportUpdateLocationRequestDTO,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { locationId, data } ) => 
      
            LocationApi.update(locationId, data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




}
