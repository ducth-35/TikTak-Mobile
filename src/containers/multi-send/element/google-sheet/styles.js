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
    tittle: {
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        color: Colors.WHITE
    },
    sheetNameInput: {
      marginBottom: actuatedNormalize(10)
    },
    continueButton: {
        width: undefined,
        marginTop: actuatedNormalize(30),
        marginHorizontal: actuatedNormalize(20),
    },
})