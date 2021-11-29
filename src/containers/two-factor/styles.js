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

  sectionContainer: {
    marginTop: actuatedNormalize(20),
    marginHorizontal: actuatedNormalize(20),
    borderRadius: 8,
    borderColor: Colors.SECONDARY,
    borderWidth: 1,
    overflow: 'hidden',
  },

  header: {
    flexDirection: 'row',
    backgroundColor: Colors.SECONDARY,
    alignItems: 'center',
    paddingHorizontal: actuatedNormalize(15),
    paddingVertical: actuatedNormalize(15),
  },

  title: {
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(18),
    color: Colors.WHITE,
    marginLeft: actuatedNormalize(15),
  },

  contentContainer: {
    padding: actuatedNormalize(15),
  },

  content: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(15),
    color: Colors.WHITE,
  },

  activationCodeBtn: {
    marginTop: actuatedNormalize(20),
  },

  rounerInput: {
    marginTop: actuatedNormalize(20),
    height: actuatedNormalize(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.GREY,
  },
});

export default styles;
