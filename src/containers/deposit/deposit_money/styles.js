import { StyleSheet } from 'react-native';
import {
    Colors,
    actuatedNormalize,
    FontFamily,
    STATUSBAR_HEIGHT,
} from '@/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navHeader: {
        backgroundColor: '#212529',
        height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
    }
})