// import { useEffect, useState } from 'react';
// import * as Location from 'expo-location';

// export default function useLocation() {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     try {
//       (async () => {
//         const { granted } = await Location.requestForegroundPermissionsAsync();
//         if (!granted) {
//           return;
//         }
//         const result = await Location.getLastKnownPositionAsync();
//         const latitude = result.coords.latitude;
//         const longitude = result.coords.longitude;

//         setLocation({ latitude, longitude });
//       })();
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);

//   return location;
// }
