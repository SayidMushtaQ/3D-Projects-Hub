import * as THREE from "three";
export function createDish(whiteMaterial) {
  const geometry = new THREE.SphereGeometry(
    0.6,
    32,
    16,
    0,
    Math.PI * 2, // Default value
    0,
    Math.PI / 2
  );
  const halfSphare = new THREE.Mesh(geometry, whiteMaterial);
  return halfSphare
}
