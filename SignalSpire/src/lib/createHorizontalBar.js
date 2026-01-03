import * as THREE from 'three'
export function createHorizontalBar(length,blackMaterial){
    const barGeometry = new THREE.BoxGeometry(length,0.15,0.15)
    return new THREE.Mesh(barGeometry,blackMaterial)
}