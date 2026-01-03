import * as THREE from "three";
export function createAntenna(x,y,z,whiteMaterial,rotationY = 0) {
  const geometry = new THREE.BoxGeometry(0.4, 1.3, 0.25);
  const antenna = new THREE.Mesh(geometry, whiteMaterial);

  antenna.position.set(x,y,z);
  antenna.rotation.y = rotationY;

  return antenna;
}
