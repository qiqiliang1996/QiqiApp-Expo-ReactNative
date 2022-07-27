import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import AuthNavigator from './app/navigation/AuthNavigator';
import AuthContext from './app/auth/context';
import { useEffect, useState } from 'react';
import authSecureStorage from './app/auth/authSecureStorage';
import GlobalContext from './app/contexts/GlobalContext';
import colors from './app/config/colors';
import * as SplashScreen from 'expo-splash-screen';
import BugsnagLogger from './app/utilities/logger';

BugsnagLogger.start();

LogBox.ignoreLogs([
  "exported from 'deprecated-react-native-prop-types'.",
  'Setting a timer',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
]);

export default function App() {
  const [user, setUser] = useState({ isReady: false });
  const [rooms, setRooms] = useState([]);
  const [unfilteredRooms, setUnfilteredRooms] = useState([]);

  useEffect(() => {
    const getUserFromCache = async () => {
      await SplashScreen.preventAutoHideAsync();
      const user = await authSecureStorage.getUser();

      if (user) {
        setUser({ ...user, isReady: true });
      } else {
        setUser({ isReady: true });
      }
    };
    getUserFromCache();
  }, []);

  if (!user.isReady) {
    return null;
  }

  return (
    <GlobalContext.Provider
      value={{ colors, rooms, setRooms, unfilteredRooms, setUnfilteredRooms }}
    >
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer
          theme={navigationTheme}
          onReady={async () => {
            await SplashScreen.hideAsync();
          }}
        >
          {user.user_id ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    </GlobalContext.Provider>
  );
}
