const Booking = require("../models/Booking");
const Ticket = require("../models/Ticket");

// Create booking
const createBooking = async (req, res) => {
  try {
    const { ticket, quantity } = req.body;

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be a positive integer"
      });
    }

    // Find ticket
    const ticketData = await Ticket.findById(ticket);

    if (!ticketData) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    // Check available tickets
    if (quantity > ticketData.availableQuantity) {
      return res.status(400).json({
        message: "Not enough tickets available"
      });
    }

    // Calculate total price
    const totalPrice = ticketData.price * quantity;

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      event: ticketData.event,
      ticket: ticket,
      quantity: quantity,
      totalPrice: totalPrice
    });

    // Reduce available tickets
    ticketData.availableQuantity -= quantity;
    await ticketData.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Get one booking
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("event")
      .populate("ticket");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    res.json(booking);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Delete booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    // Find the ticket used by this booking
    const ticket = await Ticket.findById(booking.ticket);

    if (ticket) {
      // Restore booked quantity
      ticket.availableQuantity += booking.quantity;

      // Don't exceed original ticket quantity
      if (ticket.availableQuantity > ticket.quantity) {
        ticket.availableQuantity = ticket.quantity;
      }

      await ticket.save();
    }

    // Delete booking
    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      message: "Booking deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {
  createBooking,
  getBooking,
  deleteBooking
};