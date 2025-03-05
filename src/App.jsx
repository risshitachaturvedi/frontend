//for routes
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SensorPermission from "./components/SensorPermission";
import Map from "./components/Map";
// import Loading from "./components/Loading";

const App = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  // const [loading, setLoading] = useState(false);

  const onPermissionGranted = () => {
    setIsPermissionGranted(true);
  };

  return (
    <Router basename="/frontend">
      <Routes>
        <Route
          path="/"
          element={
            <SensorPermission onPermissionGranted={onPermissionGranted} />
          }
        />
        <Route
          path="/map"
          element={
            !isPermissionGranted ? (
              <Map />
            ) : (
              <div className="flex justify-center items-center h-screen">
                <h2>Please grant permission to view the map.</h2>
              </div>
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

// .................................................
// //without backend code
// import React, { useState } from "react";
// import "./App.css";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import Avatar from "./components/Avatar";
// import Wall from "./components/Wall";
// import Floor from "./components/Floor";
// import ShoppingRack from "./components/ShoppingRack";
// import Door from "./components/Door";
// import BillingCounter from "./components/BillingCounter";
// import SensorPermission from "./components/SensorPermission";
// import Loading from "./components/Loading";

// // import ErrorBoundary from "./components/ErrorBoundary";

// const App = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isPermissionGranted, setIsPermissionGranted] = useState(false);
//   const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
//   const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
//   const floorSize = [88, 100];

//   // For ShoppingRack
//   const numRacksPerRow = 12; // Number of racks in a single row
//   const numRows = 7; // Number of rows (columns ke liye)
//   const rackSpacing = 8; // Spacing between racks in a row
//   const rowSpacing = 9; // Spacing between rows (to form columns)
//   const numCounters = 9; // Number of counters
//   const counterSpacing = 10; // Spacing between counters in the row

//   const handleMapLoaded = () => {
//     setIsLoading(false);
//   };

//   const onPermissionGranted = (newVelocity, newPosition) => {
//     setVelocity(newVelocity);
//     setPosition(newPosition);
//     setIsPermissionGranted(true);
//     setIsLoading(false);
//   };

//   return (
//     <div>
//       <SensorPermission onPermissionGranted={onPermissionGranted} />
//       {isLoading && <Loading />}
//       {isPermissionGranted && (
//         <Canvas camera={{ position: [0, 20, 20], fov: 60 }}>
//           {/* Your scene components */}
//           <ambientLight />
//           <pointLight position={[10, 20, 10]} intensity={1} />
//           <Avatar position={position} velocity={velocity} />
//           {/* Other components */}

//           <Floor />
//           {/* Add the walls around the floor */}
//           <Wall floorSize={floorSize} side="top" />
//           <Wall floorSize={floorSize} side="bottom" />
//           <Wall floorSize={floorSize} side="left" />
//           <Wall floorSize={floorSize} side="right" />
//           {/* Render the first Door at one position */}
//           <Door
//             position={[-40, 2.5, -47]}
//             rotation={[0, 8, 0]}
//             scale={[0.02, 0.02, 0.02]}
//           />
//           {/* Render the second Door at another position */}
//           <Door
//             position={[40, 3, -30]}
//             rotation={[0, 8, 0]}
//             scale={[0.02, 0.02, 0.02]}
//           />
//           {/* Multiple Rows (Columns) of Shopping Racks */}
//           {Array.from({ length: numRows }).map((_, rowIndex) =>
//             Array.from({ length: numRacksPerRow }).map((_, colIndex) => {
//               const rackNumber = rowIndex * numRacksPerRow + colIndex;

//               return (
//                 <ShoppingRack
//                   key={`rack-${rackNumber}`}
//                   position={[
//                     colIndex * rackSpacing -
//                       ((numRacksPerRow - 1) * rackSpacing) / 2, // X-axis: Horizontal alignment
//                     0, // Y-axis: Height remains the same
//                     rowIndex * rowSpacing - ((numRows - 1) * rowSpacing) / 4, // Z-axis: Vertical alignment
//                   ]}
//                   rackNumber={rackNumber} // Pass the unique number to the ShoppingRack component
//                 />
//               );
//             })
//           )}
//           {/* Create multiple BillingCounters in a row */}
//           {Array.from({ length: numCounters }).map((_, index) => (
//             <BillingCounter
//               key={`counter-${index}`}
//               position={[-40 + index * counterSpacing, 0, -40]} // Adjust positions so they align in a row
//               counterNumber={index + 1} // Pass the counter number to each counter
//             />
//           ))}
//           <OrbitControls />
//         </Canvas>
//       )}
//     </div>
//   );
// };

// export default App;
// ....................................................

// // //after adding velocity and position
// // import React, { useState, useEffect } from "react";
// // import SensorPermission from "./components/SensorPermission";
// // import { Canvas } from "@react-three/fiber";
// // import Avatar from "./components/Avatar";
// // import Loading from "./components/Loading";

// // const App = () => {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isPermissionGranted, setIsPermissionGranted] = useState(false);
// //   const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
// //   const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

// //   const handleMapLoaded = () => {
// //     setIsLoading(false);
// //   };

// //   const onPermissionGranted = (newVelocity, newPosition) => {
// //     setVelocity(newVelocity);
// //     setPosition(newPosition);
// //     setIsPermissionGranted(true);
// //     setIsLoading(false);
// //   };

// //   return (
// //     <div>
// //       <SensorPermission onPermissionGranted={onPermissionGranted} />
// //       {isLoading && <Loading />}
// //       {isPermissionGranted && !isLoading && (
// //         <Canvas
// //           camera={{ position: [0, 20, 20], fov: 60 }}
// //           onCreated={() => handleMapLoaded()}
// //         >
// //           <ambientLight />
// //           <pointLight position={[10, 20, 10]} intensity={1} />
// //           <Avatar position={position} velocity={velocity} />
// //         </Canvas>
// //       )}
// //     </div>
// //   );
// // };

// // export default App;

// .........................................................................
// //without backend code
// import React, { useState } from "react";
// import "./App.css";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import Avatar from "./components/Avatar";
// import Wall from "./components/Wall";
// import Floor from "./components/Floor";
// import ShoppingRack from "./components/ShoppingRack";
// import Door from "./components/Door";
// import BillingCounter from "./components/BillingCounter";
// import SensorPermission from "./components/SensorPermission";
// import Loading from "./components/Loading";

// // import ErrorBoundary from "./components/ErrorBoundary";

// const App = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isPermissionGranted, setIsPermissionGranted] = useState(false);
//   const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
//   const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
//   const floorSize = [88, 100];

//   // For ShoppingRack
//   const numRacksPerRow = 12; // Number of racks in a single row
//   const numRows = 7; // Number of rows (columns ke liye)
//   const rackSpacing = 8; // Spacing between racks in a row
//   const rowSpacing = 9; // Spacing between rows (to form columns)
//   const numCounters = 9; // Number of counters
//   const counterSpacing = 10; // Spacing between counters in the row

//   const handleMapLoaded = () => {
//     setIsLoading(false);
//   };

//   const onPermissionGranted = (newVelocity, newPosition) => {
//     setVelocity(newVelocity);
//     setPosition(newPosition);
//     setIsPermissionGranted(true);
//     setIsLoading(false);
//   };

//   return (
//     <div>
//       <SensorPermission onPermissionGranted={onPermissionGranted} />
//       {isLoading && <Loading />}
//       {isPermissionGranted && (
//         <Canvas camera={{ position: [0, 20, 20], fov: 60 }}>
//           {/* Your scene components */}
//           <ambientLight />
//           <pointLight position={[10, 20, 10]} intensity={1} />
//           <Avatar position={position} velocity={velocity} />
//           {/* Other components */}

//           <Floor />
//           {/* Add the walls around the floor */}
//           <Wall floorSize={floorSize} side="top" />
//           <Wall floorSize={floorSize} side="bottom" />
//           <Wall floorSize={floorSize} side="left" />
//           <Wall floorSize={floorSize} side="right" />
//           {/* Render the first Door at one position */}
//           <Door
//             position={[-40, 2.5, -47]}
//             rotation={[0, 8, 0]}
//             scale={[0.02, 0.02, 0.02]}
//           />
//           {/* Render the second Door at another position */}
//           <Door
//             position={[40, 3, -30]}
//             rotation={[0, 8, 0]}
//             scale={[0.02, 0.02, 0.02]}
//           />
//           {/* Multiple Rows (Columns) of Shopping Racks */}
//           {Array.from({ length: numRows }).map((_, rowIndex) =>
//             Array.from({ length: numRacksPerRow }).map((_, colIndex) => {
//               const rackNumber = rowIndex * numRacksPerRow + colIndex;

//               return (
//                 <ShoppingRack
//                   key={`rack-${rackNumber}`}
//                   position={[
//                     colIndex * rackSpacing -
//                       ((numRacksPerRow - 1) * rackSpacing) / 2, // X-axis: Horizontal alignment
//                     0, // Y-axis: Height remains the same
//                     rowIndex * rowSpacing - ((numRows - 1) * rowSpacing) / 4, // Z-axis: Vertical alignment
//                   ]}
//                   rackNumber={rackNumber} // Pass the unique number to the ShoppingRack component
//                 />
//               );
//             })
//           )}
//           {/* Create multiple BillingCounters in a row */}
//           {Array.from({ length: numCounters }).map((_, index) => (
//             <BillingCounter
//               key={`counter-${index}`}
//               position={[-40 + index * counterSpacing, 0, -40]} // Adjust positions so they align in a row
//               counterNumber={index + 1} // Pass the counter number to each counter
//             />
//           ))}
//           <OrbitControls />
//         </Canvas>
//       )}
//     </div>
//   );
// };

// export default App;

// .............................................................................
// // with backend code
// import React, { useEffect, useState } from "react";
// import "./App.css";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import Avatar from "./components/Avatar";
// import Wall from "./components/Wall";
// import Floor from "./components/Floor";
// import ShoppingRack from "./components/ShoppingRack";
// import Door from "./components/Door";
// import BillingCounter from "./components/BillingCounter";
// import SensorPermission from "./components/SensorPermission";
// import ImuDisplay from "./components/ImuDisplay";
// import io from "socket.io-client";
// import axios from "axios";
// import ErrorBoundary from "./components/ErrorBoundary";

// const App = () => {
//   // const [isPermissionGranted, setIsPermissionGranted] = useState(false);
//   // const handlePermissionGranted = () => {
//   //   setIsPermissionGranted(true); // Proceed to show the map after permission is granted
//   // };
//   const floorSize = [88, 100];
//   //const [imuData, setImuData] = useState(null); // State to hold IMU data

//   //For ShoppingRack
//   const numRacksPerRow = 12; // Number of racks in a single row
//   const numRows = 7; // Number of rows (columns ke liye)
//   const rackSpacing = 8; // Spacing between racks in a row
//   const rowSpacing = 9; // Spacing between rows (to form columns)

//   const numCounters = 9; // Number of counters
//   const counterSpacing = 10; // Spacing between counters in the row

//   return (
//     // <div>
//     //   {isPermissionGranted === null ? (
//     //     <SensorPermission onPermissionGranted={handlePermissionGranted} />
//     //   ) : isPermissionGranted === false ? (
//     //     <div>
//     //       <p>Permission denied. Please allow sensor access.</p>
//     //     </div>

//     // ) : (

//     <div>
//       <SensorPermission />
//       <div />
//        <Canvas camera={{ position: [0, 20, 20], fov: 60 }}>
//         {/* Your scene components */}
//         <ambientLight />
//         <pointLight position={[10, 20, 10]} intensity={1} />
//         <Avatar />
//         {/* Other components */}

//         <Floor />
//         {/* Add the walls around the floor */}
//         <Wall floorSize={floorSize} side="top" />
//         <Wall floorSize={floorSize} side="bottom" />
//         <Wall floorSize={floorSize} side="left" />
//         <Wall floorSize={floorSize} side="right" />
//         {/* Render the first Door at one position */}
//         <Door
//           position={[-40, 2.5, -47]}
//           rotation={[0, 8, 0]}
//           scale={[0.02, 0.02, 0.02]}
//         />
//         {/* Render the second Door at another position */}
//         <Door
//           position={[40, 3, -30]}
//           rotation={[0, 8, 0]}
//           scale={[0.02, 0.02, 0.02]}
//         />
//         {/* Multiple Rows (Columns) of Shopping Racks */}
//         {Array.from({ length: numRows }).map((_, rowIndex) =>
//           Array.from({ length: numRacksPerRow }).map((_, colIndex) => {
//             // Generate the rack number inside the map
//             const rackNumber = rowIndex * numRacksPerRow + colIndex;

//             return (
//               <ShoppingRack
//                 key={`rack-${rackNumber}`} // Ensure each rack has a unique key
//                 position={[
//                   colIndex * rackSpacing -
//                     ((numRacksPerRow - 1) * rackSpacing) / 2, // X-axis: Horizontal alignment
//                   0, // Y-axis: Height remains the same
//                   rowIndex * rowSpacing - ((numRows - 1) * rowSpacing) / 4, // Z-axis: Vertical alignment
//                 ]}
//                 rackNumber={rackNumber} // Pass the unique number to the ShoppingRack component
//               />
//             );
//           })
//         )}
//         {/* Create multiple BillingCounters in a row */}
//         {Array.from({ length: numCounters }).map((_, index) => (
//           <BillingCounter
//             key={`counter-${index}`}
//             position={[-40 + index * counterSpacing, 0, -40]} // Adjust positions so they align in a row
//             counterNumber={index + 1} // Pass the counter number to each counter
//           />
//         ))}
//         <OrbitControls />
//       </Canvas>
//     </div>
//   );
// };
// export default App;

// // fgffghgcccghhhh

// import React, { useState, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import ImuDisplay from "./components/ImuDisplay";
// import SensorHandler from "./components/SensorHandler";
// import Avatar from "./components/Avatar";
// import Wall from "./components/Wall";
// import Floor from "./components/Floor";
// import ShoppingRack from "./components/ShoppingRack";
// import Door from "./components/Door";
// import BillingCounter from "./components/BillingCounter";
// import io from "socket.io-client";
// import axios from "axios";
// import "./App.css";

// const App = () => {
//   const [imuData, setImuData] = useState(null); // State to hold IMU data
//   const floorSize = [88, 100];

//   // For ShoppingRack
//   const numRacksPerRow = 12; // Number of racks in a single row
//   const numRows = 7; // Number of rows (columns ke liye)
//   const rackSpacing = 8; // Spacing between racks in a row
//   const rowSpacing = 9; // Spacing between rows (to form columns)

//   const numCounters = 9; // Number of counters
//   const counterSpacing = 10; // Spacing between counters in the row

//   // Axios request to fetch processed IMU data from backend
//   useEffect(() => {
//     // Establish socket connection to the backend
//     const socket = io("http://localhost:3000");

//     // Function to handle real-time device motion data
//     const handleDeviceMotion = (event) => {
//       const acceleration = event.acceleration; // Accelerometer data (x, y, z)
//       const rotationRate = event.rotationRate; // Gyroscope data (alpha, beta, gamma)

//       // Send the real-time IMU data to the backend
//       const imuData = {
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
//       };

//       // Emit data to backend via WebSocket
//       socket.emit("imu-data", imuData);
//     };

//     // Check if the device supports DeviceMotionEvent
//     if (window.DeviceMotionEvent) {
//       // Listen to device motion events
//       window.addEventListener("devicemotion", handleDeviceMotion, false);
//     } else {
//       console.log("DeviceMotionEvent is not supported on this device.");
//     }

//     // Listen for the processed IMU data from the backend
//     socket.on("imu-update", (data) => {
//       console.log("Received IMU update:", data);
//       setImuData(data); // Update the state in App.jsx with received data
//     });

//     // Cleanup on component unmount
//     return () => {
//       window.removeEventListener("devicemotion", handleDeviceMotion);
//       socket.disconnect(); // Disconnect socket when the component unmounts
//     };
//   }, []);

//   return (
//     <div className="App">
//       <h1>Real-time IMU Data</h1>

//       {/* Pass setImuData function to SensorHandler */}
//       <SensorHandler setImuData={setImuData} />

//       {/* Pass imuData to ImuDisplay component */}
//       <ImuDisplay imuData={imuData} />

//       {/* 3D Canvas with your objects */}
//       <Canvas>
//         <ambientLight />
//         <pointLight position={[10, 20, 10]} intensity={1} />

//         <Avatar />
//         <Floor />

//         {/* Add the walls around the floor */}
//         <Wall floorSize={floorSize} side="top" />
//         <Wall floorSize={floorSize} side="bottom" />
//         <Wall floorSize={floorSize} side="left" />
//         <Wall floorSize={floorSize} side="right" />

//         {/* Render the doors */}
//         <Door
//           position={[-40, 2.5, -47]}
//           rotation={[0, 8, 0]}
//           scale={[0.02, 0.02, 0.02]}
//         />
//         <Door
//           position={[40, 3, -30]}
//           rotation={[0, 8, 0]}
//           scale={[0.02, 0.02, 0.02]}
//         />

//         {/* Render Shopping Racks */}
//         {Array.from({ length: numRows }).map((_, rowIndex) =>
//           Array.from({ length: numRacksPerRow }).map((_, colIndex) => {
//             const rackNumber = rowIndex * numRacksPerRow + colIndex;
//             return (
//               <ShoppingRack
//                 key={`rack-${rackNumber}`}
//                 position={[
//                   colIndex * rackSpacing -
//                     ((numRacksPerRow - 1) * rackSpacing) / 2,
//                   0,
//                   rowIndex * rowSpacing - ((numRows - 1) * rowSpacing) / 4,
//                 ]}
//                 rackNumber={rackNumber}
//               />
//             );
//           })
//         )}

//         {/* Render Billing Counters */}
//         {Array.from({ length: numCounters }).map((_, index) => (
//           <BillingCounter
//             key={`counter-${index}`}
//             position={[-40 + index * counterSpacing, 0, -40]}
//             counterNumber={index + 1}
//           />
//         ))}

//         <OrbitControls />
//       </Canvas>
//     </div>
//   );
// };

// export default App;
