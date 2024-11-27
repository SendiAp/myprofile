const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    followerCount: { type: Number, default: 0 }
});

// Pastikan model diekspor dengan benar
module.exports = mongoose.model('Follower', followerSchema);
