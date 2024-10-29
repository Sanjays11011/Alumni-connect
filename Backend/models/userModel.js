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
  },
  // Optional: Add an avatar field for user profile images
  avatar: {
    type: String, // URL to the image in cloud storage (e.g., AWS S3)
    default: null
  },
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Array of user references for contacts
});

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, process.env.SECRET_KEY, { expiresIn: '7d' });
  return token;
};

// Optional: Add a method to find contacts
userSchema.methods.addContact = function(contactId) {
  if (!this.contacts.includes(contactId)) {
    this.contacts.push(contactId);
  }
  return this.save();
};

// Optional: Add a method to remove a contact
userSchema.methods.removeContact = function(contactId) {
  this.contacts = this.contacts.filter(contact => contact.toString() !== contactId.toString());
  return this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
