import { z } from "zod";

export namespace HomeModels {
/** 
 * FeaturedProviderDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { string } name  
 * @property { string } logoUrl  
 * @property { boolean } isTopRated  
 */
export const FeaturedProviderDTOSchema = z.object({ id: z.string(), name: z.string(), logoUrl: z.string(), isTopRated: z.boolean() });
export type FeaturedProviderDTO = z.infer<typeof FeaturedProviderDTOSchema>;


/** 
 * GetHomeInformationResponseDTOSchema 
 * @type { object }
 * @property { FeaturedProviderDTO[] } featuredProviders  
 */
export const GetHomeInformationResponseDTOSchema = z.object({ featuredProviders: z.array(FeaturedProviderDTOSchema) });
export type GetHomeInformationResponseDTO = z.infer<typeof GetHomeInformationResponseDTOSchema>;


}
