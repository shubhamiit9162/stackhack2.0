const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    language: { type: String, required: true },
    genre: { type: String, required: true },
    duration: { type: String, required: true },
    isAdult: { type: Boolean, default: false },
    castDetails: [
        {
            name: { type: String, required: true },
            role: { type: String, required: true },
            image: { type: String, required: true }
        }
    ],
    releaseDate: { type: Date, required: true },
    story: { type: String, required: true },
    trailer: { type: String, required: true }
});

module.exports = mongoose.model('Movie', MovieSchema);
