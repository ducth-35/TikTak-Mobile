import { StyleSheet } from 'react-native';

import {
  Colors,
  actuatedNormalize,
  FontFamily,
  STATUSBAR_HEIGHT,
  Metrics,
} from '@/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  navHeader: {
    backgroundColor: 'transparent',
    height: actuatedNormalize(88),
  },

  contentContainer: {
    flex: 1,
  },
});

export default styles;
