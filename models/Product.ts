import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 60,
        },
        type: {
            type: String,
            required: true,
            maxLength: 60,
            ref: "TypeOfProduct"
        },
        description: {
            type: String,
            required: true,
            maxLength: 200,
        },
        composition: {
            type: String,
            required: true,
            maxLength: 300,
        },
        nutrition: {
            type: {
                calories: { type: Number, required: false, },
                carbohydrates: { type: Number, required: false },
                fats: { type: Number, required: false, },
                protein: { type: Number, required: false, },
            },
        },
        img: {
            type: String,
            required: true,
        },
        prices: {
            type: [
                {
                    price: { type: Number, required: true },
                    size: { type: Number, required: false },
                    weight: { type: Number, required: true, },
                },
            ],
        },
        units: {
            type: {
                unitWeight: { type: String, required: false },
                unitMain: { type: String, required: false },
            }
        }
    },
    { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);

// {
//     "name": "Пицца №1",
//     "type": "pizza",
//     "description": "Очень вкусная пицца!",
//     "composition": "Тонкое тесто, сыр моцарелла, помидоры",
//     "nutrition": {
//         "calories": 300,
//         "carbohydrates": 20,
//         "fats": 10,
//         "protein": 12
//     },
//     "img": "/images/pizza-mock.svg",
//     "prices": [
//         {
//             "price": 349,
//             "size": 22,
//             "weight": 350
//         },
//         {
//             "price": 499,
//             "size": 26,
//             "weight": 500
//         },
//         {
//             "price": 649,
//             "size": 30,
//             "weight": 650
//         }
//     ],
//     "units": {
//         "unitWeight": "гр.",
//         "unitLength": "см."
//     }
// }