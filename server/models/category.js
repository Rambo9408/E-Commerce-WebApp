const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true, // Prevent duplicate category names
            lowercase: true, // Store category names in lowercase for consistency
        },
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
