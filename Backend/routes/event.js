const express = require('express');
const router = express.Router();
const multer = require('multer');
const Event = require('../models/eventModel');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/events',upload.single('image'),async (req, res) => {
  try{
    const { title, topic, date, location, link } = req.body;
    const image = req.file;
    if(!image){
      return res.status(400).json({message: 'Image is required'});
    }
    const events = new Event({ title, topic, date, location, link, image:{data: image.buffer, contentType: image.mimetype} });
    await events.save();
    res.status(201).json({ message: 'Events added successfully'});
  }
  catch(error){
    res.status(400).json({message: 'Failed to add events'});
  }
});

router.get('/events',async(req,res) => {
  try{
    const events = await Event.find();
    res.json({ events });
  } catch(error){
    res.status(500).json({ message: 'Error fetching events data'});
  }
});

// Serve images by event ID
router.get('/events/:id/image', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event || !event.image) {
      return res.status(404).send('Image not found');
    }
    res.set('Content-Type', event.image.contentType);
    res.send(event.image.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching image' });
  }
});

router.delete('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event' });
  }
});

module.exports = router;
