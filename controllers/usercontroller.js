const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, budget, currency } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            budget: budget || 0,
            currency: currency || '₹'
        });
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(201).json({ 
            message: "User registered successfully", 
            user: userWithoutPassword 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ 
            message: "Login successful", 
            user: userWithoutPassword 
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, budget, currency } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, budget, currency },
            { new: true }
        ).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
