import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },

  faceIdBtn: {
    marginBottom: actuatedNormalize(28),
    justifyContent: 'center',
    alignItems: 'center',
  },

  faceIdText: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(14),
    color: Colors.BLUE,
  },
});

export default styles;
