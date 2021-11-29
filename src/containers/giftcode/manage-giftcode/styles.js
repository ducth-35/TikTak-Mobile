import { StyleSheet } from "react-native";
import { Colors, FontFamily, actuatedNormalize, STATUSBAR_HEIGHT } from '@/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: actuatedNormalize(20)
    },

    title: {
        fontFamily: FontFamily.TitilliumWeb.Regular,
        fontSize: actuatedNormalize(13),
        color: Colors.WHITE
    },


    navHeader: {
        backgroundColor: Colors.SECONDARY,
        height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
        justifyContent: 'space-between',
    },
    qrcodeContainer: {
        marginTop: actuatedNormalize(35),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrcodeContainerView: {
        backgroundColor: Colors.WHITE,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    }
})