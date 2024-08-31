const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bookings: [
        {
            movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
            date: { type: Date, required: true },
            time: { type: String, required: true },
            seats: { type: Number, required: true }
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);
