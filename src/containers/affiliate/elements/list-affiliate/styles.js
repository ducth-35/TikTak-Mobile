import { actuatedNormalize, FontFamily } from "@/themes";
import { StyleSheet } from "react-native";
import { Colors } from "@/themes";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        flexDirection: 'row',
        width: actuatedNormalize(336),
        height: actuatedNormalize(50),
        alignItems: "center",
        marginHorizontal: actuatedNormalize(20)
    },
    title: {
       color: Colors.TEXT2,
       fontFamily:FontFamily.TitilliumWeb.SemiBold
    },
    leftText: {
        flex: 1,
        justifyContent: "space-between"
    },
    rightImg: {
        justifyContent: "flex-start",
       
    },
    containerStyle: {
        marginLeft: actuatedNormalize(20),
        marginRight: actuatedNormalize(20),
        backgroundColor:  '#293244'
    }
});