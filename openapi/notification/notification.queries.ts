import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { MutationEffectsOptions, useMutationEffects } from "../useMutationEffects";
import { AppQueryOptions, AppInfiniteQueryOptions, AppMutationOptions } from "../react-query.types";
import { NotificationModels } from "./notification.models";
import { NotificationApi } from "./notification.api";

export namespace NotificationQueries {

export const moduleName = QueryModule.Notification;

export const keys = {
    all: [moduleName] as const,
    list: (limit?: number, page?: number, cursor?: string, ) => [...keys.all, "/api/notification", limit, page, cursor] as const,
    listInfinite: (limit?: number, cursor?: string, ) => [...keys.all, "/api/notification", "infinite", limit, cursor] as const,
    getById: (id: string, ) => [...keys.all, "/api/notification/:id", id] as const,
    getUnreadCount: () => [...keys.all, "/api/notifications/unread-count", ] as const,
    getAll: (limit?: number, page?: number, cursor?: string, ) => [...keys.all, "/api/notifications", limit, page, cursor] as const,
    getAllInfinite: (limit?: number, cursor?: string, ) => [...keys.all, "/api/notifications", "infinite", limit, cursor] as const,
};


 /** 
 * Query `useList`
 * @param { number } object.limit Query parameter. Items per response. Minimum: `1`. Maximum: `20`. Default: `20`
 * @param { number } object.page Query parameter. 1-indexed page number to begin from
 * @param { string } object.cursor Query parameter. ID of item to start after
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<NotificationModels.NotificationListResponse> } 
 * @statusCodes [200, 401]
 */
export const useList = <TData>({ limit, page, cursor }: { limit: number, page?: number, cursor?: string,  }, options?: AppQueryOptions<typeof NotificationApi.list, TData>) => {
  
  
  return useQuery({
    queryKey: keys.list(limit, page, cursor),
    queryFn: () =>  
    
    NotificationApi.list(limit, page, cursor)
    ,
    ...options,
  });
};



/** 
 * Infinite query `useListInfinite
 * @param { number } object.limit Query parameter. Items per response. Minimum: `1`. Maximum: `20`. Default: `20`
 * @param { number } object.page Query parameter. 1-indexed page number to begin from
 * @param { string } object.cursor Query parameter. ID of item to start after
 * @param { AppInfiniteQueryOptions } options Infinite query options
 * @returns { UseInfiniteQueryResult<NotificationModels.NotificationListResponse> } 
 * @statusCodes [200, 401]
 */
export const useListInfinite = <TData>({ limit, cursor }: { limit: number, cursor?: string,  }, options?: AppInfiniteQueryOptions<typeof NotificationApi.list, TData>) => {
  

  return useInfiniteQuery({
    queryKey: keys.listInfinite(limit, cursor),
    queryFn: ({ pageParam }) =>  
    
    NotificationApi.list(limit, pageParam, cursor)
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
 * @param { NotificationModels.CreateNotification } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<NotificationModels.NotificationResponse> } 
 * @statusCodes [201, 401]
 */
export const useCreate = (options?: AppMutationOptions<typeof NotificationApi.create, { data: NotificationModels.CreateNotification,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { data } ) => 
      
            NotificationApi.create(data)
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
 * @param { string } object.id Path parameter
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<NotificationModels.NotificationResponse> } 
 * @statusCodes [200, 401]
 */
export const useGetById = <TData>({ id }: { id: string,  }, options?: AppQueryOptions<typeof NotificationApi.getById, TData>) => {
  
  
  return useQuery({
    queryKey: keys.getById(id),
    queryFn: () =>  
    
    NotificationApi.getById(id)
    ,
    ...options,
  });
};








 /** 
 * Mutation `useUpdate`
 * @param { string } mutation.id Path parameter
 * @param { NotificationModels.UpdateNotification } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<NotificationModels.NotificationResponse> } 
 * @statusCodes [200, 401]
 */
export const useUpdate = (options?: AppMutationOptions<typeof NotificationApi.update, { id: string, data: NotificationModels.UpdateNotification,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { id, data } ) => 
      
            NotificationApi.update(id, data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      const { id } = variables;
      const updateKeys = [keys.getById(id), ];
      await runMutationEffects(resData, options, updateKeys);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};






 /** 
 * Mutation `useDeleteNotification`
 * @param { string } mutation.id Path parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<void> } 
 * @statusCodes [204, 401]
 */
export const useDeleteNotification = (options?: AppMutationOptions<typeof NotificationApi.deleteNotification, { id: string,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { id } ) => 
      
            NotificationApi.deleteNotification(id)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




 /** 
 * Query `useGetUnreadCount`
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<NotificationModels.GetUnreadNotificationsCountResponseDTO> } 
 * @statusCodes [200, 401]
 */
export const useGetUnreadCount = <TData>(options?: AppQueryOptions<typeof NotificationApi.getUnreadCount, TData>) => {
  
  
  return useQuery({
    queryKey: keys.getUnreadCount(),
    queryFn: NotificationApi.getUnreadCount
    ,
    ...options,
  });
};






 /** 
 * Query `useGetAll`
 * @param { number } object.limit Query parameter. Items per response. Minimum: `1`. Maximum: `20`. Default: `20`
 * @param { number } object.page Query parameter. 1-indexed page number to begin from
 * @param { string } object.cursor Query parameter. ID of item to start after
 * @param { AppQueryOptions } options Query options
 * @returns { UseQueryResult<NotificationModels.GetAllResponse> } 
 * @statusCodes [200, 401]
 */
export const useGetAll = <TData>({ limit, page, cursor }: { limit: number, page?: number, cursor?: string,  }, options?: AppQueryOptions<typeof NotificationApi.getAll, TData>) => {
  
  
  return useQuery({
    queryKey: keys.getAll(limit, page, cursor),
    queryFn: () =>  
    
    NotificationApi.getAll(limit, page, cursor)
    ,
    ...options,
  });
};



/** 
 * Infinite query `useGetAllInfinite
 * @param { number } object.limit Query parameter. Items per response. Minimum: `1`. Maximum: `20`. Default: `20`
 * @param { number } object.page Query parameter. 1-indexed page number to begin from
 * @param { string } object.cursor Query parameter. ID of item to start after
 * @param { AppInfiniteQueryOptions } options Infinite query options
 * @returns { UseInfiniteQueryResult<NotificationModels.GetAllResponse> } 
 * @statusCodes [200, 401]
 */
export const useGetAllInfinite = <TData>({ limit, cursor }: { limit: number, cursor?: string,  }, options?: AppInfiniteQueryOptions<typeof NotificationApi.getAll, TData>) => {
  

  return useInfiniteQuery({
    queryKey: keys.getAllInfinite(limit, cursor),
    queryFn: ({ pageParam }) =>  
    
    NotificationApi.getAll(limit, pageParam, cursor)
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
 * Mutation `useMarkRead`
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<void> } 
 * @statusCodes [204, 401]
 */
export const useMarkRead = (options?: AppMutationOptions<typeof NotificationApi.markRead, {  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: () => 
      
            NotificationApi.markRead()
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




}
