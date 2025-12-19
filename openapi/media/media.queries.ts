import { useMutation } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { MutationEffectsOptions, useMutationEffects } from "../useMutationEffects";
import { AppMutationOptions } from "../react-query.types";
import { MediaModels } from "./media.models";
import { MediaApi } from "./media.api";

export namespace MediaQueries {

export const moduleName = QueryModule.Media;






 /** 
 * Mutation `useUploadRequest`
 * @summary Request upload instructions for a new media file
 * @param { MediaModels.MediaUploadRequest } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<MediaModels.MediaUploadInstructionsResponse> } 
 * @statusCodes [201, 401]
 */
export const useUploadRequest = (options?: AppMutationOptions<typeof MediaApi.uploadRequest, { data: MediaModels.MediaUploadRequest,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { data } ) => 
      
            MediaApi.uploadRequest(data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




}
