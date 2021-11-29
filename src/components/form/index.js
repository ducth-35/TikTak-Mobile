import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { TextInput } from 'react-native-element-textinput';
import { Colors, actuatedNormalize } from '@/themes';


export const FormLogin = ({
    textname,
    value,
    containerStyle,
    placeholder,
    onChangeText,
    placeholderTextColor,
    editable,
    onPress,
    icon,
    placeholderColor,
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
    )
}