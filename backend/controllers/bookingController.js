// const Booking = require('../models/Booking');
// const Event = require('../models/Event');
// const Stripe = require('stripe');
// const PDFDocument = require('pdfkit');
// const QRCode = require('qrcode');

// const stripe = process.env.STRIPE_SECRET_KEY ? Stripe(process.env.STRIPE_SECRET_KEY) : null;

// // 1. ටිකට් එකක් බුක් කිරීම
// exports.bookTicket = async (req, res) => {
//     try {
//         const { eventId, numTickets } = req.body;

//         if (!req.user) {
//             return res.status(401).json({ message: 'පරිශීලකයා හඳුනාගත නොහැක. නැවත Log වන්න.' });
//         }

//         const event = await Event.findById(eventId);
//         if (!event) {
//             return res.status(404).json({ message: 'Event එක හමු නොවීය' });
//         }

//         if (event.availableTickets < numTickets) {
//             return res.status(400).json({ message: 'කණගාටුයි, ප්‍රමාණවත් ටිකට් පත් නොමැත' });
//         }

//         const totalAmountLKR = event.price * numTickets;
//         let paymentSuccess = true; 

//         if (paymentSuccess) {
//             const booking = await Booking.create({
//                 event: eventId,
//                 user: req.user._id,
//                 ticketsBooked: numTickets,
//                 totalAmount: totalAmountLKR,
//                 status: 'Paid'
//             });

//             event.availableTickets -= numTickets;
//             await event.save();

//             return res.status(201).json({ 
//                 message: "ගෙවීම් සහ ටිකට් වෙන් කිරීම සාර්ථකයි!", 
//                 booking 
//             });
//         } else {
//             return res.status(400).json({ message: "ගෙවීම අසාර්ථකයි, කරුණාකර නැවත උත්සාහ කරන්න" });
//         }

//     } catch (error) {
//         console.error("Booking Error Detail:", error);
//         res.status(500).json({ message: "පද්ධතියේ දෝෂයකි: " + error.message });
//     }
// };

// // 2. Dashboard එක සඳහා යූසර්ගේ බුකින්ස් ලබා ගැනීම
// exports.getMyBookings = async (req, res) => {
//     try {
//         const bookings = await Booking.find({ user: req.user._id })
//                                      .populate('event')
//                                      .sort({ createdAt: -1 });
//         res.status(200).json(bookings);
//     } catch (error) {
//         res.status(500).json({ message: "දත්ත ලබාගැනීමට නොහැක: " + error.message });
//     }
// };

// // 3. ටිකට් එක PDF එකක් විදිහට ඩවුන්ලෝඩ් කිරීම (Updated with Name and Totals)
// exports.downloadTicket = async (req, res) => {
//     try {
//         const { bookingId } = req.params;

//         // Populate 'user' එකතු කළේ නම ලබා ගැනීමටයි
//         const booking = await Booking.findById(bookingId).populate('event').populate('user');
        
//         if (!booking) {
//             return res.status(404).json({ message: 'බුකින් එක හමු නොවීය' });
//         }

//         const doc = new PDFDocument({ size: 'A6', margin: 30 });

//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', `attachment; filename=Ticket-${bookingId}.pdf`);

//         doc.pipe(res);

//         // --- Background සහ Header ---
//         doc.rect(0, 0, doc.page.width, doc.page.height).fill('#050505');
//         doc.fillColor('#ADFF2F').fontSize(22).text('EVENTPASS', { align: 'center', charSpacing: 2 });
//         doc.moveDown(0.5);
//         doc.fillColor('#FFFFFF').fontSize(10).text('OFFICIAL ENTRANCE TICKET', { align: 'center', underline: true });
//         doc.moveDown(1.5);
        
//         // --- Attendee විස්තර ---
//         doc.fillColor('#ADFF2F').fontSize(11).text('ATTENDEE NAME');
//         doc.fillColor('#FFFFFF').fontSize(10).text(`${booking.user?.name || 'Valued Guest'}`);
//         doc.moveDown(0.8);

//         // --- Event විස්තර ---
//         doc.fillColor('#ADFF2F').fontSize(11).text('EVENT DETAILS');
//         doc.fillColor('#FFFFFF').fontSize(10).text(`Event: ${booking.event.title}`);
//         doc.text(`Location: ${booking.event.location}`);
//         doc.text(`Date: ${new Date(booking.event.date).toLocaleDateString()}`);
//         doc.moveDown(0.8);

//         // --- Booking Summary ---
//         doc.fillColor('#ADFF2F').fontSize(11).text('BOOKING SUMMARY');
//         doc.fillColor('#FFFFFF').fontSize(10).text(`Total Tickets: ${booking.ticketsBooked}`);
//         doc.fillColor('#FFFFFF').fontSize(10).text(`Total Price: LKR ${booking.totalAmount}`);
//         doc.moveDown(1);

//         // --- QR Code එක හැදීම ---
//         const qrData = JSON.stringify({
//             bookingId: booking._id,
//             holder: booking.user?.name,
//             event: booking.event.title,
//             tickets: booking.ticketsBooked
//         });

//         const qrCodeDataURL = await QRCode.toDataURL(qrData);
//         doc.image(qrCodeDataURL, (doc.page.width / 2) - 50, doc.y, { width: 100 });
        
//         doc.moveDown(10);
//         doc.fillColor('#ADFF2F').fontSize(8).text('SCAN FOR ENTRY AT VENUE', { align: 'center' });
//         doc.fillColor('#444').fontSize(6).text(`Booking ID: ${booking._id}`, { align: 'center' });

//         doc.end();

//     } catch (error) {
//         console.error("PDF QR Error:", error);
//         res.status(500).json({ message: "ටිකට් එක හැදීමේදී දෝෂයක් සිදුවිය." });
//     }
// };

// // සියලුම ගෙවීම් කළ බුකින් ලබා ගැනීම
// const getPaidEventsReport = async (req, res) => {
//     try {
//         // user සහ event විස්තරත් එක්කම දත්ත ලබා ගන්නවා (Populate)
//         const reports = await Booking.find({ isPaid: true })
//             .populate('user', 'name email')
//             .populate('event', 'title price date');
        
//         res.json(reports);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // module.exports = { getPaidEventsReport };

// module.exports = { 
//     bookTicket, 
//     getMyBookings, 
//     downloadTicket,
//     getPaidEventsReport 
// };













const Booking = require('../models/Booking');
const Event = require('../models/Event');
const Stripe = require('stripe');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');

const stripe = process.env.STRIPE_SECRET_KEY ? Stripe(process.env.STRIPE_SECRET_KEY) : null;

// 1. ටිකට් එකක් බුක් කිරීම
const bookTicket = async (req, res) => {
    try {
        const { eventId, numTickets } = req.body;

        if (!req.user) {
            return res.status(401).json({ message: 'පරිශීලකයා හඳුනාගත නොහැක. නැවත Log වන්න.' });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event එක හමු නොවීය' });
        }

        if (event.availableTickets < numTickets) {
            return res.status(400).json({ message: 'කණගාටුයි, ප්‍රමාණවත් ටිකට් පත් නොමැත' });
        }

        const totalAmountLKR = event.price * numTickets;
        let paymentSuccess = true; 

        if (paymentSuccess) {
            const booking = await Booking.create({
                event: eventId,
                user: req.user._id,
                ticketsBooked: numTickets,
                totalAmount: totalAmountLKR,
                status: 'Paid'
            });

            event.availableTickets -= numTickets;
            await event.save();

            return res.status(201).json({ 
                message: "ගෙවීම් සහ ටිකට් වෙන් කිරීම සාර්ථකයි!", 
                booking 
            });
        } else {
            return res.status(400).json({ message: "ගෙවීම අසාර්ථකයි, කරුණාකර නැවත උත්සාහ කරන්න" });
        }
    } catch (error) {
        console.error("Booking Error Detail:", error);
        res.status(500).json({ message: "පද්ධතියේ දෝෂයකි: " + error.message });
    }
};

// 2. Dashboard එක සඳහා යූසර්ගේ බුකින්ස් ලබා ගැනීම
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
                                     .populate('event')
                                     .sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "දත්ත ලබාගැනීමට නොහැක: " + error.message });
    }
};

// 3. ටිකට් එක PDF එකක් විදිහට ඩවුන්ලෝඩ් කිරීම
const downloadTicket = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId).populate('event').populate('user');
        
        if (!booking) {
            return res.status(404).json({ message: 'බුකින් එක හමු නොවීය' });
        }

        const doc = new PDFDocument({ size: 'A6', margin: 30 });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=Ticket-${bookingId}.pdf`);
        doc.pipe(res);

        doc.rect(0, 0, doc.page.width, doc.page.height).fill('#050505');
        doc.fillColor('#ADFF2F').fontSize(22).text('EVENTPASS', { align: 'center', charSpacing: 2 });
        doc.moveDown(0.5);
        doc.fillColor('#FFFFFF').fontSize(10).text('OFFICIAL ENTRANCE TICKET', { align: 'center', underline: true });
        doc.moveDown(1.5);
        
        doc.fillColor('#ADFF2F').fontSize(11).text('ATTENDEE NAME');
        doc.fillColor('#FFFFFF').fontSize(10).text(`${booking.user?.name || 'Valued Guest'}`);
        doc.moveDown(0.8);

        doc.fillColor('#ADFF2F').fontSize(11).text('EVENT DETAILS');
        doc.fillColor('#FFFFFF').fontSize(10).text(`Event: ${booking.event.title}`);
        doc.text(`Location: ${booking.event.location}`);
        doc.text(`Date: ${new Date(booking.event.date).toLocaleDateString()}`);
        doc.moveDown(0.8);

        doc.fillColor('#ADFF2F').fontSize(11).text('BOOKING SUMMARY');
        doc.fillColor('#FFFFFF').fontSize(10).text(`Total Tickets: ${booking.ticketsBooked}`);
        doc.fillColor('#FFFFFF').fontSize(10).text(`Total Price: LKR ${booking.totalAmount}`);
        doc.moveDown(1);

        const qrData = JSON.stringify({
            bookingId: booking._id,
            holder: booking.user?.name,
            event: booking.event.title,
            tickets: booking.ticketsBooked
        });

        const qrCodeDataURL = await QRCode.toDataURL(qrData);
        doc.image(qrCodeDataURL, (doc.page.width / 2) - 50, doc.y, { width: 100 });
        
        doc.moveDown(10);
        doc.fillColor('#ADFF2F').fontSize(8).text('SCAN FOR ENTRY AT VENUE', { align: 'center' });
        doc.fillColor('#444').fontSize(6).text(`Booking ID: ${booking._id}`, { align: 'center' });

        doc.end();
    } catch (error) {
        console.error("PDF QR Error:", error);
        res.status(500).json({ message: "ටිකට් එක හැදීමේදී දෝෂයක් සිදුවිය." });
    }
};

// 4. සියලුම බුකින් ලබා ගැනීම (Admin Report)
const getPaidEventsReport = async (req, res) => {
    try {
        const reports = await Booking.find() // මෙතන isPaid වෙනුවට status: 'Paid' හෝ හිස්ව තබන්න මොකද දැනට කෙලින්ම සේව් වෙන්නේ Paid විදිහට නිසා
            .populate('user', 'name email')
            .populate('event', 'title price date')
            .sort({ createdAt: -1 });
        
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// නිවැරදිව Exports කිරීම
module.exports = { 
    bookTicket, 
    getMyBookings, 
    downloadTicket,
    getPaidEventsReport 
};