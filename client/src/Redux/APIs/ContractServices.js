import Axios from "./Axios";


const getContractByIdService = async (amount_granted) =>{
    const {data} = await Axios.get(`/contract/${amount_granted}`);
    return data;
};


export {
    getContractByIdService
}