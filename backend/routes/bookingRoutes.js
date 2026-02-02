const express = require('express');
const router = express.Router();
const { bookTicket, getMyBookings } = require('../controllers/bookingController');
//const { protect } = require('../middleware/authMiddleware');
const {downloadTicket} =require('../controllers/bookingController');
const Booking = require('../models/Booking');
const { protect, admin } = require('../middleware/authMiddleware');
const {getPaidEventsReport}=require('../controllers/bookingController');


// 1. අලුත් Booking එකක් කිරීම (POST /api/bookings)
// මෙහිදී controller එකේ ඇති 'bookTicket' function එක ක්‍රියාත්මක වේ.
router.post('/', protect, bookTicket);

// 2. අදාළ User ගේ සියලුම Bookings ලබා ගැනීම (GET /api/bookings/my-bookings)
// මෙහිදී controller එකේ ඇති 'getMyBookings' function එක ක්‍රියාත්මක වේ.
router.get('/my-bookings', protect, getMyBookings);
router.get('/download/:bookingId', protect, downloadTicket);
// Booking එකක් delete කිරීම
router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking එක හමු නොවීය." });
    }

    // field name එක 'userId' ද නැත්නම් 'user' ද කියලා මෙතනින් බලනවා
    const bookingOwnerId = booking.userId || booking.user;

    if (!bookingOwnerId) {
       return res.status(400).json({ message: "Booking එකේ User විස්තර සොයාගත නොහැක." });
    }

    if (bookingOwnerId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "මෙය මැකීමට ඔබට අවසර නැත." });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});


// මෙන්න මේක අලුතින් එකතු කරන්න
// router.get('/admin/report', protect, admin, async (req, res) => {
//     try {
//         // Booking මොඩල් එක පාවිච්චි කරලා දත්ත ගන්නවා
//         const bookings = await Booking.find()
//             .populate('user', 'name email') // User ගේ නම සහ ඊමේල් එක විතරක් ගන්න
//             .populate('event', 'title price date') // Event එකේ විස්තර ගන්න
//             .sort({ createdAt: -1 });

//         res.json(bookings);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

router.get('/admin/report', protect, admin, getPaidEventsReport);

module.exports = router;