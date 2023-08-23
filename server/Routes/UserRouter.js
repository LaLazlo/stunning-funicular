import express from 'express';
import {
    addAssignedMej,
    addMejForUser,
    changeUserPassword,
    deleteMEJ,
    deleteUser,
    deleteUserProfile,
    getAssignedMej,
    getUsers,
    loginUser,
    registerUser,
    updateUserProfile }
    from '../Controllers/UserController.js';
import { protect, admin } from '../Middlewares/Auth.js';

const router = express.Router();

// **************** PUBLIC ROUTES ****************
router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/assigned_mej" , addMejForUser);



// **************** PRIVATE ROUTES ****************
router.put("/", protect, updateUserProfile);
router.delete("/", protect,deleteUserProfile);
router.put("/password", protect, changeUserPassword);
router.get("/assigned_mejs" ,protect, getAssignedMej);
router.post("/assigned_mejs" ,protect, addAssignedMej);
router.delete("/assigned_mejs" ,protect, deleteMEJ);



// **************** ADMIN ROUTES ****************
router.get("/" ,protect, admin, getUsers);
router.delete("/:id" ,protect, deleteUser);


export default router;