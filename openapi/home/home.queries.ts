import { useQuery } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { AppQueryOptions } from "../react-query.types";
import { HomeApi } from "./home.api";

export namespace HomeQueries {

export const moduleName = QueryModule.Home;

export const keys = {
    all: [moduleName] as const,
    getInformation: () => [...keys.all, "/api/home", ] as const,
};


 /** 
 * Query `useGetInformation`
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<HomeModels.GetHomeInformationResponseDTO> } 
 * @statusCodes [200]
 */
export const useGetInformation = <TData>(options?: AppQueryOptions<typeof HomeApi.getInformation, TData>) => {
  
  
  return useQuery({
    queryKey: keys.getInformation(),
    queryFn: HomeApi.getInformation
    ,
    ...options,
  });
};






}
