import { AppRestClient } from "../configured-rest-client";
import { z } from "zod";
import { ZodExtended } from "../zod.extended";
import { ProgramReviewModels } from "./programReview.models";

export namespace ProgramReviewApi {
export const list = (programId: string, limit: number, page?: number, cursor?: string, ) => { 
    return AppRestClient.get( 
        { resSchema: ProgramReviewModels.ProgramReviewListResponseSchema }, 
        `/api/programs/${programId}/reviews`,
        {
    params: {
        limit: ZodExtended.parse(z.number().gte(1).lte(20).default(20), limit, { type: "query", name: "limit" })
, 
        page: ZodExtended.parse(z.number().nullish(), page, { type: "query", name: "page" })
, 
        cursor: ZodExtended.parse(z.string().nullish(), cursor, { type: "query", name: "cursor" })
, 
    },
}
    )
};

export const create = (programId: string, data: ProgramReviewModels.PostProgramReviewRequestDTO, ) => { 
    return AppRestClient.post( 
        { resSchema: z.any() }, 
        `/api/programs/${programId}/reviews`,
        ZodExtended.parse(ProgramReviewModels.PostProgramReviewRequestDTOSchema, data)
, 
        
    )
};

}
