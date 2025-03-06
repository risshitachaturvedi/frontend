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

// // Importing the useGLTF hook from @react-three/drei to load .gltf models
// import { useGLTF } from "@react-three/drei";

// // Defining the Door component
// const Door = ({ position, rotation, scale }) => {
//   // Logging the props to understand what values are passed
//   console.log("Door component rendered with props:", {
//     position,
//     rotation,
//     scale,
//   });

//   // The path to the .gltf model you want to load
//   // In this case, we assume the model is stored in the public folder as "/door/scene.gltf"
//   const modelUrl = "/door/scene.gltf";
//   console.log("Loading model from URL:", modelUrl);

//   // Using the useGLTF hook to load the model.
//   // The useGLTF hook takes the model URL as an argument and returns an object with a scene property.
//   const { scene, error } = useGLTF(modelUrl);

//   // If there's an error while loading the model, log the error
//   if (error) {
//     console.error("Error loading model:", error);
//   }

//   // Log the scene object once it's successfully loaded
//   console.log("Model loaded successfully:", scene);

//   // Returning the 3D model as a primitive object.
//   // The `primitive` component from React Three Fiber allows us to work with non-React 3D objects, like the scene from a .gltf model.
//   return (
//     <primitive
//       object={scene} // Pass the loaded scene as the object to be rendered in the scene
//       position={position} // Set the position of the door in 3D space. This comes from props.
//       rotation={rotation} // Set the rotation of the door in 3D space. This comes from props.
//       scale={scale} // Set the scale of the door in 3D space. This comes from props.
//     />
//   );
// };

// // Exporting the Door component for use in other parts of the application
// export default Door;



import { useRef, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useFrame } from '@react-three/fiber';

const Door = ({ position, rotation, scale }) => {
  const meshRef = useRef(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('/door/scene.gltf', (gltf) => {
      meshRef.current = gltf.scene;
      meshRef.current.position.set(...position);
      meshRef.current.rotation.set(...rotation);
      meshRef.current.scale.set(...scale);
    }, undefined, (error) => {
      console.error('Error loading model:', error);
    });
  }, [position, rotation, scale]);

  useFrame(() => {
    if (meshRef.current) {
      // Optional: Update mesh properties here if needed
    }
  });

  return (
    <group ref={meshRef} />
  );
};

export default Door;
