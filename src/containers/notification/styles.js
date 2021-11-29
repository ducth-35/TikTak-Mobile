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
  notificationList: {
    padding: 10
  },
  notificationBox: {
    paddingHorizontal: actuatedNormalize(15),
    paddingTop: actuatedNormalize(15),
    paddingBottom:actuatedNormalize(5),
    marginTop: actuatedNormalize(10),
    backgroundColor: Colors.SECONDARY,
    borderRadius: actuatedNormalize(5)
  },
  icon: {
    justifyContent: 'center',
    width: actuatedNormalize(40),
    height: actuatedNormalize(40),
  },
  description: {
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(16),
    color: Colors.WHITE,
    marginLeft: 10,
  },
});

export default styles;
