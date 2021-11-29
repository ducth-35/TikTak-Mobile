import { Colors } from '@/themes';
import React from 'react'
import { Text, View, Image } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableX } from '../';
import { styles } from './styles';

export const Menu = ({ onshowMenu }) => {
    return (
        <View>
            <TouchableX style={styles.navRightButton} onPress={onshowMenu}>
                <FontAwesome5 name="bars" color={Colors.WHITE} size={25} />
            </TouchableX>
        </View>
    )
}
