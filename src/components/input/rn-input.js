import { Colors, actuatedNormalize } from '@/themes';
import React from 'react';
import { View, TextInput, Text, Image } from 'react-native';
import styles from './styles';



export const RNInput = ({
    textname,
    value,
    containerStyle,
    placeholder,
    onChangeText,
    placeholderTextColor,
    editable,
    onPress,
    ...otherInputProps
}) => {
    return (
        <View>
            <Text style={[styles.title, { marginTop: actuatedNormalize(20), color: Colors.WHITE }]}>{textname}</Text>
            <View style={[styles.container, containerStyle]}>
                <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        onChangeText={onChangeText}
                        value={value}
                        editable={editable}
                        placeholderTextColor={placeholderTextColor}
                        clearButtonMode="while-editing"
                        {...otherInputProps}
                    />
                </View>
            </View>
        </View>
    )
}