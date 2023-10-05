const PlayerCollisionGroup = new CollisionGroup("player", ["player"]);

const NonLocalPlayers = new class {
    #playerList = []
    
    Add(playerInfo) {
        let newPlayer = new NonLocalPlayer(new Vector(playerInfo.position.x, playerInfo.position.y), playerInfo.id);
        newPlayer.direction = playerInfo.direction;

        this.#playerList.push(newPlayer);
    }

    Remove(id) {
        let playerInfo = this.GetPlayerIndexFromID(id)
        let player, index;

        if (playerInfo) {
            player = playerInfo.player;
            index = playerInfo.index;
        }

        if (player) {
            player.Remove();
            this.#playerList.splice(index, 1);
        }
    }

    GetPlayerIndexFromID(id) {
        for (let i = 0; i < this.#playerList.length; ++i) {
            let player = this.#playerList[i];

            if (player.id == id) return { player: player, index: i }
        }
    }

    GetPlayerFromID(id) {
        let playerInfo = this.GetPlayerIndexFromID(id)
        let player;

        if (playerInfo) player = playerInfo.player;

        return player;
    }
}

Game.Loaded.AddListener(() => {
    const socket = io("10.0.0.4");

    let localPlayer;

    socket.on("connected", (playersInfo, spawnPosition) => {
        for (let playerInfo of playersInfo) NonLocalPlayers.Add(playerInfo);

        localPlayer = new LocalPlayer(new Vector(spawnPosition.x, spawnPosition.y), socket);

        Game.Camera.position = new Vector(
            localPlayer.GameObject.position.x - (Game.Settings.NativeWidth - localPlayer.GameObject.scale.x) / 2,
            localPlayer.GameObject.position.y - (Game.Settings.NativeHeight - localPlayer.GameObject.scale.y) / 2
        );

        Game.PostUpdate.AddListener(delta => {
            let targetPosition = new Vector(
                localPlayer.GameObject.position.x - (Game.Settings.NativeWidth - localPlayer.GameObject.scale.x) / 2,
                localPlayer.GameObject.position.y - (Game.Settings.NativeHeight - localPlayer.GameObject.scale.y) / 2
            );

            Game.Camera.position.lerp(targetPosition, 5 * delta);
        });
    });

    socket.on("player-joined", playerInfo => NonLocalPlayers.Add(playerInfo));
    socket.on("player-left", id => NonLocalPlayers.Remove(id));

    socket.on("player-moved", (id, x, y) => {
        let player = NonLocalPlayers.GetPlayerFromID(id);

        if (player) player.GameObject.position = new Vector(x, y);
    });

    Game.CreateCanvas();
    Game.Start();
});