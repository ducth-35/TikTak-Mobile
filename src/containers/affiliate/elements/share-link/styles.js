import { StyleSheet } from "react-native";
import { Colors, actuatedNormalize, FontFamily } from '@/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: actuatedNormalize(20)

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
        color: Colors.WHITE,
        paddingHorizontal: actuatedNormalize(15)
    },
    inputContainer: {
        width: '100%',
        height: actuatedNormalize(148),
        minHeight: actuatedNormalize(48),
        backgroundColor: '#293244',
        borderRadius: 8,
        marginTop: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    rightContainer: {
        width: '100%',
        height: actuatedNormalize(48),
        backgroundColor: Colors.SECONDARY,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: actuatedNormalize(20),
        height: actuatedNormalize(20),
        marginRight: actuatedNormalize(10)
    },
    buyButton: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: actuatedNormalize(10),
        width: 40,
        height: 40
      },
      share: {
        flexDirection: 'row',
        paddingHorizontal: actuatedNormalize(20),
        marginTop: actuatedNormalize(30),
        height: actuatedNormalize(86),
      },
      icon: {
        width: actuatedNormalize(36),
        height: actuatedNormalize(36),
      }
});