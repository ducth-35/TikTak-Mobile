import { StyleSheet } from 'react-native';
import { actuatedNormalize, Colors, FontFamily, getWidth, STATUSBAR_HEIGHT } from '@/themes';

export const styles = StyleSheet.create({
    navRightButton: {
        width: actuatedNormalize(40),
        height: actuatedNormalize(40),
        alignItems: 'flex-end',
        justifyContent: 'center',
    }
});