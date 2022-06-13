import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GlobalContext from '../contexts/GlobalContext';
import { useNavigation } from '@react-navigation/native';
export default function ContactsFloatingIcon() {
  const { colors } = useContext(GlobalContext);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Contact')}
      style={{
        position: 'absolute',
        right: 20,
        bottom: 20,
        borderRadius: 60,
        width: 60,
        height: 60,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MaterialCommunityIcons
        name='android-messages'
        size={30}
        color='white'
        style={{ transform: [{ scaleX: -1 }] }}
      />
    </TouchableOpacity>
  );
}