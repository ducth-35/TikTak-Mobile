import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: actuatedNormalize(20),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  lineVertical: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 2,
    backgroundColor: Colors.NEON_GREEN
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: actuatedNormalize(20),
  },

  title: {
    fontFamily: FontFamily.TitilliumWeb.Bold,
    fontSize: actuatedNormalize(14),
    color: Colors.WHITE,
  },

  subTitle: {
    marginTop: 2,
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(12),
    color: Colors.WHITE,
  },

  rightContainer: {
    height: actuatedNormalize(50),
    width: actuatedNormalize(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
