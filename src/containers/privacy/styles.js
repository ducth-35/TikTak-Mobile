import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(29, 29, 43, 1)'
  },

  contentContainer: {
    flex: 1,
    marginVertical: actuatedNormalize(15),
    marginHorizontal: actuatedNormalize(20),
    borderRadius: actuatedNormalize(16),
    backgroundColor: 'rgba(37, 42, 63, 1)',
    marginTop: actuatedNormalize(30),
    justifyContent: 'flex-end',
  },

  topContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },

  bigTitle: {
    marginTop: actuatedNormalize(15),
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(20),
    color: Colors.WHITE,
    marginHorizontal: actuatedNormalize(20),
    textAlign: 'center',
  },

  subTitle: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(13),
    lineHeight: actuatedNormalize(20),
    color: Colors.WHITE,
    marginTop: actuatedNormalize(10),
    marginHorizontal: actuatedNormalize(20),
    textAlign: 'center',
  },

  line: {
    marginTop: actuatedNormalize(10),
    width: 18,
    height: 1,
    backgroundColor: Colors.WHITE,
  },

  bottomContainer: {
    height: actuatedNormalize(175),
    borderBottomLeftRadius: actuatedNormalize(15),
    borderBottomRightRadius: actuatedNormalize(15),
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: actuatedNormalize(25),
  },

  agreeText: {
    marginLeft: actuatedNormalize(15),
    color: '#fff',
    fontFamily: FontFamily.TitilliumWeb.Bold,
    fontSize: 12,
  },

  continueBtn: {
    width: actuatedNormalize(336),
    height: actuatedNormalize(62)
  },
  signInText: {
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(16),
    textDecorationLine: 'underline',
    color: Colors.BLUE,
  },
  title: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(14),
    color: 'rgba(143, 155, 179, 1)',
  },
});

export default styles;
