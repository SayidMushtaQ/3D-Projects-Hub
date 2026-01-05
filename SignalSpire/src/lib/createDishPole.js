import * as THREE from 'three'

export function createDishPole(blackMaterial){
    const geometry = new THREE.CylinderGeometry(0.05,0.05,1)
    const pole = new THREE.Mesh(geometry,blackMaterial)

    return pole;
}