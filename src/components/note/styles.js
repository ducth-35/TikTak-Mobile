import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const styles = StyleSheet.create({
  noteContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: actuatedNormalize(20),
    
  },

  leftContainer: {
    height: '100%',
    width: actuatedNormalize(7.98),
    backgroundColor: 'blue',
    borderTopLeftRadius: 8,
    borderBottomStartRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD568'
  },

  noteContainerView: {
    paddingLeft: actuatedNormalize(23.93),
    paddingVertical: actuatedNormalize(12),
  },

  noteTitle: {
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(16),
    color: '#000',
    marginBottom: actuatedNormalize(5),
    marginLeft: actuatedNormalize(5),
  },

  noteMessage: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(14),
    color: Colors.DARK,
    marginRight: actuatedNormalize(15),
  }
});

export default styles;
