const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

// POST - submit enquiry
router.post('/', async (req, res) => {
    try {
        const { name, phone, email, plotType, message } = req.body;
        if (!name || !phone || !email || !plotType) {
            return res.status(400).json({ message: 'Please fill in all required fields.' });
        }
        const enquiry = new Enquiry({ name, phone, email, plotType, message });
        await enquiry.save();
        res.status(201).json({ message: 'Enquiry submitted successfully!', enquiry });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET all enquiries (admin use)
router.get('/', async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.json(enquiries);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
