import { StyleSheet } from "react-native";
import {
    Colors,
    actuatedNormalize,
    FontFamily,
    STATUSBAR_HEIGHT,
} from "@/themes";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
    },
    navHeader: {
        backgroundColor: Colors.SECONDARY,
        height: actuatedNormalize(88) - STATUSBAR_HEIGHT
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

    title: {
        marginTop: actuatedNormalize(15),
        fontFamily: FontFamily.TitilliumWeb.Regular,
        fontSize: actuatedNormalize(13),
        color: '#F2F5FA',
    },
    input: {
        minWidth: "48%",
        paddingHorizontal: actuatedNormalize(15),
        marginTop: actuatedNormalize(10),
        borderRadius: 8,
        backgroundColor: Colors.NEUTURAL11,
        marginHorizontal: "1%",
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        fontSize: actuatedNormalize(15),
        color: Colors.WHITE,
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    rightContainer: {
        height: '100%',
        borderTopRightRadius: 8,
        borderBottomEndRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 21,

    },
    textInput: {
        fontFamily: FontFamily.TitilliumWeb.Regular,
        fontSize: actuatedNormalize(16),
        color: Colors.WHITE,
        paddingHorizontal: actuatedNormalize(15)
    },
    content: {
        marginHorizontal: actuatedNormalize(15),
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        fontSize: actuatedNormalize(15),
        color: Colors.TEXT2
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    options: {
        flexDirection: 'row'
    },
    gender:{
        flex:1,
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: Colors.NEUTURAL11,
        marginRight: actuatedNormalize(10),
        height: actuatedNormalize(48)
    },
    date: {
        flex:1,
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: Colors.NEUTURAL11,
        height: actuatedNormalize(48),
    }

})