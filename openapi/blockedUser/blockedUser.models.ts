import { z } from "zod";

export namespace BlockedUserModels {
/** 
 * ListBlockedUsersMetaResponseDTOSchema 
 * @type { object }
 * @property { string[] } items  
 */
export const ListBlockedUsersMetaResponseDTOSchema = z.object({ items: z.array(z.string()) });
export type ListBlockedUsersMetaResponseDTO = z.infer<typeof ListBlockedUsersMetaResponseDTOSchema>;


}
