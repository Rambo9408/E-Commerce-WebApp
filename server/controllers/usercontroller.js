const User = require('../models/user');

const create = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }

        const { name, email, password, isAdmin, contact } = req.body;

        const user = new User({
            name,
            email,
            password,
            isAdmin,
            contact
        });

        const data = await user.save();
        res.status(201).send(data);
        res.json(user.toObject())
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a user."
        });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ message: "Data to update can not be empty" });
        }

        const data = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!data) {
            return res.status(404).send({ message: `Cannot update employee with ID ${id}. Maybe employee not found!` });
        }

        res.status(200).send(data);

    } catch (err) {
        res.status(500).send({ message: err.message || "Error updating employee information" });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        console.log("req Data: ", req.params.id);

        const id = req.params.id;
        const data = await User.findByIdAndDelete(id);
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

const addMultipleEmployees = async (req, res) => {
    try {
        const users = req.body;
        if (!Array.isArray(users) || users.length === 0) {
            return res.status(400).send({ message: "Request body must be a non-empty array of users." });
        }

        const insertedUsers = await User.insertMany(users);
        res.status(201).json({
            message: "Users added successfully.",
            data: insertedUsers
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while adding users."
        });
    }

}

const find = async (req, res) => {
    try {
        const id = req.params.id;

        if(id){
            const getEmployee = await User.findById(id);
            if (!getEmployee) {
                res.status(404).send({ message: "Not found employee with id " + id });
            } else {
                res.send(getEmployee);
            }
        }else{
            const allEmployees = await User.find();
            res.send(allEmployees);
        }
    } catch (err) {
        res.status(500).send({ message: err.message || "Error Occurred while retrieving employee information" });
    }
}

module.exports = { create, update, deleteEmployee, addMultipleEmployees, find};
