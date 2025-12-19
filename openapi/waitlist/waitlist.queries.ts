import { useMutation } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { MutationEffectsOptions, useMutationEffects } from "../useMutationEffects";
import { AppMutationOptions } from "../react-query.types";
import { WaitlistModels } from "./waitlist.models";
import { WaitlistApi } from "./waitlist.api";

export namespace WaitlistQueries {

export const moduleName = QueryModule.Waitlist;






 /** 
 * Mutation `useJoin`
 * @summary Join the waitlist with email
 * @param { WaitlistModels.WaitlistJoinRequest } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<CommonModels.StatusResponseDto> } 
 * @statusCodes [200]
 */
export const useJoin = (options?: AppMutationOptions<typeof WaitlistApi.join, { data: WaitlistModels.WaitlistJoinRequest,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { data } ) => 
      
            WaitlistApi.join(data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




}
