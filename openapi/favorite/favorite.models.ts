import { z } from "zod";
import { CommonModels } from "../common/common.models";

export namespace FavoriteModels {
/** 
 * FavoriteMetaDTOSchema 
 * @type { object }
 * @property { string } programId  
 * @property { string } sessionId  
 */
export const FavoriteMetaDTOSchema = z.object({ programId: z.string(), sessionId: z.string().nullish() });
export type FavoriteMetaDTO = z.infer<typeof FavoriteMetaDTOSchema>;


/** 
 * ListUserFavoritesMetaResponseDTOSchema 
 * @type { object }
 * @property { FavoriteMetaDTO[] } items  
 */
export const ListUserFavoritesMetaResponseDTOSchema = z.object({ items: z.array(FavoriteMetaDTOSchema) });
export type ListUserFavoritesMetaResponseDTO = z.infer<typeof ListUserFavoritesMetaResponseDTOSchema>;


/** 
 * UnfavoriteProgramRequestDTOSchema 
 * @type { object }
 * @property { string } programId  
 * @property { string } sessionId  
 */
export const UnfavoriteProgramRequestDTOSchema = z.object({ programId: z.string(), sessionId: z.string().nullish() });
export type UnfavoriteProgramRequestDTO = z.infer<typeof UnfavoriteProgramRequestDTOSchema>;


/** 
 * FavoriteProgramRequestDTOSchema 
 * @type { object }
 * @property { string } programId  
 * @property { string } sessionId  
 */
export const FavoriteProgramRequestDTOSchema = z.object({ programId: z.string(), sessionId: z.string().nullish() });
export type FavoriteProgramRequestDTO = z.infer<typeof FavoriteProgramRequestDTOSchema>;


/** 
 * ListUserFavoritesResponseDTOSchema 
 * @type { object }
 * @property { string } title  
 * @property { string } description  
 * @property { string } locationName  
 * @property { boolean } isTopRated  
 * @property { number } priceAmount  
 * @property { string } priceCurrency  
 * @property { string } iconImageUrl  
 * @property { string } sessionId  
 * @property { string } programId  
 * @property { string[] } grades  
 */
export const ListUserFavoritesResponseDTOSchema = z.object({ title: z.string(), description: z.string(), locationName: z.string(), isTopRated: z.boolean(), priceAmount: z.number(), priceCurrency: z.string(), iconImageUrl: z.string(), sessionId: z.string().nullish(), programId: z.string(), grades: z.array(z.string()) });
export type ListUserFavoritesResponseDTO = z.infer<typeof ListUserFavoritesResponseDTOSchema>;


/** 
 * ListUserResponseSchema 
 * @type { object }
 * @property { number } page 1-indexed page number to begin from 
 * @property { string } cursor ID of item to start after 
 * @property { string } nextCursor Cursor for next set of items 
 * @property { number } limit Items per response 
 * @property { number } totalItems Total available items 
 * @property { ListUserFavoritesResponseDTO[] } items  
 */
export const ListUserResponseSchema = CommonModels.PaginationDtoSchema.merge(z.object({ items: z.array(ListUserFavoritesResponseDTOSchema).nullable() }).partial());
export type ListUserResponse = z.infer<typeof ListUserResponseSchema>;


}
