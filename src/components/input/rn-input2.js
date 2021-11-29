import { actuatedNormalize, Colors } from '@/themes';
import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { TouchableX } from '..';
import styles from './styles';
import { ICO_ADDRESS_BOOK_INSIDE, ICO_TAB_QRCODE_INSIDE } from '@/common';


export const RNInput2 = ({
    textname,
    value,
    containerStyle,
    placeholder,
    onChangeText,
    placeholderTextColor,
    editable,
    onPressQRCode,
    onPressAdress,
    ...otherInputProps
}) => {
    return (
        <View>
            <Text style={[styles.title, { marginTop: actuatedNormalize(20)}]}>{textname}</Text>
            <View style={[styles.inputContainer, containerStyle]}>
                <View style={styles.leftContainer}>
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
    );
}

export const RNInput3 = ({
    value,
    containerStyle,
    placeholder,
    onChangeText,
    placeholderTextColor,
    editable,
    coinName,
    onPress,
    ...otherInputProps
}) => {
    return (
        <View>
            <View style={[styles.inputContainer, containerStyle]}>
                <View style={styles.leftContainer}>
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
                <View style={styles.rightContainer}>
                    <Text style={styles.rightButtonTitle}>
                        {coinName}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export const RNInput4 = ({
    textname,
    value,
    containerStyle,
    placeholder,
    onChangeText,
    placeholderTextColor,
    editable,
    coinName,
    onPress,
    ActivityIndicator,
    ...otherInputProps
}) => {
    return (
        <View>
            <Text style={[styles.title, { marginTop: actuatedNormalize(20)}]}>{textname}</Text>
            <View style={[styles.inputContainer, containerStyle]}>
                <View style={styles.leftContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        onChangeText={onChangeText}
                        value={value}
                        autoCapitalize="none"
                        autoCorrect={false}
                        editable={editable}
                        placeholderTextColor={placeholderTextColor}
                        clearButtonMode="while-editing"
                        {...otherInputProps}
                    />
                </View>
                {ActivityIndicator}
            </View>
        </View>
    );
}
