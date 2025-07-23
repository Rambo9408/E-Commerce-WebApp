const Category = require('../models/category')

const createCategory = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }

        const { name } = req.body;

        const category = new Category({
            name
        });

        const data = await category.save();
        res.status(201).json(data.toObject());
        // res.status(201).send(data);
        // res.json(category.toObject())
        //.toObject() converts the Mongoose document into a plain JavaScript object, stripping away all the extra stuff.
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a category."
        });
    }
};

/*In most cases, We don’t need to call .toObject() manually, because:

res.json() and res.send() automatically serialize Mongoose documents properly

Mongoose will strip internal properties automatically during JSON conversion (toJSON() is internally called)

*/

const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ message: "Data to update can not be empty" });
        }

        const data = await Category.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!data) {
            return res.status(404).send({ message: `Cannot update Category with ID ${id}. Maybe Category not found!` });
        }

        res.status(200).send(data);

    } catch (err) {
        res.status(500).send({ message: err.message || "Error updating Category information" });
    }
};

const deleteCategory = async (req, res) => {
    try {
        console.log("req Data: ", req.params.id);

        const id = req.params.id;
        const data = await Category.findByIdAndDelete(id);
        if (!data) {
            res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
        } else {
            res.send({
                message: "Category is deleted successfully!"
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Could not delete Category with id=" + id
        });
    }
}

const addMultipleCategories = async (req, res) => {
    try {
        const categories = req.body;
        if (!Array.isArray(categories) || categories.length === 0) {
            return res.status(400).send({ message: "Request body must be a non-empty array of categories." });
        }

        const insertedCategories = await Category.insertMany(categories);
        res.status(201).json({
            message: "Category added successfully.",
            data: insertedCategories
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while adding categories."
        });
    }

}

const findCategory = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const getCategory = await Category.findById(id);
            if (!getCategory) {
                res.status(404).send({ message: "No Category Found with id " + id });
            } else {
                res.send(getCategory);
            }
        } else {
            const allCategories = await Category.find();
            res.send(allCategories);
        }
    } catch (err) {
        res.status(500).send({ message: err.message || "Error Occurred while retrieving Category information" });
    }
}

module.exports = { createCategory, updateCategory, deleteCategory, addMultipleCategories, findCategory };
