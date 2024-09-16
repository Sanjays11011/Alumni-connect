// profileRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const User = require('../models/userModel');

// Get the profile of the logged-in user
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
