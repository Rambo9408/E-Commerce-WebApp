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
        res.status(201).send(data);
        res.json(category.toObject())
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a category."
        });
    }
};

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
                message: "Employee was deleted successfully!"
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Could not delete employee with id=" + id
        });
    }
}

const addMultipleCategories = async (req, res) => {
    try {
        const users = req.body;
        if (!Array.isArray(users) || users.length === 0) {
            return res.status(400).send({ message: "Request body must be a non-empty array of users." });
        }

        const insertedUsers = await Category.insertMany(users);
        res.status(201).json({
            message: "Category added successfully.",
            data: insertedUsers
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while adding users."
        });
    }

}

const findCategory = async (req, res) => {
    try {
        const id = req.params.id;

        if(id){
            const getEmployee = await Category.findById(id);
            if (!getEmployee) {
                res.status(404).send({ message: "No Category Found with id " + id });
            } else {
                res.send(getEmployee);
            }
        }else{
            const allEmployees = await Category.find();
            res.send(allEmployees);
        }
    } catch (err) {
        res.status(500).send({ message: err.message || "Error Occurred while retrieving Category information" });
    }
}

module.exports = { createCategory, updateCategory, deleteCategory, addMultipleCategories, findCategory};
