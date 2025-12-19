import { AppRestClient } from "../configured-rest-client";
import { z } from "zod";
import { ZodExtended } from "../zod.extended";
import { LocationModels } from "./location.models";

export namespace LocationApi {
export const findByName = (providerId: string, name: string, ) => { 
    return AppRestClient.get( 
        { resSchema: LocationModels.ImportFindLocationByNameResponseDTOSchema }, 
        `/api/import/locations/find`,
        {
    params: {
        providerId: ZodExtended.parse(z.string(), providerId, { type: "query", name: "providerId" })
, 
        name: ZodExtended.parse(z.string(), name, { type: "query", name: "name" })
, 
    },
}
    )
};

export const paginate = (limit: number, order?: string, filter?: LocationModels.LocationPaginationFilterDto, page?: number, cursor?: string, ) => { 
    return AppRestClient.get( 
        { resSchema: LocationModels.LocationPaginateResponseSchema }, 
        `/api/import/locations`,
        {
    params: {
        order: ZodExtended.parse(ZodExtended.sortExp(LocationModels.LocationPaginateOrderParamEnumSchema).optional(), order, { type: "query", name: "order" })
, 
        filter: ZodExtended.parse(LocationModels.LocationPaginationFilterDtoSchema.optional(), filter, { type: "query", name: "filter" })
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

export const create = (data: LocationModels.ImportUpdateLocationRequestDTO, ) => { 
    return AppRestClient.post( 
        { resSchema: LocationModels.ImportGetLocationByIdResponseDTOSchema }, 
        `/api/import/locations`,
        ZodExtended.parse(LocationModels.ImportUpdateLocationRequestDTOSchema, data)
, 
        
    )
};

export const getById = (locationId: string, ) => { 
    return AppRestClient.get( 
        { resSchema: LocationModels.ImportGetLocationByIdResponseDTOSchema }, 
        `/api/import/locations/${locationId}`,
        
    )
};

export const update = (locationId: string, data: LocationModels.ImportUpdateLocationRequestDTO, ) => { 
    return AppRestClient.patch( 
        { resSchema: z.void() }, 
        `/api/import/locations/${locationId}`,
        ZodExtended.parse(LocationModels.ImportUpdateLocationRequestDTOSchema, data)
, 
        
    )
};

}
