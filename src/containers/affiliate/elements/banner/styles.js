import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

export const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: actuatedNormalize(256),
        marginTop:actuatedNormalize(20),
    },
    image: {
        width: "100%",
        height: actuatedNormalize(216),
       
    },

});
