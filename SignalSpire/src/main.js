import * as THREE from 'three'

const sceen = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)

const canvas = document.getElementById('draw')

const renderer = new THREE.WebGLRenderer({canvas,antialias:true})
renderer.setSize(window.innerWidth,window.innerHeight)


const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({color:'orange'})
const cube = new THREE.Mesh(geometry,material);

sceen.add(cube)


function action(){
    renderer.render(sceen,camera)
    requestAnimationFrame(action)
}
action()