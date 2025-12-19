import { useQuery, useMutation } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { MutationEffectsOptions, useMutationEffects } from "../useMutationEffects";
import { AppQueryOptions, AppMutationOptions } from "../react-query.types";
import { LocationModels } from "./location.models";
import { LocationApi } from "./location.api";

export namespace LocationQueries {

export const moduleName = QueryModule.Location;

export const keys = {
    all: [moduleName] as const,
    findByName: (providerId?: string, name?: string, ) => [...keys.all, "/api/import/locations/find", providerId, name] as const,
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
