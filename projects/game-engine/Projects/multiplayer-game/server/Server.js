const express = require("express");
const app = express();
const server = require("http").createServer(app);

app.use(express.static("../client"));

const io = require("socket.io")(server);

const config = require("./config.json");

const onlinePlayers = [];

function FindPlayer(id) {
    for (player of onlinePlayers) {
        if (player.id == id) return player;
    }
}

const spawnPosition = { x: 935, y: 780 }

io.on("connection", (socket) => {
    socket.emit("connected", onlinePlayers, spawnPosition);

    let newPlayer = {
        position: spawnPosition,
        direction: "right",
        id: socket.id
    }

    onlinePlayers.push(newPlayer);

    socket.broadcast.emit("player-joined", newPlayer);

    socket.on("disconnect", () => {
        let player = FindPlayer(socket.id);
        if (player) onlinePlayers.splice(onlinePlayers.indexOf(player), 1);

        socket.broadcast.emit("player-left", socket.id);
    });

    socket.on("set-position", (x, y, direction) => {
        let player = FindPlayer(socket.id);
        player.position = { x: x, y: y };
        player.direction = direction;

        socket.broadcast.emit("player-moved", socket.id, x, y);
    });
});

server.listen(config.port);

console.log('Server started');