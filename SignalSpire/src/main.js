import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { legGeoMetry } from "./lib/createLegs.js";
import { createBrace } from "./lib/createBrace.js";
import { createHorizontalBar } from "./lib/createHorizontalBar.js";
import { createLadderRail } from "./lib/createLadderRail.js";
import { createRung } from "./lib/createRung.js";
import { createAntenna } from "./lib/createAntenna.js";
import { createTopAntenna } from "./lib/createTopAntenna.js";
import { createDishAntenna } from "./lib/createDishAntenna.js";

// Sceen
const sceen = new THREE.Scene();
sceen.background = new THREE.Color("#e1e3e1");

// Camera
const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

// Canvas
const canvas = document.getElementById("draw");

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


//  Ground geometry (flat surface)
const groundGeometry = new THREE.PlaneGeometry(7, 7, 10, 10);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x2f2f2f,
  roughness: 0.9,
  metalness: 0.0,
  side: THREE.DoubleSide,
  wireframe: true,
});

const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -2;

sceen.add(ground);

// Platform geometry (square, solid)
const platformGeometry = new THREE.BoxGeometry(4, 0.5, 4);
const plateformMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  roughness: 0.7,
  metalness: 0.05,
});

const platform = new THREE.Mesh(platformGeometry, plateformMaterial);
platform.position.y = -1.76;

sceen.add(platform);

// Tower legs geometry

const blackMaterial = new THREE.MeshStandardMaterial({
  color: 0x9ca3af,
  roughness: 0.4,
  metalness: 0.8,
});
const offset = 0.6;

sceen.add(
  legGeoMetry(offset, offset, blackMaterial),
  legGeoMetry(offset, -offset, blackMaterial),
  legGeoMetry(-offset, offset, blackMaterial),
  legGeoMetry(-offset, -offset, blackMaterial)
);
// Brace geometry

for (let y = -0.8; y < 6; y++) {
  //Back brace
  const bacekBrace1 = createBrace(y, 0, Math.PI / 4, blackMaterial);
  bacekBrace1.position.x = 0;
  bacekBrace1.position.z = -0.6;

  const backBrace2 = createBrace(y, 0, -Math.PI / 4, blackMaterial);
  backBrace2.position.x = 0;
  backBrace2.position.z = -0.6;

  sceen.add(bacekBrace1, backBrace2);

  //Front brace
  const frontBrace1 = createBrace(y, 0, Math.PI / 4, blackMaterial);
  frontBrace1.position.x = 0;
  frontBrace1.position.z = 0.6;

  const frontBrace2 = createBrace(y, 0, -Math.PI / 4, blackMaterial);
  frontBrace2.position.x = 0;
  frontBrace2.position.z = 0.6;

  sceen.add(frontBrace1, frontBrace2);

  //Left brace
  const leftBrace1 = createBrace(y, 0, Math.PI / 4, blackMaterial);
  leftBrace1.position.x = -0.6;
  leftBrace1.position.z = 0;
  leftBrace1.rotation.y = 1.6;

  const leftBrace2 = createBrace(y, 0, -Math.PI / 4, blackMaterial);
  leftBrace2.position.x = -0.6;
  leftBrace2.position.z = 0;
  leftBrace2.rotation.y = 1.6;

  sceen.add(leftBrace1, leftBrace2);

  // Right brace
  const rightBrace1 = createBrace(y, 0, Math.PI / 4, blackMaterial);
  rightBrace1.position.x = 0.6;
  rightBrace1.position.z = 0;
  rightBrace1.rotation.y = 1.6;

  const rightBrace2 = createBrace(y, 0, -Math.PI / 4, blackMaterial);
  rightBrace2.position.x = 0.6;
  rightBrace2.position.z = 0;
  rightBrace2.rotation.y = 1.6;

  sceen.add(rightBrace1, rightBrace2);
}

// Horizontal Bar
function createRing(y) {
  const size = 1;
  const front = createHorizontalBar(size, blackMaterial);
  front.position.set(0, y, 0.6);

  const back = createHorizontalBar(size, blackMaterial);
  back.position.set(0, y, -0.6);

  const left = createHorizontalBar(size, blackMaterial);
  left.rotation.y = Math.PI / 2;
  left.position.set(-0.6, y, 0);

  const right = createHorizontalBar(size, blackMaterial);
  right.rotation.y = Math.PI / 2;
  right.position.set(0.6, y, 0);

  sceen.add(front, back, left, right);
}

for (let y = 0.1; y <= 6; y += 1.9) {
  createRing(y);
}

// Create Ladder
const ladderX = -0.77;
const ladderZ = 0.33;

sceen.add(
  createLadderRail(ladderX, ladderZ - 0.3, blackMaterial),
  createLadderRail(ladderX, ladderZ + 0.3, blackMaterial)
);

for (let y = 1.5; y <= 5; y += 0.9) {
  sceen.add(createRung(ladderX, y, ladderZ, blackMaterial));
}

// White Material
const whiteMaterial = new THREE.MeshStandardMaterial({
  color: 0xe6e6e6,
  roughness: 0.65,
  metalness: 0.02,
});

// Create antenna
const antennaY = 5.4;

sceen.add(createAntenna(-0.81, antennaY, 0.75, whiteMaterial, 2.2)); // Front left
sceen.add(createAntenna(0.81, antennaY, 0.75, whiteMaterial, 0.8)); // Front right

sceen.add(createAntenna(-0.81, antennaY, -0.75, whiteMaterial, 0.8)); // back left
sceen.add(createAntenna(0.81, antennaY, -0.75, whiteMaterial, 2.2)); // back right

// Create Top Antena
const { topAntenna, redLight } = createTopAntenna(
  -0.6,
  6.5,
  0.6,
  blackMaterial
);
sceen.add(topAntenna, redLight);

// Create Dish antena
const { dish:rightDish, dishPole:rightDishPole } = createDishAntenna(
  1.18, // x
  5.8, // y
  0,  // z
  0, // rotate x 
  0, // rotate y
  Math.PI/2.3, // rotate z
  0.5, // size
  whiteMaterial,
  blackMaterial
);
sceen.add(rightDish, rightDishPole);
const { dish: leftDish, dishPole: leftDishPole } = createDishAntenna(
  -0.98,
  5.9,
  0,
  0,
  0,
  -Math.PI / 2.3,
  0.3,
  whiteMaterial,
  blackMaterial
);
sceen.add(leftDish, leftDishPole);

const { dish: backDish, dishPole: backDishPole } = createDishAntenna(
  0,
  5.9,
  -1.08,
  Math.PI/3,
  0,
  0,
  0.4,
  whiteMaterial,
  blackMaterial
);
sceen.add(backDish, backDishPole);

const { dish: frontDish, dishPole: frontDishPole} = createDishAntenna(
  0,
  5.7,
  1.074,
  -Math.PI/3,
  0,
  0,
  0.4,
  whiteMaterial,
  blackMaterial
);
sceen.add(frontDish, frontDishPole);

//Light
const ambienlight = new THREE.AmbientLight(0xffffff, 0.35);
sceen.add(ambienlight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 4);
sceen.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  1,
  "red"
);
sceen.add(directionalLightHelper);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.5;

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function action() {
  renderer.render(sceen, camera);
  controls.update();
  requestAnimationFrame(action);
}
action();
