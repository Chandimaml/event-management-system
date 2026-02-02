const jwt = require('jsonwebtoken');
const User = require('../models/User');

// const protect = async (req, res, next) => {
//     let token;
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             token = req.headers.authorization.split(' ')[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = await User.findById(decoded.id).select('-password');
//             next();
//         } catch (error) {
//             res.status(401).json({ message: 'අවසර නැත, Token එක වැරදියි' });
//         }
//     }
//     if (!token) res.status(401).json({ message: 'අවසර නැත, Token එකක් නැත' });
// };

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            return next(); // මෙතන return එකක් දාන්න
        } catch (error) {
            return res.status(401).json({ message: 'අවසර නැත, Token එක වැරදියි' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'අවසර නැත, Token එකක් නැත' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'මෙය සිදුකිරීමට ඇඩ්මින් අවසර අවශ්‍ය වේ' });
    }
};

module.exports = { protect, admin };