import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";
import asyncHandler from "express-async-handler";


const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn: "365d",
    });
}



const protect = asyncHandler(async(req, res, next) =>{
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Non autorisé, jeton non valide");
        }
    }
    if(!token){
        res.status(401);
        throw new Error("Non autorisé, aucun jeton");
    }
});
 

const admin = (req, res, next) =>{
    if(req.user && req.user.isAdmin){
        next();
    } else {
        res.status(401);
        throw new Error("Non autorisé en tant qu'administrateur");
    }
};

export {generateToken, protect, admin};