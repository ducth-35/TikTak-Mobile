import { Colors, actuatedNormalize, STATUSBAR_HEIGHT, FontFamily } from "@/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY
    },
    navHead: {
        backgroundColor: Colors.SECONDARY,
        height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
        justifyContent: 'space-between'
    },
    title: {
        marginTop: actuatedNormalize(30),
        fontFamily: FontFamily.TitilliumWeb.Regular,
        fontSize: actuatedNormalize(13),
        color: '#F2F5FA',
    },
    inputContainer: {
        width: '100%',
        minHeight: actuatedNormalize(48),
        backgroundColor: Colors.NEUTURAL11,
        borderRadius: 8,
        marginTop: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        fontFamily: FontFamily.TitilliumWeb.Regular,
        fontSize: actuatedNormalize(16),
        color: Colors.WHITE,
        paddingHorizontal: actuatedNormalize(15)
    },
    avatarContainer: {
        marginTop: actuatedNormalize(30),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewContainer: {
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarContainerView: {
        width: actuatedNormalize(200),
        height: actuatedNormalize(200)
    },
    navRightButton: {
        width: actuatedNormalize(40),
        height: actuatedNormalize(40),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
})