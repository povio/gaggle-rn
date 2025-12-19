import { useMutation } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { MutationEffectsOptions, useMutationEffects } from "../useMutationEffects";
import { AppMutationOptions } from "../react-query.types";
import { SchedulingApi } from "./scheduling.api";

export namespace SchedulingQueries {

export const moduleName = QueryModule.Scheduling;






 /** 
 * Mutation `useTriggerNotifications`
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<SchedulingModels.SchedulingTriggerNotificationsResponseDTO> } 
 * @statusCodes [201, 401, 403]
 */
export const useTriggerNotifications = (options?: AppMutationOptions<typeof SchedulingApi.triggerNotifications, {  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: () => 
      
            SchedulingApi.triggerNotifications()
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




}
