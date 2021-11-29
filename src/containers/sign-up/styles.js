import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily, STATUSBAR_HEIGHT } from '@/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(29, 29, 43, 1)'
  },

  scrollView: {
    flex: 1,
  },
  title: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(14),
    color: 'rgba(143, 155, 179, 1)',
  },
  warning: {
    flexDirection: 'row',
    marginTop: actuatedNormalize(20)
  },
  warning_signup: {
    marginLeft: actuatedNormalize(24),
    marginTop: actuatedNormalize(10)
  },

  contentScrollContainer: {
    flex: 1,
    backgroundColor: 'rgba(29, 29, 43, 1)',
  },

  header: {
    marginTop: actuatedNormalize(30),
  },
  navHeader: {
    backgroundColor: 'rgba(37, 42, 63, 1)',
    height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
    justifyContent: 'space-between',
  },

  subTitle: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(14),
    color: '#FFD568',
    lineHeight: actuatedNormalize(20),
    marginHorizontal: actuatedNormalize(20),
  },

  smallLine: {
    marginTop: actuatedNormalize(10),
    width: actuatedNormalize(10),
    height: 1,
    backgroundColor: Colors.WHITE,
    alignSelf: 'center',
  },

  contentContainer: {
    marginHorizontal: actuatedNormalize(20),
    // backgroundColor: 'rgba(51,60,73, 0.4)',
    marginTop: actuatedNormalize(30),
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: actuatedNormalize(17),
  },

  nameInput: {
    width: actuatedNormalize(368),
    height: actuatedNormalize(58)
  },

  emailInput: {
    marginTop: 5,
    width: actuatedNormalize(368),
    height: actuatedNormalize(58),
  },

  passwordInput: {
    marginTop: 5,
    width: actuatedNormalize(368),
    height: actuatedNormalize(58)
  },

  signUpBtn: {
    marginTop: actuatedNormalize(30),
  },

  guideText: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(14),
    color: Colors.WHITE,
    lineHeight: actuatedNormalize(21),
    marginTop: actuatedNormalize(20),
    textAlign: 'left',
    marginBottom: actuatedNormalize(30),
  },

  row: {
    marginTop: actuatedNormalize(32),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  accountText: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.WHITE,
  },

  signInText: {
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(16),
    textDecorationLine: 'underline',
    color: Colors.BLUE,
  },
  checkBox: {
    alignSelf: "center",
    justifyContent: 'center'
  }
});

export default styles;
