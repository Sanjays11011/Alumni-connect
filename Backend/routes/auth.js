// authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Signup route
router.post('/signup', async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role
    });

    await user.save();
    const token = user.generateAuthToken();
    res.status(201).send({ token, user });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

// Login route
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();
    res.send({ token, user });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
