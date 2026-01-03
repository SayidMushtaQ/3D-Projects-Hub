import * as THREE from "three";
export function createTopAntenna(x, y, z, blackMaterial) {
  const geometry = new THREE.CylinderGeometry(0.04, 0.04, 1, 32);
  const topAntenna = new THREE.Mesh(geometry, blackMaterial);

  const geometry2 = new THREE.SphereGeometry(0.07);
  const redMaterial = new THREE.MeshStandardMaterial({
    color: "red",
    roughness: 0.65,
    metalness: 0.02,
  });

  const redLight = new THREE.Mesh(geometry2, redMaterial);

  redLight.position.set(x, y + 0.5, z);
  topAntenna.position.set(x, y, z);

  return { topAntenna, redLight };
}
