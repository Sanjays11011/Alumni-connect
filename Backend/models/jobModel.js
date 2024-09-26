const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobName: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  requirements: { type: [String], required: true },
  jobType: { type: String, required: true }, // Missing in the response
  salaryLow: { type: Number, required: true }, // Missing in the response
  salaryHigh: { type: Number, required: true }, // Missing in the response
  link: { type: String }, // Job link field
  posted: { type: Date, default: Date.now },
  description: { type: String , required: true},
});

module.exports = mongoose.model('Job', jobSchema);
