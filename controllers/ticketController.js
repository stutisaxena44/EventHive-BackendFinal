const Ticket = require("../models/Ticket");
const Event = require("../models/Event");

// Create ticket
const createTicket = async (req, res) => {
    try {
        const { event, category, price, quantity } = req.body;

        // Check event exists
        const existingEvent = await Event.findById(event);

        if (!existingEvent) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        const ticket = await Ticket.create({
            event,
            category,
            price,
            quantity,
            availableQuantity: quantity
        });

        res.status(201).json({
            message: "Ticket created successfully",
            ticket
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get tickets for an event
const getTicketsByEvent = async (req, res) => {
    try {
        const tickets = await Ticket.find({
            event: req.params.id
        });

        res.json(tickets);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createTicket,
    getTicketsByEvent
};