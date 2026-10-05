//represents ticket booking
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },

  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket"
  },

  quantity: Number,

  totalPrice: Number
});

module.exports = mongoose.model("Booking", bookingSchema);