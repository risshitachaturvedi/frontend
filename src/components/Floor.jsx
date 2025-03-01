import React from "react";
import { Plane } from "@react-three/drei";

const Floor = () => {
  return (
    <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]}>//for horizontal plane of the floor
      <meshStandardMaterial attach="material" color="yellow" />
    </Plane>
  );
};

export default Floor;
