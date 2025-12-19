import { z } from "zod";
import { CommonModels } from "../common/common.models";

export namespace TagModels {
/** 
 * ListAllTagsResponseDTOSchema 
 * @type { object }
 * @property { CommonModels.TagDTO[] } items  
 */
export const ListAllTagsResponseDTOSchema = z.object({ items: z.array(CommonModels.TagDTOSchema) });
export type ListAllTagsResponseDTO = z.infer<typeof ListAllTagsResponseDTOSchema>;


}
