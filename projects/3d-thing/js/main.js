const THREE = require('three');

let renderer;
let scene;
let camera;
let ambientLight;
let light;
let controls;
let ground;
let planeGeometry;
let boxGeometry;
let groundMaterial = new THREE.MeshLambertMaterial({
    color: 0xcfcfcf,
});
let boxMaterial = new THREE.MeshLambertMaterial({
    color: 0x034799,
});
let fov = 80;
let aspect = (window.innerWidth - 20) / (window.innerHeight - 20);
let near = 0.1;
let far = 2000;

window.onload = () => {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth - 20, window.innerHeight - 20);
    renderer.setClearColor(0x3DA8EB);

    document.body.appendChild(renderer.domElement);
    
    window.onresize = () => {
        renderer.setSize(window.innerWidth - 20, window.innerHeight - 20);
    
        aspect = window.innerWidth / window.innerHeight;
    }

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.up.set(0, -0.5, 1);
    camera.rotation.x = -Math.PI / 4;

    ambientLight = new THREE.AmbientLight(0x8D939E);

    light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(0, -10, 5);
    light.castShadow = true;
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 80;
    controls.update();

    planeGeometry = new THREE.BoxGeometry(50, 50, 5);
    ground = new THREE.Mesh(planeGeometry, groundMaterial)

    boxGeometry = new THREE.BoxGeometry(10, 10, 10);
    box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.z = 7.5;

    scene.add(camera);
    scene.add(ambientLight);
    scene.add(light);
    scene.add(ground);
    scene.add(box);

    render();
}

function render() {
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}