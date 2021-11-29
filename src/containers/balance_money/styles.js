import { StyleSheet } from "react-native";
import { Colors, actuatedNormalize, FontFamily, STATUSBAR_HEIGHT } from '@/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navHeader: {
        backgroundColor: '#212529',
        height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
        justifyContent: 'space-between',
    },
    viewCoin: {
        backgroundColor: Colors.WHITE,
        borderRadius: 1,
        margin: actuatedNormalize(10)
    },
    text: {
        fontSize: actuatedNormalize(14),
        fontFamily: FontFamily.TitilliumWeb.SemiBold,

    },
    viewContainer: {
        padding: actuatedNormalize(10),
        flexDirection: 'row',
        alignItems: 'center'
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#212529",
        height: 50
    },
    columnHeader: {
        width: "33%",
        justifyContent: "center",
        alignItems: "center"
    },
    columnRowTxt: {
        width: "33%"
    },
    columnHeaderTxt: {
        color: "white",
        fontWeight: "bold",
    },
    tableRow: {
        flexDirection: "row",
        height: 70,
        alignItems: "center",
    },
    icon: {
        width: actuatedNormalize(40),
        height: actuatedNormalize(40),
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "31%"
    },
    text: {
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        fontSize: 12
    },
    checkbox: {
        alignSelf: "center",
      },
})