const Product = require('../models/product')

const create = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }

        const { name, email, password, isAdmin, contact } = req.body;

        const prod = new Product({
            name,
            email,
            password,
            isAdmin,
            contact
        });

        const data = await prod.save();
        res.status(201).send(data);
        res.json(prod.toObject())
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a Product."
        });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ message: "Data to update can not be empty" });
        }

        const data = await Product.findByIdAndUpdate(id, req.body, {
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

const deleteProduct = async (req, res) => {
    try {
        console.log("req Data: ", req.params.id);

        const id = req.params.id;
        const data = await Product.findByIdAndDelete(id);
        if (!data) {
            res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
        } else {
            res.send({
                message: "Product was deleted successfully!"
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Could not delete product with id=" + id
        });
    }
}

const addMultipleProductss = async (req, res) => {
    try {
        const Products = req.body;
        if (!Array.isArray(Products) || Products.length === 0) {
            return res.status(400).send({ message: "Request body must be a non-empty array of Products." });
        }

        const insertedProducts = await Product.insertMany(Products);
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

const find = async (req, res) => {
    try {
        const id = req.params.id;

        if(id){
            const getEmployee = await Product.findById(id);
            if (!getEmployee) {
                res.status(404).send({ message: "Not found product with id " + id });
            } else {
                res.send(getEmployee);
            }
        }else{
            const allEmployees = await Product.find();
            res.send(allEmployees);
        }
    } catch (err) {
        res.status(500).send({ message: err.message || "Error Occurred while retrieving product information" });
    }
}

module.exports = { create, update, deleteProduct, addMultipleProductss, find};
