import * as THREE from "three";
export function createBrace(y, rotationY, rotationZ,blackMaterial) {
  const braceGeometry = new THREE.BoxGeometry(0.04, 1.9, 0.05);
  const brace = new THREE.Mesh(braceGeometry, blackMaterial);

  brace.position.y = y;

  brace.rotation.y = rotationY;
  brace.rotation.z = rotationZ;

  return brace;
}
