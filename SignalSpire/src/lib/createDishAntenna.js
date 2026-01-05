import * as THREE from "three";
function createDish(size,whiteMaterial) {
  const geometry = new THREE.SphereGeometry(
    size,
    32,
    16,
    0,
    Math.PI * 2, // Default value
    0,
    Math.PI / 2
  );
  const halfSphare = new THREE.Mesh(geometry, whiteMaterial);
  whiteMaterial.side = THREE.DoubleSide;
  return halfSphare;
}

function createDishPole(size,blackMaterial) {
  const geometry = new THREE.CylinderGeometry(0.03, 0.03, size - 0.07);
  const pole = new THREE.Mesh(geometry, blackMaterial);

  return pole;
}

export function createDishAntenna(
  x,
  y,
  z,
  rotationX,
  rotationY,
  rotationZ,
  size,
  whiteMaterial,
  blackMaterial
) {
  const dish = createDish(size,whiteMaterial);
  dish.rotation.x = rotationX;
  dish.rotation.z = rotationZ;
  dish.rotation.y = rotationY;
  dish.position.set(x, y, z);

  const dishPole = createDishPole(size,blackMaterial);
  dishPole.rotation.x = rotationX;
  dishPole.rotation.z = rotationZ;
  dishPole.rotation.y = rotationY;
  dishPole.position.set(x, y, z);

  return { dish, dishPole };
}
