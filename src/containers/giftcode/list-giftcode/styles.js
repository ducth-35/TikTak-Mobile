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

  contentContainer: {
    flex: 1,
  },
  image: {
     paddingLeft: actuatedNormalize( 20 ),
     paddingBottom: actuatedNormalize( 20),
     paddingTop: actuatedNormalize(20),
    paddingRight: actuatedNormalize(10)
  },

  searchContainer: {
    marginTop: actuatedNormalize(10),
    borderColor: Colors.SECONDARY,
    paddingVertical: actuatedNormalize(15),
  },

  scrollView: {
    flex: 1,
  },

  contentScrollContainer: {
    paddingHorizontal: actuatedNormalize(20),
  },

  searchTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(14),
    color: Colors.TEXT2,
  },

  inputContainer: {
    width: '100%',
    height: actuatedNormalize(58),
    backgroundColor: Colors.NEUTURAL11,
    borderRadius: 8,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  leftContainer: {
    flex: 1,
    paddingTop: actuatedNormalize(10),
    paddingRight: actuatedNormalize(15),
    paddingLeft: actuatedNormalize(15),
    paddingBottom: actuatedNormalize(10),
  },

  rightContainer: {
    height: '100%',
    borderTopRightRadius: 8,
    borderBottomEndRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 21,
  },

  input: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.WHITE,
  },

  expandButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: actuatedNormalize(56),
    backgroundColor: Colors.SECONDARY,
    borderTopRightRadius: 8,
    borderBottomEndRadius: 8,
  },

  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.SECONDARY,
    justifyContent: 'space-between',
    marginTop: actuatedNormalize(15),
  },

  itemLeftContainer: {
    flex: 1,
    paddingTop: actuatedNormalize(20),
    paddingLeft: actuatedNormalize(20),
    paddingBottom: actuatedNormalize(20)
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: actuatedNormalize(10),
    width: actuatedNormalize(16),
    height: actuatedNormalize(16)
  },

  statusView: {
    paddingVertical: 3,
    paddingHorizontal: actuatedNormalize(10),
    borderRadius: 4,
    marginLeft: actuatedNormalize(10),
  },

  bottomButtons: {
    flex: 1,
    flexDirection: 'row',
  },

  button: {
    marginTop: actuatedNormalize(10),
    flex: 1,
    borderRadius: 8,
    height: actuatedNormalize(50),
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightButton: {
    marginRight: actuatedNormalize( 20 ),
    justifyContent: 'center',
    alignItems: 'center',
  },

  qrCodeContainer: {
    minHeight: actuatedNormalize(300),
    marginHorizontal: actuatedNormalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },

  navRightButton: {
    width: actuatedNormalize(40),
    height: actuatedNormalize(40),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  navLeftButton: {
    width: actuatedNormalize(40),
    height: actuatedNormalize(40),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  images: {
    width: actuatedNormalize(40),
    height: actuatedNormalize(40)
  },
  detail: {
    marginLeft: 5,
    fontFamily: FontFamily.TitilliumWeb.Bold,
    fontSize: actuatedNormalize(16),
    textDecorationLine: 'underline',
    color: Colors.BLUE,
  },
  icon: {
    width: actuatedNormalize(18),
    height: actuatedNormalize(18),
    marginLeft: actuatedNormalize(19),
  },
  inputContainer1: {
    width: '35%',
    height: actuatedNormalize(58),
    backgroundColor: Colors.SECONDARY,
    borderRadius: 8,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});