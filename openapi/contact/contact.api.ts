import { AppRestClient } from "../configured-rest-client";
import { ZodExtended } from "../zod.extended";
import { CommonModels } from "../common/common.models";
import { ContactModels } from "./contact.models";

export namespace ContactApi {
export const us = (data: ContactModels.ContactUsRequestDTO, ) => { 
    return AppRestClient.post( 
        { resSchema: CommonModels.StatusResponseDtoSchema }, 
        `/api/settings/contact`,
        ZodExtended.parse(ContactModels.ContactUsRequestDTOSchema, data)
, 
        
    )
};

}
