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
  leftContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  navHeader: {
    backgroundColor: Colors.SECONDARY,
    height: actuatedNormalize(88) - STATUSBAR_HEIGHT,
    justifyContent: 'space-between',
  },

  contentContainer: {
    flex: 1,
  },
  isHideSearchResults: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    alignItems: 'center',
    marginTop: actuatedNormalize(100)
  },

  headerText: {
    marginHorizontal: actuatedNormalize(20),
    marginVertical: actuatedNormalize(20),
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(18),
    color: Colors.GREY,
  },

  continueButton: {
    width: undefined,
    marginTop: actuatedNormalize(30),
    marginHorizontal: actuatedNormalize(20),
  },

  scrollView: {
    flex: 1,
  },

  contentScrollContainer: {
    paddingHorizontal: actuatedNormalize(20),
  },

  title: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(13),
    color: '#F2F5FA',
  },

  inputContainer: {
    width: '100%',
    height: actuatedNormalize(58),
    backgroundColor: Colors.NEUTURAL11,
    borderRadius: 8,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  leftContainer: {
    flex: 1,
    paddingHorizontal: actuatedNormalize(15) - 2.5,
    justifyContent: 'center'
  },

  rightContainer: {
    height: '100%',
    width: actuatedNormalize(50),
    // backgroundColor: Colors.BLUE,
    borderTopRightRadius: 8,
    borderBottomEndRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },

  spinner: {
    height: '100%',
    width: actuatedNormalize(50),
    // backgroundColor: Colors.BLUE,
    borderTopRightRadius: 8,
    borderBottomEndRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },

  input: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.WHITE,
    paddingHorizontal: actuatedNormalize(15)
  },

  row: {
    marginTop: actuatedNormalize(10),
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },

  transactionText: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(12),
    color: '#F2F5FA'
  },

  rightButtonTitle: {
    fontFamily: FontFamily.TitilliumWeb.Bold,
    fontSize: actuatedNormalize(15),
    color: '#7889B4',
    marginRight: 6
  },

  conditionContainer: {
    marginTop: actuatedNormalize(10)
  },

  note: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(14),
    color: Colors.ORANGE
  },

  searchContainer: {
    marginTop: actuatedNormalize(10),
    zIndex: 1
  },

  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    padding: actuatedNormalize(15)
  },

  searchItemContainer: {
    height: actuatedNormalize(40),
    justifyContent: 'center',
    padding: actuatedNormalize(10)
  },

  searchingContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: actuatedNormalize(40),
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: actuatedNormalize(15),
    height: actuatedNormalize(15)
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
});

export default styles;
