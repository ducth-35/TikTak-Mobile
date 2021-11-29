import { StyleSheet } from 'react-native';

import {
  Colors,
  actuatedNormalize,
  PADDING_BOTTOM,
  FontFamily,
} from '@/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: actuatedNormalize(204),
    height: actuatedNormalize(191),
    marginBottom: actuatedNormalize(150),
  },

  copyRight: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    color: Colors.GREY,
    fontSize: actuatedNormalize(16),
    position: 'absolute',
    bottom: PADDING_BOTTOM + 10,
  },
});

export default styles;
