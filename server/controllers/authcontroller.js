const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        // Step 1: Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Step 2: Compare provided password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        // Step 3: Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, isAdmin: user.isAdmin },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        // Optional: Remove password from user object before sending response
        const { hashPassword, ...userData } = user.toObject();

        // Step 4: Send success response with token
        return res.status(200).json({
            message: "Login successful!",
            token,
            user: userData
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || "An error occurred while logging in."
        });
    }
};

module.exports = { login };