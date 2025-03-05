//

// import React, { useEffect, useRef, useState } from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";
// import { Vector3 } from "three";

// const Avatar = ({ sensorData }) => {
//   const modelUrl = "stylized_epic_bull_man_warrior_animated/scene.gltf"; // Hardcoded model URL
//   const { scene, animations } = useGLTF(modelUrl); // Load the model using the hardcoded URL
//   const { actions } = useAnimations(animations, scene); // Hook to handle animations

//   const avatarRef = useRef(); // Reference to the avatar model
//   const [velocity, setVelocity] = useState(new Vector3(0, 0, 0)); // To track movement velocity
//   const [isMoving, setIsMoving] = useState(false); // To check if the model is moving
//   const [facingDirection, setFacingDirection] = useState("front"); // To track the direction the avatar is facing

//   const speed = 0.1; // Movement speed

//   useEffect(() => {
//     if (sensorData && sensorData.accelerometer) {
//       // Assuming accelerometer data is passed through sensorData prop
//       const acceleration = sensorData.accelerometer;
//       const newVelocity = new Vector3(
//         acceleration.x * speed,
//         acceleration.y * speed,
//         -acceleration.z * speed
//       ); // Update velocity based on sensor data

//       setVelocity(newVelocity); // Set velocity based on sensor input
//       setIsMoving(true); // The avatar is moving
//     }
//   }, [sensorData]);

//   useEffect(() => {
//     // Update position and handle animations
//     if (avatarRef.current) {
//       avatarRef.current.position.add(velocity); // Update position based on velocity
//     }

//     if (isMoving && actions["4338274725888_TempMotion"]) {
//       actions["4338274725888_TempMotion"].play(); // Play walking animation
//     } else if (actions["4338274725888_TempMotion"]) {
//       actions["4338274725888_TempMotion"].stop(); // Stop walking animation
//     }

//     // Update avatar's facing direction based on velocity
//     if (avatarRef.current) {
//       if (velocity.x > 0) setFacingDirection("right");
//       else if (velocity.x < 0) setFacingDirection("left");
//       else if (velocity.z > 0) setFacingDirection("back");
//       else if (velocity.z < 0) setFacingDirection("front");

//       switch (facingDirection) {
//         case "front":
//           avatarRef.current.rotation.y = Math.PI; // Face forward
//           break;
//         case "back":
//           avatarRef.current.rotation.y = 0; // Face backward
//           break;
//         case "left":
//           avatarRef.current.rotation.y = -Math.PI / 2; // Face left
//           break;
//         case "right":
//           avatarRef.current.rotation.y = Math.PI / 2; // Face right
//           break;
//         default:
//           break;
//       }
//     }
//   }, [velocity, isMoving, actions, facingDirection]);

//   return <primitive object={scene} ref={avatarRef} />;
// };

// export default Avatar;

//Avatar codee working
// // Avatar.js (Frontend component)
// import React, { useEffect, useRef, useState } from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";
// import { Vector3 } from "three";
// import io from "socket.io-client"; // Import socket.io-client

// const socket = io("http://localhost:3000"); // Connect to the backend server

// const Avatar = () => {
//   const modelUrl = "stylized_epic_bull_man_warrior_animated/scene.gltf"; // Hardcoded model URL
//   const { scene, animations } = useGLTF(modelUrl); // Load the model using the hardcoded URL
//   const { actions } = useAnimations(animations, scene); // Hook to handle animations

//   const avatarRef = useRef(); // Reference to the avatar model
//   const [velocity, setVelocity] = useState(new Vector3(0, 0, 0)); // To track movement velocity
//   const [isMoving, setIsMoving] = useState(false); // To check if the model is moving
//   const [facingDirection, setFacingDirection] = useState("front"); // To track the direction the avatar is facing

//   // Movement speed
//   const speed = 0.1;

//   // Listen for IMU data from the server (backend)
//   useEffect(() => {
//     socket.on("imuData", (data) => {
//       console.log("Received IMU data:", data);

//       // Assuming data contains position and rotation (from your backend logic)
//       const { position, rotation } = data;

//       // Update avatar's position and rotation based on the IMU data
//       if (avatarRef.current) {
//         // Update position from the backend (sensor data)
//         avatarRef.current.position.set(position.x, position.y, position.z);

//         // Update rotation from the backend (sensor data)
//         avatarRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
//       }
//     });

//     // Cleanup when the component unmounts
//     return () => {
//       socket.off("imuData");
//     };
//   }, []);

//   // Listen for key presses to move the avatar
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       let newVelocity = velocity.clone();

//       switch (event.key) {
//         case "w":
//           newVelocity.z = -speed; // Move forward
//           setFacingDirection("front");
//           break;
//         case "s":
//           newVelocity.z = speed; // Move backward
//           setFacingDirection("back");
//           break;
//         case "a":
//           newVelocity.x = -speed; // Move left
//           setFacingDirection("left");
//           break;
//         case "d":
//           newVelocity.x = speed; // Move right
//           setFacingDirection("right");
//           break;
//         default:
//           break;
//       }

//       // If any key is pressed, the avatar is moving
//       setIsMoving(true);
//       setVelocity(newVelocity);

//       // Emit the movement data to the backend (Socket.io)
//       socket.emit("avatarMovement", {
//         position: avatarRef.current.position,
//         velocity: newVelocity,
//       });
//     };

//     const handleKeyUp = (event) => {
//       // Stop movement when the key is released
//       if (["w", "a", "s", "d"].includes(event.key)) {
//         setIsMoving(false);
//         setVelocity(new Vector3(0, 0, 0)); // Reset velocity to stop movement
//       }
//     };

//     // Add event listeners for keydown and keyup events
//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);

//     // Cleanup the event listeners
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//     };
//   }, [velocity]);

//   // Update position based on velocity, control animation state, and rotation
//   useEffect(() => {
//     if (avatarRef.current) {
//       avatarRef.current.position.add(velocity);
//     }

//     // Control the walking animation based on whether the avatar is moving
//     if (isMoving) {
//       if (actions["4338274725888_TempMotion"]) {
//         actions["4338274725888_TempMotion"].play(); // Play walking animation
//       }
//     } else {
//       if (actions["4338274725888_TempMotion"]) {
//         actions["4338274725888_TempMotion"].stop(); // Stop walking animation if idle
//       }
//     }

//     // Adjust avatar rotation based on movement direction
//     if (avatarRef.current) {
//       switch (facingDirection) {
//         case "front":
//           avatarRef.current.rotation.y = Math.PI; // Face forward
//           break;
//         case "back":
//           avatarRef.current.rotation.y = 0; // Face backward (180 degrees)
//           break;
//         case "left":
//           avatarRef.current.rotation.y = -Math.PI / 2; // Face left (90 degrees)
//           break;
//         case "right":
//           avatarRef.current.rotation.y = Math.PI / 2; // Face right (-90 degrees)
//           break;
//         default:
//           break;
//       }
//     }
//   }, [velocity, isMoving, actions, facingDirection]);

//   // // Listen for position updates from the server
//   // useEffect(() => {
//   //   socket.on("avatarPositionUpdate", (data) => {
//   //     if (avatarRef.current) {
//   //       avatarRef.current.position.set(
//   //         data.position.x,
//   //         data.position.y,
//   //         data.position.z
//   //       );
//   //     }
//   //   });

//   //   return () => {
//   //     socket.off("avatarPositionUpdate");
//   //   };
//   // }, []);

//   return <primitive object={scene} ref={avatarRef} />;
// };

// export default Avatar;

//.....................................................................

// import React, { useEffect, useRef, useState } from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";
// import { Vector3 } from "three";

// const Avatar = () => {
//   const modelUrl = "stylized_epic_bull_man_warrior_animated/scene.gltf"; // Hardcoded model URL
//   const { scene, animations } = useGLTF(modelUrl); // Load the model using the hardcoded URL
//   const { actions } = useAnimations(animations, scene); // Hook to handle animations

//   const avatarRef = useRef(); // Reference to the avatar model
//   const [velocity, setVelocity] = useState(new Vector3(0, 0, 0)); // To track movement velocity
//   const [isMoving, setIsMoving] = useState(false); // To check if the model is moving
//   const [facingDirection, setFacingDirection] = useState("front"); // To track the direction the avatar is facing

//   // Movement speed
//   const speed = 0.1;

//   // Listen for key presses to move the avatar
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       let newVelocity = velocity.clone();

//       switch (event.key) {
//         case "w":
//           newVelocity.z = -speed; // Move forward
//           setFacingDirection("front");
//           break;
//         case "s":
//           newVelocity.z = speed; // Move backward
//           setFacingDirection("back");
//           break;
//         case "a":
//           newVelocity.x = -speed; // Move left
//           setFacingDirection("left");
//           break;
//         case "d":
//           newVelocity.x = speed; // Move right
//           setFacingDirection("right");
//           break;
//         default:
//           break;
//       }

//       // If any key is pressed, the avatar is moving
//       setIsMoving(true);
//       setVelocity(newVelocity);
//     };

//     const handleKeyUp = (event) => {
//       // Stop movement when the key is released
//       if (["w", "a", "s", "d"].includes(event.key)) {
//         setIsMoving(false);
//         setVelocity(new Vector3(0, 0, 0)); // Reset velocity to stop movement
//       }
//     };

//     // Add event listeners for keydown and keyup events
//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);

//     // Cleanup the event listeners
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//     };
//   }, [velocity]);

//   // Update position based on velocity, control animation state, and rotation
//   useEffect(() => {
//     if (avatarRef.current) {
//       avatarRef.current.position.add(velocity);
//     }

//     // Control the walking animation based on whether the avatar is moving
//     if (isMoving) {
//       if (actions["4338274725888_TempMotion"]) {
//         actions["4338274725888_TempMotion"].play(); // Play walking animation
//       }
//     } else {
//       if (actions["4338274725888_TempMotion"]) {
//         actions["4338274725888_TempMotion"].stop(); // Stop walking animation if idle
//       }
//     }

//     // Adjust avatar rotation based on movement direction
//     if (avatarRef.current) {
//       switch (facingDirection) {
//         case "front":
//           avatarRef.current.rotation.y = Math.PI ; // Face forward
//           break;
//         case "back":
//           avatarRef.current.rotation.y =0; // Face backward (180 degrees)
//           break;
//         case "left":
//           avatarRef.current.rotation.y = -Math.PI / 2; // Face left (90 degrees)
//           break;
//         case "right":
//           avatarRef.current.rotation.y = Math.PI / 2; // Face right (-90 degrees)
//           break;
//         default:
//           break;
//       }
//     }
//   }, [velocity, isMoving, actions, facingDirection]);

//   return <primitive object={scene} ref={avatarRef} />;
// };

// export default Avatar;

// import { useEffect } from "react";
// import React from "react";
// import { useGLTF } from "@react-three/drei";

// const Avatar = () => {
//   const modelUrl = "stylized_epic_bull_man_warrior_animated/scene.gltf"; // Hardcoded model URL
//   const { scene } = useGLTF(modelUrl); // Load the model using the hardcoded URL

//   // Use useEffect to modify the scale after the model is loaded
//   // useEffect(() => {
//   //   if (scene) {
//   //     // Decrease the height by scaling down the y-axis
//   //     scene.scale.set(0.01, 0.01, 0.01);
//   //   }
//   // }, [scene]);

//   return <primitive object={scene} />;
// };

// export default Avatar;

// Skating Animation wala code
// import { useEffect, useRef } from "react";
// import React from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";

// const Avatar = () => {
//   const modelUrl = "stylized_epic_bull_man_warrior_animated/scene.gltf"; // Hardcoded model URL
//   const { scene, animations } = useGLTF(modelUrl); // Load the model using the hardcoded URL
//   const { actions } = useAnimations(animations, scene); // Get animations from the model
//   const avatarRef = useRef();

//   useEffect(() => {
//     if (scene) {
//       // Avatar size has been decreased
//       scene.scale.set(0.01, 0.01, 0.01);

//       // Ensure the "walk" animation is playing and looped
//       if (actions && actions["walk"]) {
//         actions["walk"].play().setLoop(true); // Loop the walk animation
//       }
//     }
//   }, [scene, actions]);

//   // Set up movement logic: Move the avatar while animating its legs
//   useFrame(() => {
//     if (avatarRef.current) {
//       // Apply movement to the parent node instead of directly moving the whole avatar
//       avatarRef.current.position.z += 0.02; // Adjust for walking speed

//       // Ensure the animation is running smoothly at the proper speed
//       if (actions && actions["walk"]) {
//         actions["walk"].timeScale = 1; // Ensure normal animation playback speed
//       }
//     }
//   });

//   return <primitive object={scene} ref={avatarRef} />;
// };

// export default Avatar;

// import React, { useEffect } from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";

// const Avatar = () => {
//   const modelUrl = "stylized_epic_bull_man_warrior_animated/scene.gltf"; // Hardcoded model URL
//   const { scene, animations } = useGLTF(modelUrl); // Load the model using the hardcoded URL

//   const { actions } = useAnimations(animations, scene); // Hook to handle animations

//   useEffect(() => {
//     // Log all animation names present in the model (optional, can be removed if not needed)
//     animations.forEach((animation, index) => {
//       console.log(`Animation ${index + 1}: ${animation.name}`);
//     });

//     // Play the walking animation with the correct name
//     if (actions["4338274725888_TempMotion"]) {
//       actions["4338274725888_TempMotion"].play();
//     } else {
//       console.log(
//         "Walking animation not found under the name '4338274725888_TempMotion'."
//       );
//     }

//     // Clean up animations when the component unmounts
//     return () => {
//       actions["4338274725888_TempMotion"]?.stop();
//     };
//   }, [animations, actions]);

//   return <primitive object={scene} />;
// };

// export default Avatar;

//after adding velocity and position
// import React from "react";
// import { useFrame } from "@react-three/fiber";

// const Avatar = ({ position, velocity }) => {
//   useFrame(() => {
//     // Use position and velocity to update the avatar's position in real time
//     // Assuming `ref` is your avatar's 3D object in the scene
//     if (ref.current) {
//       ref.current.position.set(position.x, position.y, position.z);
//     }
//   });

//   return (
//     <mesh ref={ref} position={[position.x, position.y, position.z]}>
//       <sphereGeometry args={[1]} />
//       <meshStandardMaterial color="blue" />
//     </mesh>
//   );
// };

// export default Avatar;

//after adding velocity and position

// import React, { useRef, useEffect } from "react";
// import { useFrame } from "@react-three/fiber";

// const Avatar = ({ position, velocity }) => {
//   const ref = useRef(); // Create a ref for the avatar mesh

//   useFrame(() => {
//     // Update the avatar's position in real-time based on position prop
//     if (ref.current) {
//       ref.current.position.set(position.x, position.y, position.z);
//     }
//   });

//   useEffect(() => {
//     // Initial position is set once the component mounts
//     if (ref.current) {
//       ref.current.position.set(position.x, position.y, position.z);
//     }
//   }, [position]); // Re-run if position changes

//   return (
//     <mesh ref={ref} position={[position.x, position.y, position.z]}>
//       <sphereGeometry args={[1]} />
//       <meshStandardMaterial color="blue" />
//     </mesh>
//   );
// };

// export default Avatar;

//after adding velocity and position, proper code
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

const Avatar = ({ sensorData }) => {
  const modelUrl = "stylized_epic_bull_man_warrior_animated/scene.gltf"; // Hardcoded model URL
  const { scene, animations } = useGLTF(modelUrl); // Load the model using the hardcoded URL
  // const { actions } = useAnimations(animations, scene); // Hook to handle animations

  const avatarRef = useRef(); // Reference to the avatar model
  const [velocity, setVelocity] = useState(new Vector3(0, 0, 0)); // To track movement velocity
  const [position, setPosition] = useState(new Vector3(0, 0, 0)); // To track position
  const [isMoving, setIsMoving] = useState(false); // To check if the model is moving
  const [facingDirection, setFacingDirection] = useState("front"); // To track the direction the avatar is facing

  const speed = 0.1; // Movement speed

  // Update velocity from accelerometer data
  // useEffect(() => {
  //   if (sensorData && sensorData.accelerometer) {
  //     const acceleration = sensorData.accelerometer;
  //     const newVelocity = new Vector3(
  //       acceleration.x * speed,
  //       acceleration.y * speed,
  //       -acceleration.z * speed
  //     ); // Update velocity based on sensor data

  //     setVelocity(newVelocity); // Set velocity based on sensor input
  //     setIsMoving(true); // The avatar is moving
  //   }
  // }, [sensorData]);

  // Update position based on velocity
  // useFrame(() => {
  //   setPosition((prevPosition) => prevPosition.add(velocity)); // Update position by adding velocity each frame
  // });

  // useEffect(() => {
  //   // Handle animations based on movement
  //   if (isMoving && actions["4338274725888_TempMotion"]) {
  //     actions["4338274725888_TempMotion"].play(); // Play walking animation
  //   } else if (actions["4338274725888_TempMotion"]) {
  //     actions["4338274725888_TempMotion"].stop(); // Stop walking animation
  //   }

  //   // Update avatar's facing direction based on velocity
  //   if (velocity.x > 0) setFacingDirection("right");
  //   else if (velocity.x < 0) setFacingDirection("left");
  //   else if (velocity.z > 0) setFacingDirection("back");
  //   else if (velocity.z < 0) setFacingDirection("front");

  //   // Update rotation based on facing direction
  //   if (avatarRef.current) {
  //     switch (facingDirection) {
  //       case "front":
  //         avatarRef.current.rotation.y = Math.PI; // Face forward
  //         break;
  //       case "back":
  //         avatarRef.current.rotation.y = 0; // Face backward
  //         break;
  //       case "left":
  //         avatarRef.current.rotation.y = -Math.PI / 2; // Face left
  //         break;
  //       case "right":
  //         avatarRef.current.rotation.y = Math.PI / 2; // Face right
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }, [velocity, isMoving, actions, facingDirection]);

  return (
    <>
      <primitive
        object={scene}
        ref={avatarRef}
        position={[position.x, position.y, position.z]}
      />
    </>
  );
};

export default Avatar;
