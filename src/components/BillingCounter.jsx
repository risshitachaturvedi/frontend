import React from "react";
import { useGLTF } from "@react-three/drei";
import { Text } from "@react-three/drei";

const BillingCounter = ({ position = [0, 0, 0], counterNumber = 1 }) => {
  const modelUrl = "counter_gltf/scene.gltf";
  const { scene } = useGLTF(modelUrl);

  const rotation = [0, 11, 0];
  const scale = [0.001, 0.001, 0.001];

  return (
    <>
      {" "}
      <primitive
        object={scene.clone()}
        position={position}
        rotation={rotation}
        scale={scale}
      />
      {/* Display the counter number above the counter */}
      <Text
        position={[position[0]+ 1 , position[1] + 5, position[2] + 2]} // Position above the counter
        fontSize={2} // Font size for the number
        color="white" // Color of the text
        anchorX="center" // Align text horizontally at the center
        anchorY="middle" // Align text vertically in the middle
      >
        {counterNumber}
      </Text>
    </>
  );
};
export default BillingCounter;
