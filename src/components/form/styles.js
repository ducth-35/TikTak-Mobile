import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: actuatedNormalize(56),
        
    },
    title: {
        fontFamily: FontFamily.TitilliumWeb.Regular,
        fontSize: actuatedNormalize(14),
        color: 'rgba(143, 155, 179, 1)',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: actuatedNormalize(58),
        backgroundColor: "#141421",
        borderRadius: 8,
        borderWidth: 0.7,
        borderColor: '#141421',
        marginTop: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: actuatedNormalize(15),
    },
    input: {
        marginTop: actuatedNormalize(5),
        width: actuatedNormalize(368),
        height: actuatedNormalize(58)
    },
    icon: {
        width: actuatedNormalize(20),
        height: actuatedNormalize(20)
      },
});