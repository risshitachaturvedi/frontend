import React, { useState, useEffect } from "react";
import Avatar from "./Avatar"; // Import Avatar component

const SensorPermission = ({ setIsPermissionGranted }) => {
  // const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [sensorData, setSensorData] = useState({
    accelerometer: { x: 0, y: 0, z: 0 },
    gyroscope: { alpha: 0, beta: 0, gamma: 0 },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(true);

  // Request permission for device sensors
  const requestPermission = () => {
    if (window.DeviceMotionEvent && window.DeviceOrientationEvent) {
      setIsDialogOpen(false);
      setIsPermissionGranted(true);
      startSensorUpdates();
    } else {
      alert("Sensors are not supported on this device.");
    }
  };

  // Start listening to sensor data
  const startSensorUpdates = () => {
    if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", handleMotionEvent, true);
    }

    if (window.DeviceOrientationEvent) {
      window.addEventListener(
        "deviceorientation",
        handleOrientationEvent,
        true
      );
    }
  };

  // Handle accelerometer and gyroscope data
  const handleMotionEvent = (event) => {
    const acceleration = event.acceleration || {};
    const rotationRate = event.rotationRate || {};
    setSensorData((prevData) => ({
      ...prevData,
      accelerometer: acceleration,
      gyroscope: rotationRate,
    }));
  };

  const handleOrientationEvent = (event) => {
    const { alpha, beta, gamma } = event;
    setSensorData((prevData) => ({
      ...prevData,
      gyroscope: { alpha, beta, gamma },
    }));
  };

  useEffect(() => {
    return () => {
      if (window.DeviceMotionEvent) {
        window.removeEventListener("devicemotion", handleMotionEvent);
      }
      if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", handleOrientationEvent);
      }
    };
  }, []);

  return (
    <div>
      {isDialogOpen && !isPermissionGranted && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Permission Request</h2>
            <p className="mb-4 text-gray-600">
              This app needs permission to access your device's sensors
              (Accelerometer, Gyroscope, and Magnetometer).
            </p>
            <button
              onClick={requestPermission}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Grant Permission
            </button>
          </div>
        </div>
      )}
      {isPermissionGranted && <Avatar sensorData={sensorData} />}
    </div>
  );
};

export default SensorPermission;

// import { useState, useEffect } from "react";
// import "tailwindcss";

// const SensorPermission = ({ onPermissionGranted }) => {
//   const [permission, setPermission] = useState(null); // Start with null

//   useEffect(() => {
//     if (
//       "DeviceMotionEvent" in window &&
//       typeof DeviceMotionEvent.requestPermission === "function"
//     ) {
//       setPermission(null); // Ensure state is not pre-set to denied
//     }
//   }, []);

//   const requestPermission = async () => {
//     const response = await DeviceMotionEvent.requestPermission();
//     if (response === "granted") {
//       setPermission("granted");
//       onPermissionGranted();
//     } else {
//       setPermission("denied");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       {permission === null && (
//         <button
//           onClick={requestPermission}
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Allow Sensor Access
//         </button>
//       )}
//       {permission === "denied" && (
//         <div className="text-center">
//           <p className="text-red-500 mb-4">
//             Permission denied. Please allow sensor access.
//           </p>
//           <button
//             onClick={requestPermission}
//             className="px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Try Again
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SensorPermission;

// import { useState, useEffect } from "react";
// import "tailwindcss";

// const SensorPermission = ({ onPermissionGranted }) => {
//   const [permission, setPermission] = useState(null); // Start with null
//   const [showDialog, setShowDialog] = useState(false); // To toggle dialog visibility

//   useEffect(() => {
//     if (
//       "DeviceMotionEvent" in window &&
//       typeof DeviceMotionEvent.requestPermission === "function"
//     ) {
//       setPermission(null); // Ensure state is not pre-set to denied
//     }
//   }, []);

//   const requestPermission = async () => {
//     const response = await DeviceMotionEvent.requestPermission();
//     if (response === "granted") {
//       setPermission("granted");
//       onPermissionGranted();
//     } else {
//       setPermission("denied");
//     }
//   };

//   const handleYesClick = () => {
//     setShowDialog(false);
//     requestPermission(); // Trigger permission request after user agrees
//   };

//   const handleNoClick = () => {
//     setShowDialog(false);
//     // Show try again button after denying
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       {permission === null && showDialog && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg w-80 text-center">
//             <p className="mb-4 text-gray-700">
//               This permission is needed to access your phone's sensors. If you
//               grant access, you will be directed to the map. Do you want to
//               proceed?
//             </p>
//             <div className="flex justify-around">
//               <button
//                 onClick={handleYesClick}
//                 className="px-4 py-2 bg-green-500 text-white rounded"
//               >
//                 Yes
//               </button>
//               <button
//                 onClick={handleNoClick}
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Display response message */}
//       {/* {responseMessage && (
//         <div className="text-center mb-4">
//           <p className="text-lg">{responseMessage}</p>
//         </div>
//       )} */}

//       {permission === "denied" && (
//         <div className="text-center">
//           <p className="text-red-500 mb-4">
//             Permission denied. Please allow sensor access.
//           </p>
//           <button
//             onClick={() => setShowDialog(true)} // Show dialog to try again
//             className="px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Try Again
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SensorPermission;
