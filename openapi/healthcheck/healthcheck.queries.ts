import { useQuery } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { AppQueryOptions } from "../react-query.types";
import { HealthcheckApi } from "./healthcheck.api";

export namespace HealthcheckQueries {

export const moduleName = QueryModule.Healthcheck;

export const keys = {
    all: [moduleName] as const,
    getStatus: () => [...keys.all, "/api", ] as const,
};


 /** 
 * Query `useGetStatus`
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<HealthcheckModels.HttpHealthDto> } 
 * @statusCodes [200]
 */
export const useGetStatus = <TData>(options?: AppQueryOptions<typeof HealthcheckApi.getStatus, TData>) => {
  
  
  return useQuery({
    queryKey: keys.getStatus(),
    queryFn: HealthcheckApi.getStatus
    ,
    ...options,
  });
};






}
