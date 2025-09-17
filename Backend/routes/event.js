const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');

// Route to add a new event
router.post('/events', async (req, res) => {
  try {
    const { title, topic, date, location, link } = req.body;

    // Create a new event document
    const event = new Event({
      title,
      topic,
      date,
      location,
      link,
    });

    await event.save();
    res.status(201).json({ message: 'Event added successfully', event });
  } catch (error) {
    console.error("Error occurred while adding event:", error);
    res.status(400).json({ message: 'Failed to add event', error: error.message || error });
  }
});

// Route to fetch all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();

    const formattedEvents = events.map(event => ({
      _id: event._id,
      title: event.title,
      topic: event.topic,
      date: event.date,
      location: event.location,
      link: event.link,
    }));

    res.json({ events: formattedEvents });
  } catch (error) {
    console.error("Error fetching events data:", error);
    res.status(500).json({ message: 'Error fetching events data', error });
  }
});

// Route to fetch a single event by ID
router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({
      event: {
        _id: event._id,
        title: event.title,
        topic: event.topic,
        date: event.date,
        location: event.location,
        link: event.link,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event data', error });
  }
});

module.exports = router;
