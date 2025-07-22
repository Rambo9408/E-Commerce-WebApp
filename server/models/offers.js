const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true
        },
        productID: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ]
    },
    { timestamps: true }
);

const Offers = mongoose.model("Offer", OfferSchema);

module.exports = Offers;
