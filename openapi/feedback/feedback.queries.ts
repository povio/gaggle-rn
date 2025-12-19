import { useMutation } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { MutationEffectsOptions, useMutationEffects } from "../useMutationEffects";
import { AppMutationOptions } from "../react-query.types";
import { FeedbackModels } from "./feedback.models";
import { FeedbackApi } from "./feedback.api";

export namespace FeedbackQueries {

export const moduleName = QueryModule.Feedback;






 /** 
 * Mutation `useSubmitApp`
 * @param { FeedbackModels.SubmitAppFeedbackRequestDTO } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<void> } 
 * @statusCodes [201, 401]
 */
export const useSubmitApp = (options?: AppMutationOptions<typeof FeedbackApi.submitApp, { data: FeedbackModels.SubmitAppFeedbackRequestDTO,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { data } ) => 
      
            FeedbackApi.submitApp(data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




}
