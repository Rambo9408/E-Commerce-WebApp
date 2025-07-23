const Brands = require('../models/brands');
const fs = require('fs');
const path = require('path');

const create = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !req.file) {
            return res.status(400).send({ message: "Name and image are required." });
        }

        const imagePath = `/uploads/brands/${req.file.filename}`;

        const prod = new Brands({
            name,
            image: imagePath
        });

        const data = await prod.save();
        res.status(201).json(data);

    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a Brand."
        });
    }
};


const update = async (req, res) => {
    try {
        const id = req.params.id;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ message: "Data to update can not be empty" });
        }

        const data = await Brands.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!data) {
            return res.status(404).send({ message: `Cannot update product with ID ${id}. Maybe product not found!` });
        }

        res.status(200).send(data);

    } catch (err) {
        res.status(500).send({ message: err.message || "Error updating product information" });
    }
};

const deleteBrand = async (req, res) => {
    try {
        const id = req.params.id;

        const brand = await Brands.findById(id);
        if (!brand) {
            return res.status(404).send({ message: `Brand not found with id ${id}` });
        }

        await Brands.findByIdAndDelete(id);

        // Delete the image file from uploads folder
        const imagePath = path.join(__dirname, '..', brand.image); // full path to the file

        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("File deletion failed:", err.message);
            } else {
                console.log("Image file deleted:", imagePath);
            }
        });

        res.send({ message: "Brand was deleted successfully!" });

    } catch (err) {
        console.error("Error in deleting brand:", err);
        res.status(500).send({
            message: "Could not delete brand with id=" + req.params.id
        });
    }
};

const addMultipleBrands = async (req, res) => {
    try {
        const Brands = req.body;
        if (!Array.isArray(Brands) || Brands.length === 0) {
            return res.status(400).send({ message: "Request body must be a non-empty array of Brands." });
        }

        const insertedBrands = await Brands.insertMany(Brands);
        res.status(201).json({
            message: "Brands added successfully.",
            data: insertedBrands
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while adding Brands."
        });
    }

}

const findBrands = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const getBrand = await Brands.findById(id);
            if (!getBrand) {
                res.status(404).send({ message: "Not found brand with id " + id });
            } else {
                res.send(getBrand);
            }
        } else {
            const allbrands = await Brands.find();
            res.send(allbrands);
        }
    } catch (err) {
        res.status(500).send({ message: err.message || "Error Occurred while retrieving Brand information" });
    }
}

module.exports = { create, update, deleteBrand, addMultipleBrands, findBrands };
