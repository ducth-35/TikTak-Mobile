import { actuatedNormalize, Colors, FontFamily, STATUSBAR_HEIGHT } from "@/themes";
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
    scrollview: {
        flex: 1
    },
    contentContainerStyle: {
        paddingHorizontal: actuatedNormalize(10)
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: Colors.SECONDARY,
        justifyContent: 'space-between',
        marginTop: actuatedNormalize(15)
    },
    itemLeftContainer: {
        flex: 1,
        padding: actuatedNormalize(15) - 3
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        fontSize: actuatedNormalize(14),
        color: '#F2F5FA',
    },
    line: {
        height: 1,
        backgroundColor: '#293244',
        marginTop: 20,
        paddingHorizontal: 10
    },
    continueButton: {
        width: undefined,
        marginVertical: actuatedNormalize(15)
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
    inputContainer: {
        width: '100%',
        height: actuatedNormalize(45),
        backgroundColor: Colors.NEUTURAL11,
        borderRadius: 8,
        marginTop: 7,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        fontFamily: FontFamily.TitilliumWeb.Regular,
        fontSize: actuatedNormalize(16),
        color: Colors.WHITE,
    },
});