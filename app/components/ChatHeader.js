import { useRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import GlobalContext from '../contexts/GlobalContext';
import Avatar from './Avatar';

export default function ChatHeader() {
  const route = useRoute();
  const { colors } = useContext(GlobalContext);
  return (
    <View style={{ flexDirection: 'row' }}>
      <View>
        <Avatar size={30} user={route.params.user} />
      </View>
      <View
        style={{
          marginLeft: 15,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: colors.grey, fontSize: 18 }}>
          {route.params.user.contactName || route.params.user.displayName}
        </Text>
      </View>
    </View>
  );
}
