import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import LilGuI from "lil-gui";

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
const GUI = new LilGuI({
  width: 400,
  title: "Singnal spire",
  // closeFolders: true,
});
sceen.background = new THREE.Color("#e1e3e1");
const topAntennaGUI = GUI.addFolder("Top Antenna");
const DishGUI = GUI.addFolder("Dish");
const params = {};

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
params.topAntennaPositionX = -0.6;
params.topAntennaPositionZ = 0.6;
const { topAntenna, redLight } = createTopAntenna(
  params.topAntennaPositionX,
  6.5,
  params.topAntennaPositionZ,
  blackMaterial
);
topAntennaGUI
  .add(params, "topAntennaPositionX")
  .onChange((val) => {
    topAntenna.position.x = val;
    redLight.position.x = val;
  })
  .min(-1)
  .max(1)
  .name("Position(x)");
topAntennaGUI
  .add(params, "topAntennaPositionZ")
  .onChange((val) => {
    topAntenna.position.z = val;
    redLight.position.z = val;
  })
  .min(-1)
  .max(1)
  .name("Position(z)");
sceen.add(topAntenna, redLight);

// Create Dish antena
const rightDishGUI = DishGUI.addFolder("Right Dish");

params.rightDishPostionx = 1.18;
params.rightDishRotationz = Math.PI / 2.3;
params.rightDishRotationz = Number(params.rightDishRotationz.toFixed(3));
params.rightDishSize = 0.5;
const { dish: rightDish, dishPole: rightDishPole } = createDishAntenna(
  params.rightDishPostionx, // x
  5.8, // y
  0, // z
  0, // rotate x
  0, // rotate y
  params.rightDishRotationz, // rotate z
  params.rightDishSize, // size
  whiteMaterial,
  blackMaterial
);
rightDishGUI
  .add(params, "rightDishPostionx")
  .onChange((val) => {
    rightDish.position.x = val;
    rightDishPole.position.x = val;
  })
  .min(params.rightDishPostionx)
  .max(3)
  .name("Position(x)");
rightDishGUI
  .add(params, "rightDishSize")
  .onChange((val) => {
    rightDish.scale.set(val, val, val);
    rightDishPole.scale.set(val, val, val);
  })
  .min(params.rightDishSize)
  .max(2)
  .name("Scale");
rightDishGUI
  .add(params, "rightDishRotationz")
  .onChange((val) => {
    rightDish.rotation.z = Math.PI / val;
    rightDishPole.rotation.z = Math.PI / val;
  })
  .min(params.rightDishRotationz)
  .max(5)
  .step(0.05)
  .name("Rotation(z)");
sceen.add(rightDish, rightDishPole);

const leftDishGUI = DishGUI.addFolder("Left Dish");
params.leftDishPostionx = -0.98;
params.leftDishRotationz = -Math.PI / 2.5;
params.leftDishRotationz = Number(params.leftDishRotationz.toFixed(3));
params.leftDishSize = 0.3;
const { dish: leftDish, dishPole: leftDishPole } = createDishAntenna(
  params.leftDishPostionx,
  5.9,
  0,
  0,
  0,
  params.leftDishRotationz,
  params.leftDishSize,
  whiteMaterial,
  blackMaterial
);
leftDishGUI
  .add(params, "leftDishPostionx")
  .onChange((val) => {
    leftDish.position.x = val;
    leftDishPole.position.x = val;
  })
  .min(-3)
  .max(params.leftDishPostionx)
  .name("Position(x)");

leftDishGUI
  .add(params, "leftDishSize")
  .onChange((val) => {
    leftDish.scale.set(val, val, val);
    leftDishPole.scale.set(val, val, val);
  })
  .min(params.leftDishSize)
  .max(2)
  .step(0.005)
  .name("Scale");

leftDishGUI
  .add(params, "leftDishRotationz")
  .onChange((val) => {
    leftDish.rotation.z = -Math.PI / val;
    leftDishPole.rotation.z = -Math.PI / val;
  })
  .min(-1)
  .max(2)
  .step(0.05)
  .name("Rotation(z)");
sceen.add(leftDish, leftDishPole);

const backDishGUI = DishGUI.addFolder("Back Dish");

params.backDishPostionz = -1.09;
params.backDishRotationx = Math.PI / 3;
params.backDishRotationx = Number(params.backDishRotationx.toFixed(3));
params.backDishSize = 0.4;
const { dish: backDish, dishPole: backDishPole } = createDishAntenna(
  0,
  5.9,
  params.backDishPostionz,
  params.backDishRotationx,
  0,
  0,
  params.backDishSize,
  whiteMaterial,
  blackMaterial
);
backDishGUI
  .add(params, "backDishPostionz")
  .onChange((val) => {
    backDish.position.z = val;
    backDishPole.position.z = val;
  })
  .min(-3)
  .max(params.backDishPostionz)
  .name("Position(z)");

backDishGUI
  .add(params, "backDishSize")
  .onChange((val) => {
    backDish.scale.set(val, val, val);
    backDishPole.scale.set(val, val, val);
  })
  .min(params.backDishSize)
  .max(2)
  .step(0.005)
  .name("Scale");

backDishGUI
  .add(params, "backDishRotationx")
  .onChange((val) => {
    backDish.rotation.x = Math.PI / val;
    backDishPole.rotation.x = Math.PI / val;
  })
  .min(params.backDishRotationx)
  .max(3)
  .step(0.05)
  .name("Rotation(x)");
sceen.add(backDish, backDishPole);

const frontDishGUI = DishGUI.addFolder("Front Dish");

params.frontDishPostionz = 1.074;
params.frontDishRotationx = -Math.PI / 3;
params.frontDishRotationx = Number(params.frontDishRotationx.toFixed(3));
params.frontDishSize = 0.4;

const { dish: frontDish, dishPole: frontDishPole } = createDishAntenna(
  0,
  5.7,
  params.frontDishPostionz,
  params.frontDishRotationx,
  0,
  0,
  params.frontDishSize,
  whiteMaterial,
  blackMaterial
);

frontDishGUI
  .add(params, "frontDishPostionz")
  .onChange((val) => {
    frontDish.position.z = val;
    frontDishPole.position.z = val;
  })
  .min(params.frontDishPostionz)
  .max(3)
  .name("Position(z)");

frontDishGUI
  .add(params, "frontDishSize")
  .onChange((val) => {
    frontDish.scale.set(val, val, val);
    frontDishPole.scale.set(val, val, val);
  })
  .min(params.frontDishSize)
  .max(2)
  .step(0.005)
  .name("Scale");

frontDishGUI
  .add(params, "frontDishRotationx")
  .onChange((val) => {
    frontDish.rotation.x = Math.PI / val;
    frontDishPole.rotation.x = Math.PI / val;
  })
  .min(params.frontDishRotationx)
  .max(-0.2)
  .step(0.005)
  .name("Rotation(x)");

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
