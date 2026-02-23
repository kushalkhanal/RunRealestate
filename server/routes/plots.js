const express = require('express');
const router = express.Router();
const Plot = require('../models/Plot');

// GET all plots (optional category filter)
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category && category !== 'all' ? { category } : {};
        const plots = await Plot.find(filter).sort({ createdAt: -1 });
        res.json(plots);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET single plot
router.get('/:id', async (req, res) => {
    try {
        const plot = await Plot.findById(req.params.id);
        if (!plot) return res.status(404).json({ message: 'Plot not found' });
        res.json(plot);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
