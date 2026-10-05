//handles tickets
const express = require("express");

const router = express.Router();
//request -> jwt authentication -> ticket is created
const {
    createTicket,
    getTicketsByEvent
} = require("../controllers/ticketController");
//protects creation
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createTicket);

router.get("/event/:id", getTicketsByEvent);

module.exports = router;