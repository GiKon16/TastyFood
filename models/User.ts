import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        phone: {
            type: String,
            required: false,
        },
        login: {
            type: String,
            required: true,
            unique: true,   
        },
        password: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

export default mongoose.models.User ||
    mongoose.model("User", UserSchema);