import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const styles = StyleSheet.create({
  container: {
    marginTop: actuatedNormalize(20),
    marginHorizontal: 20,
    backgroundColor: '#0063c3',
    height: actuatedNormalize(50),
    justifyContent: 'center'
  },

  title: {
    marginLeft: 20,
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    color: Colors.WHITE
  },
  viewContainer: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 20
  },
  text: {
    color: '#212529',
    fontSize: 12,
    marginRight: 20,
    fontFamily: FontFamily.TitilliumWeb.Regular,
  },
  changePass: {
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(16),
    textDecorationLine: 'underline',
    color: '#E0BC00',
  }
});

export default styles;
