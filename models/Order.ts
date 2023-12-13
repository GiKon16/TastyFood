import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        customerId: {
            type: String,
            required: true,
        },
        address: {
            street: { type: String, required: true },
            houseNumber: { type: String, required: true },
            entrance: { type: String, required: false },
            floor: { type: String, required: false },
            apartment: { type: String, required: false },
        },
        orderTime: {
            type: String,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        products: {
            type: [
                {
                    _id: { type: String, required: true },
                    name: { type: String, required: true },
                    productQuantity: { type: Number, required: true },
                    productPrice: { type: Number, required: true },
                    generalPrice: { type: Number, required: true },
                    size: { type: Number, required: false },
                    unit: { type: String, required: false },
                    img: { type: String, required: false },
                },
            ],
        },
        quantity: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);