import * as ContractsConstants from '../Constants/ContractConstants';
import * as ContractsAPIs from '../APIs/ContractServices';
import { ErrorsAction } from '../Protection';

export const getContractByIdAction = (amount_granted) => async (dispatch)=>{
    try {
        dispatch({type: ContractsConstants.CONTRACT_DETAILS_REQUEST});
        const response = await ContractsAPIs.getContractByIdService(amount_granted);
        dispatch({type: ContractsConstants.CONTRACT_DETAILS_SUCCESS, payload: response});
    } catch (error) {
        ErrorsAction(error, dispatch, ContractsConstants.CONTRACT_DETAILS_FAIL); 
    }
};