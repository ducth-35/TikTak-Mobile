import { StyleSheet, Dimensions } from 'react-native';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        marginTop: actuatedNormalize(15),
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
    rightContainer: {
        height: '100%',
        borderTopRightRadius: 8,
        borderBottomEndRadius: 8,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: actuatedNormalize(15) - 5,
      },
    
      rightButtonTitle: {
        fontFamily: FontFamily.TitilliumWeb.Bold,
        fontSize: actuatedNormalize(14),
        color: '#7889B4',
        marginRight: 6,
      }
});
export default styles;