import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import ListingsScreen from '../screens/ListingsScreen';
import { useContext } from 'react';
import AuthContext from '../auth/context';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();
export default function FeedNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {!user.displayName && <Stack.Screen name='Profile' component={Profile} />}
      <Stack.Screen
        name='Listings'
        component={ListingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ListingDetails'
        component={ListingDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
