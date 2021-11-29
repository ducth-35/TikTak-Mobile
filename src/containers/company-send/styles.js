import { Colors, STATUSBAR_HEIGHT, actuatedNormalize, FontFamily } from "@/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY
    },
    navHead: {
        backgroundColor: Colors.SECONDARY,
        height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
        justifyContent: 'space-between'
    },
    navRightButton: {
        width: actuatedNormalize(40),
        height: actuatedNormalize(40),
        justifyContent: 'center',
        alignItems: 'flex-end'
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
        borderRadius: 8,
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
        color: Colors.TEXT2,
    },
    searchContainer: {
        marginTop: actuatedNormalize(10),
        borderColor: Colors.SECONDARY,
        paddingVertical: actuatedNormalize(15)
    },
    inputContainer: {
        width: '100%',
        height: actuatedNormalize(58),
        backgroundColor: Colors.NEUTURAL11,
        borderRadius: 8,
        marginTop: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    searchTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        width: actuatedNormalize(18),
        height: actuatedNormalize(19),
        marginLeft: actuatedNormalize(20)
    },
    leftContainer: {
        flex: 1,
        paddingHorizontal: actuatedNormalize(15)
    },
    input: {
        fontSize: actuatedNormalize(16),
        fontFamily: FontFamily.TitilliumWeb.Regular,
        color: Colors.GREY
    },
    expandButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: actuatedNormalize(56),
        backgroundColor: Colors.SECONDARY,
        borderTopRightRadius: 8,
        borderBottomEndRadius: 8,
    },
    inputContainer1: {
        width: '50%',
        height: actuatedNormalize(58),
        backgroundColor: Colors.SECONDARY,
        borderRadius: 8,
        marginTop: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
});