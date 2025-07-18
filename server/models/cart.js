const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                    default: 1
                },
                priceAtAdd: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
