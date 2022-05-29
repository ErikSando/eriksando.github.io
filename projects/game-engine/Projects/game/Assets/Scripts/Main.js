window.addEventListener('load', () => {
    let canvas = document.getElementById('canvas');

    Game.SetCanvas(canvas);
    Game.Start();
});

let dirt = new Image();
dirt.src = 'Assets/Textures/dirt.png';

let grass = new Image();
grass.src = 'Assets/Textures/grass.png';

let gameObj = new GameObject(Vector(50, 50), Vector(150, 150));
let gameObj2 = new GameObject(Vector(50, 200), Vector(150, 150));
gameObj.image = grass;
gameObj2.image = dirt;

let pp = new Frame(Vector(250, 250));
pp.bgOpacity = 1;
pp.bgColour = 'red';

pp.MouseEnter.AddListener(() => {
    console.log('mouse entered');
});

pp.MouseExit.AddListener(() => {
    console.log('mouse exited')
});

pp.MouseDown.AddListener(() => {
    console.log('mouse down');
});

pp.MouseUp.AddListener(() => {
    console.log('mouse up');
});