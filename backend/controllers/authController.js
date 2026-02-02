const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. User කෙනෙක්ව පද්ධතියට ලියාපදිංචි කිරීම (Register)
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'මෙම ඊමේල් ලිපිනය දැනටමත් පාවිච්චි කර ඇත.' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'user'
        });

        if (user) {
            res.status(201).json({
                message: "Register successfully!",
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Login Function
// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });

//         if (user && (await bcrypt.compare(password, user.password))) {
//             res.status(200).json({
//                 message: "Login Successful!",
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//                 isAdmin: user.role === 'admin',
//                 token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
//             });
//         } else {
//             res.status(401).json({ message: 'ඊමේල් ලිපිනය හෝ මුරපදය වැරදියි!' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // මෙන්න මෙතන matchPassword පාවිච්චි කරන්න
        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                message: "Login Successful!",
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isAdmin: user.role === 'admin',
                token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
            });
        } else {
            res.status(401).json({ message: 'ඊමේල් ලිපිනය හෝ මුරපදය වැරදියි!' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. සියලුම Users ලාගේ ලැයිස්තුව ලබා ගැනීම (Admin සඳහා)
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Users ලබාගැනීමේදී ගැටලුවක් පවතී" });
    }
};

// 4. User කෙනෙක්ව Delete කිරීම
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.findByIdAndDelete(req.params.id);
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CommonJS ක්‍රමයට Export කිරීම (මෙය වැදගත්!)
module.exports = {
    registerUser,
    loginUser,
    getUsers,
    deleteUser
};