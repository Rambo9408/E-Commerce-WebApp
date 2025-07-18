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
            unique: true, // Prevent duplicate emails
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        contact: {
            type: String, // use String to allow leading 0s or international formats
            trim: true,
            validate: {
                validator: function (v) {
                    return /^\d{10,15}$/.test(v); // basic number validation (10 to 15 digits)
                },
                message: (props) => `${props.value} is not a valid contact number!`,
            },
        },
    },
    { timestamps: true }
); // Adds createdAt and updatedAt fields

const User = mongoose.model("User", UserSchema);

module.exports = User;
