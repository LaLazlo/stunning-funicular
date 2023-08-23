import express from 'express';
import { protect, admin } from '../Middlewares/Auth.js';
import {
    getMEJ,
    getMEJbyId,
    deleteMEJ,
    deleteAllMEJs,
    updateMej,
} from '../Controllers/MEJController.js';

const router = express.Router();

// **************** PUBLIC ROUTES ****************
router.get("/", getMEJ);
router.get("/:id", getMEJbyId);
router.put("/:id", updateMej);



// **************** ADMIN ROUTES ****************
router.delete("/:id",protect,admin, deleteMEJ);
router.delete("/",protect,admin, deleteAllMEJs);




export default router;