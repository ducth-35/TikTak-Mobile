import { StyleSheet } from 'react-native';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';
export const styles = StyleSheet.create({
    container: {
        height: actuatedNormalize(28),
        borderRadius: actuatedNormalize(8)
    },
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: actuatedNormalize(10),
        flexDirection: 'row'
    },
    image: {
        width: actuatedNormalize(18),
        height: actuatedNormalize(18),
        marginRight: actuatedNormalize(8)
    },
    text: {
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        fontSize: 13,
        color: Colors.WHITE
    },
    modalContent: {
        marginHorizontal: actuatedNormalize(20),
        borderRadius: actuatedNormalize(15),
        backgroundColor: Colors.SECONDARY
    },
    popupTitle: {
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        fontSize: actuatedNormalize(18),
        color: Colors.WHITE,
    },

    popupMessage: {
        marginTop: actuatedNormalize(12),
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        fontSize: actuatedNormalize(14),
        lineHeight: actuatedNormalize(18),
        color: Colors.GREY,
    },
    okBtn: {
        width: '80%',
    }

})