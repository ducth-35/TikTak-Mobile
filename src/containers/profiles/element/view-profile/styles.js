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
        backgroundColor: Colors.PRIMARY
    },
    navHeader: {
        backgroundColor: Colors.SECONDARY,
        height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
    },
    title: {
        marginTop: actuatedNormalize(15),
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
    inputContainer2: {
        minWidth: "48%",
        paddingHorizontal: actuatedNormalize(15),
        paddingVertical: actuatedNormalize(16),
        marginTop: actuatedNormalize(10),
        borderRadius: 8,
        backgroundColor: Colors.NEUTURAL11,
        marginHorizontal: "1%",
        textAlign: "center",
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        fontSize: actuatedNormalize(16),
        color: Colors.WHITE,
        paddingHorizontal: actuatedNormalize(15)
    }

})