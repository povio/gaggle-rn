import { AppRestClient } from "../configured-rest-client";
import { ZodExtended } from "../zod.extended";
import { FeedbackModels } from "./feedback.models";

export namespace FeedbackApi {
export const submitApp = (data: FeedbackModels.SubmitAppFeedbackRequestDTO, ) => { 
    return AppRestClient.post( 
        { resSchema: FeedbackModels.SubmitAppFeedbackResponseDTOSchema }, 
        `/api/settings/feedback`,
        ZodExtended.parse(FeedbackModels.SubmitAppFeedbackRequestDTOSchema, data)
, 
        
    )
};

}
