const express = require('express');
const router = express.Router();
const User = require('../models/User'); // ඔබේ User model එකේ නම බලන්න
const { protect, admin } = require('../middleware/authMiddleware');

// සියලුම Users ලැයිස්තුව ලබා ගැනීම (Admin පමණි)
router.get('/all-users', protect, admin, async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Users ලබා ගැනීමට නොහැකි විය." });
    }
});

const Event = require('../models/Event');
const Booking = require('../models/Booking');
// const User = require('../models/User');

router.get('/stats', protect, admin, async (req, res) => {
    try {
        const totalEvents = await Event.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalBookings = await Booking.countDocuments();
        
        // Revenue ගණනය කිරීම (Booking එකක මිල තිබේ නම් පමණි)
        const bookings = await Booking.find().populate('event');
        const totalRevenue = bookings.reduce((acc, curr) => acc + (curr.event?.price || 0), 0);

        res.json({
            totalEvents,
            totalUsers,
            totalBookings,
            totalRevenue
        });
    } catch (error) {
        res.status(500).json({ message: "දත්ත ලබා ගැනීමට නොහැකි විය." });
    }
});


// backend/routes/userRoutes.js
router.get('/', protect, admin, async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Delete user route
router.delete('/:id', protect, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});
module.exports = router;