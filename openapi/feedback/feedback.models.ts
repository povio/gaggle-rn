import { z } from "zod";

export namespace FeedbackModels {
/** 
 * SubmitAppFeedbackRequestDTOSchema 
 * @type { object }
 * @property { string } content Min Length: `1`. Max Length: `5000` 
 */
export const SubmitAppFeedbackRequestDTOSchema = z.object({ content: z.string().min(1).max(5000) });
export type SubmitAppFeedbackRequestDTO = z.infer<typeof SubmitAppFeedbackRequestDTOSchema>;


}
