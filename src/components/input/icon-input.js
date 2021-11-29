import React from 'react';
import { View, TextInput, Image, Text } from 'react-native';

import { Colors, actuatedNormalize } from '@/themes';

import styles from './styles';

export const IconInput = ({
  containerStyle,
  icon,
  placeholder,
  placeholderColor,
  onChangeText,
  textname,
  ...otherInputProps
}) => {

  return (
    <View>
      <Text style={[styles.title, { marginTop: actuatedNormalize(20) }]}>{textname}</Text>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.row}>
          <Image style={styles.icon} source={icon} resizeMode="contain" />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            onChangeText={onChangeText}
            placeholderTextColor={placeholderColor}
            clearButtonMode="while-editing"
            {...otherInputProps}
          />
        </View>
      </View>
    </View>

  );
};
