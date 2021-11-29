import { StyleSheet } from 'react-native';

import {
  Colors,
  actuatedNormalize,
  STATUSBAR_HEIGHT,
  FontFamily,
  Metrics,
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

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  topTitle: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(13),
    color: '#F2F5FA',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bottomTitleRegular: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(15),
    color: '#F2F5FA',
  },

  bottomTitleBold: {
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(15),
    color: Colors.BLUE,
    textDecorationLine: 'underline',
  },

  scanContainer: {
    width: Metrics.screenWidth - actuatedNormalize(40),
    height: Metrics.screenWidth - actuatedNormalize(40),
    overflow: 'hidden',
  },

  contentScanContainer: {
    flex: 1,
    margin: 5,
  },

  qrCodeContainer: {
    width: '100%',
    height: '100%',
  },

  markerStyle: {
    width: Metrics.screenWidth - actuatedNormalize(40),
    height: Metrics.screenWidth - actuatedNormalize(40),
  },
});

export default styles;
