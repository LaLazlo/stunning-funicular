import {combineReducers, configureStore,} from '@reduxjs/toolkit';
import * as User from './Reducers/userReducers';
import * as Incidents from './Reducers/IncidentReducer';
import * as Contracts from './Reducers/ContractReducer';
import * as mejs from './Reducers/MejsReducer';


const rootReducer = combineReducers({
    // user reducers
    userLogin: User.userLoginReducer,
    userRegister: User.userRegisterReducer,
    userUpdateProfile: User.updateProfileReducer,
    userDeleteProfile: User.deleteProfileReducer,
    userChangePassword: User.changePasswordReducer,
    userGetAssignedMejs: User.userGetAssignedMejsReducer,
    userDeleteAssignedMejs: User.userDeleteAssignedMejsReducer,
    adminGetAllusers: User.adminGetAllUsersReducer,
    adminDeleteUser: User.adminDeleteUserReducer,

    // Incident reducers
    incidentById: Incidents.IncidentDetailsReducer,

    // Contract reducers
    contrcatById: Contracts.ContractDetailsReducer,

    // mejs reducers
    getAllMejs: mejs.mejListReducer,
    getMejById: mejs.mejDetailsReducer,
    deleteMejById: mejs.DeleteMejReducer,
    MejUpdate: mejs.updateMejReducer,
});


const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
})