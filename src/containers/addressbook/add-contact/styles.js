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
  },

  scrollView: {
    flex: 1,
  },

  contentScrollContainer: {
    paddingHorizontal: actuatedNormalize(20),
  },

  title: {
    marginTop: actuatedNormalize(30),
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(13),
    color: '#8F9BB3',
  },

  inputContainer: {
    width: '100%',
    height: actuatedNormalize(58),
    backgroundColor: Colors.SECONDARY,
    borderRadius: 8,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  leftContainer: {
    flex: 1,
    padding: actuatedNormalize(15) - 3.5,
    justifyContent: 'center',
  },

  input: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.WHITE,
  },

  rightContainer: {
    height: '100%',
    // backgroundColor: Colors.BLUE,
    borderTopRightRadius: 8,
    borderBottomEndRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: actuatedNormalize(20),
  },

  saveButton: {
    marginTop: actuatedNormalize(30),
  },

  rowButtons: {
    flexDirection: 'row',
    flex: 1,
  },
  coin:{
    alignItems: 'center',
    marginTop: actuatedNormalize(20)
  },
  text_coin:{
    fontSize: 28,
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    color: Colors.BLUE
  },
  text_coin_name:{
    fontSize: 13,
    color: Colors.GREY,
    marginTop: actuatedNormalize(10)
  },
  scanQrcode:{
    width: actuatedNormalize(20),
    height: actuatedNormalize(20)
  }
});

export default styles;
