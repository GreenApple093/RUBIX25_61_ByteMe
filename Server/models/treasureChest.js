const mongoose = require('mongoose');

const TreasureSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Refers to the User model
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    media: {
        type: [String], // Array of media URLs (e.g., images or audio files stored in Cloudinary)
        default: [],
    },
    tag: {
        type: String,
        required: true,
    }
});

const Treasure = mongoose.model('Treasure', TreasureSchema);

module.exports = Treasure;