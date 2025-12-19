import { AppRestClient } from "../configured-rest-client";
import { ZodExtended } from "../zod.extended";
import { MediaModels } from "./media.models";

export namespace MediaApi {
export const uploadRequest = (data: MediaModels.MediaUploadRequest, ) => { 
    return AppRestClient.post( 
        { resSchema: MediaModels.MediaUploadInstructionsResponseSchema }, 
        `/api/files/presigned-url`,
        ZodExtended.parse(MediaModels.MediaUploadRequestSchema, data)
, 
        
    )
};

}
