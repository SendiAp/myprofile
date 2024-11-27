// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Follower = require('./models/Follower');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke MongoDB Atlas
const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/followerDB?retryWrites=true&w=majority'; // Ganti dengan URL koneksi Anda

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Endpoint untuk mengikuti
app.post('/follow', async (req, res) => {
    const { username } = req.body;

    let follower = await Follower.findOne({ username });
    if (!follower) {
        follower = new Follower({ username, followerCount: 1 });
    } else {
        follower.followerCount++;
    }

    await follower.save();
    res.json({ followerCount: follower.followerCount });
});

// Endpoint untuk mendapatkan jumlah pengikut
app.get('/followers/:username', async (req, res) => {
    const { username } = req.params;
    const follower = await Follower.findOne({ username });
    if (follower) {
        res.json({ count: follower.followerCount });
    } else {
        res.json({ count: 0 });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
