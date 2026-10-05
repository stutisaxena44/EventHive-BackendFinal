//represents tickets associated with the event

const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },

    category: {
        type: String,
        enum: ["VIP", "General"],
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    availableQuantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Ticket", ticketSchema);