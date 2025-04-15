const app = require('./src/app');
const connectionToDb = require('./src/db/db');
const { Server : SocketServer } = require('socket.io');
const http = require('http');

connectionToDb();

const server = http.createServer(app); // Declare only once

const io = new SocketServer(server, {
    cors: {
        origin: "*",
    }
});

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
