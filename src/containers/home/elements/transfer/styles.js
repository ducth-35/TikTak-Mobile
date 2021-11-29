import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const styles = StyleSheet.create({
  container: {
    marginTop: actuatedNormalize(10),
    paddingHorizontal: actuatedNormalize(20),
  },

  title: {
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(20),
    color: '#F2F5FA',
  },

  contentContainer: {
    height: actuatedNormalize(56),
    // marginTop: actuatedNormalize(13),
    flexDirection: 'row',
  },

  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.SECONDARY,
    borderRadius: actuatedNormalize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: actuatedNormalize(36),
    height: actuatedNormalize(36),
  },

  itemTitle: {
    marginTop: 5,
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.WHITE,
    marginLeft: actuatedNormalize(15),
  },
});

export default styles;
