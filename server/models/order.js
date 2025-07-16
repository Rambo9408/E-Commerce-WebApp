const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],
        status: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending"
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
