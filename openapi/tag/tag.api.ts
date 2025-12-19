import { AppRestClient } from "../configured-rest-client";
import { TagModels } from "./tag.models";

export namespace TagApi {
export const listAll = () => { 
    return AppRestClient.get( 
        { resSchema: TagModels.ListAllTagsResponseDTOSchema }, 
        `/api/programs/tags`,
        
    )
};

}
