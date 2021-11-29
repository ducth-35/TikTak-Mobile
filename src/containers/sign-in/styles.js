import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily, STATUSBAR_HEIGHT } from '@/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(29, 29, 43, 1)',
  },

  navHeader: {
    backgroundColor: '#212529',
    height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
    justifyContent: 'space-between',
  },

  scrollView: {
    flex: 1
  },

  contentScrollContainer: {
    flex: 1,
    backgroundColor:'rgba(29, 29, 43, 1)',
  },

  loginText: {
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(24),
    color: Colors.WHITE,
    marginTop: actuatedNormalize(30),
    textAlign: 'center',
  },

  subTitle: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(14),
    color:'#FFD568',
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
    marginTop: actuatedNormalize(30),
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: actuatedNormalize(17),
  },

  emailInput: {
    marginTop: actuatedNormalize(5),
    width: actuatedNormalize(368),
    height: actuatedNormalize(58)
  },

  passwordInput: {
    marginTop: 5,
    width: actuatedNormalize(368),
    height: actuatedNormalize(58),
  
  },

  signInBtn: {
    marginTop: actuatedNormalize(30),
    width: actuatedNormalize(368),
    height: actuatedNormalize(58)
  },
  icon_warning:{
    width: 24, 
    height: 24
  },
  warning:{
    flexDirection: 'row',
    marginTop: actuatedNormalize(20)
  },

  faceIdBtn: {
    marginTop: actuatedNormalize(28),
  },

  faceIdText: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(14),
    color: Colors.WHITE,
  },

  forgotPasswordBtn: {
    marginTop: actuatedNormalize(32),
    marginBottom: actuatedNormalize(32),
  },

  forgetPasswordText: {
    fontFamily: FontFamily.TitilliumWeb.Bold,
    fontSize: actuatedNormalize(14),
    color: Colors.BLUE,
    textDecorationLine: 'underline',
  },

  row: {
    marginTop: actuatedNormalize(32),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row2:{
    alignItems: 'center'
  },

  accountText: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.WHITE,
  },

  signUpText: {
    marginLeft: 5,
    fontFamily: FontFamily.TitilliumWeb.Bold,
    fontSize: actuatedNormalize(16),
    textDecorationLine: 'underline',
    color: Colors.BLUE,
  },
  touchid:{
    marginTop: actuatedNormalize(50),
    width: actuatedNormalize(43),
    height: actuatedNormalize(48)
  },
 
});

export default styles;
