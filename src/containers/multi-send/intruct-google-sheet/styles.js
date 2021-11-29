import { Colors, FontFamily, STATUSBAR_HEIGHT, actuatedNormalize } from "@/themes";
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
        color: Colors.WHITE,
        fontFamily: FontFamily.TitilliumWeb.SemiBold
    }
})