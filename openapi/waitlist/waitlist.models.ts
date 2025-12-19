import { z } from "zod";

export namespace WaitlistModels {
/** 
 * WaitlistJoinRequestSchema 
 * @type { object }
 * @property { string } email Email address 
 */
export const WaitlistJoinRequestSchema = z.object({ email: z.email() });
export type WaitlistJoinRequest = z.infer<typeof WaitlistJoinRequestSchema>;


}
