import { z } from "zod";
import { CommonModels } from "../common/common.models";

export namespace ProgramModels {
/** 
 * TimeslotDTOSchema 
 * @type { object }
 * @property { string } dayOfWeek  
 * @property { string } startTime  
 * @property { string } endTime  
 */
export const TimeslotDTOSchema = z.object({ dayOfWeek: z.string(), startTime: z.string(), endTime: z.string() });
export type TimeslotDTO = z.infer<typeof TimeslotDTOSchema>;


/** 
 * SessionInputDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { string } name  
 * @property { string } description  
 * @property { string } location  
 * @property { string } startDate  
 * @property { string } endDate  
 * @property { TimeslotDTO[] } timeslots  
 * @property { number } priceAmount  
 * @property { string[] } grades  
 */
export const SessionInputDTOSchema = z.object({ id: z.string().nullable(), name: z.string().nullable(), description: z.string().nullable(), location: z.string().nullable(), startDate: z.string().nullable(), endDate: z.string().nullable(), timeslots: z.array(TimeslotDTOSchema).nullable(), priceAmount: z.number().nullable(), grades: z.array(z.string()).nullable() }).partial();
export type SessionInputDTO = z.infer<typeof SessionInputDTOSchema>;


/** 
 * ImportUpdateProgramRequestDTOSchema 
 * @type { object }
 * @property { string } providerId  
 * @property { string } locationId  
 * @property { string } name  
 * @property { string } description  
 * @property { string } ourTake  
 * @property { string } parentsLike  
 * @property { string } keepInMind  
 * @property { string } category  
 * @property { string } subcategory  
 * @property { string } programUrl  
 * @property { string } bookingUrl  
 * @property { string } iconImageUrl  
 * @property { string[] } additionalImages  
 * @property { number } priceAmount  
 * @property { string[] } grades  
 * @property { boolean } isTopRated  
 * @property { string } policiesUrl  
 * @property { string } policiesText  
 * @property { string[] } tagIds  
 * @property { SessionInputDTO[] } sessions  
 */
export const ImportUpdateProgramRequestDTOSchema = z.object({ providerId: z.string(), locationId: z.string(), name: z.string(), description: z.string(), ourTake: z.string(), parentsLike: z.string(), keepInMind: z.string(), category: z.string(), subcategory: z.string(), programUrl: z.string(), bookingUrl: z.string(), iconImageUrl: z.string(), additionalImages: z.array(z.string()), priceAmount: z.number(), grades: z.array(z.string()), isTopRated: z.boolean(), policiesUrl: z.string(), policiesText: z.string(), tagIds: z.array(z.string()), sessions: z.array(SessionInputDTOSchema) });
export type ImportUpdateProgramRequestDTO = z.infer<typeof ImportUpdateProgramRequestDTOSchema>;


/** 
 * ImportGetProgramByIdResponseDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { string } providerId  
 * @property { string } locationId  
 * @property { string } name  
 * @property { string } description  
 * @property { string } ourTake  
 * @property { string } parentsLike  
 * @property { string } keepInMind  
 * @property { string } category  
 * @property { string } subcategory  
 * @property { string } programUrl  
 * @property { string } bookingUrl  
 * @property { string } iconImageUrl  
 * @property { string[] } additionalImages  
 * @property { number } priceAmount  
 * @property { string[] } grades  
 * @property { boolean } isTopRated  
 * @property { string } policiesUrl  
 * @property { string } policiesText  
 * @property { string[] } tagIds  
 * @property { SessionInputDTO[] } sessions  
 */
export const ImportGetProgramByIdResponseDTOSchema = z.object({ id: z.string(), providerId: z.string(), locationId: z.string(), name: z.string(), description: z.string(), ourTake: z.string(), parentsLike: z.string(), keepInMind: z.string(), category: z.string(), subcategory: z.string(), programUrl: z.string(), bookingUrl: z.string(), iconImageUrl: z.string(), additionalImages: z.array(z.string()), priceAmount: z.number(), grades: z.array(z.string()), isTopRated: z.boolean(), policiesUrl: z.string(), policiesText: z.string(), tagIds: z.array(z.string()), sessions: z.array(SessionInputDTOSchema) });
export type ImportGetProgramByIdResponseDTO = z.infer<typeof ImportGetProgramByIdResponseDTOSchema>;


/** 
 * SessionDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { string } name  
 * @property { string } description  
 * @property { string } location  
 * @property { string } startDate  
 * @property { string } endDate  
 * @property { TimeslotDTO[] } timeslots  
 * @property { number } priceAmount  
 * @property { string } priceCurrency  
 * @property { string[] } grades  
 */
export const SessionDTOSchema = z.object({ id: z.string(), name: z.string(), description: z.string(), location: z.string(), startDate: z.string(), endDate: z.string(), timeslots: z.array(TimeslotDTOSchema), priceAmount: z.number(), priceCurrency: z.string(), grades: z.array(z.string()) });
export type SessionDTO = z.infer<typeof SessionDTOSchema>;


/** 
 * GetProgramDetailsResponseDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { string } providerId  
 * @property { string } providerName  
 * @property { string } locationName  
 * @property { string } name  
 * @property { string } description  
 * @property { string } ourTake  
 * @property { string } parentsLike  
 * @property { string } keepInMind  
 * @property { string } category  
 * @property { string } subcategory  
 * @property { string } programUrl  
 * @property { string } bookingUrl  
 * @property { string } iconImageUrl  
 * @property { string[] } additionalImages  
 * @property { number } priceAmount  
 * @property { string } priceCurrency  
 * @property { string[] } grades  
 * @property { boolean } isTopRated  
 * @property { number } avgRating  
 * @property { number } reviewCount  
 * @property { string } policiesUrl  
 * @property { string } policiesText  
 * @property { CommonModels.TagDTO[] } tags  
 * @property { SessionDTO[] } sessions  
 */
export const GetProgramDetailsResponseDTOSchema = z.object({ id: z.string(), providerId: z.string(), providerName: z.string(), locationName: z.string(), name: z.string(), description: z.string(), ourTake: z.string(), parentsLike: z.string(), keepInMind: z.string(), category: z.string(), subcategory: z.string(), programUrl: z.string(), bookingUrl: z.string(), iconImageUrl: z.string(), additionalImages: z.array(z.string()), priceAmount: z.number(), priceCurrency: z.string(), grades: z.array(z.string()), isTopRated: z.boolean(), avgRating: z.number(), reviewCount: z.number(), policiesUrl: z.string(), policiesText: z.string(), tags: z.array(CommonModels.TagDTOSchema), sessions: z.array(SessionDTOSchema) });
export type GetProgramDetailsResponseDTO = z.infer<typeof GetProgramDetailsResponseDTOSchema>;


/** 
 * ImportFindProgramByUrlResponseDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { boolean } found  
 */
export const ImportFindProgramByUrlResponseDTOSchema = z.object({ id: z.string(), found: z.boolean() });
export type ImportFindProgramByUrlResponseDTO = z.infer<typeof ImportFindProgramByUrlResponseDTOSchema>;


/** 
 * SearchProgramsResponseDTOSchema 
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
export const SearchProgramsResponseDTOSchema = z.object({ programId: z.string(), title: z.string(), description: z.string(), locationName: z.string(), isTopRated: z.boolean(), priceAmount: z.number(), priceCurrency: z.string(), iconImageUrl: z.string(), grades: z.array(z.string()) });
export type SearchProgramsResponseDTO = z.infer<typeof SearchProgramsResponseDTOSchema>;


/** 
 * SearchProgramsFilterDtoSchema 
 * @type { object }
 * @property { string } q  
 * @property { string } category  
 * @property { string } subcategory  
 * @property { string[] } grades  
 * @property { string[] } neighborhoods  
 * @property { string[] } tags  
 * @property { number } rating Minimum: `1`. Maximum: `5` 
 * @property { number } priceMin  
 * @property { number } priceMax  
 * @property { string[] } dayOfWeek  
 * @property { string } startDate  
 * @property { number } duration  
 */
export const SearchProgramsFilterDtoSchema = z.object({ q: z.string().nullable(), category: z.string().nullable(), subcategory: z.string().nullable(), grades: z.array(z.string()).nullable(), neighborhoods: z.array(z.string()).nullable(), tags: z.array(z.string()).nullable(), rating: z.number().gte(1).lte(5).nullable(), priceMin: z.number().nullable(), priceMax: z.number().nullable(), dayOfWeek: z.array(z.string()).nullable(), startDate: z.string().nullable(), duration: z.number().nullable() }).partial();
export type SearchProgramsFilterDto = z.infer<typeof SearchProgramsFilterDtoSchema>;


/** 
 * SearchResponseSchema 
 * @type { object }
 * @property { number } page 1-indexed page number to begin from 
 * @property { string } cursor ID of item to start after 
 * @property { string } nextCursor Cursor for next set of items 
 * @property { number } limit Items per response 
 * @property { number } totalItems Total available items 
 * @property { SearchProgramsResponseDTO[] } items  
 */
export const SearchResponseSchema = CommonModels.PaginationDtoSchema.merge(z.object({ items: z.array(SearchProgramsResponseDTOSchema).nullable() }).partial());
export type SearchResponse = z.infer<typeof SearchResponseSchema>;


}
