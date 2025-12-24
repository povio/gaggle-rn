import { z } from "zod";
import { CommonModels } from "../common/common.models";

export namespace LocationModels {
/** 
 * ImportUpdateLocationRequestDTOSchema 
 * @type { object }
 * @property { string } providerId  
 * @property { string } name  
 * @property { string } address1  
 * @property { string } address2  
 * @property { string } city  
 * @property { string } state  
 * @property { string } zip  
 * @property { string } neighborhood  
 * @property { number } latitude  
 * @property { number } longitude  
 */
export const ImportUpdateLocationRequestDTOSchema = z.object({ providerId: z.uuid(), name: z.string(), address1: z.string().nullish(), address2: z.string().nullish(), city: z.string().nullish(), state: z.string().nullish(), zip: z.string().nullish(), neighborhood: z.string().nullish(), latitude: z.number().nullish(), longitude: z.number().nullish() });
export type ImportUpdateLocationRequestDTO = z.infer<typeof ImportUpdateLocationRequestDTOSchema>;


/** 
 * ImportGetLocationByIdResponseDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { string } providerId  
 * @property { string } name  
 * @property { string } address1  
 * @property { string } address2  
 * @property { string } city  
 * @property { string } state  
 * @property { string } zip  
 * @property { string } neighborhood  
 * @property { number } latitude  
 * @property { number } longitude  
 */
export const ImportGetLocationByIdResponseDTOSchema = z.object({ id: z.string(), providerId: z.string(), name: z.string(), address1: z.string(), address2: z.string(), city: z.string(), state: z.string(), zip: z.string(), neighborhood: z.string(), latitude: z.number(), longitude: z.number() });
export type ImportGetLocationByIdResponseDTO = z.infer<typeof ImportGetLocationByIdResponseDTOSchema>;


/** 
 * LocationPaginationFilterDtoSchema 
 * @type { object }
 * @property { string } providerId Provider ID filter 
 * @property { string } search Free search by name 
 */
export const LocationPaginationFilterDtoSchema = z.object({ providerId: z.uuid().nullable(), search: z.string().nullable() }).partial();
export type LocationPaginationFilterDto = z.infer<typeof LocationPaginationFilterDtoSchema>;


/** 
 * ImportFindLocationByNameResponseDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { boolean } found  
 */
export const ImportFindLocationByNameResponseDTOSchema = z.object({ id: z.string(), found: z.boolean() });
export type ImportFindLocationByNameResponseDTO = z.infer<typeof ImportFindLocationByNameResponseDTOSchema>;


/** 
 * LocationPaginateOrderParamEnumSchema 
 * @type { enum }
 */
export const LocationPaginateOrderParamEnumSchema = z.enum(["name", "createdAt"]);
export type LocationPaginateOrderParamEnum = z.infer<typeof LocationPaginateOrderParamEnumSchema>;
export const LocationPaginateOrderParamEnum = LocationPaginateOrderParamEnumSchema.enum;

/** 
 * LocationPaginateResponseSchema 
 * @type { object }
 * @property { number } page 1-indexed page number to begin from 
 * @property { string } cursor ID of item to start after 
 * @property { string } nextCursor Cursor for next set of items 
 * @property { number } limit Items per response 
 * @property { number } totalItems Total available items 
 * @property { ImportGetLocationByIdResponseDTO[] } items  
 */
export const LocationPaginateResponseSchema = CommonModels.PaginationDtoSchema.merge(z.object({ items: z.array(ImportGetLocationByIdResponseDTOSchema).nullable() }).partial());
export type LocationPaginateResponse = z.infer<typeof LocationPaginateResponseSchema>;


}
