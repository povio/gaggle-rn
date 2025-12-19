import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { MutationEffectsOptions, useMutationEffects } from "../useMutationEffects";
import { AppQueryOptions, AppInfiniteQueryOptions, AppMutationOptions } from "../react-query.types";
import { ProgramReviewModels } from "./programReview.models";
import { ProgramReviewApi } from "./programReview.api";

export namespace ProgramReviewQueries {

export const moduleName = QueryModule.ProgramReview;

export const keys = {
    all: [moduleName] as const,
    list: (programId: string, limit?: number, page?: number, cursor?: string, ) => [...keys.all, "/api/programs/:programId/reviews", programId, limit, page, cursor] as const,
    listInfinite: (programId: string, limit?: number, cursor?: string, ) => [...keys.all, "/api/programs/:programId/reviews", "infinite", programId, limit, cursor] as const,
};


 /** 
 * Query `useList`
 * @param { string } object.programId Path parameter
 * @param { number } object.limit Query parameter. Items per response. Minimum: `1`. Maximum: `20`. Default: `20`
 * @param { number } object.page Query parameter. 1-indexed page number to begin from
 * @param { string } object.cursor Query parameter. ID of item to start after
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<ProgramReviewModels.ProgramReviewListResponse> } 
 * @statusCodes [200]
 */
export const useList = <TData>({ programId, limit, page, cursor }: { programId: string, limit: number, page?: number, cursor?: string,  }, options?: AppQueryOptions<typeof ProgramReviewApi.list, TData>) => {
  
  
  return useQuery({
    queryKey: keys.list(programId, limit, page, cursor),
    queryFn: () =>  
    
    ProgramReviewApi.list(programId, limit, page, cursor)
    ,
    ...options,
  });
};



/** 
 * Infinite query `useListInfinite
 * @param { string } object.programId Path parameter
 * @param { number } object.limit Query parameter. Items per response. Minimum: `1`. Maximum: `20`. Default: `20`
 * @param { number } object.page Query parameter. 1-indexed page number to begin from
 * @param { string } object.cursor Query parameter. ID of item to start after
 * @param { AppInfiniteQueryOptions } options Infinite query options
 * @returns { UseInfiniteQueryResult<ProgramReviewModels.ProgramReviewListResponse> } 
 * @statusCodes [200]
 */
export const useListInfinite = <TData>({ programId, limit, cursor }: { programId: string, limit: number, cursor?: string,  }, options?: AppInfiniteQueryOptions<typeof ProgramReviewApi.list, TData>) => {
  

  return useInfiniteQuery({
    queryKey: keys.listInfinite(programId, limit, cursor),
    queryFn: ({ pageParam }) =>  
    
    ProgramReviewApi.list(programId, limit, pageParam, cursor)
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
 * @param { string } mutation.programId Path parameter
 * @param { ProgramReviewModels.PostProgramReviewRequestDTO } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<void> } 
 * @statusCodes [201, 401]
 */
export const useCreate = (options?: AppMutationOptions<typeof ProgramReviewApi.create, { programId: string, data: ProgramReviewModels.PostProgramReviewRequestDTO,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { programId, data } ) => 
      
            ProgramReviewApi.create(programId, data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




}
