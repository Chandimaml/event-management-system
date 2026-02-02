const express = require('express');
const router = express.Router();
const { 
    createEvent, 
    getEvents, 
    getEventById, 
    updateEvent, 
    deleteEvent, 
    getEventTicketStats 
} = require('../controllers/eventController');

const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// --- Routes ---

// 1. සියලුම Events බැලීම (Public)
router.get('/', getEvents);

// 2. Admin ට විතරක් Event එකක් Create කිරීම
// සටහන: මෙතන '/add' වෙනුවට '/' පාවිච්චි කිරීම වඩාත් නිවැරදි RESTful ක්‍රමයයි
router.post('/', protect, admin, upload.single('image'), createEvent);

// 3. Admin ට විතරක් ටිකට් විකුණුම් වාර්තා බැලීම
router.get('/stats', protect, admin, getEventTicketStats);

// 4. එක Event එකක විස්තර බැලීම (Edit Page එකට දත්ත ගන්නේ මෙතනින්)
router.get('/:id', getEventById);

// 5. Event එකක් Update කිරීම
router.put('/:id', protect, admin, upload.single('image'), updateEvent);

// 6. Event එකක් Delete කිරීම
router.delete('/:id', protect, admin, deleteEvent);


module.exports = router;