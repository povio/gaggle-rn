import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { MutationEffectsOptions, useMutationEffects } from "../useMutationEffects";
import { AppQueryOptions, AppInfiniteQueryOptions, AppMutationOptions } from "../react-query.types";
import { PushNotificationsModels } from "./pushNotifications.models";
import { PushNotificationsApi } from "./pushNotifications.api";

export namespace PushNotificationsQueries {

export const moduleName = QueryModule.PushNotifications;

export const keys = {
    all: [moduleName] as const,
    paginate: (limit?: number, order?: string, filter?: PushNotificationsModels.PushNotificationTokenFiltersDto, page?: number, cursor?: string, ) => [...keys.all, "/api/user/push-tokens", limit, order, filter, page, cursor] as const,
    paginateInfinite: (limit?: number, order?: string, filter?: PushNotificationsModels.PushNotificationTokenFiltersDto, cursor?: string, ) => [...keys.all, "/api/user/push-tokens", "infinite", limit, order, filter, cursor] as const,
};




 /** 
 * Mutation `useRegister`
 * @summary Register/update a new device for push notifications
 * @param { PushNotificationsModels.PushNotificationTokenCreateRequest } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<CommonModels.StatusResponseDto> } 
 * @statusCodes [201, 401]
 */
export const useRegister = (options?: AppMutationOptions<typeof PushNotificationsApi.register, { data: PushNotificationsModels.PushNotificationTokenCreateRequest,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { data } ) => 
      
            PushNotificationsApi.register(data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




 /** 
 * Query `usePaginate`
 * @summary Paginate push notification tokens
 * @param { number } object.limit Query parameter. Items per response. Minimum: `1`. Maximum: `20`. Default: `20`
 * @param { string } object.order Query parameter. Order by fields (comma separated with +/- prefix): id, provider, expiresAt, createdAt. Example: `id`
 * @param { PushNotificationsModels.PushNotificationTokenFiltersDto } object.filter Query parameter. Filter
 * @param { number } object.page Query parameter. 1-indexed page number to begin from
 * @param { string } object.cursor Query parameter. ID of item to start after
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<PushNotificationsModels.PaginateResponse> } 
 * @statusCodes [200, 401]
 */
export const usePaginate = <TData>({ limit, order, filter, page, cursor }: { limit: number, order?: string, filter?: PushNotificationsModels.PushNotificationTokenFiltersDto, page?: number, cursor?: string,  }, options?: AppQueryOptions<typeof PushNotificationsApi.paginate, TData>) => {
  
  
  return useQuery({
    queryKey: keys.paginate(limit, order, filter, page, cursor),
    queryFn: () =>  
    
    PushNotificationsApi.paginate(limit, order, filter, page, cursor)
    ,
    ...options,
  });
};



/** 
 * Infinite query `usePaginateInfinite
 * @summary Paginate push notification tokens
 * @param { number } object.limit Query parameter. Items per response. Minimum: `1`. Maximum: `20`. Default: `20`
 * @param { string } object.order Query parameter. Order by fields (comma separated with +/- prefix): id, provider, expiresAt, createdAt. Example: `id`
 * @param { PushNotificationsModels.PushNotificationTokenFiltersDto } object.filter Query parameter. Filter
 * @param { number } object.page Query parameter. 1-indexed page number to begin from
 * @param { string } object.cursor Query parameter. ID of item to start after
 * @param { AppInfiniteQueryOptions } options Infinite query options
 * @returns { UseInfiniteQueryResult<PushNotificationsModels.PaginateResponse> } 
 * @statusCodes [200, 401]
 */
export const usePaginateInfinite = <TData>({ limit, order, filter, cursor }: { limit: number, order?: string, filter?: PushNotificationsModels.PushNotificationTokenFiltersDto, cursor?: string,  }, options?: AppInfiniteQueryOptions<typeof PushNotificationsApi.paginate, TData>) => {
  

  return useInfiniteQuery({
    queryKey: keys.paginateInfinite(limit, order, filter, cursor),
    queryFn: ({ pageParam }) =>  
    
    PushNotificationsApi.paginate(limit, order, filter, pageParam, cursor)
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
 * Mutation `useRemove`
 * @param { string } mutation.id Path parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<CommonModels.StatusResponseDto> } 
 * @statusCodes [200, 401]
 */
export const useRemove = (options?: AppMutationOptions<typeof PushNotificationsApi.remove, { id: string,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { id } ) => 
      
            PushNotificationsApi.remove(id)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




}
