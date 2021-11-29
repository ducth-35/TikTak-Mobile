import { StyleSheet } from "react-native";
import { Colors, actuatedNormalize, FontFamily } from '@/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: actuatedNormalize(20),
        paddingRight: actuatedNormalize(20)
    },
    title: {
        color: Colors.TEXT2,
        fontFamily: FontFamily.TitilliumWeb.SemiBold
    },
    leftContainer: {
        flex: 1,
        // padding: actuatedNormalize(15),
        justifyContent: 'center'
    },
    input: {
        fontFamily: FontFamily.TitilliumWeb.Regular,
        fontSize: actuatedNormalize(16),
        color: Colors.DARK_GREY,
        paddingHorizontal: actuatedNormalize(15)
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
    rightContainer: {
        height: '100%',
        width: actuatedNormalize(100),
        backgroundColor: Colors.BLUE,
        borderTopRightRadius: 8,
        borderBottomEndRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: actuatedNormalize(20),
        height: actuatedNormalize(20),
        marginRight: actuatedNormalize(10)
    }
});