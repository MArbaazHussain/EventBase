const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Booking = require("../models/Booking");
const authMiddleware = require("../middlewar/authMiddleware");

// 1. MANAGER STATS (Must be above /:id)
router.get("/manager/my-events", authMiddleware, async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id });
    const eventsWithStats = await Promise.all(events.map(async (event) => {
      const bookingCount = await Booking.countDocuments({ event: event._id });
      return { ...event._doc, totalBooked: bookingCount };
    }));
    res.json(eventsWithStats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. USER BOOKINGS (Must be above /:id)
router.get("/user/bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("event");
    const eventData = bookings.filter(b => b.event !== null).map(b => b.event);
    res.json(eventData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. GET ALL EVENTS
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. CREATE EVENT
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, date, venue, totalSeats } = req.body;
    const event = new Event({
      title, description, date, venue, totalSeats,
      createdBy: req.user.id,
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. BOOK A TICKET (Real-time Slot Update)
router.post("/:id/book", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.totalSeats <= 0) return res.status(400).json({ message: "Seats full!" });

    const booking = new Booking({
      event: event._id,
      user: req.user.id,
      seatsBooked: 1
    });

    event.totalSeats -= 1;
    await event.save();
    await booking.save();
    res.status(201).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. GET SINGLE EVENT
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;