import MEJ from "../Models/MEJModel.js";
import asyncHandler from "express-async-handler";
 

const getMEJ = asyncHandler(async(req, res) =>{
    try {
        const mejs = await MEJ.find({});
        res.json(mejs);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});


const getMEJbyId = asyncHandler(async(req, res) =>{
    try {
        const mej = await MEJ.findById(req.params.id);
        if(mej){
            res.json(mej);
        }
        else{
            res.status(404);
            throw new Error("MEJ introuvable");
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});


const updateMej = asyncHandler(async(req, res) =>{
    try {
        const {
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
            sous_categorie
        } = req.body;
        const mej = await MEJ.findById(req.params.id);
        if(mej){
            mej.product = product || mej.product;
            mej.bank= bank|| mej.bank;
            mej.affair= affair|| mej.affair;
            mej.amount= amount|| mej.amount;
            mej.rc_number= rc_number|| mej.rc_number;
            mej.court_code= court_code|| mej.court_code;
            mej.exist= exist|| mej.exist;
            mej.isAssigned= isAssigned|| mej.isAssigned;
            mej.type_information_negative= type_information_negative|| mej.type_information_negative;
            mej.date_declaration= date_declaration|| mej.date_declaration;
            mej.numero_interrogation= numero_interrogation|| mej.numero_interrogation;
            mej.reference= reference|| mej.reference;
            mej.contract_type= contract_type|| mej.contract_type;
            mej.date_cloture= date_cloture|| mej.date_cloture;
            mej.sous_categorie= sous_categorie|| mej.sous_categorie;
            const updatedMej = await mej.save();
            res.status(201).json(updatedMej);
        } else {
            res.status(404);
            throw new Error("MEJ introuvable");
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});



const deleteMEJ = asyncHandler(async(req, res) =>{
    try {
        const mej = await MEJ.findById(req.params.id);
        if(mej){
            await mej.deleteOne();
            res.json({message: "MEJ supprimé"});
        }
        else {
            res.status(404);
            throw new Error("MEJ introuvable");
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

const deleteAllMEJs = asyncHandler(async(req, res) =>{
    try {
        await MEJ.deleteMany({});
        res.json({message: "Tous les MEJ ont été supprimés"})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

export {
    getMEJ,
    getMEJbyId,
    deleteMEJ,
    deleteAllMEJs,
    updateMej,
};