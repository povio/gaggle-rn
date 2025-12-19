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
