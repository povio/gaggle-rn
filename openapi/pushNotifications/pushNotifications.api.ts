import { AppRestClient } from "../configured-rest-client";
import { z } from "zod";
import { ZodExtended } from "../zod.extended";
import { CommonModels } from "../common/common.models";
import { PushNotificationsModels } from "./pushNotifications.models";

export namespace PushNotificationsApi {
export const register = (data: PushNotificationsModels.PushNotificationTokenCreateRequest, ) => { 
    return AppRestClient.post( 
        { resSchema: CommonModels.StatusResponseDtoSchema }, 
        `/api/user/push-tokens`,
        ZodExtended.parse(PushNotificationsModels.PushNotificationTokenCreateRequestSchema, data)
, 
        
    )
};

export const paginate = (limit: number, order?: string, filter?: PushNotificationsModels.PushNotificationTokenFiltersDto, page?: number, cursor?: string, ) => { 
    return AppRestClient.get( 
        { resSchema: PushNotificationsModels.PushNotificationsPaginateResponseSchema }, 
        `/api/user/push-tokens`,
        {
    params: {
        order: ZodExtended.parse(ZodExtended.sortExp(PushNotificationsModels.PushNotificationsPaginateOrderParamEnumSchema).optional(), order, { type: "query", name: "order" })
, 
        filter: ZodExtended.parse(PushNotificationsModels.PushNotificationTokenFiltersDtoSchema.optional(), filter, { type: "query", name: "filter" })
, 
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

export const remove = (id: string, ) => { 
    return AppRestClient.delete( 
        { resSchema: CommonModels.StatusResponseDtoSchema }, 
        `/api/user/push-tokens/${id}`,
        
    )
};

}
