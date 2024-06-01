const GameState = Object.freeze({
    Start: 0,
    Run: 1,
    End: 2
});

const prey = [];
const predators = [];
const food = [];

const SimulationInfo = {
    totalPrey: 0,
    totalPredators: 0
}

const AddPrey = (p) => {
    prey.push(p);
    SimulationInfo.totalPrey++;
}

const AddPredator = (p) => {
    predators.push(p);
    SimulationInfo.totalPredators++;
}

const RemovePrey = (p) => {
    prey.splice(prey.indexOf(p), 1);
}

const RemovePredator = (p) => {
    predators.splice(predators.indexOf(p), 1);
}

const RemoveFood = (f) => {
    food.splice(food.indexOf(f), 1);
}

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    let state = GameState.Start;

    const startingPreyElement = document.getElementById("starting-prey");
    const startingPredatorsElement = document.getElementById("starting-predators");
    const foodSpawnRateElement = document.getElementById("food-spawn-rate");
    const simulationSpeedElement = document.getElementById("simulation-speed");
    const startButton = document.getElementById("start");
    const alivePrey = document.getElementById("prey");
    const deadPrey = document.getElementById("dead-prey");
    const alivePredators = document.getElementById("predators");
    const totalPrey = document.getElementById("total-prey");
    const totalPredators = document.getElementById("total-predators");
    const runtime = document.getElementById("runtime");
    const avgPreySpeed = document.getElementById("prey-speed");
    const avgPreyVision = document.getElementById("prey-vision");
    const avgPreyEnergy = document.getElementById("prey-energy");
    const avgPreyReproduction = document.getElementById("prey-reproduction");
    const avgPredatorSpeed = document.getElementById("predator-speed");
    const avgPredatorVision = document.getElementById("predator-vision");
    const avgPredatorEnergy = document.getElementById("predator-energy");
    const avgPredatorReproduction = document.getElementById("predator-reproduction");
    
    let startingPrey = 20;
    let startingPredators = 4;
    let foodSpawnRate = 1;
    let simulationSpeed = 1;

    const aspectRatio = 16/9;
    const nativeWidth = 1280;

    function Resize() {
        let width = window.innerWidth * 2/3;
        let height = width * (1 / aspectRatio);

        if (height > window.innerHeight * 0.9) {
            height = window.innerHeight * 0.9;
            width = height * aspectRatio;
        }

        canvas.width = width;
        canvas.height = height;

        //ctx.imageSmoothingEnabled = false;
    }

    window.addEventListener("resize", Resize);

    Resize();

    const ground = Images.ground;

    function Draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let scale = canvas.width / nativeWidth;
        ctx.setTransform(scale, 0, 0, scale, 0, 0);

        ctx.drawImage(ground, 0, 0);

        for (let p of prey) p.Draw(ctx);
        for (let p of predators) p.Draw(ctx);
        for (let f of food) f.Draw(ctx);
    }

    let lastUpdate;
    let lastFood;
    let lastAverageTest;

    function Update(timestamp) {
        if (state == GameState.Start || state == GameState.End) {
            Draw();
            requestAnimationFrame(Update);

            return;
        }

        const delta = (timestamp - lastUpdate) / 1000 * simulationSpeed;
        lastUpdate = timestamp;

        Stopwatch.Update(delta);

        for (let p of prey) p.Update(delta);
        for (let p of predators) p.Update(delta);
        
        if (timestamp - lastFood > 400 / foodSpawnRate / simulationSpeed) {
            let foodToSpawn = (timestamp - lastFood) / (400 / foodSpawnRate / simulationSpeed);

            for (let i = 0; i < foodToSpawn; i++) {
                food.push(new Food(new Vector(Random.Integer(0, 1280 - Images.food.width), Random.Integer(0, 720 - Images.food.height))));
            }
            
            lastFood = timestamp;
        }

        Draw();

        let _alivePrey = GetAlivePrey();

        alivePrey.textContent = _alivePrey;
        deadPrey.textContent = "(" + (prey.length - _alivePrey) + " dead)";
        alivePredators.textContent = predators.length;
        totalPrey.textContent = SimulationInfo.totalPrey;
        totalPredators.textContent = SimulationInfo.totalPredators;
        runtime.textContent = Stopwatch.GetTime();

        if (timestamp - lastAverageTest > 3000 / simulationSpeed) {
            AddData();

            lastAverageTest = timestamp;
        }

        requestAnimationFrame(Update);
    }

    function Start(timestamp) {
        lastUpdate = timestamp;
        lastFood = timestamp;
        lastAverageTest = timestamp;

        requestAnimationFrame(Update);
    }

    requestAnimationFrame(Start);

    function AddData() {
        let preyStats = GetPreyStats();
        let predatorStats = GetPredatorStats();

        avgPreySpeed.textContent = preyStats.speed;
        avgPreyVision.textContent = preyStats.vision;
        avgPreyEnergy.textContent = preyStats.energy;
        avgPreyReproduction.textContent = preyStats.cloneTime;

        avgPredatorSpeed.textContent = predatorStats.speed;
        avgPredatorVision.textContent = predatorStats.vision;
        avgPredatorEnergy.textContent = predatorStats.energy;
        avgPredatorReproduction.textContent = predatorStats.cloneTime;

        let currentPreyStats = JSON.parse(window.localStorage.getItem("PreyStats"));
        let currentPredatorStats = JSON.parse(window.localStorage.getItem("PredatorStats"))

        currentPreyStats.push(preyStats);
        currentPredatorStats.push(predatorStats);

        window.localStorage.setItem("PreyStats", JSON.stringify(currentPreyStats));
        window.localStorage.setItem("PredatorStats", JSON.stringify(currentPredatorStats));
    }

    function StartSimulation(timestamp) {
        prey.splice(0, prey.length);
        predators.splice(0, predators.length);
        food.splice(0, food.length);
        Stopwatch.Reset();

        startingPrey = startingPreyElement.value || 30;
        startingPredators = startingPredatorsElement.value || 5;
        foodSpawnRate = foodSpawnRateElement.value || 1;
        simulationSpeed = simulationSpeedElement.value || 1;

        SimulationInfo.totalPrey = 0;
        SimulationInfo.totalPredators = 0;

        window.localStorage.setItem("PreyStats", "[]");
        window.localStorage.setItem("PredatorStats", "[]");

        for (let i = 0; i < startingPrey; i++) {
            prey.push(new Prey(new Vector(canvas.width / startingPrey * i + canvas.width / startingPrey / 2 - 12, 10), 180));
            SimulationInfo.totalPrey++;
        }

        for (let i = 0; i < startingPredators; i++) {
            predators.push(new Predator(new Vector(canvas.width / startingPredators * i + canvas.width / startingPredators / 2 - 12, canvas.height - 38)));
            SimulationInfo.totalPredators++;
        }

        AddData();

        lastUpdate = timestamp;
        lastFood = timestamp;
        state = GameState.Run;
    }

    startButton.onclick = () => {
        requestAnimationFrame(StartSimulation);
    }

    function GetAlivePrey() {
        let total = 0;

        for (let p of prey) {
            if (p.energy > 0) total++;
        }

        return total;
    }

    function GetPreyStats() {
        let speed = 0;
        let vision = 0;
        let energy = 0;
        let cloneTime = 0;
        let total = 0;

        for (let p of prey) {
            if (p.energy <= 0) continue;

            speed += p.speed;
            vision += p.vision;
            energy += p.maxEnergy;
            cloneTime += p.cloneTime;
            total++;
        }

        return {
            speed: Number((speed / total).toFixed(1)),
            vision: Number((vision / total).toFixed(1)),
            energy: Number((energy / total).toFixed(1)),
            cloneTime: Number((cloneTime / total).toFixed(1))
        }
    }

    function GetPredatorStats() {
        let speed = 0;
        let vision = 0;
        let energy = 0;
        let cloneTime = 0;

        for (let p of predators) {
            speed += p.speed;
            vision += p.vision;
            energy += p.maxEnergy;
            cloneTime += p.cloneTime;
        }

        let total = predators.length;

        return {
            speed: Number((speed / total).toFixed(1)),
            vision: Number((vision / total).toFixed(1)),
            energy: Number((energy / total).toFixed(1)),
            cloneTime: Number((cloneTime / total).toFixed(1))
        }
    }
});