
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/contacts/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const contacts = await User.find({ _id: { $ne: userId } }); 
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
