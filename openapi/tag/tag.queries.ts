import { useQuery } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { AppQueryOptions } from "../react-query.types";
import { TagApi } from "./tag.api";

export namespace TagQueries {

export const moduleName = QueryModule.Tag;

export const keys = {
    all: [moduleName] as const,
    listAll: () => [...keys.all, "/api/programs/tags", ] as const,
};


 /** 
 * Query `useListAll`
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<TagModels.ListAllTagsResponseDTO> } 
 * @statusCodes [200]
 */
export const useListAll = <TData>(options?: AppQueryOptions<typeof TagApi.listAll, TData>) => {
  
  
  return useQuery({
    queryKey: keys.listAll(),
    queryFn: TagApi.listAll
    ,
    ...options,
  });
};






}
