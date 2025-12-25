import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

// Sceen
const sceen = new THREE.Scene()
sceen.background = new THREE.Color('#e1e3e1')

// Camera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z = 3

// Canvas 
const canvas = document.getElementById('draw')

// Renderer 
const renderer = new THREE.WebGLRenderer({canvas,antialias:true})
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))


// cube
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({color:'white'})
const cube = new THREE.Mesh(geometry,material);

sceen.add(cube)


//Light 
const ambienlight = new THREE.AmbientLight(0xffffff,0.5)
sceen.add(ambienlight)

const directionalLight = new THREE.DirectionalLight(0xffffff,1)
directionalLight.position.set(5,5,4)
sceen.add(directionalLight)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,1,'red');
sceen.add(directionalLightHelper)

// OrbitControls
const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping = true;
controls.dampingFactor = 0.5


// Resize
window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth,window.innerHeight)
})

function action(){
    renderer.render(sceen,camera)
    controls.update()
    console.log('hi')
    requestAnimationFrame(action)
}
action()