//handles events endpoints
const {
  validate,
  eventValidation
} = require("../middleware/validation");
const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  searchEvents
} = require("../controllers/eventController");

const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.get("/", getEvents);
router.get("/search", searchEvents);
router.get("/:id", getEvent);

// Protected routes - connects middleware 
router.post(
  "/",
  authMiddleware,
  eventValidation,
  validate,
  createEvent
);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;