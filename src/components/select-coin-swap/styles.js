import { StyleSheet } from 'react-native';

import {
  Colors,
  actuatedNormalize,
  FontFamily,
  STATUSBAR_HEIGHT,
  Metrics,
} from '@/themes';

const styles = StyleSheet.create({
  container: {},

  list: {
    marginHorizontal: actuatedNormalize(15),
  },

  itemContainer: {
    flex: 1 / 2,
  },

  itemContent: {
    borderRadius: 8,
    borderWidth: 1,
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
    fontSize: actuatedNormalize(15),
    color: Colors.TEXT1,
  },

  coinName: {
    fontSize: actuatedNormalize(12),
    color: Colors.TEXT3,
  },
});

export default styles;
