import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { AppQueryOptions, AppInfiniteQueryOptions } from "../react-query.types";
import { ProviderReviewApi } from "./providerReview.api";

export namespace ProviderReviewQueries {

export const moduleName = QueryModule.ProviderReview;

export const keys = {
    all: [moduleName] as const,
    list: (providerId: string, limit?: number, page?: number, cursor?: string, ) => [...keys.all, "/api/providers/:providerId/reviews", providerId, limit, page, cursor] as const,
    listInfinite: (providerId: string, limit?: number, cursor?: string, ) => [...keys.all, "/api/providers/:providerId/reviews", "infinite", providerId, limit, cursor] as const,
};


 /** 
 * Query `useList`
 * @param { string } object.providerId Path parameter
 * @param { number } object.limit Query parameter. Items per response. Minimum: `1`. Maximum: `20`. Default: `20`
 * @param { number } object.page Query parameter. 1-indexed page number to begin from
 * @param { string } object.cursor Query parameter. ID of item to start after
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<ProviderReviewModels.ProviderReviewListResponse> } 
 * @statusCodes [200]
 */
export const useList = <TData>({ providerId, limit, page, cursor }: { providerId: string, limit: number, page?: number, cursor?: string,  }, options?: AppQueryOptions<typeof ProviderReviewApi.list, TData>) => {
  
  
  return useQuery({
    queryKey: keys.list(providerId, limit, page, cursor),
    queryFn: () =>  
    
    ProviderReviewApi.list(providerId, limit, page, cursor)
    ,
    ...options,
  });
};



/** 
 * Infinite query `useListInfinite
 * @param { string } object.providerId Path parameter
 * @param { number } object.limit Query parameter. Items per response. Minimum: `1`. Maximum: `20`. Default: `20`
 * @param { number } object.page Query parameter. 1-indexed page number to begin from
 * @param { string } object.cursor Query parameter. ID of item to start after
 * @param { AppInfiniteQueryOptions } options Infinite query options
 * @returns { UseInfiniteQueryResult<ProviderReviewModels.ProviderReviewListResponse> } 
 * @statusCodes [200]
 */
export const useListInfinite = <TData>({ providerId, limit, cursor }: { providerId: string, limit: number, cursor?: string,  }, options?: AppInfiniteQueryOptions<typeof ProviderReviewApi.list, TData>) => {
  

  return useInfiniteQuery({
    queryKey: keys.listInfinite(providerId, limit, cursor),
    queryFn: ({ pageParam }) =>  
    
    ProviderReviewApi.list(providerId, limit, pageParam, cursor)
    ,
    initialPageParam: 1,
    getNextPageParam: ({ page, totalItems, limit: limitParam }) => {
      const pageParam = page ?? 1;
      return pageParam * limitParam < totalItems ? pageParam + 1 : null;
    },
    ...options,
  });
};


}
