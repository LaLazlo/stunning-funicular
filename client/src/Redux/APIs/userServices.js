import Axios from "./Axios";

const registerService = async (user) =>{
    const {data} = await Axios.post("/users", user);
    if(data){
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};


const logoutService = () =>{
    localStorage.removeItem("userInfo");
    return null;
};


const loginService = async (user) => {
    const {data} = await Axios.post("/users/login", user);
    if(data){
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};


// ************** PRIVATE APIs **************

const updateProfileService = async (user, token) => {
    const {data} = await Axios.put("/users", user, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    if(data){
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;

};

const deleteProfileService = async (token) => {
    const {data} = await Axios.delete("/users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if(data){
        localStorage.removeItem("userInfo");
    }
    return data;
};

const changePasswordService = async (passwords, token) =>{
    const {data} = await Axios.put("/users/password", passwords, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

const getAssignedMejsService = async (token) =>{
    const {data} = await Axios.get("/users/assigned_mejs", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

const deleteAssignedMejsService = async (token) =>{
    const {data} = await Axios.delete("/users/assigned_mej", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};









// ************** ADMIN APIs **************

const getAllUsersService = async(token) => {
    const {data} = await Axios.get("/users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

const deleteUserService = async(id, token) =>{
    const {data} = await Axios.delete(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

export {
    registerService,
    logoutService,
    loginService,
    updateProfileService,
    deleteProfileService,
    changePasswordService,
    getAssignedMejsService,
    deleteAssignedMejsService,
    getAllUsersService,
    deleteUserService,
};


