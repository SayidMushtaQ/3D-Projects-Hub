// Import the core Three.js library
import * as THREE from 'three';

// Import OrbitControls to allow mouse control (rotate, zoom, pan)
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// =====================
// SCENE
// =====================

// A Scene is like a container that holds all objects, lights, and cameras
const sceen = new THREE.Scene();


// =====================
// GEOMETRY + MATERIAL + MESH
// =====================

// Create a box shape (width, height, depth)
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// Create a basic material with red color
// MeshBasicMaterial does NOT react to light
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 'red' });

// Mesh = Geometry (shape) + Material (appearance)
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Add the cube to the scene
sceen.add(cube);


// =====================
// CAMERA
// =====================

// PerspectiveCamera simulates how human eyes see
// 75  → field of view
// aspect ratio → screen width / height
// 0.1 → near clipping plane
// 1000 → far clipping plane
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Move the camera backward so we can see the cube
camera.position.z = 5;

//====================
// Light 
//===================
const light = new THREE.DirectionalLight('white',3)
light.position.set(5,5,5)

sceen.add(light)

const ambientLight = new THREE.AmbientLight('white',0.5);
sceen.add(ambientLight)

// const lightHelper = new THREE.DirectionalLightHelper(light,1,'red')
// sceen.add(lightHelper)

// =====================
// RENDERER
// =====================

// Get the canvas element from HTML
const canvas = document.getElementById('box');

// WebGLRenderer draws the scene onto the canvas
// antialias makes edges smoother
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});

// Set background color of the canvas
renderer.setClearColor("#e6e3e3");

// Set renderer size to full screen
renderer.setSize(window.innerWidth, window.innerHeight);

// Render the scene once (initial render)
renderer.render(sceen, camera);


// =====================
// ORBIT CONTROLS
// =====================

// Allows mouse interaction (rotate, zoom)
const controls = new OrbitControls(camera, canvas);

// Automatically rotate the camera around the object
controls.autoRotate = true;

// Makes movement smooth (requires update() in animation loop)
controls.enableDamping = true;



//==============
// Evnet
// ============

const raycaster = new THREE.Raycaster()

document.addEventListener('mousedown',(evnet)=>{
  const coords = new THREE.Vector2(
    (evnet.clientX / renderer.domElement.clientWidth) * 2 - 1,
    -(evnet.clientY / renderer.domElement.clientHeight) * 2 + 1,
  )
  console.log(coords)
  raycaster.setFromCamera(coords,camera)

  const interaction = raycaster.intersectObjects(sceen.children,true)
  if(interaction.length > 0){
    const selectedObject = interaction[0].object;
    console.log(interaction)
    const colur = new THREE.Color(Math.random(),Math.random(),Math.random());
    selectedObject.material.color = colur;
  }
})

const clsButton = document.getElementById('click_me');
clsButton.addEventListener('click',()=>{
  const colur = new THREE.Color(Math.random(),Math.random(),Math.random());
  cube.material.color.set(colur)
})





// =====================
// HANDLE WINDOW RESIZE
// =====================

// Keeps the scene responsive when window size changes
window.addEventListener('resize', () => {
  // Update camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;

  // Update camera projection
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// =====================
// ANIMATION LOOP
// =====================

// This function runs again and again (60 times per second)
function action() {

  // Required for smooth OrbitControls movement
  controls.update();

  // Render the scene from the camera's point of view
  renderer.render(sceen, camera);

  // Ask the browser to call this function again
  window.requestAnimationFrame(action);
}

// Start the animation loop
action();
