import { AppRestClient } from "../configured-rest-client";
import { z } from "zod";
import { ZodExtended } from "../zod.extended";
import { ContactModels } from "./contact.models";

export namespace ContactApi {
export const us = (data: ContactModels.ContactUsRequestDTO, ) => { 
    return AppRestClient.post( 
        { resSchema: z.void() }, 
        `/api/settings/contact`,
        ZodExtended.parse(ContactModels.ContactUsRequestDTOSchema, data)
, 
        
    )
};

}
