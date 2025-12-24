import { AppRestClient } from "../configured-rest-client";
import { z } from "zod";
import { ZodExtended } from "../zod.extended";
import { ProviderModels } from "./provider.models";

export namespace ProviderApi {
export const getDetails = (providerId: string, ) => { 
    return AppRestClient.get( 
        { resSchema: ProviderModels.GetProviderDetailsResponseDTOSchema }, 
        `/api/providers/${providerId}`,
        
    )
};

export const listPrograms = (providerId: string, limit: number, page?: number, cursor?: string, ) => { 
    return AppRestClient.get( 
        { resSchema: ProviderModels.ListProgramsResponseSchema }, 
        `/api/providers/${providerId}/programs`,
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

export const follow = (providerId: string, ) => { 
    return AppRestClient.post( 
        { resSchema: z.any() }, 
        `/api/providers/${providerId}/follow`,
        
    )
};

export const unfollow = (providerId: string, ) => { 
    return AppRestClient.delete( 
        { resSchema: z.any() }, 
        `/api/providers/${providerId}/follow`,
        
    )
};

export const listFollowedIds = () => { 
    return AppRestClient.get( 
        { resSchema: ProviderModels.ListFollowedProvidersMetaResponseDTOSchema }, 
        `/api/providers/followed/ids`,
        
    )
};

export const listAvailable = () => { 
    return AppRestClient.get( 
        { resSchema: ProviderModels.ListAvailableProvidersResponseDTOSchema }, 
        `/api/programs/providers`,
        
    )
};

export const findByWebsiteUrl = (websiteUrl: string, ) => { 
    return AppRestClient.get( 
        { resSchema: ProviderModels.ImportFindProviderByWebsiteUrlResponseDTOSchema }, 
        `/api/import/providers/find`,
        {
    params: {
        websiteUrl: ZodExtended.parse(z.string(), websiteUrl, { type: "query", name: "websiteUrl" })
, 
    },
}
    )
};

export const paginate = (limit: number, order?: string, filter?: ProviderModels.ProviderPaginationFilterDto, page?: number, cursor?: string, ) => { 
    return AppRestClient.get( 
        { resSchema: ProviderModels.ProviderPaginateResponseSchema }, 
        `/api/import/providers`,
        {
    params: {
        order: ZodExtended.parse(ZodExtended.sortExp(ProviderModels.ProviderPaginateOrderParamEnumSchema).optional(), order, { type: "query", name: "order" })
, 
        filter: ZodExtended.parse(ProviderModels.ProviderPaginationFilterDtoSchema.optional(), filter, { type: "query", name: "filter" })
, 
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

export const create = (data: ProviderModels.ImportUpdateProviderRequestDTO, ) => { 
    return AppRestClient.post( 
        { resSchema: ProviderModels.ImportGetProviderByIdResponseDTOSchema }, 
        `/api/import/providers`,
        ZodExtended.parse(ProviderModels.ImportUpdateProviderRequestDTOSchema, data)
, 
        
    )
};

export const getById = (providerId: string, ) => { 
    return AppRestClient.get( 
        { resSchema: ProviderModels.ImportGetProviderByIdResponseDTOSchema }, 
        `/api/import/providers/${providerId}`,
        
    )
};

export const update = (providerId: string, data: ProviderModels.ImportUpdateProviderRequestDTO, ) => { 
    return AppRestClient.patch( 
        { resSchema: z.any() }, 
        `/api/import/providers/${providerId}`,
        ZodExtended.parse(ProviderModels.ImportUpdateProviderRequestDTOSchema, data)
, 
        
    )
};

}
