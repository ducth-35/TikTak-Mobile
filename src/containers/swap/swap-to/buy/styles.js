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
  header: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  authenEmail: {
    marginHorizontal: actuatedNormalize(15),
    marginTop: actuatedNormalize(15),
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(15),
    color: Colors.SECONDARY
  },

  textCancel: {
    fontFamily: FontFamily.TitilliumWeb.Bold,
    fontSize: actuatedNormalize(16),
    color: Colors.WHITE,
  },

  scrollView: {
    flex: 1,
  },

  contentScrollContainer: {
    paddingHorizontal: actuatedNormalize(20),
  },

  title: {
    marginTop: actuatedNormalize(30),
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(13),
    color: '#F2F5FA',
  },

  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },

  transactionText1: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(14),
    marginRight: actuatedNormalize(5),
    color: '#F2F5FA',
  },

  feeTitle: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(13),
    color: '#F2F5FA',
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

  inputContainer: {
    width: '100%',
    height: actuatedNormalize(58),
    backgroundColor: Colors.NEUTURAL11,
    borderRadius: 8,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  fee: {
    width: '100%',
    // height: actuatedNormalize(58),
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  leftContainer: {
    flex: 1,
    paddingHorizontal: actuatedNormalize(15) - 2.5,
    justifyContent: 'center'
  },

  rightContainer: {
    height: '100%',
    // width: actuatedNormalize(105),
    // backgroundColor: Colors.BLUE,
    borderTopRightRadius: 8,
    borderBottomEndRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: actuatedNormalize(15) - 5,
  },

  rightContainer1: {
    flexDirection: 'row',
  },

  input: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.WHITE,
  },

  cancel: {
    width: '30%',
    height: 40,
    marginHorizontal: actuatedNormalize(10),
    marginTop: actuatedNormalize(20),
    marginBottom: actuatedNormalize(20),
    backgroundColor: Colors.GREY,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  confirmBtn: {
    width: actuatedNormalize(264),
    height: actuatedNormalize(52),
    marginHorizontal: actuatedNormalize(10),
    marginTop: actuatedNormalize(20),
    marginBottom: actuatedNormalize(20),
  },

  rightButtonTitle: {
    fontFamily: FontFamily.TitilliumWeb.Bold,
    fontSize: actuatedNormalize(14),
    color: '#7889B4',
    marginRight: actuatedNormalize(6)
  },

  arrowIcon: {
    width: 12,
    height: 8,
  },

  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },

  transactionText: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(12),
    color: '#F2F5FA',
  },

  buyButton: {
    marginTop: actuatedNormalize(30),
  },

  swapLineContainer: {
    marginTop: actuatedNormalize(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  swapIcon: {
    marginLeft: actuatedNormalize(10),
    width: actuatedNormalize(36),
    height: actuatedNormalize(36),
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.SECONDARY,
  },
  icon: {
    width: actuatedNormalize(20),
    height: actuatedNormalize(20)
  },
  receive: {
    color: Colors.BLUE,
    fontSize:actuatedNormalize(18)
  },
  content: {
    marginHorizontal: actuatedNormalize(15),
    marginTop: actuatedNormalize(15),
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(15),
    color: Colors.TEXT2
  },
});

export default styles;
