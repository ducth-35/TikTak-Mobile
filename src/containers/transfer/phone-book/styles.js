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
    backgroundColor: Colors.PRIMARY,
  },

  list: {
    flex: 1,
  },

  navHeader: {
    backgroundColor: Colors.SECONDARY,
    height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
  },

  addContactContainer: {
    marginTop: actuatedNormalize(30),
    height: actuatedNormalize(58),
    paddingHorizontal: actuatedNormalize(20),
    width: '100%',
  },

  background: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: actuatedNormalize(20),
    height: actuatedNormalize(20),
  },

  title: {
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(13),
    color: Colors.GREY,
    marginLeft: actuatedNormalize(12),
  },
});

export default styles;
