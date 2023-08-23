import * as IncidentConstants from '../Constants/IncidentConstants';

export const IncidentDetailsReducer = (state={incident:{}}, action)=>{
    switch(action.type){
        case IncidentConstants.INCIDENT_DETAILS_REQUEST:
            return {isLoading: true};
        case IncidentConstants.INCIDENT_DETAILS_SUCCESS:
            return {isLoading: false, incident: action.payload };
        case IncidentConstants.INCIDENT_DETAILS_FAIL:
            return {isLoading: false, isError: action.payload};
        case IncidentConstants.INCIDENT_DETAILS_RESET:
            return {incident: {}};
        default:
            return state;
    }
};