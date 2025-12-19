import { useMutation } from "@tanstack/react-query";
import { QueryModule } from "../queryModules";
import { MutationEffectsOptions, useMutationEffects } from "../useMutationEffects";
import { AppMutationOptions } from "../react-query.types";
import { ReviewReportModels } from "./reviewReport.models";
import { ReviewReportApi } from "./reviewReport.api";

export namespace ReviewReportQueries {

export const moduleName = QueryModule.ReviewReport;






 /** 
 * Mutation `useCreate`
 * @param { string } mutation.reviewId Path parameter
 * @param { ReviewReportModels.ReportReviewRequestDTO } mutation.data Body parameter
 * @param { AppMutationOptions & MutationEffectsOptions } options Mutation options
 * @returns { UseMutationResult<void> } 
 * @statusCodes [204, 401]
 */
export const useCreate = (options?: AppMutationOptions<typeof ReviewReportApi.create, { reviewId: string, data: ReviewReportModels.ReportReviewRequestDTO,  }> & MutationEffectsOptions) => {
  
  const { runMutationEffects } = useMutationEffects({ currentModule: moduleName });

  return useMutation({
    mutationFn: ( { reviewId, data } ) => 
      
            ReviewReportApi.create(reviewId, data)
    ,
    ...options, 
    onSuccess: async (resData, variables, context) => {
      await runMutationEffects(resData, options);
      options?.onSuccess?.(resData, variables, context);
    },
  });
};




}
