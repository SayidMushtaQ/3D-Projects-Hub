import * as THREE from "three";
export function legGeoMetry(x, z, blackMaterial) {
  const legGeoMetry = new THREE.BoxGeometry(0.2,8, 0.2);

  const leg = new THREE.Mesh(legGeoMetry, blackMaterial);
  leg.position.set(x, 2, z);
  return leg;
}
