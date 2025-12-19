import { z } from "zod";

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
export const ImportUpdateLocationRequestDTOSchema = z.object({ providerId: z.string(), name: z.string(), address1: z.string(), address2: z.string(), city: z.string(), state: z.string(), zip: z.string(), neighborhood: z.string(), latitude: z.number(), longitude: z.number() });
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
 * ImportFindLocationByNameResponseDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { boolean } found  
 */
export const ImportFindLocationByNameResponseDTOSchema = z.object({ id: z.string(), found: z.boolean() });
export type ImportFindLocationByNameResponseDTO = z.infer<typeof ImportFindLocationByNameResponseDTOSchema>;


}
