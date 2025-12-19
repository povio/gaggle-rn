import { z } from "zod";
import { CommonModels } from "../common/common.models";

export namespace NotificationModels {
/** 
 * GetAllNotificationsResponseDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { string } content  
 * @property { string } programId  
 * @property { string } programIconImageUrl  
 * @property { boolean } seen  
 * @property { string } createdAt  
 */
export const GetAllNotificationsResponseDTOSchema = z.object({ id: z.string(), content: z.string(), programId: z.string(), programIconImageUrl: z.string(), seen: z.boolean(), createdAt: z.string() });
export type GetAllNotificationsResponseDTO = z.infer<typeof GetAllNotificationsResponseDTOSchema>;


/** 
 * GetUnreadNotificationsCountResponseDTOSchema 
 * @type { object }
 * @property { number } count  
 */
export const GetUnreadNotificationsCountResponseDTOSchema = z.object({ count: z.number() });
export type GetUnreadNotificationsCountResponseDTO = z.infer<typeof GetUnreadNotificationsCountResponseDTOSchema>;


/** 
 * UpdateNotificationSchema 
 * @type { object }
 * @property { string } userId  
 * @property { string } programId  
 * @property { string } content  
 * @property { boolean } seen  
 */
export const UpdateNotificationSchema = z.object({ userId: z.string().nullable(), programId: z.string().nullable(), content: z.string().nullable(), seen: z.boolean().nullable() }).partial();
export type UpdateNotification = z.infer<typeof UpdateNotificationSchema>;


/** 
 * CreateNotificationSchema 
 * @type { object }
 * @property { string } userId  
 * @property { string } programId  
 * @property { string } content  
 * @property { boolean } seen  
 */
export const CreateNotificationSchema = z.object({ userId: z.string(), programId: z.string(), content: z.string().nullish(), seen: z.boolean().nullish() });
export type CreateNotification = z.infer<typeof CreateNotificationSchema>;


/** 
 * NotificationResponseSchema 
 * @type { object }
 * @property { string } id  
 * @property { string } userId  
 * @property { string } programId  
 * @property { string } content  
 * @property { boolean } seen  
 * @property { string } createdAt  
 */
export const NotificationResponseSchema = z.object({ id: z.string().nullish(), userId: z.string(), programId: z.string(), content: z.string().nullish(), seen: z.boolean().nullish(), createdAt: z.iso.datetime({ offset: true }).nullish() });
export type NotificationResponse = z.infer<typeof NotificationResponseSchema>;


/** 
 * NotificationListResponseSchema 
 * @type { object }
 * @property { number } page 1-indexed page number to begin from 
 * @property { string } cursor ID of item to start after 
 * @property { string } nextCursor Cursor for next set of items 
 * @property { number } limit Items per response 
 * @property { number } totalItems Total available items 
 * @property { NotificationResponse[] } items  
 */
export const NotificationListResponseSchema = CommonModels.PaginationDtoSchema.merge(z.object({ items: z.array(NotificationResponseSchema).nullable() }).partial());
export type NotificationListResponse = z.infer<typeof NotificationListResponseSchema>;


/** 
 * GetAllResponseSchema 
 * @type { object }
 * @property { number } page 1-indexed page number to begin from 
 * @property { string } cursor ID of item to start after 
 * @property { string } nextCursor Cursor for next set of items 
 * @property { number } limit Items per response 
 * @property { number } totalItems Total available items 
 * @property { GetAllNotificationsResponseDTO[] } items  
 */
export const GetAllResponseSchema = CommonModels.PaginationDtoSchema.merge(z.object({ items: z.array(GetAllNotificationsResponseDTOSchema).nullable() }).partial());
export type GetAllResponse = z.infer<typeof GetAllResponseSchema>;


}
