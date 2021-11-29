import { StyleSheet } from "react-native";
import { Colors, actuatedNormalize, FontFamily } from '@/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: actuatedNormalize(20)

    },
    title: {
        color: Colors.TEXT2,
        fontFamily: FontFamily.TitilliumWeb.SemiBold
    },
    leftContainer: {
        flex: 1,
        width: '100%',
        height: actuatedNormalize(48)
    },
    input: {
        fontFamily: FontFamily.TitilliumWeb.Regular,
        fontSize: actuatedNormalize(16),
        color: Colors.WHITE,
        backgroundColor: Colors.NEUTURAL11,
        paddingHorizontal: actuatedNormalize(15),
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
    inputContainer: {
        backgroundColor: '#293244',
        borderRadius: 8,
        height: actuatedNormalize(150)
    },
    rightContainer: {
        width: '100%',
        height: actuatedNormalize(48),
        backgroundColor: Colors.SECONDARY,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    image: {
        width: actuatedNormalize(20),
        height: actuatedNormalize(20),
        marginRight: actuatedNormalize(10)
    },
    buyButton: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: actuatedNormalize(10),
        width: 40,
        height: 40
    },

    icon: {
        width: actuatedNormalize(36),
        height: actuatedNormalize(36),
    },
    forgotPasswordBtn: {
        width: undefined,
        marginTop: actuatedNormalize(30),
        marginHorizontal: actuatedNormalize(20),
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
    share: {
        flexDirection: 'row',
        paddingHorizontal: actuatedNormalize(20),
        marginTop: actuatedNormalize(30),
        height: actuatedNormalize(86),
    },
    btnSend: {
        height: '100%',
        backgroundColor: Colors.GREY,
        borderTopRightRadius: 8,
        borderBottomEndRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});