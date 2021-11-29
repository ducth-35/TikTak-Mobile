import { StyleSheet } from 'react-native';

import {
  Colors,
  actuatedNormalize,
  FontFamily,
  STATUSBAR_HEIGHT,
} from '@/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },

  navHeader: {
    backgroundColor: Colors.SECONDARY,
    height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
  },

  scrollView: {
    flex: 1,
  },

  contentScrollContainer: {
    flex: 1,
  },

  inputContainer: {
    marginTop: actuatedNormalize(20),
  },

  confirmPasswordBtn: {
    width: undefined,
    marginTop: actuatedNormalize(30),
    marginHorizontal: actuatedNormalize(20),
  },
});

export default styles;
