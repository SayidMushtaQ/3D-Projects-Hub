import * as THREE from "three";
export function legGeoMetry(x, z, legMaterial) {
  const legGeoMetry = new THREE.BoxGeometry(0.2,8, 0.2);

  const leg = new THREE.Mesh(legGeoMetry, legMaterial);
  leg.position.set(x, 2, z);
  return leg;
}
