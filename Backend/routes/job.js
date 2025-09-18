// routes/jobs.js
const express = require('express');
const router = express.Router();
const Job = require('../models/jobModel');
const authMiddleware = require('../middleware/authmiddleware'); // Assuming your auth middleware is here

// This route now requires a token and will save the user's ID.
// routes/jobs.js

router.post('/jobs', authMiddleware, async (req, res) => {
  try {
    // 🔑 The ID is attached by the authMiddleware
    console.log("Received data:", req.body); 
    const postedByUserId = req.user._id;

    // Create the job with all data from the request body plus the user ID
    const newJobData = {
      ...req.body,
      postedByUserId: postedByUserId,
    };

    const job = new Job(newJobData);
    await job.save();
    res.status(201).json({ message: 'Job added successfully', job });
  } catch (error) {
    console.error("Error adding job:", error);
    res.status(400).json({ message: 'Failed to add job', error: error.message });
  }
});

// The GET and other routes remain the same, but I'll include them for completeness.

router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json({ jobs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
});

router.get('/jobs/:id', async (req, res) => {
  try {
    const jobs = await Job.findById(req.params.id);
    if (!jobs){
      res.status(404).json({ message: 'Job not found' });
    }
    res.json({ jobs });
  } catch(error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
});

// Assuming you have a DELETE route now
router.delete('/jobs/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    if (job.postedByUserId.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this job.' });
    }

    await job.deleteOne();
    res.status(200).json({ message: 'Job deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
});

module.exports = router;