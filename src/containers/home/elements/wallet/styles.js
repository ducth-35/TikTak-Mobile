import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: actuatedNormalize(20),
      marginTop: actuatedNormalize(20)
    },
    labelStyle: {
      fontFamily: FontFamily.TitilliumWeb.SemiBold,
      fontSize: actuatedNormalize(14),
    },
});

export default styles;
