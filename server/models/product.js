const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        shortDescription: {
            type: String,
            trim: true,
        },
        costPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        sellingPrice: {
            type: Number,
            min: 0,
        },
        images: {
            type: [String], // array of image URLs or paths
            default: [],
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId, //categoryId is an ObjectId that references a document in the Category collection.
            ref: "Category", // assumes you have a Category model
            required: false,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
