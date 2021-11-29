import { StyleSheet } from 'react-native';
import {
    Colors,
    actuatedNormalize,
    FontFamily,
    STATUSBAR_HEIGHT,
} from '@/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY
    },
    navHeader: {
        backgroundColor: Colors.SECONDARY,
        height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
        justifyContent: 'space-between'
    },
    navRightButton: {
        width: actuatedNormalize(40),
        height: actuatedNormalize(40),
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    images:{
        width: actuatedNormalize(18), 
        height: actuatedNormalize(18)
    },
    list: {
     flex: 1
    }
});
