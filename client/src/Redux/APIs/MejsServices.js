import Axios from "./Axios";

export const getAllMejsService = async(token) => {
    const {data} = await Axios.get("/mej", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};


export const updateMejService = async (id,
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
    token) =>{
    const {data} = await Axios.put(`/mej/${id}`,
    {product,
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
    sous_categorie,}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};



export const getMejByIdService = async (id) =>{
    const {data} = await Axios.get(`/mej/${id}`);
    return data;
};

export const deleteMejService = async(id, token) =>{
    const {data} = await Axios.delete(`/mej/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};
