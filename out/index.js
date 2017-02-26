"use strict";
let scene = new THREE.Scene();
let width = 9;
let cubeWidth = 100;
let middle = Math.floor(width / 2) * cubeWidth;
let game = new AIGame(width, cubeWidth);
scene.add(game);
let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.x = middle;
camera.position.z = width * cubeWidth * 1.1;
camera.position.y = cubeWidth * 7;
camera.rotation.x = -Math.PI / 4;
let light = new THREE.PointLight(0xfefefe, 1);
light.position.x = middle;
light.position.z = middle;
light.position.y = 5 * cubeWidth;
light.castShadow = true;
scene.add(light);
let ambient = new THREE.AmbientLight(0xfefefe, 1);
scene.add(ambient);
let renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
let isRunning = false;
let lastTick = performance.now();
let tickLength = 200;
function toggleRunning() {
    isRunning = !isRunning;
}
function tick() {
    lastTick = performance.now();
    game.tick();
}
function animate() {
    if (isRunning && performance.now() - lastTick > tickLength) {
        tick();
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
//# sourceMappingURL=index.js.map