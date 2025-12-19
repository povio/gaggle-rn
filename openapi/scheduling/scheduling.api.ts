import { AppRestClient } from "../configured-rest-client";
import { SchedulingModels } from "./scheduling.models";

export namespace SchedulingApi {
export const triggerNotifications = () => { 
    return AppRestClient.post( 
        { resSchema: SchedulingModels.SchedulingTriggerNotificationsResponseDTOSchema }, 
        `/api/scheduling/trigger-notifications`,
        
    )
};

}
