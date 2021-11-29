import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  list: {
    flex: 1,
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
