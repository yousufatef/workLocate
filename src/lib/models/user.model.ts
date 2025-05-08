import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: ["admin", "owner","user"],
        default: false,
    },
}, { timestamps: true });


const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

