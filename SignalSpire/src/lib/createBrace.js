import * as THREE from "three";
export function createBrace(y, rotationY, rotationZ,legMaterial) {
  const braceGeometry = new THREE.BoxGeometry(0.11, 2, 0.15);
  const brace = new THREE.Mesh(braceGeometry, legMaterial);

  brace.position.y = y;

  brace.rotation.y = rotationY;
  brace.rotation.z = rotationZ;

  return brace;
}
