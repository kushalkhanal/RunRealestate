const mongoose = require('mongoose');

const plotSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    area: { type: String, required: true },
    category: {
        type: String,
        enum: ['residential', 'commercial', 'agricultural'],
        required: true,
    },
    location: { type: String, required: true },
    image: { type: String, default: '' },
    badge: { type: String, default: '' }, // e.g. "New", "Hot", "Featured"
    featured: { type: Boolean, default: false },
    amenities: [String],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Plot', plotSchema);
