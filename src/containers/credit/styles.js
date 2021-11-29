import { StyleSheet } from "react-native";
import {
  Colors,
  actuatedNormalize,
  FontFamily,
  STATUSBAR_HEIGHT,
} from '@/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY
  },
  navHeader: {
    backgroundColor: Colors.SECONDARY,
    height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
    justifyContent: 'space-between',
  },
  navRightButton: {
    width: actuatedNormalize(40),
    height: actuatedNormalize(40),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  navLeftButton: {
    width: actuatedNormalize(40),
    height: actuatedNormalize(40),
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  viewTitle: {
    marginTop: actuatedNormalize(24),
    alignItems: 'center',
    width: '100%',
  },
  textTitle: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(12),
    color: Colors.TEXT3,
  },
  textTitle2: {
    marginTop: actuatedNormalize(4),
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(28),
    color: Colors.SUCCESS_CL,
  },
  searchContainer: {
    paddingHorizontal: actuatedNormalize(20),
    zIndex: 1
  },
  title: {
    marginTop: actuatedNormalize(30),
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(13),
    color: '#F2F5FA',
  },
  inputContainer: {
    width: '100%',
    minHeight: actuatedNormalize(48),
    backgroundColor: Colors.NEUTURAL11,
    borderRadius: 8,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.WHITE,
    paddingHorizontal: actuatedNormalize(15)
  },
  scrollView: {
    flex: 1,
  },
  contentScrollContainer: {
    paddingHorizontal: actuatedNormalize(20),
  },
  leftContainer: {
    flex: 1,
    // padding: actuatedNormalize(15),
    justifyContent: 'center'
  },
  rightContainer: {
    height: '100%',
    borderTopRightRadius: 8,
    borderBottomEndRadius: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: actuatedNormalize(15) - 5,
  },

  rightButtonTitle: {
    fontFamily: FontFamily.TitilliumWeb.Bold,
    fontSize: actuatedNormalize(14),
    color: '#7889B4',
    marginRight: 6,
  },
  transferButton: {
    marginBottom: actuatedNormalize(30)
  },
  searchingContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: actuatedNormalize(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  isHideSearchResults: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    alignItems: 'center',
    marginTop: actuatedNormalize(230)
  },
  searchItemContainer: {
    height: actuatedNormalize(40),
    justifyContent: 'center',
    padding: actuatedNormalize(10),
  },
  content: {
    marginHorizontal: actuatedNormalize(15),
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(15),
    color: Colors.TEXT2
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  icon: {
    width: actuatedNormalize(15),
    height: actuatedNormalize(15)
  },
  confirmBtn: {
    width: '30%',
    height: 40,
    marginHorizontal: actuatedNormalize(10),
    marginTop: actuatedNormalize(20),
    marginBottom: actuatedNormalize(20),
  },
})