import { AppRestClient } from "../configured-rest-client";
import { z } from "zod";
import { ZodExtended } from "../zod.extended";
import { FavoriteModels } from "./favorite.models";
import { CommonModels } from "../common/common.models";

export namespace FavoriteApi {
export const listUser = (limit: number, page?: number, cursor?: string, ) => { 
    return AppRestClient.get( 
        { resSchema: FavoriteModels.ListUserResponseSchema }, 
        `/api/favorites`,
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

export const program = (data: FavoriteModels.FavoriteProgramRequestDTO, ) => { 
    return AppRestClient.post( 
        { resSchema: CommonModels.StatusResponseDtoSchema }, 
        `/api/favorites`,
        ZodExtended.parse(FavoriteModels.FavoriteProgramRequestDTOSchema, data)
, 
        
    )
};

export const unProgram = (data: FavoriteModels.UnfavoriteProgramRequestDTO, ) => { 
    return AppRestClient.delete( 
        { resSchema: CommonModels.StatusResponseDtoSchema }, 
        `/api/favorites`,
        ZodExtended.parse(FavoriteModels.UnfavoriteProgramRequestDTOSchema, data)
, 
        
    )
};

export const listUserIds = () => { 
    return AppRestClient.get( 
        { resSchema: FavoriteModels.ListUserFavoritesMetaResponseDTOSchema }, 
        `/api/favorites/ids`,
        
    )
};

}
