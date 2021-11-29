import React from 'react';
import { Text } from 'react-native';

import TouchableX from '../touchable';
import { Colors } from '@/themes';

import styles from './styles';

export const GreyButton = ({
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
              : Colors.DARK_GREY
            : Colors.DARK_GREY,
        },
      ]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableX>
  );
};
