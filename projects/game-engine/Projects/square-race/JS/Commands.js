function SetCollisions(enabled) {
    if (enabled) squareGroup.cantCollide = ["Square"];
    else squareGroup.cantCollide = [];
}

function Victory(name) {
    console.log(name + " has won!");

    StopRace();
}

function StartRace() {
    for (let square of squares) square.Start();
}

function StopRace() {
    for (let square of squares) square.Stop();
}