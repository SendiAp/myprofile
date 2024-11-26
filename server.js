const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let messages = [];

app.use(express.static('public')); // Menyajikan file statis dari folder 'public'

io.on('connection', (socket) => {
    console.log('A user connected');

    // Kirim pesan yang sudah ada ke pengguna baru
    socket.emit('previousMessages', messages);

    socket.on('sendMessage', (message) => {
        messages.push(message);
        io.emit('newMessage', message); // Kirim ke semua pengguna
    });

    socket.on('disconnect', () => {
        console.log('User  disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
