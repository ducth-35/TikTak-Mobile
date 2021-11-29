import { StyleSheet } from 'react-native';
import {
    Colors,
    actuatedNormalize,
    FontFamily,
    STATUSBAR_HEIGHT,
} from '@/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
    },
    navHeader: {
        backgroundColor: Colors.SECONDARY,
        height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
    },
    containers: {
        height: actuatedNormalize(200), 
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
    },
    textTitle: {
        color: Colors.WHITE,
        fontFamily: FontFamily.TitilliumWeb.SemiBold
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        width: '100%',
        marginHorizontal: actuatedNormalize(20),
        borderRadius: actuatedNormalize(15),
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
    },

    mailbox: {
        marginTop: actuatedNormalize(30),
        width: actuatedNormalize(98),
        height: actuatedNormalize(110),
    },

    popupTitle: {
        marginTop: actuatedNormalize(20),
        fontFamily: FontFamily.TitilliumWeb.Bold,
        fontSize: actuatedNormalize(18),
        lineHeight: actuatedNormalize(24),
        textAlign: 'center',
        color: Colors.SECONDARY,
        marginHorizontal: actuatedNormalize(20),
    },

    popupMessage: {
        marginHorizontal: actuatedNormalize(20),
        marginTop: actuatedNormalize(12),
        fontFamily: FontFamily.TitilliumWeb.Regular,
        fontSize: actuatedNormalize(14),
        lineHeight: actuatedNormalize(18),
        textAlign: 'center',
        color: Colors.GREY,
    },
    okBtn: {
        width: '80%',
        marginVertical: actuatedNormalize(30),
    },
    
})