const Product = require('../models/product')

const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            shortDescription,
            price,
            discount,
            categoryId,
            brandId
        } = req.body;

        // Validate required fields manually
        if (!name || !description || price === undefined) {
            return res.status(400).send({ message: "Name, description, and price are required." });
        }

        // Process uploaded files
        // const imagePaths = req.files?.map(file => file.filename) || [];
        const imageFiles = req.files['images'] || [];

        const imagePaths = imageFiles.map(file => file.filename);

        const product = new Product({
            name: name.trim(),
            description: description.trim().toLowerCase(),
            shortDescription: shortDescription?.trim() || '',
            price: parseFloat(price),
            discount: parseFloat(discount) || 0,
            images: imagePaths,
            categoryId,
            brandId
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).send({
            message: err.message || "Some error occurred while creating the product."
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ message: "Data to update cannot be empty." });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedProduct) {
            return res.status(404).send({ message: `Cannot update product with ID ${id}. Product not found.` });
        }

        res.status(200).json({
            message: "Product updated successfully.",
            data: updatedProduct
        });
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).send({ message: err.message || "Error updating product information." });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).send({ message: `Cannot delete product with ID ${id}. Product not found.` });
        }

        res.status(200).json({ message: "Product deleted successfully." });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).send({
            message: `Could not delete product with ID ${req.params.id}`,
        });
    }
};

const addMultipleProducts = async (req, res) => {
    try {
        const products = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).send({ message: "Request body must be a non-empty array of products." });
        }

        const insertedProducts = await Product.insertMany(products, { ordered: true });

        res.status(201).json({
            message: "Products added successfully.",
            data: insertedProducts
        });
    } catch (err) {
        console.error("Insert many error:", err);
        res.status(500).send({
            message: err.message || "Some error occurred while adding products."
        });
    }
};

const find = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const product = await Product.findById(id)
                .populate("brandId", "name")        // populate only the `name` field
                .populate("categoryId", "name");     // same here

            if (!product) {
                return res.status(404).send({ message: `No product found with ID ${id}` });
            }

            return res.status(200).json(product);
        }

        const allProducts = await Product.find()
            .populate("brandId", "name")
            .populate("categoryId", "name");

        res.status(200).json(allProducts);
    } catch (err) {
        console.error("Find error:", err);
        res.status(500).send({ message: err.message || "Error retrieving product(s)." });
    }
};


module.exports = { addProduct, updateProduct, deleteProduct, addMultipleProducts, find };
