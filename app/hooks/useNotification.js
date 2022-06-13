// import * as Notifications from 'expo-notifications';
// import { useEffect, useRef } from 'react';
// import navigation from '../navigation/rootNavigation';
// import expoPushTokensApi from '../api/expoPushTokens';

// export default function useNotification() {
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   useEffect(() => {
//     registerForPushNotificationsAsync();

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         navigation.navigate('Account');
//       });

//     return () => {
//       Notifications.removeNotificationSubscription(
//         notificationListener.current
//       );
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   const registerForPushNotificationsAsync = async () => {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     const response = await Notifications.getExpoPushTokenAsync();
//     const token = response.data;
//     expoPushTokensApi.register(token);
//   };
// }
