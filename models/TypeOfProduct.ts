import mongoose from "mongoose";

const TypeOfSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            default: "pizza",
        }
    },
    { timestamps: true }
);

export default mongoose.models.TypeOfProduct ||
    mongoose.model("TypeOfProduct", TypeOfSchema);
