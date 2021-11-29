import { Colors, STATUSBAR_HEIGHT, actuatedNormalize, FontFamily } from "@/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY
    },
    navHead: {
        backgroundColor: Colors.SECONDARY,
        height: actuatedNormalize(88) - STATUSBAR_HEIGHT
    },
    title: {
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        color: Colors.WHITE
    },
    inputContainer: {
        minHeight: actuatedNormalize(58),
        backgroundColor: Colors.NEUTURAL11,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.SECONDARY,
        marginTop: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: actuatedNormalize(10)
    },
    leftContainer: {
        flex: 1,
        // padding: actuatedNormalize(15),
        justifyContent: 'center'
    },
    input: {
        fontFamily: FontFamily.TitilliumWeb.Regular,
        fontSize: actuatedNormalize(16),
        color: Colors.DARK_GREY,
        paddingHorizontal: actuatedNormalize(15)
    },
    rightContainer: {
        height: '100%',
        width: actuatedNormalize(100),
        backgroundColor: Colors.SECONDARY,
        borderTopRightRadius: 8,
        borderBottomEndRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    continueButton: {
        width: undefined,
        marginTop: actuatedNormalize(30),
        marginHorizontal: actuatedNormalize(20),
    },
})