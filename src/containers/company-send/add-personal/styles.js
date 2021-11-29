import { StyleSheet } from "react-native";
import { Colors, actuatedNormalize, STATUSBAR_HEIGHT, FontFamily } from "@/themes";

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
    searchContainer: {
        paddingHorizontal: actuatedNormalize(20),
        zIndex: 1
    },
    title: {
        marginTop: actuatedNormalize(30),
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
        width: '100%',
        height: actuatedNormalize(48),
        backgroundColor: Colors.NEUTURAL11,
        borderRadius: 8,
        marginTop: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        fontFamily: FontFamily.TitilliumWeb.Regular,
        fontSize: actuatedNormalize(16),
        color: Colors.WHITE,
        paddingHorizontal: actuatedNormalize(15)
    },
    scrollView: {
        flex: 1
    },
    contentScrollContainer: {
        paddingHorizontal: actuatedNormalize(20)
    },
    positionTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    expanButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: actuatedNormalize(56),
        backgroundColor: Colors.SECONDARY,
        borderTopRightRadius: 8,
        borderBottomEndRadius: 8,
    },
    leftContainer: {
        // flex: 1,
        // paddingTop: actuatedNormalize(10),
        // paddingRight: actuatedNormalize(15),
        // paddingLeft: actuatedNormalize(15),
        // paddingBottom: actuatedNormalize(10),
    },
    searchingContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: actuatedNormalize(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    isHideSearchResults: {
        position: 'absolute',
        width: '100%',
        zIndex: 1,
        alignItems: 'center',
        marginTop: actuatedNormalize(160)
    },
    searchItemContainer: {
        height: actuatedNormalize(40),
        justifyContent: 'center',
        padding: actuatedNormalize(10),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    content: {
        marginHorizontal: actuatedNormalize(15),
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        fontSize: actuatedNormalize(15),
        color: Colors.TEXT2
    }
})