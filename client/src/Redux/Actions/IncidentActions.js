import * as IncidentsConstants from '../Constants/IncidentConstants';
import * as IncidentsAPIs from '../APIs/IncidentService';
import { ErrorsAction } from '../Protection';

export const getIncidentByIdAction = (rc_number, court_code, institution) => async (dispatch)=>{
    try {
        dispatch({type: IncidentsConstants.INCIDENT_DETAILS_REQUEST});
        const response = await IncidentsAPIs.getIncidentByIdService(rc_number, court_code, institution);
        dispatch({type: IncidentsConstants.INCIDENT_DETAILS_SUCCESS, payload: response});
    } catch (error) {
        ErrorsAction(error, dispatch, IncidentsConstants.INCIDENT_DETAILS_FAIL); 
    }
};