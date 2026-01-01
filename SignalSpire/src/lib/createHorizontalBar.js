import * as THREE from 'three'
export function createHorizontalBar(length,legMaterial){
    const barGeometry = new THREE.BoxGeometry(length,0.15,0.15)
    return new THREE.Mesh(barGeometry,legMaterial)
}