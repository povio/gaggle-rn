import { z } from "zod";

export namespace FeedbackModels {
/** 
 * SubmitAppFeedbackResponseDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { string } userId  
 * @property { string } content  
 * @property { string } createdAt  
 */
export const SubmitAppFeedbackResponseDTOSchema = z.object({ id: z.uuid(), userId: z.uuid(), content: z.string().nullish(), createdAt: z.iso.datetime({ offset: true }).nullish() });
export type SubmitAppFeedbackResponseDTO = z.infer<typeof SubmitAppFeedbackResponseDTOSchema>;


/** 
 * SubmitAppFeedbackRequestDTOSchema 
 * @type { object }
 * @property { string } content Min Length: `1`. Max Length: `5000` 
 */
export const SubmitAppFeedbackRequestDTOSchema = z.object({ content: z.string().min(1).max(5000) });
export type SubmitAppFeedbackRequestDTO = z.infer<typeof SubmitAppFeedbackRequestDTOSchema>;


}
