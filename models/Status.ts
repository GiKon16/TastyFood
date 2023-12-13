import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            default: "Создан",
        }
    },
    { timestamps: true }
);

export default mongoose.models.Status ||
    mongoose.model("Status", StatusSchema);