const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name is required"],
      trim: true,
      unique: true
    },
    image: {
      type: String,
      required: [true, "Brand image is required"],
      trim: true
    }
  },
  { timestamps: true }
);

const Brands = mongoose.model("Brand", BrandSchema);

module.exports = Brands;