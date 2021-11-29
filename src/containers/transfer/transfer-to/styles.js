import { StyleSheet } from 'react-native';

import {
  Colors,
  actuatedNormalize,
  FontFamily,
  STATUSBAR_HEIGHT,
  INPUT
} from '@/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navHeader: {
    backgroundColor: '#212529',
    height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
  },
  viewContainer: {
    margin: 10,
    borderRadius: 3,
    backgroundColor: Colors.WHITE,
  },
  viewContainer1: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ced4da',
    margin: 10,
    flexDirection: 'row'
  },
  viewContainer2: {
    margin: 10,
  },
  text: {
    fontSize: 14, 
    marginBottom: 5,
    fontFamily: FontFamily.TitilliumWeb.SemiBold
  },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  transferButton: {
    marginTop: actuatedNormalize(30)
  },
  title: {
    marginTop: actuatedNormalize(30),
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(13),
    color: Colors.DARK,
  },
  transactionText: {
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(15),
    color: '#F2F5FA',
  },

});

export default styles;
