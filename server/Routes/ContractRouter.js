import express from 'express';
import { getContract, getContracts } from '../Controllers/ContractController.js';

const router = express.Router();


// ************ PUBLIC ROUTES ************
router.get("/", getContracts)
router.get("/:amount_granted", getContract);



export default router;