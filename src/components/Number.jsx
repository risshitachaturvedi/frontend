import React from "react";
import { Text } from "@react-three/drei"; // Use this to display text on the walls

const Number = ({ number, position }) => {
  return (
    <mesh position={position}>
      <Text
        fontSize={6}
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 0]}
      >
       
        {number}
      </Text>
    </mesh>
  );
};

export default Number;
