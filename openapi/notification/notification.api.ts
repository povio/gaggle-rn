import { AppRestClient } from "../configured-rest-client";
import { z } from "zod";
import { ZodExtended } from "../zod.extended";
import { NotificationModels } from "./notification.models";

export namespace NotificationApi {
export const list = (limit: number, page?: number, cursor?: string, ) => { 
    return AppRestClient.get( 
        { resSchema: NotificationModels.NotificationListResponseSchema }, 
        `/api/notification`,
        {
    params: {
        limit: ZodExtended.parse(z.number().gte(1).lte(20).default(20), limit, { type: "query", name: "limit" })
, 
        page: ZodExtended.parse(z.number().nullish(), page, { type: "query", name: "page" })
, 
        cursor: ZodExtended.parse(z.string().nullish(), cursor, { type: "query", name: "cursor" })
, 
    },
}
    )
};

export const create = (data: NotificationModels.CreateNotification, ) => { 
    return AppRestClient.post( 
        { resSchema: NotificationModels.NotificationResponseSchema }, 
        `/api/notification`,
        ZodExtended.parse(NotificationModels.CreateNotificationSchema, data)
, 
        
    )
};

export const getById = (id: string, ) => { 
    return AppRestClient.get( 
        { resSchema: NotificationModels.NotificationResponseSchema }, 
        `/api/notification/${id}`,
        
    )
};

export const update = (id: string, data: NotificationModels.UpdateNotification, ) => { 
    return AppRestClient.put( 
        { resSchema: NotificationModels.NotificationResponseSchema }, 
        `/api/notification/${id}`,
        ZodExtended.parse(NotificationModels.UpdateNotificationSchema, data)
, 
        
    )
};

export const deleteNotification = (id: string, ) => { 
    return AppRestClient.delete( 
        { resSchema: z.void() }, 
        `/api/notification/${id}`,
        
    )
};

export const getUnreadCount = () => { 
    return AppRestClient.get( 
        { resSchema: NotificationModels.GetUnreadNotificationsCountResponseDTOSchema }, 
        `/api/notifications/unread-count`,
        
    )
};

export const getAll = (limit: number, page?: number, cursor?: string, ) => { 
    return AppRestClient.get( 
        { resSchema: NotificationModels.GetAllResponseSchema }, 
        `/api/notifications`,
        {
    params: {
        limit: ZodExtended.parse(z.number().gte(1).lte(20).default(20), limit, { type: "query", name: "limit" })
, 
        page: ZodExtended.parse(z.number().nullish(), page, { type: "query", name: "page" })
, 
        cursor: ZodExtended.parse(z.string().nullish(), cursor, { type: "query", name: "cursor" })
, 
    },
}
    )
};

export const markRead = () => { 
    return AppRestClient.post( 
        { resSchema: z.void() }, 
        `/api/notifications/mark-read`,
        
    )
};

}
