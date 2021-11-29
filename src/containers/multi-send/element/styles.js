import { Colors, STATUSBAR_HEIGHT, actuatedNormalize } from "@/themes";
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
    btnSelect: {
        backgroundColor: Colors.SECONDARY,
        borderRadius: 5,
        marginTop: actuatedNormalize(20),
        height: actuatedNormalize(80),
        borderWidth: 1,
        borderColor: Colors.DARK_GREY, 
        flexDirection: 'row'
    },
    avatarContainer: {
        width: actuatedNormalize(55),
        height: actuatedNormalize(55),
        borderRadius: actuatedNormalize(30),
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center'
    }
})