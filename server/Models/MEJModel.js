import mongoose from 'mongoose';

const MEJSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product:{
        type: String,
        required: true
    },
    bank:{
        type: String,
        required: true
    },
    affair:{
        type: String,
    },
    amount:{
        type: Number,
        required: true
    },
    rc_number:{
        type: Number,
        required: true
    },
    court_code:{
        type: Number,
        required: true
    },
    exist:{
        type: Boolean,
        required: false
    },
    isAssigned:{
        type: Boolean,
        required: false
    },
    

    //Incident Info
    type_information_negative:{
        type :String,
        required: false,
    },
    date_declaration:{
        type :Date,
        required: false,
    },
    numero_interrogation:{
        type :String,
        required: false,
    },

    // Contract Info
    reference:{
        type:String ,
        required: false
    },
    contract_type:{
        type:String ,
        required: false
    },
    date_cloture:{
        type:Date ,
        required: false
    },
    sous_categorie :{
        type:String ,
        required: false
    },
},
{ 
    timestamps :true, 
}
);




export default mongoose.model("MEJ", MEJSchema); 