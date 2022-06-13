import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import GlobalContext from '../contexts/GlobalContext';
import Avatar from './Avatar';

export default function ContactListItem({
  style,
  type,
  image,
  user,
  room,
  description,
  time,
}) {
  const navigation = useNavigation();
  const { colors } = useContext(GlobalContext);

  return (
    <TouchableOpacity
      style={{ height: 80, ...style }}
      onPress={() => {
        navigation.navigate('ChatScreen', { user, room, image });
      }}
    >
      <Grid style={{ maxHeight: 80 }}>
        <Col
          style={{ width: 80, alignItems: 'center', justifyContent: 'center' }}
        >
          <Avatar user={user} size={type === 'contacts' ? 40 : 50} />
        </Col>
        {/* // */}
        {/* // */}
        <Col style={{ marginLeft: 5 }}>
          <Row style={{ alignItems: 'center' }}>
            <Col>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: colors.skyblue,
                }}
              >
                {user.contactName || user.name || 'User Random'}
              </Text>
            </Col>
            {time && (
              <Col style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: colors.medium, fontSize: 11 }}>
                  {new Date(time.seconds * 1000).toLocaleDateString()}
                </Text>
              </Col>
            )}
          </Row>
          {description && (
            <Row style={{ marginTop: -5 }}>
              <Text style={{ color: colors.medium, fontSize: 13 }}>
                {description}
              </Text>
            </Row>
          )}
        </Col>
      </Grid>
    </TouchableOpacity>
  );
}
