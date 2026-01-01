import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { legGeoMetry } from "./lib/createLegs.js";
import { createBrace } from "./lib/createBrace.js";
import { createHorizontalBar } from "./lib/createHorizontalBar.js";
// Sceen
const sceen = new THREE.Scene();
sceen.background = new THREE.Color("#e1e3e1");

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
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

const legMaterial = new THREE.MeshStandardMaterial({
  color: 0x9ca3af,
  roughness: 0.4,
  metalness: 0.8,
});
const offset = 0.6;

sceen.add(
  legGeoMetry(offset, offset, legMaterial),
  legGeoMetry(offset, -offset, legMaterial),
  legGeoMetry(-offset, offset, legMaterial),
  legGeoMetry(-offset, -offset, legMaterial)
);
// Brace geometry

for (let y = -0.8; y < 6; y++) {
  //Back brace
  const bacekBrace1 = createBrace(y, 0, Math.PI / 4, legMaterial);
  bacekBrace1.position.x = 0;
  bacekBrace1.position.z = -0.6;

  const backBrace2 = createBrace(y, 0, -Math.PI / 4, legMaterial);
  backBrace2.position.x = 0;
  backBrace2.position.z = -0.6;

  sceen.add(bacekBrace1, backBrace2);

  //Front brace
  const frontBrace1 = createBrace(y, 0, Math.PI / 4, legMaterial);
  frontBrace1.position.x = 0;
  frontBrace1.position.z = 0.6;

  const frontBrace2 = createBrace(y, 0, -Math.PI / 4, legMaterial);
  frontBrace2.position.x = 0;
  frontBrace2.position.z = 0.6;

  sceen.add(frontBrace1, frontBrace2);

  //Left brace
  const leftBrace1 = createBrace(y, 0, Math.PI / 4, legMaterial);
  leftBrace1.position.x = -0.6;
  leftBrace1.position.z = 0;
  leftBrace1.rotation.y = 1.6;

  const leftBrace2 = createBrace(y, 0, -Math.PI / 4, legMaterial);
  leftBrace2.position.x = -0.6;
  leftBrace2.position.z = 0;
  leftBrace2.rotation.y = 1.6;

  sceen.add(leftBrace1, leftBrace2);

  // Right brace
  const rightBrace1 = createBrace(y, 0, Math.PI / 4, legMaterial);
  rightBrace1.position.x = 0.6;
  rightBrace1.position.z = 0;
  rightBrace1.rotation.y = 1.6;

  const rightBrace2 = createBrace(y, 0, -Math.PI / 4, legMaterial);
  rightBrace2.position.x = 0.6;
  rightBrace2.position.z = 0;
  rightBrace2.rotation.y = 1.6;

  sceen.add(rightBrace1, rightBrace2);
}

// Horizontal Bar
function createRing(y) {
  const size = 1;
  const front = createHorizontalBar(size, legMaterial);
  front.position.set(0, y, 0.6);

  const back = createHorizontalBar(size, legMaterial);
  back.position.set(0, y, -0.6);

  const left = createHorizontalBar(size, legMaterial);
  left.rotation.y = Math.PI / 2;
  left.position.set(-0.6, y, 0);

  const right = createHorizontalBar(size, legMaterial);
  right.rotation.y = Math.PI / 2;
  right.position.set(0.6, y, 0);

  sceen.add(front, back, left, right);
}

for (let y = 0.1; y <= 6; y += 1.9) {
  createRing(y);
}

//Light
const ambienlight = new THREE.AmbientLight(0xffffff, 0.5);
sceen.add(ambienlight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
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
