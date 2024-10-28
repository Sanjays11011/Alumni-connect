const express = require('express');
const router = express.Router();
const Donation = require('../models/donationModel');

router.post('/donation', async (req,res) => {
    try{
        const donation = new Donation(req.body);
        await donation.save();
        res.status(201).json({ message: 'request for donation added successfully'});
    }
    catch(error){
        res.status(400).json({ message: 'failed to add donation request'});
    }
});

router.get('/donation', async (req,res) => {
    try{
        const donation = await Donation.find();
        res.json({donation});
    }
    catch(error){
        res.status(500).json({ message: 'Error fetching donation data', error });
    }
});

module.exports = router;