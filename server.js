const express = require('express');
const app = express();
app.use(express.json());

let followers = {}; // Simpan pengikut per pengguna

// Endpoint untuk mendapatkan jumlah pengikut
app.get('/followers/:username', (req, res) => {
    const username = req.params.username;
    const count = followers[username] ? followers[username].length : 0;
    res.json({ count: count });
});

// Endpoint untuk mengikuti pengguna
app.post('/follow', (req, res) => {
    const { username } = req.body;
    const follower = req.ip; // Atau gunakan ID pengguna yang terautentikasi

    if (!followers[username]) {
        followers[username] = [];
    }

    // Cek apakah pengguna sudah mengikuti
    if (followers[username].includes(follower)) {
        return res.json({ success: false }); // Sudah mengikuti
    }

    // Tambahkan ke daftar pengikut
    followers[username].push(follower);
    const count = followers[username].length;

    res.json({ success: true, followerCount: count });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
