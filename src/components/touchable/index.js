import React, { memo } from 'react';
import { InteractionManager, TouchableOpacity } from 'react-native';

const TouchableX = ({ onPress, activeOpacity = 0.8, ...other }) => {
  const _onPress = () => {
    InteractionManager.runAfterInteractions(() => {
      onPress && onPress();
    });
  };

  return (
    <TouchableOpacity
      onPress={_onPress}
      activeOpacity={onPress ? activeOpacity : 1}
      {...other}
    />
  );
};

export default memo(TouchableX);
