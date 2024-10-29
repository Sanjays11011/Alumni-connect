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

router.get('/profile/id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('_id');
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ userId: user._id });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});


router.put('/profile', authMiddleware, async (req, res) => {
  const { firstname,lastname,email, role, yearsofexperience, workingcompany, workingdomain, studyyear, passingoutyear,degree,successStory} = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      firstname,lastname,email, role, yearsofexperience, workingcompany, workingdomain, studyyear, passingoutyear,degree,successStory
    }, { new: true });
    if(!user){
      return res.status(404).json({message: "user not found"});
    }
    res.json({message: "Profile Updated Successfully", user});
  }
  catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

module.exports = router;
