import { z } from "zod";
import { CommonModels } from "../common/common.models";

export namespace ProviderModels {
/** 
 * AvailableProviderDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { string } name  
 * @property { boolean } isTopRated  
 * @property { number } avgRating  
 */
export const AvailableProviderDTOSchema = z.object({ id: z.string(), name: z.string(), isTopRated: z.boolean(), avgRating: z.number() });
export type AvailableProviderDTO = z.infer<typeof AvailableProviderDTOSchema>;


/** 
 * ListAvailableProvidersResponseDTOSchema 
 * @type { object }
 * @property { AvailableProviderDTO[] } items  
 */
export const ListAvailableProvidersResponseDTOSchema = z.object({ items: z.array(AvailableProviderDTOSchema) });
export type ListAvailableProvidersResponseDTO = z.infer<typeof ListAvailableProvidersResponseDTOSchema>;


/** 
 * ProviderLocationDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { string } name  
 */
export const ProviderLocationDTOSchema = z.object({ id: z.string(), name: z.string() });
export type ProviderLocationDTO = z.infer<typeof ProviderLocationDTOSchema>;


/** 
 * GetProviderDetailsResponseDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { string } name  
 * @property { string } email  
 * @property { string } phone  
 * @property { string } websiteUrl  
 * @property { string } logoUrl  
 * @property { string } ourTake  
 * @property { string } parentsLike  
 * @property { string } keepInMind  
 * @property { boolean } isTopRated  
 * @property { boolean } isFeatured  
 * @property { number } avgRating  
 * @property { number } reviewCount  
 * @property { number } followCount  
 * @property { ProviderLocationDTO[] } locations  
 */
export const GetProviderDetailsResponseDTOSchema = z.object({ id: z.string(), name: z.string(), email: z.string(), phone: z.string(), websiteUrl: z.string(), logoUrl: z.string(), ourTake: z.string(), parentsLike: z.string(), keepInMind: z.string(), isTopRated: z.boolean(), isFeatured: z.boolean(), avgRating: z.number(), reviewCount: z.number(), followCount: z.number(), locations: z.array(ProviderLocationDTOSchema) });
export type GetProviderDetailsResponseDTO = z.infer<typeof GetProviderDetailsResponseDTOSchema>;


/** 
 * ImportUpdateProviderRequestDTOSchema 
 * @type { object }
 * @property { string } name  
 * @property { string } email  
 * @property { string } phone  
 * @property { string } websiteUrl  
 * @property { string } logoUrl  
 * @property { string } ourTake  
 * @property { string } parentsLike  
 * @property { string } keepInMind  
 * @property { boolean } isTopRated  
 * @property { boolean } isFeatured  
 * @property { number } displayOrder  
 */
export const ImportUpdateProviderRequestDTOSchema = z.object({ name: z.string(), email: z.string(), phone: z.string(), websiteUrl: z.string(), logoUrl: z.string(), ourTake: z.string(), parentsLike: z.string(), keepInMind: z.string(), isTopRated: z.boolean(), isFeatured: z.boolean(), displayOrder: z.number() });
export type ImportUpdateProviderRequestDTO = z.infer<typeof ImportUpdateProviderRequestDTOSchema>;


/** 
 * ImportGetProviderByIdResponseDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { string } name  
 * @property { string } email  
 * @property { string } phone  
 * @property { string } websiteUrl  
 * @property { string } logoUrl  
 * @property { string } ourTake  
 * @property { string } parentsLike  
 * @property { string } keepInMind  
 * @property { boolean } isTopRated  
 * @property { boolean } isFeatured  
 * @property { number } displayOrder  
 */
export const ImportGetProviderByIdResponseDTOSchema = z.object({ id: z.string(), name: z.string(), email: z.string(), phone: z.string(), websiteUrl: z.string(), logoUrl: z.string(), ourTake: z.string(), parentsLike: z.string(), keepInMind: z.string(), isTopRated: z.boolean(), isFeatured: z.boolean(), displayOrder: z.number() });
export type ImportGetProviderByIdResponseDTO = z.infer<typeof ImportGetProviderByIdResponseDTOSchema>;


/** 
 * ProviderPaginationFilterDtoSchema 
 * @type { object }
 * @property { string } search Free search by name or website 
 */
export const ProviderPaginationFilterDtoSchema = z.object({ search: z.string().nullable() }).partial();
export type ProviderPaginationFilterDto = z.infer<typeof ProviderPaginationFilterDtoSchema>;


/** 
 * ImportFindProviderByWebsiteUrlResponseDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { boolean } found  
 */
export const ImportFindProviderByWebsiteUrlResponseDTOSchema = z.object({ id: z.string(), found: z.boolean() });
export type ImportFindProviderByWebsiteUrlResponseDTO = z.infer<typeof ImportFindProviderByWebsiteUrlResponseDTOSchema>;


/** 
 * ListFollowedProvidersMetaResponseDTOSchema 
 * @type { object }
 * @property { string[] } items  
 */
export const ListFollowedProvidersMetaResponseDTOSchema = z.object({ items: z.array(z.string()) });
export type ListFollowedProvidersMetaResponseDTO = z.infer<typeof ListFollowedProvidersMetaResponseDTOSchema>;


/** 
 * ListProviderProgramsResponseDTOSchema 
 * @type { object }
 * @property { string } programId  
 * @property { string } title  
 * @property { string } description  
 * @property { string } locationName  
 * @property { boolean } isTopRated  
 * @property { number } priceAmount  
 * @property { string } priceCurrency  
 * @property { string } iconImageUrl  
 * @property { string[] } grades  
 */
export const ListProviderProgramsResponseDTOSchema = z.object({ programId: z.string(), title: z.string(), description: z.string(), locationName: z.string(), isTopRated: z.boolean(), priceAmount: z.number(), priceCurrency: z.string(), iconImageUrl: z.string(), grades: z.array(z.string()) });
export type ListProviderProgramsResponseDTO = z.infer<typeof ListProviderProgramsResponseDTOSchema>;


/** 
 * ListProgramsResponseSchema 
 * @type { object }
 * @property { number } page 1-indexed page number to begin from 
 * @property { string } cursor ID of item to start after 
 * @property { string } nextCursor Cursor for next set of items 
 * @property { number } limit Items per response 
 * @property { number } totalItems Total available items 
 * @property { ListProviderProgramsResponseDTO[] } items  
 */
export const ListProgramsResponseSchema = CommonModels.PaginationDtoSchema.merge(z.object({ items: z.array(ListProviderProgramsResponseDTOSchema).nullable() }).partial());
export type ListProgramsResponse = z.infer<typeof ListProgramsResponseSchema>;


/** 
 * ProviderPaginateOrderParamEnumSchema 
 * @type { enum }
 */
export const ProviderPaginateOrderParamEnumSchema = z.enum(["name", "createdAt", "updatedAt"]);
export type ProviderPaginateOrderParamEnum = z.infer<typeof ProviderPaginateOrderParamEnumSchema>;
export const ProviderPaginateOrderParamEnum = ProviderPaginateOrderParamEnumSchema.enum;

/** 
 * ProviderPaginateResponseSchema 
 * @type { object }
 * @property { number } page 1-indexed page number to begin from 
 * @property { string } cursor ID of item to start after 
 * @property { string } nextCursor Cursor for next set of items 
 * @property { number } limit Items per response 
 * @property { number } totalItems Total available items 
 * @property { ImportGetProviderByIdResponseDTO[] } items  
 */
export const ProviderPaginateResponseSchema = CommonModels.PaginationDtoSchema.merge(z.object({ items: z.array(ImportGetProviderByIdResponseDTOSchema).nullable() }).partial());
export type ProviderPaginateResponse = z.infer<typeof ProviderPaginateResponseSchema>;


}
