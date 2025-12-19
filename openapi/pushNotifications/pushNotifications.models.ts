import { z } from "zod";
import { CommonModels } from "../common/common.models";

export namespace PushNotificationsModels {
/** 
 * DateRangeDtoSchema 
 * @type { object }
 * @property { string } start  
 * @property { string } end  
 */
export const DateRangeDtoSchema = z.object({ start: z.iso.datetime({ offset: true }).nullable(), end: z.iso.datetime({ offset: true }).nullable() }).partial();
export type DateRangeDto = z.infer<typeof DateRangeDtoSchema>;


/** 
 * PushNotificationTokenFiltersDtoSchema 
 * @type { object }
 * @property { DateRangeDto } createdAt Creation date range filter 
 * @property { string } provider Provider 
 * @property { string } search  
 */
export const PushNotificationTokenFiltersDtoSchema = z.object({ createdAt: DateRangeDtoSchema.nullable(), provider: z.string().nullable(), search: z.string().nullable() }).partial();
export type PushNotificationTokenFiltersDto = z.infer<typeof PushNotificationTokenFiltersDtoSchema>;


/** 
 * PushNotificationTokenResponseSchema 
 * @type { object }
 * @property { string } id Id 
 * @property { string } title Title. Example: `My Device` 
 * @property { string } token Token. Example: `My Device` 
 * @property { string } createdAt Created At 
 * @property { string } provider Provider. Example: `fcm` 
 */
export const PushNotificationTokenResponseSchema = z.object({ id: z.string().nullish(), title: z.string().nullish(), token: z.string().nullish(), createdAt: z.iso.datetime({ offset: true }), provider: z.string() });
export type PushNotificationTokenResponse = z.infer<typeof PushNotificationTokenResponseSchema>;


/** 
 * PushNotificationTokenCreateRequestSchema 
 * @type { object }
 * @property { string } token Token 
 * @property { string } title Title. Example: `My Device` 
 * @property { boolean } replace Replace existing tokens assigned to other resources 
 */
export const PushNotificationTokenCreateRequestSchema = z.object({ token: z.string(), title: z.string().nullish(), replace: z.boolean() });
export type PushNotificationTokenCreateRequest = z.infer<typeof PushNotificationTokenCreateRequestSchema>;


/** 
 * PushNotificationsPaginateOrderParamEnumSchema 
 * @type { enum }
 */
export const PushNotificationsPaginateOrderParamEnumSchema = z.enum(["id", "provider", "expiresAt", "createdAt"]);
export type PushNotificationsPaginateOrderParamEnum = z.infer<typeof PushNotificationsPaginateOrderParamEnumSchema>;
export const PushNotificationsPaginateOrderParamEnum = PushNotificationsPaginateOrderParamEnumSchema.enum;

/** 
 * PushNotificationsPaginateResponseSchema 
 * @type { object }
 * @property { number } page 1-indexed page number to begin from 
 * @property { string } cursor ID of item to start after 
 * @property { string } nextCursor Cursor for next set of items 
 * @property { number } limit Items per response 
 * @property { number } totalItems Total available items 
 * @property { PushNotificationTokenResponse[] } items  
 */
export const PushNotificationsPaginateResponseSchema = CommonModels.PaginationDtoSchema.merge(z.object({ items: z.array(PushNotificationTokenResponseSchema).nullable() }).partial());
export type PushNotificationsPaginateResponse = z.infer<typeof PushNotificationsPaginateResponseSchema>;


}
