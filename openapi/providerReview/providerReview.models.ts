import { z } from "zod";
import { CommonModels } from "../common/common.models";

export namespace ProviderReviewModels {
/** 
 * ListProviderReviewsResponseDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { string } userId  
 * @property { string } userProfileImageUrl  
 * @property { string } programId  
 * @property { string } programName  
 * @property { number } rating  
 * @property { string } content  
 * @property { string[] } imageUrls  
 * @property { string } createdAt  
 */
export const ListProviderReviewsResponseDTOSchema = z.object({ id: z.string(), userId: z.string(), userProfileImageUrl: z.string(), programId: z.string(), programName: z.string(), rating: z.number(), content: z.string(), imageUrls: z.array(z.string()), createdAt: z.string() });
export type ListProviderReviewsResponseDTO = z.infer<typeof ListProviderReviewsResponseDTOSchema>;


/** 
 * ProviderReviewListResponseSchema 
 * @type { object }
 * @property { number } page 1-indexed page number to begin from 
 * @property { string } cursor ID of item to start after 
 * @property { string } nextCursor Cursor for next set of items 
 * @property { number } limit Items per response 
 * @property { number } totalItems Total available items 
 * @property { ListProviderReviewsResponseDTO[] } items  
 */
export const ProviderReviewListResponseSchema = CommonModels.PaginationDtoSchema.merge(z.object({ items: z.array(ListProviderReviewsResponseDTOSchema).nullable() }).partial());
export type ProviderReviewListResponse = z.infer<typeof ProviderReviewListResponseSchema>;


}
