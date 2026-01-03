import * as THREE from "three";
export function createRung(x, y, z, legMaterial) {
  const geometry = new THREE.BoxGeometry(0.6, 0.1, 0.1);
  const rung = new THREE.Mesh(geometry, legMaterial);
  rung.position.set(x, y, z);
  rung.rotation.y = Math.PI / 2;
  return rung;
}
