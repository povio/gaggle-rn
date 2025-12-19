import { AppRestClient } from "../configured-rest-client";
import { z } from "zod";
import { ZodExtended } from "../zod.extended";
import { ProviderReviewModels } from "./providerReview.models";

export namespace ProviderReviewApi {
export const list = (providerId: string, limit: number, page?: number, cursor?: string, ) => { 
    return AppRestClient.get( 
        { resSchema: ProviderReviewModels.ProviderReviewListResponseSchema }, 
        `/api/providers/${providerId}/reviews`,
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

}
