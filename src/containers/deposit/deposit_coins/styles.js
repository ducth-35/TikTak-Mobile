import { StyleSheet } from 'react-native';

import {
  STATUSBAR_HEIGHT,
  Colors,
  actuatedNormalize,
  FontFamily,
} from '@/themes';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },

  container: {
    flex: 1
  },

  navHeader: {
    backgroundColor: '#212529',
    height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
  },

  qrCodeContainerView: {
    backgroundColor: Colors.WHITE,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  qrCodeContainer: {
    marginTop: actuatedNormalize(35),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputContainer: {
    minHeight: actuatedNormalize(46),
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    marginTop: actuatedNormalize(35),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: actuatedNormalize(20),
  },

  leftContainer: {
    flex: 1,
    padding: actuatedNormalize(15),
    justifyContent:'center'
  },

  rightContainer: {
    height: '100%',
    width: actuatedNormalize(52),
    backgroundColor: Colors.SECONDARY,
    borderTopRightRadius: 8,
    borderBottomEndRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: actuatedNormalize(10),
  },

  input: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(14),
    color: Colors.WHITE,
  },

  rightButtonTitle: {
    fontFamily: FontFamily.TitilliumWeb.Bold,
    fontSize: actuatedNormalize(14),
    color: '#F2F5FA',
    marginLeft: 5,
  },

  noteContainer: {
    backgroundColor: 'rgba(255,243,214, 1.0)',
    borderRadius: 8,
    marginTop: actuatedNormalize(40),
    marginHorizontal: actuatedNormalize(20),
    paddingHorizontal: actuatedNormalize(20),
    paddingVertical: actuatedNormalize(15),
  },

  noteTitle: {
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(16),
    color: Colors.ORANGE,
    marginBottom: 5,
  },

  noteMessage: {
    marginTop: 5,
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(14),
    color: Colors.ORANGE,
  },
});

export default styles;
