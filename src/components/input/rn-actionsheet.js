import { actuatedNormalize, Colors } from '@/themes';
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableX } from '..';
import styles from './styles';

export const RNActionSheet = ({
    textname,
    onPress,
    value,
    onChangeText
}) => {
    return (
        <View>
            <Text style={[styles.title, { marginTop: actuatedNormalize(20), color: Colors.WHITE }]}>{textname}</Text>
            <TouchableX style={styles.positionTitle} onPress={onPress} >
                <View style={styles.inputContainer2}>
                    <View style={[styles.leftContainer]}>
                        <TextInput
                            style={[styles.input, { color: Colors.WHITE }]}
                            editable={false}
                            value={value}
                            onChangeText={onChangeText}
                        />
                    </View>
                    <View style={styles.expanButton}>
                        <FontAwesome5
                            name={'chevron-down'}
                            color="grey"
                            size={15}
                        />
                    </View>
                </View>
            </TouchableX>
        </View>
    );
}

export const Deposit = ({
    textname,
    onPress,
    value,
    onChangeText
}) => {
    return (
        <View>
            <Text style={[styles.title, { marginTop: actuatedNormalize(20), color: Colors.DARK }]}>{textname}</Text>
            <TouchableX style={styles.positionTitle} onPress={onPress} >
                <View style={styles.inputContainer2}>
                    <View style={[styles.leftContainer]}>
                        <TextInput
                            style={[styles.input, { color: Colors.DARK }]}
                            editable={false}
                            value={value}
                            onChangeText={onChangeText}
                        />
                    </View>
                    <View style={styles.expanButton}>
                        <FontAwesome5
                            name={'copy'}
                            color="white"
                            size={15}
                        />
                    </View>
                </View>
            </TouchableX>
        </View>
    );
}
