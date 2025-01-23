const mongoose = require('mongoose');

const TimeCapsuleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Refers to the User model
        required: true,
    },
    thoughts: {
        type: String,
        required: true,
    },
    media: {
        type: [String], // Array of media URLs (e.g., images or audio files stored in Cloudinary)
        default: [],
    },
    unveilDate: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically adds the creation date
    },
});

const TimeCapsule = mongoose.model('TimeCapsule', TimeCapsuleSchema);

module.exports = TimeCapsule;