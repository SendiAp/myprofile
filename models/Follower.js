const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    followerCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Follower', followerSchema);
