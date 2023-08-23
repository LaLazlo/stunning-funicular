import mongoose from 'mongoose';

const ContractSchema = mongoose.Schema({
    rc_number:{
        type: Number,
        required: true
    },
    court_code:{
        type: Number,
        required: true
    },
    amount_granted:{
        type:Number ,
        required: true
    },
    reference:{
        type:String ,
        required: true
    },
    contract_type:{
        type:String ,
        required: true
    },
    date_cloture:{
        type:Date ,
        required: true
    },
    sous_categorie :{
        type:String ,
        required: true
    },

},
{ 
    timestamps :true, 
}
);




export default mongoose.model("Contract", ContractSchema); 