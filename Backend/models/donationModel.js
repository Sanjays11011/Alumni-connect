const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    intro: { type: String, required: true },
    review: { type: String, required: true },
    requirements: { type: [String], required: true },
    amount: { type: Number, required: true }
});

module.exports = mongoose.model('Donation', donationSchema);
