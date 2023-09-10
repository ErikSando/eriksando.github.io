const io = require('socket.io')(80, {
    cors: {
        origin: 'https://eriksando.github.io'
    }
});

io.on('connection', (socket) => {
    console.log('new connection: ' + socket.id);
});