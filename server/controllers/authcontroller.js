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

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Compare provided password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, isAdmin: user.role === 'admin' },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        const userData  = user.toObject();
        delete userData.password;

        // Send success response with token
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

const getCurrentEmployee = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const employee = await User.findById(decoded.id);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { login, getCurrentEmployee };