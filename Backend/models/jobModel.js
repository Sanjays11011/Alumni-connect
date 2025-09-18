const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobName: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  requirements: { type: [String], required: true },
  jobType: { type: String, required: true },
  salaryLow: { type: Number, required: true },
  salaryHigh: { type: Number, required: true },
  link: { type: String },
  posted: { type: Date, default: Date.now },
  description: { type: String, required: true },
  postedByUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
});

module.exports = mongoose.model('Job', jobSchema);