import { StyleSheet } from 'react-native';
import {
  Colors,
  actuatedNormalize,
  FontFamily,
  STATUSBAR_HEIGHT,
} from '@/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  navHeader: {
    backgroundColor: Colors.SECONDARY,
    height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
    justifyContent: 'space-between',
  },
  navRightButton: {
    width: actuatedNormalize(40),
    height: actuatedNormalize(40),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btnSelect: {
    backgroundColor: Colors.SECONDARY,
    borderRadius: 5,
    marginTop: actuatedNormalize(20),
    height: actuatedNormalize(110),
    borderWidth: 1,
    borderColor: Colors.DARK_GREY,
    flexDirection: 'row'
  },
  avatarContainer: {
    width: actuatedNormalize(80),
    height: actuatedNormalize(80),
    borderRadius: actuatedNormalize(40),
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: actuatedNormalize(35),
    height: actuatedNormalize(35)
  }
})