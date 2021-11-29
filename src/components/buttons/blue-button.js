import React from 'react';
import { Text } from 'react-native';

import TouchableX from '../touchable';
import { Colors } from '@/themes';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const BlueButton = ({
  title,
  onPress,
  name,
  type,
  containerStyle = {},
  isActive = true,
  disabled = false,
  activeBackgroundColor,
  activeTextcolor
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
              : Colors.BLUE
            : '#212529',
        },
      ]}
      disabled={disabled}
      onPress={onPress}>
      <FontAwesome5
        name={name}
        style={{marginRight:10}}
        color={ type ? "white" : 'white'}
        size={20}
      />
      <Text
        style={[
          styles.text,
          {
            color: isActive
              ? activeTextcolor
                ? activeTextcolor
                : Colors.WHITE
              : Colors.GREY,
          }
        ]}>{title}</Text>
    </TouchableX>
  );
};
