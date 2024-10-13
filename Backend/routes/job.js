const express = require('express');
const router = express.Router();
const Job = require('../models/jobModel'); // Assuming you have a Job model

// Add a new job
router.post('/jobs', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: 'Job added successfully', job });
  } catch (error) {
    res.status(400).json({ message: 'Failed to add job', error });
  }
});

router.get('/jobs', async (req, res) => {
    try {
      const jobs = await Job.find(); // Fetch all jobs from the database
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
    res.json({ jobs});
  }
  catch(error){
    res.status(500).json({ message:'Error fetching jobs', error });
  }
});

module.exports = router;
