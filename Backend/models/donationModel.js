const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    request: {type:String, required:true},
    review: {type:String, required:true},
    requirements: {type:[String], required:true},
    CostOfEach: {type:Number, required:true},
})

module.exports = mongoose.model('Donation', donationSchema)