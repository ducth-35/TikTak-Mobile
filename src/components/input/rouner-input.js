import React from 'react';
import { View, TextInput, Text, Image } from 'react-native';

import { Colors, actuatedNormalize } from '@/themes';

import styles from './styles';

export const RounerInput = ({
  placeholder,
  title,
  icon,
  onChangeText,
  placeholderColor,
  containerStyle = {},
  ...otherInputProps
}) => {
  return (
    <View style={[styles.rounerContainer, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <Image style={[styles.icon, {marginLeft: actuatedNormalize(10), marginRight: actuatedNormalize(10)}]} source={icon} resizeMode="contain" />
        <TextInput
          style={styles.rounerInput}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={placeholderColor}
          placeholderTextColor={Colors.GREY}
          clearButtonMode="while-editing"
          {...otherInputProps}
        />
      </View>
    </View>
  );
};
