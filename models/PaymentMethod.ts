import mongoose from "mongoose";

const PaymentMethodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            default: "Онлайн перевод",
        }
    },
    { timestamps: true }
);

export default mongoose.models.PaymentMethod ||
    mongoose.model("PaymentMethod", PaymentMethodSchema);