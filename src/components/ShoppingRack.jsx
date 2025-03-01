import React from "react";
import { useGLTF } from "@react-three/drei";
import { Text } from "@react-three/drei";

const ShoppingRack = ({
  position = [0, 0, 0],
  rackNumber,
  rotation = [0, 0, 0],
}) => {
  const modelUrl = "walgreens_nail_rack_gltf/scene.gltf";
  const { scene } = useGLTF(modelUrl);

  const textRotation = [0, Math.PI, 0];

  return (
    <>
      <primitive
        object={scene.clone()}
        position={position}
        rotation={rotation}
      />
      {/* Display the rack number above the rack */}
      <Text
        position={[position[0], position[1] + 5, position[2]]} // Position text slightly above the rack
        fontSize={2}
        color="white"
        anchorX="center"
        anchorY="middle"
        rotation={textRotation}
      >
        {rackNumber}
      </Text>
    </>
  );
};

export default ShoppingRack;
