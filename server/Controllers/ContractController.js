import Contracts from "../Models/ContractModel.js";
import asyncHandler from "express-async-handler";


const getContracts = asyncHandler(async(req, res) =>{
  try {
      const contracts = await Contracts.find({});
      res.json(contracts);
  } catch (error) {
      res.status(400).json({message: error.message});
  }
});



const getContract = asyncHandler(async(req, res) =>{
    try {
    const amount_granted = req.params.amount_granted;
    const contract = await Contracts.findOne({ amount_granted }).exec();
    if (contract) {
      res.json(contract);
    } else {
      res.status(404).json({ message: 'Contrat non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});



export {getContract, getContracts};