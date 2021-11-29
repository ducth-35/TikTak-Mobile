import { StyleSheet } from 'react-native';

import {
  Colors,
  actuatedNormalize,
  FontFamily,
  STATUSBAR_HEIGHT,
} from '@/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },

  navHeader: {
    backgroundColor: Colors.SECONDARY,
    height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
    justifyContent: 'space-between',
  },

  contentContainer: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
  },

  headerText: {
    marginHorizontal: actuatedNormalize(20),
    marginVertical: actuatedNormalize(20),
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(15),
    color: Colors.WHITE,
  },

  continueButton: {
    width: undefined,
    marginTop: actuatedNormalize(30),
    marginHorizontal: actuatedNormalize(20),
  },

  scrollView: {
    flex: 1,
  },

  contentScrollContainer: {
    paddingHorizontal: actuatedNormalize(20),
  },

  title: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(13),
    color: '#F2F5FA',
  },

  inputContainer: {
    width: '100%',
    height: actuatedNormalize(58),
    backgroundColor: Colors.NEUTURAL11,
    borderRadius: 8,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  leftContainer: {
    flex: 1,
    paddingHorizontal: actuatedNormalize(15) - 2.5,
    justifyContent: 'center'
  },

  rightContainer: {
    height: '100%',
    width: actuatedNormalize(50),
    backgroundColor: Colors.BLUE,
    borderTopRightRadius: 8,
    borderBottomEndRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.WHITE,
  },

  continueButton: {
    width: '100%',
    marginTop: actuatedNormalize(30),
  },

  modalContainer: {
    marginHorizontal: actuatedNormalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    paddingHorizontal: actuatedNormalize(20),
    paddingVertical: actuatedNormalize(15),
  },

  row: {
    marginTop: actuatedNormalize(10),
    marginHorizontal: actuatedNormalize(20),
    flexDirection: 'column',
    alignItems: 'center',
  },
  ICON_SCAN_QRCODE:{
    width: actuatedNormalize(20),
    height: actuatedNormalize(20)
  }
});

export default styles;
