// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:3000/"); // Update with your server URL

// const ImuDisplay = () => {
//   const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
//   const [rotationRate, setRotationRate] = useState({
//     alpha: 0,
//     beta: 0,
//     gamma: 0,
//   });

//   useEffect(() => {
//     const handleDeviceMotion = (event) => {
//       const { acceleration, rotationRate } = event;

//       // Send the data to the backend
//       socket.emit("imu-data", {
//         acceleration: {
//           x: acceleration.x,
//           y: acceleration.y,
//           z: acceleration.z,
//         },
//         rotationRate: {
//           alpha: rotationRate.alpha,
//           beta: rotationRate.beta,
//           gamma: rotationRate.gamma,
//         },
//       });

//       // Update state
//       setAcceleration({
//         x: acceleration.x,
//         y: acceleration.y,
//         z: acceleration.z,
//       });
//       setRotationRate({
//         alpha: rotationRate.alpha,
//         beta: rotationRate.beta,
//         gamma: rotationRate.gamma,
//       });
//     };

//     // Event listeners for device motion
//     window.addEventListener("devicemotion", handleDeviceMotion);

//     return () => {
//       window.removeEventListener("devicemotion", handleDeviceMotion);
//     };
//   }, []);

//   return null; // This component doesn't render anything visible
// };

// export default ImuDisplay;

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000/"); // Update with your server URL

const ImuDisplay = () => {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [rotationRate, setRotationRate] = useState({ alpha: 0, beta: 0, gamma: 0 });
  
  let lastTimestamp = null;

  useEffect(() => {
    const handleDeviceMotion = (event) => {
      const { acceleration, rotationRate, timeStamp } = event;
      
      if (!lastTimestamp) {
        lastTimestamp = timeStamp;
        return;
      }

      const deltaTime = (timeStamp - lastTimestamp) / 1000; // Convert to seconds
      lastTimestamp = timeStamp;

      // Update velocity (assuming no external forces apart from acceleration)
      setVelocity((prevVelocity) => ({
        x: prevVelocity.x + (acceleration.x || 0) * deltaTime,
        y: prevVelocity.y + (acceleration.y || 0) * deltaTime,
        z: prevVelocity.z + (acceleration.z || 0) * deltaTime,
      }));

      // Update position based on velocity
      setPosition((prevPosition) => ({
        x: prevPosition.x + velocity.x * deltaTime,
        y: prevPosition.y + velocity.y * deltaTime,
        z: prevPosition.z + velocity.z * deltaTime,
      }));

      setAcceleration({
        x: acceleration.x || 0,
        y: acceleration.y || 0,
        z: acceleration.z || 0,
      });
      setRotationRate({
        alpha: rotationRate.alpha || 0,
        beta: rotationRate.beta || 0,
        gamma: rotationRate.gamma || 0,
      });

      // Send processed data to the backend
      socket.emit("imu-data", {
        position,
        velocity,
        rotationRate,
      });
    };

    window.addEventListener("devicemotion", handleDeviceMotion);

    return () => {
      window.removeEventListener("devicemotion", handleDeviceMotion);
    };
  }, [velocity]);

  return null; // No UI needed
};

export default ImuDisplay;
