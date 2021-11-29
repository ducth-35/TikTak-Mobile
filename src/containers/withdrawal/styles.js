import { StyleSheet } from 'react-native';
import {
    Colors,
    actuatedNormalize,
    FontFamily,
    STATUSBAR_HEIGHT,
} from '@/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navHead: {
        backgroundColor: '#212529',
        height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
    },
    headerText: {
        marginHorizontal: actuatedNormalize(20),
        marginVertical: actuatedNormalize(20),
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        fontSize: actuatedNormalize(15),
        color: Colors.DARK,
    },
    withdrawalButton: {
        width: undefined,
        marginTop: actuatedNormalize(30),
        marginHorizontal: actuatedNormalize(20),
    },
});