const express = require('express');
const router = express.Router();
const multer = require('multer');
const Event = require('../models/eventModel');

// Set up multer storage to handle image uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to add a new event with image upload
router.post('/events', upload.single('image'), async (req, res) => {
  try {
    const { title, topic, date, location, link } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Create a new event document
    const event = new Event({
      title,
      topic,
      date,
      location,
      link,
      image: { data: image.buffer, contentType: image.mimetype }
    });

    await event.save();
    res.status(201).json({ message: 'Event added successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to add event', error });
  }
});

// Route to fetch all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json({ events });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events data', error });
  }
});

router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ event });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event data', error });
  }
}); 

// Route to serve images by event ID
router.get('/events/:id/image', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event || !event.image) {
      return res.status(404).send('Image not found');
    }

    res.set('Content-Type', event.image.contentType);
    res.send(event.image.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching image', error });
  }
});


module.exports = router;
