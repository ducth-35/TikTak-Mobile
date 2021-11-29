import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: actuatedNormalize(20),
    marginTop: actuatedNormalize(30),
    height: actuatedNormalize(56),
  },

  buyButton: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: Colors.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: actuatedNormalize(5),
  },

  sellButton: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: Colors.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: actuatedNormalize(5),
  },

  icon: {
    width: actuatedNormalize(36),
    height: actuatedNormalize(36),
  },

  title: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.WHITE,
    marginLeft: actuatedNormalize(15),
  },
});

export default styles;
