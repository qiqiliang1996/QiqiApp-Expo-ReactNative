import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatHeader from '../components/ChatHeader';
import AccountScreen from '../screens/AccountScreen';
import ChatScreen from '../screens/ChatScreen';
import Chats from '../screens/Chats';
import ContactScreen from '../screens/ContactScreen';

const Stack = createNativeStackNavigator();
export default function AccountNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='UserAccount' component={AccountScreen} />
      <Stack.Screen name='Chats' component={Chats} />
      <Stack.Screen name='Contact' component={ContactScreen} />

      <Stack.Screen
        name='ChatScreen'
        component={ChatScreen}
        options={{
          headerTitle: (props) => <ChatHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
}
