const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ticketsBooked: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Paid'], default: 'Paid' } // දැනට කෙලින්ම Paid ලෙස ගනිමු
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);