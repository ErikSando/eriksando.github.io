window.addEventListener('load', () => {
    let canvas = document.getElementById('canvas');

    Game.Settings.BgColour = 'white'

    Game.SetCanvas(canvas);
    Game.Start();
});

let dirt = new Image();
dirt.src = 'Assets/Textures/dirt.png';

let grass = new Image();
grass.src = 'Assets/Textures/grass.png';

let gameObj = new GameObject(Vector(50, 50), Vector(150, 150));
let gameObj2 = new GameObject(Vector(50, 200), Vector(150, 150));
gameObj.static = true;
gameObj2.static = true;
gameObj.image = grass;
gameObj2.image = dirt;

let pp = new TextButton('Reset Y', Vector(250, 250), Vector(160, 50));
pp.bgOpacity = 1;
pp.bgColour = 'rgb(230, 0, 0)';
pp.textSize = 40;
pp.outlineSize = 2;

pp.MouseEnter.AddListener(() => {
    pp.bgColour = 'rgb(220, 0, 0)';
});

pp.MouseExit.AddListener(() => {
    pp.bgColour = 'rgb(230, 0, 0)';
});

pp.MouseDown.AddListener(() => {
    pp.bgColour = 'rgb(200, 0, 0)';
});

pp.MouseUp.AddListener(() => {
    pp.bgColour = 'rgb(220, 0, 0)';

    Player.vel.y = 0;
    Player.go.position.y = 0;
});
