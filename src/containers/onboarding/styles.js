import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(29, 29, 43, 1)',
    justifyContent: 'flex-end',
  },

  topContainer: {
    flex: 1,
  },

  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapper: {},

  icon: {
    width: actuatedNormalize(148),
    height: actuatedNormalize(148),
    marginBottom: actuatedNormalize(17),
  },

  bigTitle: {
    fontFamily: 'Helvetica',
    fontSize: actuatedNormalize(36),
    color: Colors.WHITE,
    textAlign: 'center',
  },

  title: {
    fontFamily: FontFamily.TitilliumWeb.Bold,
    fontSize: actuatedNormalize(20),
    color: Colors.WHITE,
    textAlign: 'center',
  },

  subTitle: {
    marginTop: actuatedNormalize(10),
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.WHITE,
    lineHeight: actuatedNormalize(24),
    textAlign: 'center',
  },

  bottomContainer: {
    justifyContent: 'center',
  },

  versionText: {
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(14),
    color: Colors.WHITE,
    marginVertical: actuatedNormalize(18),
    textAlign: 'center',
  },

  startBtn: {
    width: undefined,
    marginLeft: actuatedNormalize(32),
    marginRight: actuatedNormalize(32),
  },
});

export default styles;
