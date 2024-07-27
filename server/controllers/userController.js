const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user (vendor)
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role: "Vendor" });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user', details: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password, isAdmin } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        
        if (isAdmin && user.role !== 'Admin') {
            return res.status(403).json({ error: 'Not authorized as Admin' });
        } else if (!isAdmin && user.role !== 'Vendor') {
            return res.status(403).json({ error: 'Not authorized as Vendor' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in', details: error.message });
    }
};


// Change Password
exports.changePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Old password is incorrect' });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error changing password', details: error.message });
    }
};

// Reset Password
// exports.resetPassword = async (req, res) => {
//     try {
//         const { resetToken, newPassword } = req.body;
//         const decoded = jwt.verify(resetToken, 'your_jwt_secret');
//         const user = await User.findById(decoded.userId);
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         user.password = await bcrypt.hash(newPassword, 10);
//         await user.save();
//         res.json({ message: 'Password reset successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Error resetting password', details: error.message });
//     }
// };

// Update admin details
exports.updateUserDetails = async (req, res) => {
    try {
        const { userId, name, email } = req.body;
        const admin = await User.findById(userId);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        admin.name = name || admin.name;
        admin.email = email || admin.email;
        await admin.save();
        res.json({ message: 'Admin details updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating admin details', details: error.message });
    }
};

// Get all vendors
exports.getAllVendors = async (req, res) => {
    try {
        const vendors = await User.find({ role: 'Vendor' });
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving vendors', details: error.message });
    }
};