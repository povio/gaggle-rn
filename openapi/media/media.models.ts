import { z } from "zod";

export namespace MediaModels {
/** 
 * MediaUploadInstructionsResponseSchema 
 * @type { object }
 * @property { array[] } fields Additional form fields to include in the POST upload request. Each item is a [key, value] pair.. Example: `Content-Type,image/png` 
 * @property { string } method Method to upload with - PUT, POST, or custom instructions 
 * @property { string } url Url to upload to 
 * @property { string } id Media ID 
 */
export const MediaUploadInstructionsResponseSchema = z.object({ fields: z.array(z.array(z.string()).min(2)).nullable(), method: z.string().nullable(), url: z.string().nullable(), id: z.string().nullable() }).partial();
export type MediaUploadInstructionsResponse = z.infer<typeof MediaUploadInstructionsResponseSchema>;


/** 
 * MediaUploadRequestSchema 
 * @type { object }
 * @property { string } resourceName Resource name supported by the system 
 * @property { string } fileName Original filename. Example: `profile.png` 
 * @property { number } fileSize Original file size in bytes. Minimum: `1`. Example: `1024` 
 * @property { string } mimeType File mime type. Example: `image/png` 
 * @property { string } method Upload method. Example: `put` 
 */
export const MediaUploadRequestSchema = z.object({ resourceName: z.string().nullish(), fileName: z.string(), fileSize: z.number().gte(1), mimeType: z.string().nullish(), method: z.string().nullish() });
export type MediaUploadRequest = z.infer<typeof MediaUploadRequestSchema>;


}
