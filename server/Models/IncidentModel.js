import mongoose from 'mongoose';

const IncidentSchema = mongoose.Schema({
    rc_number:{
        type: Number,
        required: true
    },
    court_code:{
        type: Number,
        required: true
    },
    institution:{
        type: String,
        required: true
    },
    amount:{
        type :Number,
        required: true,
    },
    type_information_negative:{
        type :String,
        required: true,
    },
    date_declaration:{
        type :Date,
        required: true,
    },
    numero_interrogation:{
        type :String,
        required: true,
    },
    
},
{ 
    timestamps :true, 
}
);




export default mongoose.model("Incident", IncidentSchema); 