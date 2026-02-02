const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// .env file එකේ තියෙන විස්තර load කිරීම
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected සාර්ථකයි!'))
    .catch((err) => console.log('❌ DB Connection Error:', err));

// Basic Route එකක් (වැඩද බලන්න)
app.get('/', (req, res) => {
    res.send('Event Booking API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

const authRoutes = require('./routes/authRoutes'); // Route එක import කිරීම
const path = require('path');

const bookingRoutes = require('./routes/bookingRoutes');


app.use('/api/bookings', bookingRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use('/api/users', authRoutes);

app.use('/api/auth', authRoutes); // API එක පාවිච්චි කරන්න පටන් ගැනීම
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/uploads', express.static('uploads'));
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', require('./routes/userRoutes'));