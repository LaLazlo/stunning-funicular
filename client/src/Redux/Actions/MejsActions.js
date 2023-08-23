import * as mejsConstants from "../Constants/MEJsConstatnts";
import * as mejsAPIs from '../APIs/MejsServices';
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from '../Protection';

export const getAllMejsAction = () => async(dispatch, getState) =>{
    try {
        dispatch({ type: mejsConstants.MEJS_LIST_REQUEST });
        const response = await mejsAPIs.getAllMejsService(tokenProtection(getState));
        dispatch({ type: mejsConstants.MEJS_LIST_SUCCESS, payload: response  });
    } catch (error) {
        ErrorsAction(error, dispatch, mejsConstants.MEJS_LIST_FAIL);

    }
};


export const updateMejAction = (id,
    product,
    bank,
    affair,
    amount,
    rc_number,
    court_code,
    exist,
    isAssigned,
    type_information_negative,
    date_declaration,
    numero_interrogation,
    reference,
    contract_type,
    date_cloture,
    sous_categorie) => async(dispatch, getState) =>{
    try {
        dispatch({type: mejsConstants.UPDATE_MEJ_REQUEST});
        await mejsAPIs.updateMejService(id,
            product,
            bank,
            affair,
            amount,
            rc_number,
            court_code,
            exist,
            isAssigned,
            type_information_negative,
            date_declaration,
            numero_interrogation,
            reference,
            contract_type,
            date_cloture,
            sous_categorie,
            tokenProtection(getState));
        dispatch({type: mejsConstants.UPDATE_MEJ_SUCCESS});
    } catch (error) {
        ErrorsAction(error, dispatch, mejsConstants.UPDATE_MEJ_FAIL); 
    }
};




export const getMejByIdAction = (id) => async (dispatch)=>{
    try {
        dispatch({type: mejsConstants.MEJ_DETAILS_REQUEST});
        const response = await mejsAPIs.getMejByIdService(id);
        dispatch({type: mejsConstants.MEJ_DETAILS_SUCCESS, payload: response});
    } catch (error) {
        ErrorsAction(error, dispatch, mejsConstants.MEJ_DETAILS_FAIL); 
    }
};


export const deleteMejAction = (id) => async(dispatch, getState) =>{
    try {
        dispatch({ type: mejsConstants.DELETE_MEJ_REQUEST });
        await mejsAPIs.deleteMejService(id, tokenProtection(getState));
        dispatch({ type: mejsConstants.DELETE_MEJ_SUCCESS});
        toast.success("MEJ supprimé")
    } catch (error) {
        ErrorsAction(error, dispatch, mejsConstants.DELETE_MEJ_FAIL);
    }
};



