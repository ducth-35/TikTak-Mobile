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
    marginTop: 20
  },

  list: {
    marginHorizontal: actuatedNormalize(15),
  },

  itemContainer: {
    flex: 1 / 2,
  },

  itemContent: {
    borderRadius: 5,
    padding: actuatedNormalize(10),
    alignItems: 'center',
    margin: actuatedNormalize(5),
  },

  icon: {
    // marginTop: 8,
    flex: 1 / 4,
    width: actuatedNormalize(48),
    height: actuatedNormalize(48),
    marginLeft:10,
  },

  iconCheckBox: {
    // marginTop: 8,
    flex: 1 / 4,
    width: actuatedNormalize(24),
    height: actuatedNormalize(24),
  },

  coinShortName: {
    fontFamily: FontFamily.TitilliumWeb.Bold,
    fontSize: actuatedNormalize(14),
    color: Colors.DARK,
  },

  coinName: {
    fontSize: actuatedNormalize(12),
    color: Colors.TEXT3,
  },
});

export default styles;
