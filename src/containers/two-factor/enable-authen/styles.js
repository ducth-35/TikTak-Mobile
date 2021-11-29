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

  tutorialContainer: {
    marginTop: actuatedNormalize(20),
  },

  stepLabel: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#999999',
  },

  stepLabelSelected: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f',
  },

  content: {
    marginHorizontal: actuatedNormalize(20),
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(15),
    color: Colors.WHITE,
  },

  qrCodeContainer: {
    marginTop: actuatedNormalize(30),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },

  inputContainer: {
    marginTop: actuatedNormalize(30),
    paddingHorizontal: actuatedNormalize(20),
  },

  rounerInputContainer: {
    flex: 1,
    marginTop: actuatedNormalize(10),
    height: actuatedNormalize(58),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.SECONDARY,
    borderRadius: 8,
    paddingHorizontal: actuatedNormalize(15),
  },

  rounerInput: {
    flex: 1,
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.WHITE,
  },

  enableBtn: {
    marginTop: actuatedNormalize(20),
  },
  qrCodeContainerView: {
    backgroundColor: Colors.WHITE,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default styles;
