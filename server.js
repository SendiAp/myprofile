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
const uri = 'mongodb+srv://sya:sya@cluster0.sfufjbg.mongodb.net/?retryWrites=true&w=majority'; // Ganti dengan URL koneksi Anda

mongoose.connect(uri, { useNewUrlParser: true }) // Hapus useUnifiedTopology
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Endpoint untuk mengikuti
app.post('/follow', async (req, res) => {
    const { username } = req.body;

    try {
        let follower = await Follower.findOne({ username });
        if (!follower) {
            follower = new Follower({ username, followerCount: 1 });
        } else {
            follower.followerCount++;
        }

        await follower.save();
        res.json({ followerCount: follower.followerCount });
    } catch (error) {
        console.error('Error while following:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint untuk mendapatkan jumlah pengikut
app.get('/followers/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const follower = await Follower.findOne({ username });
        if (follower) {
            res.json({ count: follower.followerCount });
        } else {
            res.json({ count: 0 });
        }
    } catch (error) {
        console.error('Error while fetching followers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
