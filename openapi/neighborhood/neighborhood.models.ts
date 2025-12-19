import { z } from "zod";

export namespace NeighborhoodModels {
/** 
 * ListAvailableNeighborhoodsResponseDTOSchema 
 * @type { object }
 * @property { string[] } items  
 */
export const ListAvailableNeighborhoodsResponseDTOSchema = z.object({ items: z.array(z.string()) });
export type ListAvailableNeighborhoodsResponseDTO = z.infer<typeof ListAvailableNeighborhoodsResponseDTOSchema>;


}
