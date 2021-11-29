import { StyleSheet } from "react-native";
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
    text: {
        color: Colors.WHITE,
        fontSize: 14
    },
    containers: {
        borderRadius: 8,
        backgroundColor: Colors.SECONDARY,
        margin: actuatedNormalize(10),
        padding: actuatedNormalize(10)
    },
    text1: {
        color: Colors.BLUE,
        fontFamily: FontFamily.TitilliumWeb.SemiBold
    },
    textTitle: {
        color: Colors.WHITE,
        fontFamily: FontFamily.TitilliumWeb.SemiBold
    },
    containerTitle: {
        padding: actuatedNormalize(10),
        textAlign: "center",
    },
    content: {
        color: Colors.GREY,
        fontFamily: FontFamily.TitilliumWeb.Regular
    },
    NextButton: {
        width: undefined,
        marginTop: actuatedNormalize(30),
        marginHorizontal: actuatedNormalize(20)
    }

});