import { AppRestClient } from "../configured-rest-client";
import { z } from "zod";
import { ZodExtended } from "../zod.extended";
import { ProgramModels } from "./program.models";

export namespace ProgramApi {
export const search = (limit: number, filter?: ProgramModels.SearchProgramsFilterDto, page?: number, cursor?: string, ) => { 
    return AppRestClient.get( 
        { resSchema: ProgramModels.SearchResponseSchema }, 
        `/api/programs/search`,
        {
    params: {
        filter: ZodExtended.parse(ProgramModels.SearchProgramsFilterDtoSchema.optional(), filter, { type: "query", name: "filter" })
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

export const getDetails = (programId: string, ) => { 
    return AppRestClient.get( 
        { resSchema: ProgramModels.GetProgramDetailsResponseDTOSchema }, 
        `/api/programs/${programId}`,
        
    )
};

export const findByUrl = (programUrl: string, ) => { 
    return AppRestClient.get( 
        { resSchema: ProgramModels.ImportFindProgramByUrlResponseDTOSchema }, 
        `/api/import/programs/find`,
        {
    params: {
        programUrl: ZodExtended.parse(z.string(), programUrl, { type: "query", name: "programUrl" })
, 
    },
}
    )
};

export const getById = (programId: string, ) => { 
    return AppRestClient.get( 
        { resSchema: ProgramModels.ImportGetProgramByIdResponseDTOSchema }, 
        `/api/import/programs/${programId}`,
        
    )
};

export const update = (programId: string, data: ProgramModels.ImportUpdateProgramRequestDTO, ) => { 
    return AppRestClient.patch( 
        { resSchema: z.void() }, 
        `/api/import/programs/${programId}`,
        ZodExtended.parse(ProgramModels.ImportUpdateProgramRequestDTOSchema, data)
, 
        
    )
};

}
