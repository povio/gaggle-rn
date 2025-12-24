import { AppRestClient } from "../configured-rest-client";
import { z } from "zod";
import { ZodExtended } from "../zod.extended";
import { ReviewReportModels } from "./reviewReport.models";

export namespace ReviewReportApi {
export const create = (reviewId: string, data: ReviewReportModels.ReportReviewRequestDTO, ) => { 
    return AppRestClient.post( 
        { resSchema: z.any() }, 
        `/api/reviews/${reviewId}/report`,
        ZodExtended.parse(ReviewReportModels.ReportReviewRequestDTOSchema, data)
, 
        
    )
};

}
