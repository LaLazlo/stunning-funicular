import * as ContractConstants from '../Constants/ContractConstants';

export const ContractDetailsReducer = (state={contract:{}}, action)=>{
    switch(action.type){
        case ContractConstants.CONTRACT_DETAILS_REQUEST:
            return {isLoading: true};
        case ContractConstants.CONTRACT_DETAILS_SUCCESS:
            return {isLoading: false, contract: action.payload };
        case ContractConstants.CONTRACT_DETAILS_FAIL:
            return {isLoading: false, isError: action.payload};
        case ContractConstants.CONTRACT_DETAILS_RESET:
            return {contract: {}};
        default:
            return state;
    }
};