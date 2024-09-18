// userModel.js
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Student', 'Alumni'],
    required: true
  },
  yearsofexperience: {
    type: String,
    default: null
  },
  workingcompany: {
    type: String,
    default: null
  },
  workingdomain: {
    type: String,
    default: null
  },
  studyyear: {
    type: String,
    default: null
  },
  passingoutyear: {
    type: String,
    default: null
  },
  degree: {
    type: String,
    default: null
  },
  successStory: {
    type: String,
    default: null
  }
});

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, { expiresIn: '7d' });
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
