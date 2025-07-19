const User = require('../models/user');
const bcrypt = require('bcrypt');

// Create a single user
const create = async (req, res) => {
    try {
        const { name, email, password, role = 'employee', contact, dateOfJoining, department, task } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ message: "Name, email, and password are required!" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashPassword,
            role,
            contact,
            dateOfJoining,
            department,
            task
        });

        const data = await user.save();
        res.status(201).json(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a user."
        });
    }
};

// Update user by ID
const update = async (req, res) => {
    try {
        const id = req.params.id;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ message: "Data to update cannot be empty" });
        }

        // If password is being updated, hash it
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
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

// Delete user by ID
const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id);
        if (!data) {
            res.status(404).send({ message: `Cannot delete with id ${id}. Maybe id is wrong` });
        } else {
            res.send({ message: "Employee was deleted successfully!" });
        }
    } catch (err) {
        res.status(500).send({ message: "Could not delete employee with id=" + id });
    }
};

// Add multiple users (bulk insert)
const addMultipleEmployees = async (req, res) => {
    try {
        const users = req.body;

        if (!Array.isArray(users) || users.length === 0) {
            return res.status(400).send({ message: "Request body must be a non-empty array of users." });
        }

        // Hash passwords before inserting
        const processedUsers = await Promise.all(users.map(async (user) => {
            const { password, ...rest } = user;

            const hashPassword = password
                ? await bcrypt.hash(password, 10)
                : undefined;

            return {
                ...rest,
                password: hashPassword,
                role: user.role || 'employee' // default role
            };
        }));

        const insertedUsers = await User.insertMany(processedUsers);

        res.status(201).json({
            message: "Users added successfully.",
            data: insertedUsers
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while adding users."
        });
    }
};

// Get user by ID or all users
const find = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const getEmployee = await User.findById(id);
            if (!getEmployee) {
                res.status(404).send({ message: "Not found employee with id " + id });
            } else {
                res.send(getEmployee);
            }
        } else {
            const allEmployees = await User.find();
            res.send(allEmployees);
        }
    } catch (err) {
        res.status(500).send({ message: err.message || "Error occurred while retrieving employee information" });
    }
};

module.exports = { create, update, deleteEmployee, addMultipleEmployees, find };
