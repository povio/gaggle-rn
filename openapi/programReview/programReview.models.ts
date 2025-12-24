import { z } from "zod";
import { CommonModels } from "../common/common.models";

export namespace ProgramReviewModels {
/** 
 * ReviewImageRequestSchema 
 * @type { object }
 * @property { string } mediaId  
 * @property { number } order  
 */
export const ReviewImageRequestSchema = z.object({ mediaId: z.string(), order: z.number() });
export type ReviewImageRequest = z.infer<typeof ReviewImageRequestSchema>;


/** 
 * PostProgramReviewRequestDTOSchema 
 * @type { object }
 * @property { number } rating  
 * @property { string } content  
 * @property { ReviewImageRequest[] } images  
 */
export const PostProgramReviewRequestDTOSchema = z.object({ rating: z.number(), content: z.string(), images: z.array(ReviewImageRequestSchema).nullish() });
export type PostProgramReviewRequestDTO = z.infer<typeof PostProgramReviewRequestDTOSchema>;


/** 
 * ListProgramReviewsResponseDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { string } userId  
 * @property { string } userProfileImageUrl  
 * @property { string } nickname  
 * @property { number } rating  
 * @property { string } content  
 * @property { string[] } imageUrls  
 * @property { string } createdAt  
 */
export const ListProgramReviewsResponseDTOSchema = z.object({ id: z.string(), userId: z.string(), userProfileImageUrl: z.string().nullish(), nickname: z.string().nullish(), rating: z.number(), content: z.string(), imageUrls: z.array(z.string()), createdAt: z.string() });
export type ListProgramReviewsResponseDTO = z.infer<typeof ListProgramReviewsResponseDTOSchema>;


/** 
 * ProgramReviewListResponseSchema 
 * @type { object }
 * @property { number } page 1-indexed page number to begin from 
 * @property { string } cursor ID of item to start after 
 * @property { string } nextCursor Cursor for next set of items 
 * @property { number } limit Items per response 
 * @property { number } totalItems Total available items 
 * @property { ListProgramReviewsResponseDTO[] } items  
 */
export const ProgramReviewListResponseSchema = CommonModels.PaginationDtoSchema.merge(z.object({ items: z.array(ListProgramReviewsResponseDTOSchema).nullable() }).partial());
export type ProgramReviewListResponse = z.infer<typeof ProgramReviewListResponseSchema>;


}
