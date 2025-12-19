import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { MutationEffectsOptions, useMutationEffects } from "../useMutationEffects";
import { AppQueryOptions, AppInfiniteQueryOptions, AppMutationOptions } from "../react-query.types";
import { ProgramModels } from "./program.models";
import { ProgramApi } from "./program.api";

export namespace ProgramQueries {

export const moduleName = QueryModule.Program;

export const keys = {
    all: [moduleName] as const,
    search: (limit?: number, filter?: ProgramModels.SearchProgramsFilterDto, page?: number, cursor?: string, ) => [...keys.all, "/api/programs/search", limit, filter, page, cursor] as const,
    searchInfinite: (limit?: number, filter?: ProgramModels.SearchProgramsFilterDto, cursor?: string, ) => [...keys.all, "/api/programs/search", "infinite", limit, filter, cursor] as const,
    getDetails: (programId: string, ) => [...keys.all, "/api/programs/:programId", programId] as const,
    findByUrl: (programUrl?: string, ) => [...keys.all, "/api/import/programs/find", programUrl] as const,
    getById: (programId: string, ) => [...keys.all, "/api/import/programs/:programId", programId] as const,
};


 /** 
 * Query `useSearch`
 * @param { number } object.limit Query parameter. Items per response. Minimum: `1`. Maximum: `20`. Default: `20`
 * @param { ProgramModels.SearchProgramsFilterDto } object.filter Query parameter
 * @param { number } object.page Query parameter. 1-indexed page number to begin from
 * @param { string } object.cursor Query parameter. ID of item to start after
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<ProgramModels.SearchResponse> } 
 * @statusCodes [200]
 */
export const useSearch = <TData>({ limit, filter, page, cursor }: { limit: number, filter?: ProgramModels.SearchProgramsFilterDto, page?: number, cursor?: string,  }, options?: AppQueryOptions<typeof ProgramApi.search, TData>) => {
  
  
  return useQuery({
    queryKey: keys.search(limit, filter, page, cursor),
    queryFn: () =>  
    
    ProgramApi.search(limit, filter, page, cursor)
    ,
    ...options,
  });
};



/** 
 * Infinite query `useSearchInfinite
 * @param { number } object.limit Query parameter. Items per response. Minimum: `1`. Maximum: `20`. Default: `20`
 * @param { ProgramModels.SearchProgramsFilterDto } object.filter Query parameter
 * @param { number } object.page Query parameter. 1-indexed page number to begin from
 * @param { string } object.cursor Query parameter. ID of item to start after
 * @param { AppInfiniteQueryOptions } options Infinite query options
 * @returns { UseInfiniteQueryResult<ProgramModels.SearchResponse> } 
 * @statusCodes [200]
 */
export const useSearchInfinite = <TData>({ limit, filter, cursor }: { limit: number, filter?: ProgramModels.SearchProgramsFilterDto, cursor?: string,  }, options?: AppInfiniteQueryOptions<typeof ProgramApi.search, TData>) => {
  

  return useInfiniteQuery({
    queryKey: keys.searchInfinite(limit, filter, cursor),
    queryFn: ({ pageParam }) =>  
    
    ProgramApi.search(limit, filter, pageParam, cursor)
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
 * Query `useGetDetails`
 * @param { string } object.programId Path parameter
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<ProgramModels.GetProgramDetailsResponseDTO> } 
 * @statusCodes [200]
 */
export const useGetDetails = <TData>({ programId }: { programId: string,  }, options?: AppQueryOptions<typeof ProgramApi.getDetails, TData>) => {
  
  
  return useQuery({
    queryKey: keys.getDetails(programId),
    queryFn: () =>  
    
    ProgramApi.getDetails(programId)
    ,
    ...options,
  });
};






 /** 
 * Query `useFindByUrl`
 * @param { string } object.programUrl Query parameter
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<ProgramModels.ImportFindProgramByUrlResponseDTO> } 
 * @statusCodes [200, 401]
 */
export const useFindByUrl = <TData>({ programUrl }: { programUrl: string,  }, options?: AppQueryOptions<typeof ProgramApi.findByUrl, TData>) => {
  
  
  return useQuery({
    queryKey: keys.findByUrl(programUrl),
    queryFn: () =>  
    
    ProgramApi.findByUrl(programUrl)
    ,
    ...options,
  });
};






 /** 
 * Query `useGetById`
 * @param { string } object.programId Path parameter
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<ProgramModels.ImportGetProgramByIdResponseDTO> } 
 * @statusCodes [200, 401]
 */
export const useGetById = <TData>({ programId }: { programId: string,  }, options?: AppQueryOptions<typeof ProgramApi.getById, TData>) => {
  
  
  return useQuery({
    queryKey: keys.getById(programId),
    queryFn: () =>  
    
    ProgramApi.getById(programId)
    ,
    ...options,
  });
};








 /** 
 * Mutation `useUpdate`
 * @param { string } mutation.programId Path parameter
 * @param { ProgramModels.ImportUpdateProgramRequestDTO } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<void> } 
 * @statusCodes [204, 401]
 */
export const useUpdate = (options?: AppMutationOptions<typeof ProgramApi.update, { programId: string, data: ProgramModels.ImportUpdateProgramRequestDTO,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { programId, data } ) => 
      
            ProgramApi.update(programId, data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




}
