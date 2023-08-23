import { logoutAction } from "./Actions/userActions";

export const ErrorsAction = (error, dispatch, action) =>{
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if(message === "Non autorisé, le jeton a échoué"){
        dispatch(logoutAction());
        }
    return dispatch({ type: action, payload: message });

}


export const tokenProtection = (getState) =>{
    const {
        userLogin: {userInfo},
    } = getState();
    if(!userInfo?.token){
        return null;
    } else {
        return userInfo?.token;
    }
}