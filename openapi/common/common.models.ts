import { z } from "zod";

export namespace CommonModels {
/** 
 * TagDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { string } name  
 * @property { string } tagType  
 * @property { string } category  
 */
export const TagDTOSchema = z.object({ id: z.string(), name: z.string(), tagType: z.string(), category: z.string() });
export type TagDTO = z.infer<typeof TagDTOSchema>;


/** 
 * PaginationDtoSchema 
 * @type { object }
 * @property { string[] } items Items 
 * @property { number } page 1-indexed page number to begin from 
 * @property { string } cursor ID of item to start after 
 * @property { string } nextCursor Cursor for next set of items 
 * @property { number } limit Items per response 
 * @property { number } totalItems Total available items 
 */
export const PaginationDtoSchema = z.object({ items: z.array(z.string()), page: z.number().nullish(), cursor: z.string().nullish(), nextCursor: z.string().nullish(), limit: z.number(), totalItems: z.number() });
export type PaginationDto = z.infer<typeof PaginationDtoSchema>;


/** 
 * StatusResponseDtoSchema 
 * @type { object }
 * @property { string } status Status
 *@default ok 
 * @property { string } message Message 
 * @property { string } code Alphanumeric code of the message type 
 */
export const StatusResponseDtoSchema = z.object({ status: z.string(), message: z.string(), code: z.string() });
export type StatusResponseDto = z.infer<typeof StatusResponseDtoSchema>;


}
