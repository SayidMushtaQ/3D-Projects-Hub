import * as THREE from "three";
export function createLadderRail(x, z, legMaterial) {
  const geometry = new THREE.BoxGeometry(0.15, 6, 0.15);
  const rail = new THREE.Mesh(geometry, legMaterial);
  rail.position.set(x, 2, z);

  return rail;
}
