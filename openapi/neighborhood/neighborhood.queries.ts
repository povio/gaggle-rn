import { useQuery } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { AppQueryOptions } from "../react-query.types";
import { NeighborhoodApi } from "./neighborhood.api";

export namespace NeighborhoodQueries {

export const moduleName = QueryModule.Neighborhood;

export const keys = {
    all: [moduleName] as const,
    listAvailable: () => [...keys.all, "/api/programs/neighborhoods", ] as const,
};


 /** 
 * Query `useListAvailable`
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<NeighborhoodModels.ListAvailableNeighborhoodsResponseDTO> } 
 * @statusCodes [200]
 */
export const useListAvailable = <TData>(options?: AppQueryOptions<typeof NeighborhoodApi.listAvailable, TData>) => {
  
  
  return useQuery({
    queryKey: keys.listAvailable(),
    queryFn: NeighborhoodApi.listAvailable
    ,
    ...options,
  });
};






}
