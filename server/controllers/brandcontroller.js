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

        // Step 1: Find the brand first to get image path
        const brand = await Brands.findById(id);
        if (!brand) {
            return res.status(404).send({ message: `Brand not found with id ${id}` });
        }

        // Step 2: Delete the brand from DB
        await Brands.findByIdAndDelete(id);

        // Step 3: Delete the image file from uploads folder
        const imagePath = path.join(__dirname, '..', brand.image); // full path to the file

        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("File deletion failed:", err.message);
                // File not found or other issue, still proceed
            } else {
                console.log("Image file deleted:", imagePath);
            }
        });

        // Step 4: Send response
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
        const Products = req.body;
        if (!Array.isArray(Products) || Products.length === 0) {
            return res.status(400).send({ message: "Request body must be a non-empty array of Brands." });
        }

        const insertedProducts = await Brands.insertMany(Products);
        res.status(201).json({
            message: "Products added successfully.",
            data: insertedProducts
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while adding Products."
        });
    }

}

const findBrands = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const getEmployee = await Brands.findById(id);
            if (!getEmployee) {
                res.status(404).send({ message: "Not found brand with id " + id });
            } else {
                res.send(getEmployee);
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
