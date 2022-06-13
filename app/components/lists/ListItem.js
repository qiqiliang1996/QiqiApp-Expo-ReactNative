import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Text from '../Text';
import colors from '../../config/colors';

function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  onImagePress,
  renderRightActions,
  left,
  right,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}

          {image && (
            <TouchableWithoutFeedback onPress={onImagePress}>
              <Image style={styles.image} source={image} />
            </TouchableWithoutFeedback>
          )}

          <View style={styles.detailsContainer}>
            {title && (
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
            )}
            {subTitle && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </Text>
            )}
          </View>
          {left && (
            <MaterialCommunityIcons
              color={colors.medium}
              name='chevron-left'
              size={25}
            />
          )}
          {right && (
            <MaterialCommunityIcons
              color={colors.medium}
              name='chevron-right'
              size={25}
            />
          )}
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: '500',
  },
});

export default ListItem;
