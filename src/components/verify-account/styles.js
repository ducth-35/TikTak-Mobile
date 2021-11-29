import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily, STATUSBAR_HEIGHT } from '@/themes';

export const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: Colors.PRIMARY,
    },
    navHeader: {
        backgroundColor: Colors.SECONDARY,
        height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
    },
    containers: {
        height: actuatedNormalize(250),
        borderRadius: 8,
        backgroundColor: Colors.SECONDARY,
        margin: actuatedNormalize(10),
        padding: actuatedNormalize(10)
    },
    text1: {
        color: Colors.BLUE,
        fontFamily: FontFamily.TitilliumWeb.SemiBold
    },
    NextButton: {
        width: undefined,
        marginTop: actuatedNormalize(30),
        marginHorizontal: actuatedNormalize(20)
    }
})