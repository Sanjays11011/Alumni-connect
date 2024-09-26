const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {type:String, required: true},
    topic: {type:String, required: true},
    date: {type: Date, default: Date.now},
    image: {  img: {
        data: Buffer,
        contentType: String
      }},
    location: {type: String, required: true},
    link: {type: String, required: true},
})

module.exports = mongoose.model('Event',eventSchema);