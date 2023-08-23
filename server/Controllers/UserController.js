import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../Middlewares/Auth.js";



const registerUser = asyncHandler(async(req, res) =>{
    const {fullName, email, password, image} = req.body
    try {
        const userExists = await User.findOne({email})
        if(userExists){
            res.status(400);
            throw new Error("L'utilisateur existe déjà")        
        }
                const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            image,
        });
        if(user){
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        }

        else {
            res.status(400);
            throw new Error("Données utilisateur invalides");
        }

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});



const loginUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password, user.password))){
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        }
        // if user does not exist or password does not match send error message
        else {
            res.status(401);
            throw new Error("Email ou mot de passe invalide")
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});



const updateUserProfile = asyncHandler(async(req, res) =>{
    const {fullName, email, image} = req.body;
    try {
        const user = await User.findById(req.user._id);
        if(user){
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.image = image || user.image;

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                image: updatedUser.image,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
            });
        }
        else {
            res.status(404);
            throw new Error("Utilisateur non trouvé")
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});


const deleteUserProfile = asyncHandler(async(req, res) =>{
    try {
        const user = await User.findById(req.user._id);
        if (user){
            if(user.isAdmin){
                res.status(400);
                throw new Error("L'utilisateur administrateur ne peut pas être supprimé");
            }
            await user.deleteOne();
            res.json({message: "Utilisateur supprimé avec succès"}); 
        }
        else {
            res.status(404);
            throw new Error("Utilisateur non trouvé");
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

const changeUserPassword = asyncHandler(async(req, res) =>{
    const {oldPassword, newPassword} = req.body;
    try {
        // find user in DB
        const user = await User.findById(req.user._id);
        // if user exists then compare old password with the hashed password then update user new password and save it in DB
        if(user && (await bcrypt.compare(oldPassword, user.password))){
            // hash the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await user.save();
            res.json({message: "Mot de passe changé avec succès"});
        }
        // else send error message
        else{
            res.status(401);
            throw new Error("Ancien mot de passe invalide");
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});


const getAssignedMej = asyncHandler(async(req, res) =>{
    try {
        const user = await User.findById(req.user._id).populate("Assigned_MEJs");
        if(user){
            res.json(user.Assigned_MEJs);
        }
        else{
            res.status(404);
            throw new Error("Utilisateur introuvable")
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});



const addAssignedMej = asyncHandler(async(req, res) =>{
    const {mejId} = req.body;
    try {
        const user = await User.findById(req.user._id);
        if(user){
            if(user.Assigned_MEJs.includes(mejId)){
                res.status(400);
                throw new Error("MEJ déjà attribué");
            }
            user.Assigned_MEJs.push(mejId);
            await user.save();
            res.json(user.Assigned_MEJs);
        }
        else{
            res.status(404);
            throw new Error("MEJ introuvable");
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});


const addMejForUser = asyncHandler(async(req, res) =>{
    const {mejId, userId} = req.body;
    try {
        const user = await User.findById(userId);
        if(user){
            if(user.Assigned_MEJs.includes(mejId)){
                res.status(400);
                throw new Error("MEJ déjà attribué");
            }
            user.Assigned_MEJs.push(mejId);
            await user.save();
            res.json(user.Assigned_MEJs);
        }
        else{
            res.status(404);
            throw new Error("MEJ introuvable");
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});




const deleteMEJ = asyncHandler(async(req, res) =>{
    try {
        const user = await User.findByIdAndUpdate(req.user._id);
        if(user){
            user.Assigned_MEJs = [];
            await user.save();
            res.json({message: "Tous les MEJ attribués ont été supprimés avec succès"});
        }
        else{
            res.status(400);
            throw new Error("Utilisateur introuvable");
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});




// *************** ADMIN CONTROLLERS ***************
const getUsers = asyncHandler(async(req, res) =>{
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});


const deleteUser = asyncHandler(async(req, res) =>{
    try {
        const user = await User.findById(req.params.id);
        if(user){
            if(user.isAdmin){
                res.status(400);
                throw new Error("L'utilisateur administrateur ne peut pas être supprimé");
            }
            await user.deleteOne();
            res.json({message: "Utilisateur supprimé avec succès"});
        }
        else{
            res.status(404);
            throw new Error("Utilisateur introuvable");
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});


export {
    registerUser,
    loginUser,
    updateUserProfile,
    deleteUserProfile,
    changeUserPassword,
    getAssignedMej,
    addAssignedMej,
    deleteMEJ,
    getUsers,
    deleteUser,
    addMejForUser
};


