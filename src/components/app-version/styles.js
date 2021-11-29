import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const styles = StyleSheet.create({
  versionText: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(14),
    color: Colors.GREY,
    textAlign: 'center',
    marginBottom: 10,
  },
  languageText: {
    fontFamily: FontFamily.TitilliumWeb.Bold,
    fontSize: actuatedNormalize(14),
    color: Colors.TEXT2,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 20,
    marginLeft: 5
  }
});

export default styles;
