import mongoose from "mongoose";

export const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connecté");
    } catch (error) {
        console.log(`Erreur: ${error.message}`);
        process.exit(1);
    }
}
