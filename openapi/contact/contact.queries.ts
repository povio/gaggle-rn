import { useMutation } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { MutationEffectsOptions, useMutationEffects } from "../useMutationEffects";
import { AppMutationOptions } from "../react-query.types";
import { ContactModels } from "./contact.models";
import { ContactApi } from "./contact.api";

export namespace ContactQueries {

export const moduleName = QueryModule.Contact;






 /** 
 * Mutation `useUs`
 * @summary Send a contact message to support
 * @param { ContactModels.ContactUsRequestDTO } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<CommonModels.StatusResponseDto> } 
 * @statusCodes [201, 401]
 */
export const useUs = (options?: AppMutationOptions<typeof ContactApi.us, { data: ContactModels.ContactUsRequestDTO,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { data } ) => 
      
            ContactApi.us(data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




}
