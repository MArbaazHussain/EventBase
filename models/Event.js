const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    venue: { type: String, required: true },
    date: { type: Date, required: true },
    totalSeats: { type: Number, required: true },
    bookedSeats: { type: Number, default: 0 }
});

module.exports = mongoose.model("Event", eventSchema);
