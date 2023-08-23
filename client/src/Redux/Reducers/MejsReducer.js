import * as mejConstants from "../Constants/MEJsConstatnts";

export const mejListReducer = (state = {mejs: []}, action) =>{
    switch(action.type){
        case mejConstants.MEJS_LIST_REQUEST:
            return {isLoading: true};
        case mejConstants.MEJS_LIST_SUCCESS:
            return {isLoading: false, mejs: action.payload};
        case mejConstants.MEJS_LIST_FAIL:
            return {isLoading: false, isError: action.payload};
        case mejConstants.MEJS_LIST_RESET:
            return {
                mejs: [],
            };
        default:
            return state;
    }
};


export const mejDetailsReducer = (state={mej:{}}, action)=>{
    switch(action.type){
        case mejConstants.MEJ_DETAILS_REQUEST:
            return {isLoading: true};
        case mejConstants.MEJ_DETAILS_SUCCESS:
            return {isLoading: false, mej: action.payload };
        case mejConstants.MEJ_DETAILS_FAIL:
            return {isLoading: false, isError: action.payload};
        case mejConstants.MEJ_DETAILS_RESET:
            return {mej: {}};
        default:
            return state;
    }
};

export const DeleteMejReducer = (state = {}, action) =>{
    switch(action.type){
        case mejConstants.DELETE_MEJ_REQUEST:
            return {isLoading: true};
        case mejConstants.DELETE_MEJ_SUCCESS:
            return {isLoading: false, isSuccess: true};
        case mejConstants.DELETE_MEJ_FAIL:
            return {isLoading: false, isError: action.payload};
        case mejConstants.DELETE_MEJ_RESET:
            return {};
        default:
            return state;
    }
};

export const updateMejReducer = (state={}, action)=>{
    switch (action.type) {
        case mejConstants.UPDATE_MEJ_REQUEST:
            return {isLoading: true};
        case mejConstants.UPDATE_MEJ_SUCCESS:
            return {isLoading: false, isSuccess: true};
        case mejConstants.UPDATE_MEJ_FAIL:
            return {isLoading: false, isError: action.payload};
        case mejConstants.UPDATE_MEJ_RESET:
            return {};
        default:
            return state;
    }
};