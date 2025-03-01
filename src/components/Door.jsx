// import { useGLTF } from "@react-three/drei";

// const Door = ({ position = [-40, 2.5, -47] }) => {
//   const modelUrl = "door/scene.gltf";
//   const { scene } = useGLTF(modelUrl); // Load the model // Position near the top wall

//   // Hardcoded position, rotation, and scale values
//   const rotation = [0, 8, 0]; // Rotation applied on the door
//   const scale = [0.02, 0.02, 0.02];

//   return (
//     <primitive
//       object={scene}
//       position={position}
//       scale={scale}
//       rotation={rotation}
//     />
//   );
// };

// export default Door;
//Heloooooooooooooooooooooooooooooooooooooooooooooooooo jiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii

import { useGLTF } from "@react-three/drei";

const Door = ({ position, rotation, scale }) => {
  const modelUrl = "door/scene.gltf";
  const { scene } = useGLTF(modelUrl); // Load the model

  return (
    <primitive
      object={scene}
      position={position} // Using the position prop passed from App.jsx
      rotation={rotation} // Using the rotation prop passed from App.jsx
      scale={scale} // Using the scale prop passed from App.jsx
    />
  );
};

export default Door;
