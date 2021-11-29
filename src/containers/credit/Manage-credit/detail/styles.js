import { StyleSheet, Dimensions } from 'react-native';
import { Colors, actuatedNormalize, FontFamily, STATUSBAR_HEIGHT } from '@/themes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY
    },
    navHeader: {
        backgroundColor: Colors.SECONDARY,
        height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
        justifyContent: 'space-between',
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
    leftContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        fontSize: actuatedNormalize(16),
        color: Colors.WHITE,
        paddingHorizontal: actuatedNormalize(15)
    },
    transferButton: {
        marginBottom: actuatedNormalize(30)
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    icon: {
        width: actuatedNormalize(15),
        height: actuatedNormalize(15)
    },
    content: {
        marginHorizontal: actuatedNormalize(15),
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        fontSize: actuatedNormalize(15),
        color: Colors.TEXT2
    },
    inputContainer1: {
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
        marginRight: 21
    },

    confirmBtn: {
        width: '30%',
        height: 40,
        marginHorizontal: actuatedNormalize(10),
        marginTop: actuatedNormalize(20),
        marginBottom: actuatedNormalize(20),
    },
    navRightButton: {
        width: actuatedNormalize(40),
        height: actuatedNormalize(40),
        justifyContent: 'center',
        alignItems: 'flex-end',
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
    confirmBtn: {
        width: '30%',
        height: 40,
        marginHorizontal: actuatedNormalize(10),
        marginTop: actuatedNormalize(20),
        marginBottom: actuatedNormalize(20),
    }
});
export default styles;