import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import Number from "./Number";

const Wall = ({ floorSize, rotation = [0, 0, 0], side }) => {
  const modelUrl = "stone_wall_download_gltf/scene.gltf";
  const { scene } = useGLTF(modelUrl);

  useEffect(() => {
    if (scene) {
      scene.scale.set(0.5, 0.5, 0.1); // Scale for wall model
    }
  }, [scene]);

  const wallHeight = 1; // Height of the wall
  const wallWidth = 180; // Width of the wall
  const wallThickness = 0.1; // Thickness of the wall

  let position = [0, wallHeight / 2, 0];
  let numberPosition = [0, 1.5, 0]; // Default position for number
  let wallNumber = 1;

  switch (side) {
    case "top":
      position = [0, wallHeight / 2, -floorSize[1] / 2 + wallWidth / 1.83];
      numberPosition = [0, wallHeight + 4, -floorSize[1] / 2 + wallWidth / 3]; // Adjusted Y
      wallNumber = 1;
      break;

    case "bottom":
      position = [0, wallHeight / 2, floorSize[1] / 2 - wallWidth / 1.83];
      numberPosition = [0, wallHeight + 4, floorSize[1] / 2 - wallWidth / 3]; // Adjusted Y
      wallNumber = 2;
      break;

    case "left":
      position = [-floorSize[0] / 2 + wallWidth / 1.97, wallHeight / 2, 0];
      rotation = [0, Math.PI / 2, 0]; // Rotate the wall
      numberPosition = [
        -floorSize[0] / 2 + wallWidth / 4, // Adjust X for left wall
        wallHeight + 6, // Adjust Y to make the number appear centered and not too high
        0, // Keep Z same as the center
      ];
      wallNumber = 3;
      break;

    case "right":
      position = [floorSize[0] / 2 - wallWidth / 1.97, wallHeight / 2, 0];
      rotation = [0, -Math.PI / 2, 0]; // Rotate the wall
      numberPosition = [
        floorSize[0] / 2 - wallWidth / 4, // Adjust X for right wall
        wallHeight + 6, // Adjust Y to center it better on the wall
        0, // Keep Z same as the center
      ];
      wallNumber = 4;
      break;

    default:
      console.error("Invalid side:", side);
      return null;
  }

  return (
    <mesh position={position} rotation={rotation}>
      <primitive
        object={scene.clone()}
        scale={[wallWidth, wallHeight, wallThickness]}
      />
      <Number number={wallNumber} position={numberPosition} />
      
    </mesh>
  );
};

export default Wall;
