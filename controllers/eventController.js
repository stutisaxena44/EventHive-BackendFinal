const Event = require("../models/Event");

// Create event
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      location,
      bannerImage
    } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      location,
      bannerImage,
      organizer: req.user.id
    });

    res.status(201).json({
      message: "Event created successfully",
      event
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("organizer", "name email");

    res.json(events);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Get one event
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name email");

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json(event);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Update event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    if (event.organizer.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this event"
      });
    }

    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.date = req.body.date || event.date;
    event.location = req.body.location || event.location;
    event.bannerImage = req.body.bannerImage || event.bannerImage;

    await event.save();

    res.json({
      message: "Event updated successfully",
      event
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Delete event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    if (event.organizer.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this event"
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({
      message: "Event deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Search events
const searchEvents = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const events = await Event.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } }
      ]
    });

    res.json(events);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  searchEvents
};