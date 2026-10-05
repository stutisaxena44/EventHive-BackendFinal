const express = require("express");

const router = express.Router();

const {
  createBooking,
  getBooking,
  deleteBooking
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createBooking);

router.get("/:id", authMiddleware, getBooking);

router.delete("/:id", authMiddleware, deleteBooking);

module.exports = router;