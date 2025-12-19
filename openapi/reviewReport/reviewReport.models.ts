import { z } from "zod";

export namespace ReviewReportModels {
/** 
 * ReportReviewRequestDTOSchema 
 * @type { object }
 * @property { string } reason  
 */
export const ReportReviewRequestDTOSchema = z.object({ reason: z.string() });
export type ReportReviewRequestDTO = z.infer<typeof ReportReviewRequestDTOSchema>;


}
