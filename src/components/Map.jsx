// // import React from "react";
// // import "./App.css";
// // import { Canvas } from "@react-three/fiber";
// // import { OrbitControls } from "@react-three/drei";
// // import Avatar from "./components/Avatar";
// // import Wall from "./components/Wall";
// // import Floor from "./components/Floor";
// // import ShoppingRack from "./components/ShoppingRack";
// // import Door from "./components/Door";
// // import BillingCounter from "./components/BillingCounter";
// // import SensorPermission from "./components/SensorPermission";
// // import Loading from "./components/Loading";

// // const Map = () => {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isPermissionGranted, setIsPermissionGranted] = useState(false);
// //   const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
// //   const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
// //   const floorSize = [88, 100];

// //   // For ShoppingRack
// //   const numRacksPerRow = 12; // Number of racks in a single row
// //   const numRows = 7; // Number of rows (columns ke liye)
// //   const rackSpacing = 8; // Spacing between racks in a row
// //   const rowSpacing = 9; // Spacing between rows (to form columns)
// //   const numCounters = 9; // Number of counters
// //   const counterSpacing = 10; // Spacing between counters in the row

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
// //       {isPermissionGranted && (
// //         <Canvas
// //           camera={{ position: [0, 20, 20], fov: 60 }}
// //           onCreated={handleMapLoaded}
// //         >
// //           {/* Your scene components */}
// //           <ambientLight />
// //           <pointLight position={[10, 20, 10]} intensity={1} />
// //           <Avatar position={position} velocity={velocity} />
// //           {/* Other components */}

// //           <Floor />
// //           {/* Add the walls around the floor */}
// //           <Wall floorSize={floorSize} side="top" />
// //           <Wall floorSize={floorSize} side="bottom" />
// //           <Wall floorSize={floorSize} side="left" />
// //           <Wall floorSize={floorSize} side="right" />
// //           {/* Render the first Door at one position */}
// //           <Door
// //             position={[-40, 2.5, -47]}
// //             rotation={[0, 8, 0]}
// //             scale={[0.02, 0.02, 0.02]}
// //           />

// //           {/* Render the second Door at another position */}
// //           <Door
// //             position={[40, 3, -30]}
// //             rotation={[0, 8, 0]}
// //             scale={[0.02, 0.02, 0.02]}
// //           />
// //           {/* Multiple Rows (Columns) of Shopping Racks */}
// //           {Array.from({ length: numRows }).map((_, rowIndex) =>
// //             Array.from({ length: numRacksPerRow }).map((_, colIndex) => {
// //               const rackNumber = rowIndex * numRacksPerRow + colIndex;

// //               return (
// //                 <ShoppingRack
// //                   key={`rack-${rackNumber}`}
// //                   position={[
// //                     colIndex * rackSpacing -
// //                       ((numRacksPerRow - 1) * rackSpacing) / 2, // X-axis: Horizontal alignment
// //                     0, // Y-axis: Height remains the same
// //                     rowIndex * rowSpacing - ((numRows - 1) * rowSpacing) / 4, // Z-axis: Vertical alignment
// //                   ]}
// //                   rackNumber={rackNumber} // Pass the unique number to the ShoppingRack component
// //                 />
// //               );
// //             })
// //           )}
// //           {/* Create multiple BillingCounters in a row */}
// //           {Array.from({ length: numCounters }).map((_, index) => (
// //             <BillingCounter
// //               key={`counter-${index}`}
// //               position={[-40 + index * counterSpacing, 0, -40]} // Adjust positions so they align in a row
// //               counterNumber={index + 1} // Pass the counter number to each counter
// //             />
// //           ))}
// //           <OrbitControls />
// //         </Canvas>
// //       )}
// //     </div>
// //   );
// // };

// // export default Map;

// //for routes
// import React, { useState } from "react";
// import "../App.css";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import Floor from "./Floor";
// import Avatar from "./Avatar";
// import Wall from "./Wall";
// import ShoppingRack from "./ShoppingRack";
// import Door from "./Door";
// import BillingCounter from "./BillingCounter";
// import SensorPermission from "./SensorPermission";
// import Loading from "./Loading";

// const Map = () => {
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
//         <Canvas
//           camera={{ position: [0, 20, 20], fov: 60 }}
//           onPointerMissed={handleMapLoaded}
//         >
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

// export default Map;

///This is the good final code
import React, { useState } from "react";
import "../App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Floor from "./Floor";
import Avatar from "./Avatar";
import Wall from "./Wall";
import ShoppingRack from "./ShoppingRack";
import Door from "./Door";
import BillingCounter from "./BillingCounter";
import SensorPermission from "./SensorPermission";
import Loading from "./Loading";

const Map = ({ isPermissionGranted, setIsPermissionGranted }) => {
  console.log("Map component rendered");

  const [isLoading, setIsLoading] = useState(true);
  const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const floorSize = [88, 100];

  console.log("Current State:", {
    isLoading,
    isPermissionGranted,
    velocity,
    position,
  });

  // For ShoppingRack
  const numRacksPerRow = 12;
  const numRows = 7;
  const rackSpacing = 8;
  const rowSpacing = 9;
  const numCounters = 9;
  const counterSpacing = 10;

  const handleMapLoaded = () => {
    console.log("Map loaded successfully");
    setIsLoading(false);
  };

  const onPermissionGranted = (newVelocity, newPosition) => {
    console.log("Permission granted. Updating velocity and position.", {
      newVelocity,
      newPosition,
    });
    setVelocity(newVelocity);
    setPosition(newPosition);
    setIsPermissionGranted(true);
    setIsLoading(false);
  };

  return (
    <div>
      {/* SensorPermission component */}
      <SensorPermission onPermissionGranted={onPermissionGranted} />
      {isLoading && <Loading />}
      {isPermissionGranted && (
        <Canvas
          camera={{ position: [0, 20, 20], fov: 60 }}
          // onPointerMissed={handleMapLoaded}
        >
          {/* Lights */}
          <ambientLight />
          <pointLight position={[10, 20, 10]} intensity={1} />
          {/* Avatar */}
          {/* <Avatar position={position} velocity={velocity} />
          console.log("Rendering Avatar at position:", position); */}
          {/* Floor */}
          <Floor />
          console.log("Rendering Floor with size:", floorSize);
          {/* Walls */}
          <Wall floorSize={floorSize} side="top" />
          <Wall floorSize={floorSize} side="bottom" />
          <Wall floorSize={floorSize} side="left" />
          <Wall floorSize={floorSize} side="right" />
          console.log("Rendering Walls with floor size:", floorSize);
          {/* Doors */}
          <Door
            position={[-40, 2.5, -47]}
            rotation={[0, 8, 0]}
            scale={[0.02, 0.02, 0.02]}
          />
          <Door
            position={[40, 3, -30]}
            rotation={[0, 8, 0]}
            scale={[0.02, 0.02, 0.02]}
          />
          console.log("Rendering Doors at positions:", [-40, 2.5, -47], [40, 3,
          -30]);
          {/* Shopping Racks */}
          {Array.from({ length: numRows }).map((_, rowIndex) =>
            Array.from({ length: numRacksPerRow }).map((_, colIndex) => {
              const rackNumber = rowIndex * numRacksPerRow + colIndex;
              const rackPosition = [
                colIndex * rackSpacing -
                  ((numRacksPerRow - 1) * rackSpacing) / 2,
                0,
                rowIndex * rowSpacing - ((numRows - 1) * rowSpacing) / 4,
              ];

              console.log(
                `Rendering ShoppingRack ${rackNumber} at position:`,
                rackPosition
              );

              return (
                <ShoppingRack
                  key={`rack-${rackNumber}`}
                  position={rackPosition}
                  rackNumber={rackNumber}
                />
              );
            })
          )}
          {/* Billing Counters */}
          {Array.from({ length: numCounters }).map((_, index) => {
            const counterPosition = [-40 + index * counterSpacing, 0, -40];
            console.log(
              `Rendering BillingCounter ${index + 1} at position:`,
              counterPosition
            );

            return (
              <BillingCounter
                key={`counter-${index}`}
                position={counterPosition}
                counterNumber={index + 1}
              />
            );
          })}
          {/* OrbitControls */}
          <OrbitControls />
          console.log("Rendering OrbitControls");
        </Canvas>
      )}
    </div>
  );
};

export default Map;
