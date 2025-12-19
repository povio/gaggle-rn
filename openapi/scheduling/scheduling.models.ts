import { z } from "zod";

export namespace SchedulingModels {
/** 
 * SchedulingTriggerNotificationsResponseDTOSchema 
 * @type { object }
 * @property { number } processedJobs  
 * @property { number } notificationsSent  
 */
export const SchedulingTriggerNotificationsResponseDTOSchema = z.object({ processedJobs: z.number(), notificationsSent: z.number() });
export type SchedulingTriggerNotificationsResponseDTO = z.infer<typeof SchedulingTriggerNotificationsResponseDTOSchema>;


}
