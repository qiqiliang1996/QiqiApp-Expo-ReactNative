import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ListingEditScreen from '../screens/ListingEditScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FeedNavigator from './FeedNavigator';
import AccountNavigator from './AccountNavigator';
import NewListingButton from './NewListingButton';
import routes from './routes';
const Tab = createMaterialBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Feed'
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='email' size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name='ListingEdit'
        component={ListingEditScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate(routes.LISTING_EDIT)}
            />
          ),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='camera' color={color} size={20} />
          ),
        })}
      />
      <Tab.Screen
        name='Account'
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='lock' size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
