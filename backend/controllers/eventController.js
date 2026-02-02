const Event = require('../models/Event');
const Booking = require('../models/Booking');

// 1. අලුත් Event එකක් සෑදීම
exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, startTime, location, price, totalTickets } = req.body;
        
        const event = await Event.create({
            title,
            description,
            date,
            startTime,
            location,
            price: Number(price),
            totalTickets: Number(totalTickets),
            availableTickets: Number(totalTickets),
            image: req.file ? `/uploads/${req.file.filename}` : null,
            createdBy: req.user._id
        });

        res.status(201).json(event);
    } catch (error) {
        console.error("🔥 Create Event Error:", error);
        res.status(500).json({ message: "Event එක සෑදීමට නොහැකි වුණා: " + error.message });
    }
};

// 2. සියලුම Events ලබා ගැනීම (වේගවත් කර ඇත)
exports.getEvents = async (req, res) => {
    try {
        // .lean() භාවිතා කිරීමෙන් query එක වේගවත් වේ
        const events = await Event.find().populate('createdBy', 'name email').sort({ date: 1 }).lean();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Events ලබා ගැනීමට නොහැකි වුණා: " + error.message });
    }
};

// 3. එක Event එකක විස්තර ID එකෙන් ලබා ගැනීම
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).lean();
        if (!event) {
            return res.status(404).json({ message: "මෙම Event එක සොයාගත නොහැක." });
        }
        res.json(event);
    } catch (error) {
        console.error("🔥 Get Event Error:", error);
        res.status(500).json({ message: "දත්ත ලබා ගැනීමේ සර්වර් දෝෂයකි." });
    }
};

// 4. Event එකක් Update කිරීම
exports.updateEvent = async (req, res) => {
    try {
        const { title, description, date, startTime, location, price, totalTickets } = req.body;
        let event = await Event.findById(req.params.id);

        if (!event) return res.status(404).json({ message: "Update කිරීමට Event එකක් හමු නොවුණි." });

        const imagePath = req.file ? `/uploads/${req.file.filename}` : event.image;

        // සියලුම fields update කිරීම
        const updatedData = {
            title,
            description,
            date,
            startTime,
            location,
            price: Number(price),
            totalTickets: Number(totalTickets),
            image: imagePath
        };

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id, 
            updatedData, 
            { new: true, runValidators: true }
        );

        res.json(updatedEvent);
    } catch (error) {
        console.error("🔥 Update Error:", error);
        res.status(500).json({ message: "Update කිරීම අසාර්ථකයි: " + error.message });
    }
};

// 5. Event එකක් Delete කිරීම (සම්පූර්ණයෙන්ම නිවැරදි කර ඇත)
exports.deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        
        // 1. මුලින්ම Event එක තියෙනවාද බලන්න
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "මකා දැමීමට Event එකක් හමු නොවුණි." });
        }

        // 2. Event එක මකා දමන්න
        await Event.findByIdAndDelete(eventId);

        // 3. (Optional) එම Event එකට අදාළ Bookings තිබේ නම් ඒවාද මකා දමන්න
        await Booking.deleteMany({ event: eventId });

        res.json({ message: "Event එක සාර්ථකව මකා දැමුවා." });
    } catch (error) {
        console.error("🔥 Delete Error:", error);
        res.status(500).json({ message: "මකා දැමීම අසාර්ථකයි: " + error.message });
    }
};

// 6. Admin වාර්තා (Stats)
exports.getEventTicketStats = async (req, res) => {
    try {
        const events = await Event.find().lean();
        const stats = await Promise.all(events.map(async (event) => {
            const bookings = await Booking.find({ event: event._id, status: 'Paid' }).lean();
            const soldTickets = bookings.reduce((sum, b) => sum + b.ticketsBooked, 0);
            const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

            return {
                eventTitle: event.title,
                totalTickets: event.totalTickets,
                soldTickets: soldTickets,
                availableTickets: event.totalTickets - soldTickets,
                totalRevenue: totalRevenue,
            };
        }));
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: "වාර්තා ලබා ගැනීම අසාර්ථකයි." });
    }
};