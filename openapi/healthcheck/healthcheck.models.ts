import { z } from "zod";

export namespace HealthcheckModels {
/** 
 * HttpHealthDtoSchema 
 * @type { object }
 * @property { string } uptime  
 * @property { string } stage  
 * @property { string } version  
 * @property { string } release  
 * @property { string } buildTime  
 */
export const HttpHealthDtoSchema = z.object({ uptime: z.string().nullable(), stage: z.string().nullable(), version: z.string().nullable(), release: z.string().nullable(), buildTime: z.string().nullable() }).partial();
export type HttpHealthDto = z.infer<typeof HttpHealthDtoSchema>;


}
