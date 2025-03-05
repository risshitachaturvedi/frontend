// // //After adding kalman filter, velocity and position to code
// import React, { useState, useEffect } from "react";
// import Avatar from "./Avatar";

// // Kalman filter implementation for one-dimensional data
// class KalmanFilter {
//   constructor(Q = 0.0001, R = 0.01) {
//     this.Q = Q; // Process noise covariance
//     this.R = R; // Measurement noise covariance
//     this.P = 1; // Estimation error covariance
//     this.X = 0; // Estimated value
//     this.K = 0; // Kalman gain
//   }

//   update(measurement) {
//     // Prediction step
//     this.P = this.P + this.Q;

//     // Kalman Gain step
//     this.K = this.P / (this.P + this.R);

//     // Update estimate with measurement
//     this.X = this.X + this.K * (measurement - this.X);

//     // Update estimation error covariance
//     this.P = (1 - this.K) * this.P;

//     return this.X;
//   }
// }

// const SensorPermission = ({ onPermissionGranted }) => {
//   const [isPermissionGranted, setIsPermissionGranted] = useState(false);
//   const [sensorData, setSensorData] = useState({
//     accelerometer: { x: 0, y: 0, z: 0 },
//     gyroscope: { alpha: 0, beta: 0, gamma: 0 },
//   });

//   // Velocity and position states
//   const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
//   const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

//   // Kalman filters for acceleration data
//   const kalmanX = new KalmanFilter();
//   const kalmanY = new KalmanFilter();
//   const kalmanZ = new KalmanFilter();

//   let lastTime = Date.now(); // To calculate delta time

//   // Function to request permission
//   // const requestPermission = async () => {
//   //   if (typeof DeviceMotionEvent.requestPermission === "function") {
//   //     try {
//   //       const permission = await DeviceMotionEvent.requestPermission();
//   //       if (permission === "granted") {
//   //         setIsPermissionGranted(true);
//   //         startSensorListeners();
//   //       } else {
//   //         alert("Permission denied. Cannot access sensors.");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error requesting permission:", error);
//   //     }
//   //   } else {
//   //     setIsPermissionGranted(true);
//   //     startSensorListeners();
//   //     onPermissionGranted(); // Notify App.jsx that permission is granted
//   //   }
//   // };
//   const requestPermission = async () => {
//     // Check if the 'requestPermission' function is available on DeviceMotionEvent
//     if (typeof DeviceMotionEvent.requestPermission === "function") {
//       try {
//         // Request permission from the user
//         const permission = await DeviceMotionEvent.requestPermission();

//         // If permission granted, set the state and start sensor listeners
//         if (permission === "granted") {
//           setIsPermissionGranted(true);
//           startSensorListeners();
//         } else {
//           alert("Permission denied. Cannot access sensors.");
//         }
//       } catch (error) {
//         // Log any errors that occur during the permission request
//         console.error("Error requesting permission:", error);
//       }
//     } else {
//       // If 'requestPermission' is not available, grant permission automatically
//       setIsPermissionGranted(true);
//       startSensorListeners();
//       onPermissionGranted(); // Notify App.jsx that permission is granted
//     }
//   };

//   const startSensorListeners = () => {
//     window.addEventListener("devicemotion", handleMotionEvent);
//     window.addEventListener("deviceorientation", handleOrientationEvent);
//   };

//   const handleMotionEvent = (event) => {
//     const acceleration = event.acceleration || {};

//     // Apply Kalman filter to accelerometer data to reduce noise
//     const filteredX = kalmanX.update(acceleration.x || 0);
//     const filteredY = kalmanY.update(acceleration.y || 0);
//     const filteredZ = kalmanZ.update(acceleration.z || 0);

//     // Update the accelerometer data
//     setSensorData((prevData) => ({
//       ...prevData,
//       accelerometer: {
//         x: filteredX.toFixed(2),
//         y: filteredY.toFixed(2),
//         z: filteredZ.toFixed(2),
//       },
//     }));

//     // Calculate velocity and position based on filtered acceleration
//     const currentTime = Date.now();
//     const deltaTime = (currentTime - lastTime) / 1000; // Time in seconds
//     lastTime = currentTime;

//     const newVelocity = {
//       x: velocity.x + filteredX * deltaTime,
//       y: velocity.y + filteredY * deltaTime,
//       z: velocity.z + filteredZ * deltaTime,
//     };

//     setVelocity(newVelocity);

//     const newPosition = {
//       x: position.x + newVelocity.x * deltaTime,
//       y: position.y + newVelocity.y * deltaTime,
//       z: position.z + newVelocity.z * deltaTime,
//     };

//     setPosition(newPosition);
//   };

//   const handleOrientationEvent = (event) => {
//     const { alpha, beta, gamma } = event;
//     setSensorData((prevData) => ({
//       ...prevData,
//       gyroscope: {
//         alpha: alpha?.toFixed(2) || 0,
//         beta: beta?.toFixed(2) || 0,
//         gamma: gamma?.toFixed(2) || 0,
//       },
//     }));
//   };

//   useEffect(() => {
//     return () => {
//       window.removeEventListener("devicemotion", handleMotionEvent);
//       window.removeEventListener("deviceorientation", handleOrientationEvent);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
//       <h1 className="text-2xl font-bold mb-4">Sensor Permission</h1>
//       {!isPermissionGranted ? (
//         <button
//           onClick={() => {
//             requestPermission();
//           }}
//           className="z-10 bg-blue-500 px-4 py-2 rounded-lg text-white text-lg"
//         >
//           Grant Sensor Permission
//         </button>
//       ) : (
//         <div className="mt-4 p-4 bg-gray-800 rounded-lg">
//           <h2 className="text-xl font-semibold">Sensor Data:</h2>
//           <p className="mt-2">
//             📡 <strong>Accelerometer</strong>
//           </p>
//           <p>X: {sensorData.accelerometer.x}</p>
//           <p>Y: {sensorData.accelerometer.y}</p>
//           <p>Z: {sensorData.accelerometer.z}</p>

//           <p className="mt-4">
//             🌀 <strong>Gyroscope</strong>
//           </p>
//           <p>Alpha: {sensorData.gyroscope.alpha}</p>
//           <p>Beta: {sensorData.gyroscope.beta}</p>
//           <p>Gamma: {sensorData.gyroscope.gamma}</p>

//           <div className="mt-4">
//             <h3 className="font-semibold">Velocity:</h3>
//             <p>X: {velocity.x.toFixed(2)}</p>
//             <p>Y: {velocity.y.toFixed(2)}</p>
//             <p>Z: {velocity.z.toFixed(2)}</p>

//             <h3 className="font-semibold mt-4">Position:</h3>
//             <p>X: {position.x.toFixed(2)}</p>
//             <p>Y: {position.y.toFixed(2)}</p>
//             <p>Z: {position.z.toFixed(2)}</p>
//           </div>
//         </div>
//       )}

//       {/* Pass sensorData to Avatar component */}
//       {isPermissionGranted && <Avatar sensorData={sensorData} />}
//     </div>
//   );
// };

// export default SensorPermission;

// // ......................................................................
// // // //After adding kalman filter, velocity and position to code
// // import React, { useState, useEffect } from "react";

// // // Kalman filter implementation for one-dimensional data
// // class KalmanFilter {
// //   constructor(Q = 0.0001, R = 0.01) {
// //     this.Q = Q; // Process noise covariance
// //     this.R = R; // Measurement noise covariance
// //     this.P = 1; // Estimation error covariance
// //     this.X = 0; // Estimated value
// //     this.K = 0; // Kalman gain
// //   }

// //   update(measurement) {
// //     // Prediction step
// //     this.P = this.P + this.Q;

// //     // Kalman Gain step
// //     this.K = this.P / (this.P + this.R);

// //     // Update estimate with measurement
// //     this.X = this.X + this.K * (measurement - this.X);

// //     // Update estimation error covariance
// //     this.P = (1 - this.K) * this.P;

// //     return this.X;
// //   }
// // }

// // const SensorPermission = () => {
// //   const [isPermissionGranted, setIsPermissionGranted] = useState(false);
// //   const [sensorData, setSensorData] = useState({
// //     accelerometer: { x: 0, y: 0, z: 0 },
// //     gyroscope: { alpha: 0, beta: 0, gamma: 0 },
// //   });

// //   // Velocity and position states
// //   const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
// //   const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

// //   // Kalman filters for acceleration data
// //   const kalmanX = new KalmanFilter();
// //   const kalmanY = new KalmanFilter();
// //   const kalmanZ = new KalmanFilter();

// //   let lastTime = Date.now(); // To calculate delta time

// //   // Function to request permission
// //   const requestPermission = async () => {
// //     if (typeof DeviceMotionEvent.requestPermission === "function") {
// //       try {
// //         const permission = await DeviceMotionEvent.requestPermission();
// //         if (permission === "granted") {
// //           setIsPermissionGranted(true);
// //           startSensorListeners();
// //         } else {
// //           alert("Permission denied. Cannot access sensors.");
// //         }
// //       } catch (error) {
// //         console.error("Error requesting permission:", error);
// //       }
// //     } else {
// //       setIsPermissionGranted(true);
// //       startSensorListeners();
// //     }
// //   };

// //   const startSensorListeners = () => {
// //     window.addEventListener("devicemotion", handleMotionEvent);
// //     window.addEventListener("deviceorientation", handleOrientationEvent);
// //   };

// //   const handleMotionEvent = (event) => {
// //     const acceleration = event.acceleration || {};

// //     // Apply Kalman filter to accelerometer data to reduce noise
// //     const filteredX = kalmanX.update(acceleration.x || 0);
// //     const filteredY = kalmanY.update(acceleration.y || 0);
// //     const filteredZ = kalmanZ.update(acceleration.z || 0);

// //     // Update the accelerometer data
// //     setSensorData((prevData) => ({
// //       ...prevData,
// //       accelerometer: {
// //         x: filteredX.toFixed(2),
// //         y: filteredY.toFixed(2),
// //         z: filteredZ.toFixed(2),
// //       },
// //     }));

// //     // Calculate velocity and position based on filtered acceleration
// //     const currentTime = Date.now();
// //     const deltaTime = (currentTime - lastTime) / 1000; // Time in seconds
// //     lastTime = currentTime;

// //     const newVelocity = {
// //       x: velocity.x + filteredX * deltaTime,
// //       y: velocity.y + filteredY * deltaTime,
// //       z: velocity.z + filteredZ * deltaTime,
// //     };

// //     setVelocity(newVelocity);

// //     const newPosition = {
// //       x: position.x + newVelocity.x * deltaTime,
// //       y: position.y + newVelocity.y * deltaTime,
// //       z: position.z + newVelocity.z * deltaTime,
// //     };

// //     setPosition(newPosition);
// //   };

// //   const handleOrientationEvent = (event) => {
// //     const { alpha, beta, gamma } = event;
// //     setSensorData((prevData) => ({
// //       ...prevData,
// //       gyroscope: {
// //         alpha: alpha?.toFixed(2) || 0,
// //         beta: beta?.toFixed(2) || 0,
// //         gamma: gamma?.toFixed(2) || 0,
// //       },
// //     }));
// //   };

// //   useEffect(() => {
// //     return () => {
// //       window.removeEventListener("devicemotion", handleMotionEvent);
// //       window.removeEventListener("deviceorientation", handleOrientationEvent);
// //     };
// //   }, []);

// //   return (
// //     <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
// //       <h1 className="text-2xl font-bold mb-4">Sensor Permission</h1>
// //       {!isPermissionGranted ? (
// //         <button
// //           onClick={requestPermission}
// //           className="bg-blue-500 px-4 py-2 rounded-lg text-white text-lg"
// //         >
// //           Grant Sensor Permission
// //         </button>
// //       ) : (
// //         <div className="mt-4 p-4 bg-gray-800 rounded-lg">
// //           <h2 className="text-xl font-semibold">Sensor Data:</h2>
// //           <p className="mt-2">
// //             📡 <strong>Accelerometer</strong>
// //           </p>
// //           <p>X: {sensorData.accelerometer.x}</p>
// //           <p>Y: {sensorData.accelerometer.y}</p>
// //           <p>Z: {sensorData.accelerometer.z}</p>

// //           <p className="mt-4">
// //             🌀 <strong>Gyroscope</strong>
// //           </p>
// //           <p>Alpha: {sensorData.gyroscope.alpha}</p>
// //           <p>Beta: {sensorData.gyroscope.beta}</p>
// //           <p>Gamma: {sensorData.gyroscope.gamma}</p>

// //           <div className="mt-4">
// //             <h3 className="font-semibold">Velocity:</h3>
// //             <p>X: {velocity.x.toFixed(2)}</p>
// //             <p>Y: {velocity.y.toFixed(2)}</p>
// //             <p>Z: {velocity.z.toFixed(2)}</p>

// //             <h3 className="font-semibold mt-4">Position:</h3>
// //             <p>X: {position.x.toFixed(2)}</p>
// //             <p>Y: {position.y.toFixed(2)}</p>
// //             <p>Z: {position.z.toFixed(2)}</p>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SensorPermission;

// // .............................................................................
// // // after adding deltaTime
// // import React, { useState, useEffect } from "react";

// // // Kalman filter implementation for one-dimensional data
// // class KalmanFilter {
// //   constructor(Q = 0.0001, R = 0.01) {
// //     this.Q = Q; // Process noise covariance
// //     this.R = R; // Measurement noise covariance
// //     this.P = 1; // Estimation error covariance
// //     this.X = 0; // Estimated value
// //     this.K = 0; // Kalman gain
// //   }

// //   update(measurement) {
// //     // Prediction step
// //     this.P = this.P + this.Q;

// //     // Kalman Gain step
// //     this.K = this.P / (this.P + this.R);

// //     // Update estimate with measurement
// //     this.X = this.X + this.K * (measurement - this.X);

// //     // Update estimation error covariance
// //     this.P = (1 - this.K) * this.P;

// //     return this.X;
// //   }
// // }

// // const SensorPermission = () => {
// //   const [isPermissionGranted, setIsPermissionGranted] = useState(false);
// //   const [sensorData, setSensorData] = useState({
// //     accelerometer: { x: 0, y: 0, z: 0 },
// //     gyroscope: { alpha: 0, beta: 0, gamma: 0 },
// //   });

// //   // Velocity and position states
// //   const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
// //   const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

// //   // Kalman filters for acceleration data
// //   const kalmanX = new KalmanFilter();
// //   const kalmanY = new KalmanFilter();
// //   const kalmanZ = new KalmanFilter();

// //   let lastTime = Date.now(); // To calculate delta time

// //   // Function to request permission
// //   const requestPermission = async () => {
// //     if (typeof DeviceMotionEvent.requestPermission === "function") {
// //       try {
// //         const permission = await DeviceMotionEvent.requestPermission();
// //         if (permission === "granted") {
// //           setIsPermissionGranted(true);
// //           startSensorListeners();
// //         } else {
// //           alert("Permission denied. Cannot access sensors.");
// //         }
// //       } catch (error) {
// //         console.error("Error requesting permission:", error);
// //       }
// //     } else {
// //       setIsPermissionGranted(true); // For Android devices (no explicit permission required)
// //       startSensorListeners();
// //     }
// //   };

// //   // Function to start listening to sensor data
// //   const startSensorListeners = () => {
// //     window.addEventListener("devicemotion", handleMotionEvent);
// //     window.addEventListener("deviceorientation", handleOrientationEvent);
// //   };

// //   // Function to handle motion sensor data
// //   const handleMotionEvent = (event) => {
// //     const acceleration = event.acceleration || {};

// //     // Apply Kalman filter to accelerometer data to reduce noise
// //     const filteredX = kalmanX.update(acceleration.x || 0);
// //     const filteredY = kalmanY.update(acceleration.y || 0);
// //     const filteredZ = kalmanZ.update(acceleration.z || 0);

// //     // Update the accelerometer data
// //     setSensorData((prevData) => ({
// //       ...prevData,
// //       accelerometer: {
// //         x: filteredX.toFixed(2),
// //         y: filteredY.toFixed(2),
// //         z: filteredZ.toFixed(2),
// //       },
// //     }));

// //     // Calculate velocity and position based on filtered acceleration
// //     const currentTime = Date.now();
// //     const deltaTime = (currentTime - lastTime) / 1000; // Time in seconds
// //     lastTime = currentTime;

// //     // Assuming gravity is ~9.8 m/s² along the z-axis and removing it from the Z axis for better acceleration calculation
// //     const gravity = 9.8;

// //     const filteredAccelX = filteredX; // Assuming X and Y axes have no gravity influence
// //     const filteredAccelY = filteredY;
// //     const filteredAccelZ = filteredZ - gravity; // Removing gravity from Z axis

// //     const newVelocity = {
// //       x: velocity.x + filteredAccelX * deltaTime,
// //       y: velocity.y + filteredAccelY * deltaTime,
// //       z: velocity.z + filteredAccelZ * deltaTime,
// //     };

// //     setVelocity(newVelocity);

// //     const newPosition = {
// //       x: position.x + newVelocity.x * deltaTime,
// //       y: position.y + newVelocity.y * deltaTime,
// //       z: position.z + newVelocity.z * deltaTime,
// //     };

// //     setPosition(newPosition);
// //   };

// //   // Function to handle gyroscope/orientation data
// //   const handleOrientationEvent = (event) => {
// //     const { alpha, beta, gamma } = event;
// //     setSensorData((prevData) => ({
// //       ...prevData,
// //       gyroscope: {
// //         alpha: alpha?.toFixed(2) || 0,
// //         beta: beta?.toFixed(2) || 0,
// //         gamma: gamma?.toFixed(2) || 0,
// //       },
// //     }));
// //   };

// //   // Cleanup event listeners when component unmounts
// //   useEffect(() => {
// //     return () => {
// //       window.removeEventListener("devicemotion", handleMotionEvent);
// //       window.removeEventListener("deviceorientation", handleOrientationEvent);
// //     };
// //   }, []);

// //   return (
// //     <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
// //       <h1 className="text-2xl font-bold mb-4">Sensor Permission</h1>

// //       {!isPermissionGranted ? (
// //         <button
// //           onClick={requestPermission}
// //           className="bg-blue-500 px-4 py-2 rounded-lg text-white text-lg"
// //         >
// //           Grant Sensor Permission
// //         </button>
// //       ) : (
// //         <div className="mt-4 p-4 bg-gray-800 rounded-lg">
// //           <h2 className="text-xl font-semibold">Sensor Data:</h2>
// //           <p className="mt-2">
// //             📡 <strong>Accelerometer</strong>
// //           </p>
// //           <p>X: {sensorData.accelerometer.x}</p>
// //           <p>Y: {sensorData.accelerometer.y}</p>
// //           <p>Z: {sensorData.accelerometer.z}</p>

// //           <p className="mt-4">
// //             🌀 <strong>Gyroscope</strong>
// //           </p>
// //           <p>Alpha: {sensorData.gyroscope.alpha}</p>
// //           <p>Beta: {sensorData.gyroscope.beta}</p>
// //           <p>Gamma: {sensorData.gyroscope.gamma}</p>

// //           <div className="mt-4">
// //             <h3 className="font-semibold">Velocity:</h3>
// //             <p>X: {velocity.x.toFixed(2)}</p>
// //             <p>Y: {velocity.y.toFixed(2)}</p>
// //             <p>Z: {velocity.z.toFixed(2)}</p>

// //             <h3 className="font-semibold mt-4">Position:</h3>
// //             <p>X: {position.x.toFixed(2)}</p>
// //             <p>Y: {position.y.toFixed(2)}</p>
// //             <p>Z: {position.z.toFixed(2)}</p>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SensorPermission;

// // //After adding kalman filter, velocity and position to code
// // import React, { useState, useEffect } from "react";

// // // Kalman filter implementation for one-dimensional data
// // class KalmanFilter {
// //   constructor(Q = 0.0001, R = 0.01) {
// //     this.Q = Q; // Process noise covariance
// //     this.R = R; // Measurement noise covariance
// //     this.P = 1; // Estimation error covariance
// //     this.X = 0; // Estimated value
// //     this.K = 0; // Kalman gain
// //   }

// //   update(measurement) {
// //     // Prediction step
// //     this.P = this.P + this.Q;

// //     // Kalman Gain step
// //     this.K = this.P / (this.P + this.R);

// //     // Update estimate with measurement
// //     this.X = this.X + this.K * (measurement - this.X);

// //     // Update estimation error covariance
// //     this.P = (1 - this.K) * this.P;

// //     return this.X;
// //   }
// // }

// // const SensorPermission = () => {
// //   const [isPermissionGranted, setIsPermissionGranted] = useState(false);
// //   const [sensorData, setSensorData] = useState({
// //     accelerometer: { x: 0, y: 0, z: 0 },
// //     gyroscope: { alpha: 0, beta: 0, gamma: 0 },
// //   });

// //   // Velocity and position states
// //   const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
// //   const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

// //   // Kalman filters for acceleration data
// //   const kalmanX = new KalmanFilter();
// //   const kalmanY = new KalmanFilter();
// //   const kalmanZ = new KalmanFilter();

// //   let lastTime = Date.now(); // To calculate delta time

// //   // Function to request permission
// //   const requestPermission = async () => {
// //     if (typeof DeviceMotionEvent.requestPermission === "function") {
// //       try {
// //         const permission = await DeviceMotionEvent.requestPermission();
// //         if (permission === "granted") {
// //           setIsPermissionGranted(true);
// //           startSensorListeners();
// //         } else {
// //           alert("Permission denied. Cannot access sensors.");
// //         }
// //       } catch (error) {
// //         console.error("Error requesting permission:", error);
// //       }
// //     } else {
// //       setIsPermissionGranted(true); // For Android devices (no explicit permission required)
// //       startSensorListeners();
// //     }
// //   };

// //   // Function to start listening to sensor data
// //   const startSensorListeners = () => {
// //     window.addEventListener("devicemotion", handleMotionEvent);
// //     window.addEventListener("deviceorientation", handleOrientationEvent);
// //   };

// //   // Function to handle motion sensor data
// //   const handleMotionEvent = (event) => {
// //     const acceleration = event.acceleration || {};

// //     // Apply Kalman filter to accelerometer data to reduce noise
// //     const filteredX = kalmanX.update(acceleration.x || 0);
// //     const filteredY = kalmanY.update(acceleration.y || 0);
// //     const filteredZ = kalmanZ.update(acceleration.z || 0);

// //     // Update the accelerometer data
// //     setSensorData((prevData) => ({
// //       ...prevData,
// //       accelerometer: {
// //         x: filteredX.toFixed(2),
// //         y: filteredY.toFixed(2),
// //         z: filteredZ.toFixed(2),
// //       },
// //     }));

// //     // Calculate velocity and position based on filtered acceleration
// //     const currentTime = Date.now();
// //     const deltaTime = (currentTime - lastTime) / 1000; // Time in seconds
// //     lastTime = currentTime;

// //     const newVelocity = {
// //       x: velocity.x + filteredX * deltaTime,
// //       y: velocity.y + filteredY * deltaTime,
// //       z: velocity.z + filteredZ * deltaTime,
// //     };

// //     setVelocity(newVelocity);

// //     const newPosition = {
// //       x: position.x + newVelocity.x * deltaTime,
// //       y: position.y + newVelocity.y * deltaTime,
// //       z: position.z + newVelocity.z * deltaTime,
// //     };

// //     setPosition(newPosition);
// //   };

// //   // Function to handle gyroscope/orientation data
// //   const handleOrientationEvent = (event) => {
// //     const { alpha, beta, gamma } = event;
// //     setSensorData((prevData) => ({
// //       ...prevData,
// //       gyroscope: {
// //         alpha: alpha?.toFixed(2) || 0,
// //         beta: beta?.toFixed(2) || 0,
// //         gamma: gamma?.toFixed(2) || 0,
// //       },
// //     }));
// //   };

// //   // Cleanup event listeners when component unmounts
// //   useEffect(() => {
// //     return () => {
// //       window.removeEventListener("devicemotion", handleMotionEvent);
// //       window.removeEventListener("deviceorientation", handleOrientationEvent);
// //     };
// //   }, []);

// //   return (
// //     <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
// //       <h1 className="text-2xl font-bold mb-4">Sensor Permission</h1>

// //       {!isPermissionGranted ? (
// //         <button
// //           onClick={requestPermission}
// //           className="bg-blue-500 px-4 py-2 rounded-lg text-white text-lg"
// //         >
// //           Grant Sensor Permission
// //         </button>
// //       ) : (
// //         <div className="mt-4 p-4 bg-gray-800 rounded-lg">
// //           <h2 className="text-xl font-semibold">Sensor Data:</h2>
// //           <p className="mt-2">
// //             📡 <strong>Accelerometer</strong>
// //           </p>
// //           <p>X: {sensorData.accelerometer.x}</p>
// //           <p>Y: {sensorData.accelerometer.y}</p>
// //           <p>Z: {sensorData.accelerometer.z}</p>

// //           <p className="mt-4">
// //             🌀 <strong>Gyroscope</strong>
// //           </p>
// //           <p>Alpha: {sensorData.gyroscope.alpha}</p>
// //           <p>Beta: {sensorData.gyroscope.beta}</p>
// //           <p>Gamma: {sensorData.gyroscope.gamma}</p>

// //           <div className="mt-4">
// //             <h3 className="font-semibold">Velocity:</h3>
// //             <p>X: {velocity.x.toFixed(2)}</p>
// //             <p>Y: {velocity.y.toFixed(2)}</p>
// //             <p>Z: {velocity.z.toFixed(2)}</p>

// //             <h3 className="font-semibold mt-4">Position:</h3>
// //             <p>X: {position.x.toFixed(2)}</p>
// //             <p>Y: {position.y.toFixed(2)}</p>
// //             <p>Z: {position.z.toFixed(2)}</p>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SensorPermission;

// //after adding sensor data to ui
// // import React, { useState, useEffect } from "react";

// // const SensorPermission = () => {
// //   const [isPermissionGranted, setIsPermissionGranted] = useState(false);
// //   const [sensorData, setSensorData] = useState({
// //     accelerometer: { x: 0, y: 0, z: 0 },
// //     gyroscope: { alpha: 0, beta: 0, gamma: 0 },
// //   });

// //   // Function to request permission
// //   const requestPermission = async () => {
// //     if (typeof DeviceMotionEvent.requestPermission === "function") {
// //       try {
// //         const permission = await DeviceMotionEvent.requestPermission();
// //         if (permission === "granted") {
// //           setIsPermissionGranted(true);
// //           startSensorListeners();
// //         } else {
// //           alert("Permission denied. Cannot access sensors.");
// //         }
// //       } catch (error) {
// //         console.error("Error requesting permission:", error);
// //       }
// //     } else {
// //       setIsPermissionGranted(true); // For Android devices (no explicit permission required)
// //       startSensorListeners();
// //     }
// //   };

// //   // Function to start listening to sensor data
// //   const startSensorListeners = () => {
// //     window.addEventListener("devicemotion", handleMotionEvent);
// //     window.addEventListener("deviceorientation", handleOrientationEvent);
// //   };

// //   // Function to handle motion sensor data
// //   const handleMotionEvent = (event) => {
// //     const acceleration = event.acceleration || {};
// //     setSensorData((prevData) => ({
// //       ...prevData,
// //       accelerometer: {
// //         x: acceleration.x?.toFixed(2) || 0,
// //         y: acceleration.y?.toFixed(2) || 0,
// //         z: acceleration.z?.toFixed(2) || 0,
// //       },
// //     }));
// //   };

// //   // Function to handle gyroscope/orientation data
// //   const handleOrientationEvent = (event) => {
// //     const { alpha, beta, gamma } = event;
// //     setSensorData((prevData) => ({
// //       ...prevData,
// //       gyroscope: {
// //         alpha: alpha?.toFixed(2) || 0,
// //         beta: beta?.toFixed(2) || 0,
// //         gamma: gamma?.toFixed(2) || 0,
// //       },
// //     }));
// //   };

// //   // Cleanup event listeners when component unmounts
// //   useEffect(() => {
// //     return () => {
// //       window.removeEventListener("devicemotion", handleMotionEvent);
// //       window.removeEventListener("deviceorientation", handleOrientationEvent);
// //     };
// //   }, []);

// //   return (
// //     <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
// //       <h1 className="text-2xl font-bold mb-4">Sensor Permission</h1>

// //       {!isPermissionGranted ? (
// //         <button
// //           onClick={requestPermission}
// //           className="bg-blue-500 px-4 py-2 rounded-lg text-white text-lg"
// //         >
// //           Grant Sensor Permission
// //         </button>
// //       ) : (
// //         <div className="mt-4 p-4 bg-gray-800 rounded-lg">
// //           <h2 className="text-xl font-semibold">Sensor Data:</h2>
// //           <p className="mt-2">
// //             📡 <strong>Accelerometer</strong>
// //           </p>
// //           <p>X: {sensorData.accelerometer.x}</p>
// //           <p>Y: {sensorData.accelerometer.y}</p>
// //           <p>Z: {sensorData.accelerometer.z}</p>

// //           <p className="mt-4">
// //             🌀 <strong>Gyroscope</strong>
// //           </p>
// //           <p>Alpha: {sensorData.gyroscope.alpha}</p>
// //           <p>Beta: {sensorData.gyroscope.beta}</p>
// //           <p>Gamma: {sensorData.gyroscope.gamma}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SensorPermission;

// // //after adding sensor data to ui
// // import React, { useState, useEffect } from "react";

// // const SensorPermission = () => {
// //   const [isPermissionGranted, setIsPermissionGranted] = useState(false);
// //   const [sensorData, setSensorData] = useState({
// //     accelerometer: { x: 0, y: 0, z: 0 },
// //     gyroscope: { alpha: 0, beta: 0, gamma: 0 },
// //   });

// //   // Function to request permission
// //   const requestPermission = async () => {
// //     if (typeof DeviceMotionEvent.requestPermission === "function") {
// //       try {
// //         const permission = await DeviceMotionEvent.requestPermission();
// //         if (permission === "granted") {
// //           setIsPermissionGranted(true);
// //           startSensorListeners();
// //         } else {
// //           alert("Permission denied. Cannot access sensors.");
// //         }
// //       } catch (error) {
// //         console.error("Error requesting permission:", error);
// //       }
// //     } else {
// //       setIsPermissionGranted(true); // For Android devices (no explicit permission required)
// //       startSensorListeners();
// //     }
// //   };

// //   // Function to start listening to sensor data
// //   const startSensorListeners = () => {
// //     window.addEventListener("devicemotion", handleMotionEvent);
// //     window.addEventListener("deviceorientation", handleOrientationEvent);
// //   };

// //   // Function to handle motion sensor data
// //   const handleMotionEvent = (event) => {
// //     const acceleration = event.acceleration || {};
// //     setSensorData((prevData) => ({
// //       ...prevData,
// //       accelerometer: {
// //         x: acceleration.x?.toFixed(2) || 0,
// //         y: acceleration.y?.toFixed(2) || 0,
// //         z: acceleration.z?.toFixed(2) || 0,
// //       },
// //     }));
// //   };

// //   // Function to handle gyroscope/orientation data
// //   const handleOrientationEvent = (event) => {
// //     const { alpha, beta, gamma } = event;
// //     setSensorData((prevData) => ({
// //       ...prevData,
// //       gyroscope: {
// //         alpha: alpha?.toFixed(2) || 0,
// //         beta: beta?.toFixed(2) || 0,
// //         gamma: gamma?.toFixed(2) || 0,
// //       },
// //     }));
// //   };

// //   // Cleanup event listeners when component unmounts
// //   useEffect(() => {
// //     return () => {
// //       window.removeEventListener("devicemotion", handleMotionEvent);
// //       window.removeEventListener("deviceorientation", handleOrientationEvent);
// //     };
// //   }, []);

// //   return (
// //     <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
// //       <h1 className="text-2xl font-bold mb-4">Sensor Permission</h1>

// //       {!isPermissionGranted ? (
// //         <button
// //           onClick={requestPermission}
// //           className="bg-blue-500 px-4 py-2 rounded-lg text-white text-lg"
// //         >
// //           Grant Sensor Permission
// //         </button>
// //       ) : (
// //         <div className="mt-4 p-4 bg-gray-800 rounded-lg">
// //           <h2 className="text-xl font-semibold">Sensor Data:</h2>
// //           <p className="mt-2">
// //             📡 <strong>Accelerometer</strong>
// //           </p>
// //           <p>X: {sensorData.accelerometer.x}</p>
// //           <p>Y: {sensorData.accelerometer.y}</p>
// //           <p>Z: {sensorData.accelerometer.z}</p>

// //           <p className="mt-4">
// //             🌀 <strong>Gyroscope</strong>
// //           </p>
// //           <p>Alpha: {sensorData.gyroscope.alpha}</p>
// //           <p>Beta: {sensorData.gyroscope.beta}</p>
// //           <p>Gamma: {sensorData.gyroscope.gamma}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SensorPermission;

// //before adding sensor data to ui
// // import React, { useState, useEffect } from "react";
// // import Avatar from "./Avatar"; // Import Avatar component

// // const SensorPermission = ({ onPermissionGranted }) => {
// //   // const [isPermissionGranted, setIsPermissionGranted] = useState(false);
// //   const [sensorData, setSensorData] = useState({
// //     accelerometer: { x: 0, y: 0, z: 0 },
// //     gyroscope: { alpha: 0, beta: 0, gamma: 0 },
// //   });
// //   const [isDialogOpen, setIsDialogOpen] = useState(true);

// //   // Request permission for device sensors
// //   // const requestPermission = () => {
// //   //   if (window.DeviceMotionEvent && window.DeviceOrientationEvent) {
// //   //     setIsDialogOpen(false);
// //   //     setIsPermissionGranted(true);
// //   //     startSensorUpdates();
// //   //   } else {
// //   //     alert("Sensors are not supported on this device.");
// //   //   }
// //   // };
// //   const requestPermission = () => {
// //     if (window.DeviceMotionEvent && window.DeviceOrientationEvent) {
// //       setIsDialogOpen(false);

// //       // 1. Call the onPermissionGranted function passed from App.jsx
// //       onPermissionGranted(); // Notify App.jsx that permission is granted

// //       startSensorUpdates();
// //     }
// //   };

// //   // Start listening to sensor data
// //   const startSensorUpdates = () => {
// //     if (window.DeviceMotionEvent) {
// //       window.addEventListener("devicemotion", handleMotionEvent, true);
// //     }

// //     if (window.DeviceOrientationEvent) {
// //       window.addEventListener(
// //         "deviceorientation",
// //         handleOrientationEvent,
// //         true
// //       );
// //     }
// //   };

// //   // Handle accelerometer and gyroscope data
// //   const handleMotionEvent = (event) => {
// //     const acceleration = event.acceleration || {};
// //     const rotationRate = event.rotationRate || {};
// //     setSensorData((prevData) => ({
// //       ...prevData,
// //       accelerometer: acceleration,
// //       gyroscope: rotationRate,
// //     }));
// //   };

// //   const handleOrientationEvent = (event) => {
// //     const { alpha, beta, gamma } = event;
// //     setSensorData((prevData) => ({
// //       ...prevData,
// //       gyroscope: { alpha, beta, gamma },
// //     }));
// //   };

// //   useEffect(() => {
// //     return () => {
// //       if (window.DeviceMotionEvent) {
// //         window.removeEventListener("devicemotion", handleMotionEvent);
// //       }
// //       if (window.DeviceOrientationEvent) {
// //         window.removeEventListener("deviceorientation", handleOrientationEvent);
// //       }
// //     };
// //   }, []);

// //   return (
// //     <div>
// //       {isDialogOpen && (
// //         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
// //           <div className="bg-white p-6 rounded-xl shadow-lg w-80">
// //             <h2 className="text-xl font-bold mb-4">Permission Request</h2>
// //             <p className="mb-4 text-gray-600">
// //               This app needs permission to access your device's sensors
// //               (Accelerometer, Gyroscope, and Magnetometer).
// //             </p>
// //             <button
// //               onClick={requestPermission}
// //               className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
// //             >
// //               Grant Permission
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //       {!isDialogOpen && <Avatar sensorData={sensorData} />}
// //     </div>
// //   );
// // };

// // export default SensorPermission;

// // import { useState, useEffect } from "react";
// // import "tailwindcss";

// // const SensorPermission = ({ onPermissionGranted }) => {
// //   const [permission, setPermission] = useState(null); // Start with null

// //   useEffect(() => {
// //     if (
// //       "DeviceMotionEvent" in window &&
// //       typeof DeviceMotionEvent.requestPermission === "function"
// //     ) {
// //       setPermission(null); // Ensure state is not pre-set to denied
// //     }
// //   }, []);

// //   const requestPermission = async () => {
// //     const response = await DeviceMotionEvent.requestPermission();
// //     if (response === "granted") {
// //       setPermission("granted");
// //       onPermissionGranted();
// //     } else {
// //       setPermission("denied");
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
// //       {permission === null && (
// //         <button
// //           onClick={requestPermission}
// //           className="px-4 py-2 bg-blue-500 text-white rounded"
// //         >
// //           Allow Sensor Access
// //         </button>
// //       )}
// //       {permission === "denied" && (
// //         <div className="text-center">
// //           <p className="text-red-500 mb-4">
// //             Permission denied. Please allow sensor access.
// //           </p>
// //           <button
// //             onClick={requestPermission}
// //             className="px-4 py-2 bg-blue-500 text-white rounded"
// //           >
// //             Try Again
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SensorPermission;

// // import { useState, useEffect } from "react";
// // import "tailwindcss";

// // const SensorPermission = ({ onPermissionGranted }) => {
// //   const [permission, setPermission] = useState(null); // Start with null
// //   const [showDialog, setShowDialog] = useState(false); // To toggle dialog visibility

// //   useEffect(() => {
// //     if (
// //       "DeviceMotionEvent" in window &&
// //       typeof DeviceMotionEvent.requestPermission === "function"
// //     ) {
// //       setPermission(null); // Ensure state is not pre-set to denied
// //     }
// //   }, []);

// //   const requestPermission = async () => {
// //     const response = await DeviceMotionEvent.requestPermission();
// //     if (response === "granted") {
// //       setPermission("granted");
// //       onPermissionGranted();
// //     } else {
// //       setPermission("denied");
// //     }
// //   };

// //   const handleYesClick = () => {
// //     setShowDialog(false);
// //     requestPermission(); // Trigger permission request after user agrees
// //   };

// //   const handleNoClick = () => {
// //     setShowDialog(false);
// //     // Show try again button after denying
// //   };

// //   return (
// //     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
// //       {permission === null && showDialog && (
// //         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
// //           <div className="bg-white p-6 rounded-lg w-80 text-center">
// //             <p className="mb-4 text-gray-700">
// //               This permission is needed to access your phone's sensors. If you
// //               grant access, you will be directed to the map. Do you want to
// //               proceed?
// //             </p>
// //             <div className="flex justify-around">
// //               <button
// //                 onClick={handleYesClick}
// //                 className="px-4 py-2 bg-green-500 text-white rounded"
// //               >
// //                 Yes
// //               </button>
// //               <button
// //                 onClick={handleNoClick}
// //                 className="px-4 py-2 bg-red-500 text-white rounded"
// //               >
// //                 No
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Display response message */}
// //       {/* {responseMessage && (
// //         <div className="text-center mb-4">
// //           <p className="text-lg">{responseMessage}</p>
// //         </div>
// //       )} */}

// //       {permission === "denied" && (
// //         <div className="text-center">
// //           <p className="text-red-500 mb-4">
// //             Permission denied. Please allow sensor access.
// //           </p>
// //           <button
// //             onClick={() => setShowDialog(true)} // Show dialog to try again
// //             className="px-4 py-2 bg-blue-500 text-white rounded"
// //           >
// //             Try Again
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SensorPermission;






import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";

// Kalman filter implementation for one-dimensional data
class KalmanFilter {
  constructor(Q = 0.0001, R = 0.01) {
    this.Q = Q; // Process noise covariance
    this.R = R; // Measurement noise covariance
    this.P = 1; // Estimation error covariance
    this.X = 0; // Estimated value
    this.K = 0; // Kalman gain
    console.log("KalmanFilter initialized with Q:", Q, "and R:", R);
  }

  update(measurement) {
    // Prediction step
    this.P = this.P + this.Q;

    // Kalman Gain step
    this.K = this.P / (this.P + this.R);

    // Update estimate with measurement
    this.X = this.X + this.K * (measurement - this.X);

    // Update estimation error covariance
    this.P = (1 - this.K) * this.P;

    console.log("KalmanFilter update - Measurement:", measurement, "Estimated value:", this.X);
    return this.X;
  }
}

const SensorPermission = ({isPermissionGranted,setIsPermissionGranted}) => {
  // const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [sensorData, setSensorData] = useState({
    accelerometer: { x: 0, y: 0, z: 0 },
    gyroscope: { alpha: 0, beta: 0, gamma: 0 },
  });

  // Velocity and position states
  const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

  // Kalman filters for acceleration data
  const kalmanX = new KalmanFilter();
  const kalmanY = new KalmanFilter();
  const kalmanZ = new KalmanFilter();

  let lastTime = Date.now(); // To calculate delta time

  // Function to request permission
  const requestPermission = async () => {
    // Check if the 'requestPermission' function is available on DeviceMotionEvent
    console.log("Requesting sensor permission...");
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      try {
        // Request permission from the user
        const permission = await DeviceMotionEvent.requestPermission();
        console.log("Permission request result:", permission);

        // If permission granted, set the state and start sensor listeners
        if (permission === "granted") {
          setIsPermissionGranted(true);
          startSensorListeners();
        } else {
          console.warn("Permission denied. Cannot access sensors.");
          alert("Permission denied. Cannot access sensors.");
        }
      } catch (error) {
        // Log any errors that occur during the permission request
        console.error("Error requesting permission:", error);
      }
    } else {
      // If 'requestPermission' is not available, grant permission automatically
      console.log("DeviceMotionEvent.requestPermission not available, granting permission automatically");
      setIsPermissionGranted(true);
      startSensorListeners();
    }
  };

  const startSensorListeners = () => {
    console.log("Starting sensor listeners...");
    window.addEventListener("devicemotion", handleMotionEvent);
    window.addEventListener("deviceorientation", handleOrientationEvent);
  };

  const handleMotionEvent = (event) => {
    const acceleration = event.acceleration || {};
    console.log("Raw acceleration data:", acceleration);

    // Apply Kalman filter to accelerometer data to reduce noise
    const filteredX = kalmanX.update(acceleration.x || 0);
    const filteredY = kalmanY.update(acceleration.y || 0);
    const filteredZ = kalmanZ.update(acceleration.z || 0);

    console.log("Filtered acceleration data:", { x: filteredX, y: filteredY, z: filteredZ });

    // Update the accelerometer data
    setSensorData((prevData) => ({
      ...prevData,
      accelerometer: {
        x: filteredX.toFixed(2),
        y: filteredY.toFixed(2),
        z: filteredZ.toFixed(2),
      },
    }));

    // Calculate velocity and position based on filtered acceleration
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastTime) / 1000; // Time in seconds
    lastTime = currentTime;

    console.log("Delta time:", deltaTime);

    const newVelocity = {
      x: velocity.x + filteredX * deltaTime,
      y: velocity.y + filteredY * deltaTime,
      z: velocity.z + filteredZ * deltaTime,
    };

    console.log("New velocity:", newVelocity);
    setVelocity(newVelocity);

    const newPosition = {
      x: position.x + newVelocity.x * deltaTime,
      y: position.y + newVelocity.y * deltaTime,
      z: position.z + newVelocity.z * deltaTime,
    };

    console.log("New position:", newPosition);
    setPosition(newPosition);
  };

  const handleOrientationEvent = (event) => {
    const { alpha, beta, gamma } = event;
    console.log("Orientation data:", { alpha, beta, gamma });
    setSensorData((prevData) => ({
      ...prevData,
      gyroscope: {
        alpha: alpha?.toFixed(2) || 0,
        beta: beta?.toFixed(2) || 0,
        gamma: gamma?.toFixed(2) || 0,
      },
    }));
  };

  useEffect(() => {
    console.log("Component mounted");
    return () => {
      console.log("Component unmounting, removing event listeners");
      window.removeEventListener("devicemotion", handleMotionEvent);
      window.removeEventListener("deviceorientation", handleOrientationEvent);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Sensor Permission</h1>
      {!isPermissionGranted ? (
        <button
          onClick={() => {
            console.log("Grant Sensor Permission button clicked");
            requestPermission();
          }}
          className="z-10 bg-blue-500 px-4 py-2 rounded-lg text-white text-lg"
        >
          Grant Sensor Permission
        </button>
      ) : (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold">Sensor Data:</h2>
          <p className="mt-2">
            📡 <strong>Accelerometer</strong>
          </p>
          <p>X: {sensorData.accelerometer.x}</p>
          <p>Y: {sensorData.accelerometer.y}</p>
          <p>Z: {sensorData.accelerometer.z}</p>

          <p className="mt-4">
            🌀 <strong>Gyroscope</strong>
          </p>
          <p>Alpha: {sensorData.gyroscope.alpha}</p>
          <p>Beta: {sensorData.gyroscope.beta}</p>
          <p>Gamma: {sensorData.gyroscope.gamma}</p>

          <div className="mt-4">
            <h3 className="font-semibold">Velocity:</h3>
            <p>X: {velocity.x.toFixed(2)}</p>
            <p>Y: {velocity.y.toFixed(2)}</p>
            <p>Z: {velocity.z.toFixed(2)}</p>

            <h3 className="font-semibold mt-4">Position:</h3>
            <p>X: {position.x.toFixed(2)}</p>
            <p>Y: {position.y.toFixed(2)}</p>
            <p>Z: {position.z.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Pass sensorData to Avatar component */}
      {/* {isPermissionGranted && <Avatar sensorData={sensorData} />} */}
    </div>
  );
};

export default SensorPermission;
