const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'employee', 'customer'],
            required: true,
        },
        contact: {
            type: String,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^\d{10,15}$/.test(v);
                },
                message: (props) => `${props.value} is not a valid contact number!`
            },
            required: [true, 'Contact number is required']
        },
        dateOfJoining: {
            type: Date,
            validate: {
                validator: function (value) {
                    return (
                        this.role !== 'employee' &&
                        this.role !== 'admin'
                    ) || value !== undefined;
                },
                message: "dateOfJoining is required for admin or employee",
            },
        },
        department: {
            type: String,
            trim: true,
            validate: {
                validator: function (value) {
                    return (
                        this.role !== 'employee' &&
                        this.role !== 'admin'
                    ) || (value && value.trim().length > 0);
                },
                message: "department is required for admin or employee",
            },
        },
        task: {
            type: [String],
            default: [],
            validate: {
                validator: function (value) {
                    return (
                        this.role !== 'employee' &&
                        this.role !== 'admin'
                    ) || Array.isArray(value);
                },
                message: "task must be an array of strings (required for employee/admin)",
            },
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;