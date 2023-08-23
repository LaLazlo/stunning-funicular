import Axios from "./Axios";


const getIncidentByIdService = async (rc_number, court_code, institution) =>{
    const {data} = await Axios.get(`/incident/${rc_number}/${court_code}/${institution}`);
    return data;
};


export {
    getIncidentByIdService
}