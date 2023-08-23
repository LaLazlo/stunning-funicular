import mongoose from 'mongoose';


const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please provide your full name"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    Assigned_MEJs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MEJ",
    },
    ],
    },
    {
        timestamps: true,
    }
);


export default mongoose.model("User", UserSchema);