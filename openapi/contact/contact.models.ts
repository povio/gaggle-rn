import { z } from "zod";

export namespace ContactModels {
/** 
 * ContactUsRequestDTOSchema 
 * @type { object }
 * @property { string } title  
 * @property { string } message  
 */
export const ContactUsRequestDTOSchema = z.object({ title: z.string(), message: z.string() });
export type ContactUsRequestDTO = z.infer<typeof ContactUsRequestDTOSchema>;


}
