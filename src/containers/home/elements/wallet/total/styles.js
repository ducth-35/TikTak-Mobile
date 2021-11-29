import { Colors, actuatedNormalize, FontFamily } from '@/themes';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: actuatedNormalize(20),
        backgroundColor: Colors.WHITE
    },
    titleContainer: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'flex-start',
    },
    stockText: {
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        fontSize: actuatedNormalize(16),
        color: Colors.BLUE,
    },
    list: {
        marginTop: actuatedNormalize(15),
        flex: 1,
        backgroundColor: Colors.WHITE,
        borderRadius: 5
    },
    itemContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.WHITE,
        borderRadius: 5,
        paddingVertical: actuatedNormalize(10),
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    icon: {
        width: actuatedNormalize(40),
        height: actuatedNormalize(40),
    },
    coinAmountContainer: {
        alignItems: 'flex-end',
        flexDirection: 'column',
    },
    amount: {
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        fontSize: actuatedNormalize(18),
        color: '#212529',
        textAlign: 'right',
    },
    exchange_vndt: {
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        fontSize: actuatedNormalize(14),
        color: Colors.GREY,
        textAlign: 'right',
    },
    line: {
        backgroundColor: Colors.GREY,
        // height: 0.7,
        position: 'absolute',
        bottom: 0,
        left: 20,
        right: 20,
    },
    coinInfoContainer: {
        marginLeft: actuatedNormalize(10),
    },
    coinName: {
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        fontSize: actuatedNormalize(16),
        color: '#212529',
    },
})