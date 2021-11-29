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

  buyButton: {
    flex: 1,
    width: undefined,
  },

  headerText: {
    marginHorizontal: actuatedNormalize(20),
    marginVertical: actuatedNormalize(20),
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(15),
    color: Colors.WHITE,
  },

  row: {
    marginTop: actuatedNormalize(30),
    marginHorizontal: actuatedNormalize(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
