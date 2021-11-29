import React from 'react';
import { Text } from 'react-native';

import TouchableX from '../touchable';
import { Colors } from '@/themes';

import styles from './styles';

export const GreenButton = ({
  title,
  onPress,
  containerStyle = {},
  isActive = true,
  activeBackgroundColor,
}) => {
  return (
    <TouchableX
      style={[
        styles.container,
        containerStyle,
        {
          backgroundColor: isActive
            ? activeBackgroundColor
              ? activeBackgroundColor
              : Colors.GREEN
            : Colors.DARK_GREY,
        },
      ]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableX>
  );
};
