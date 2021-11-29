import { StyleSheet, Dimensions } from 'react-native';

import {
  Colors,
  actuatedNormalize,
  FontFamily,
  STATUSBAR_HEIGHT_ADDRESS_BOOK,
  Metrics,
} from '@/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
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

  navHeader: {
    backgroundColor: Colors.SECONDARY,
    height: actuatedNormalize(90) - STATUSBAR_HEIGHT_ADDRESS_BOOK,
    justifyContent: 'space-between'
  },

  coinsContainer: {
    marginTop: actuatedNormalize(20)
  },

  list: {
    marginHorizontal: actuatedNormalize(15)
  },

  itemContainer: {
  flex: 1/2
  },
  itemContent: {
    borderRadius: 8,
    borderWidth: 1,
    padding: actuatedNormalize(10),
    alignItems: 'center',
    margin: actuatedNormalize(5),
  },
  icon: {
    flex: 1 / 4,
    width: actuatedNormalize(48),
    height: actuatedNormalize(48),
    marginLeft:10,
  },
  icon_selected: {
    flex: 1 / 4,
    width: actuatedNormalize(24),
    height: actuatedNormalize(24),
  },
  select: {
    alignItems: 'center',
    marginBottom: actuatedNormalize(10)
  },
  coinShortName: {
    fontFamily: FontFamily.TitilliumWeb.Bold,
    fontSize: actuatedNormalize(15),
    color: Colors.TEXT1,
  },
  coinName: {
    fontSize: actuatedNormalize(12),
    color: Colors.TEXT3,
  },

  contentContainer: {
    flex: 1,
    marginTop: 15
  },

  tabHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.SECONDARY,
    paddingHorizontal: actuatedNormalize(20)
  },

  tabHeaderItemContainer: {
    marginRight: actuatedNormalize(42),
    marginTop: actuatedNormalize(10),
    marginBottom: actuatedNormalize(10)
  },

  tabItemTitle: {
    fontFamily: FontFamily.TitilliumWeb.Bold,
    fontSize: actuatedNormalize(14),
    color: Colors.WHITE,
  },

  indicatorLine: {
    width: '100%',
    height: 3,
    marginTop: 3,
    backgroundColor: Colors.BLUE,
  },

  tabContentContainer: {
    flex: 1,
  },

  wrapper: {
    flex: 1
  },

  tabItemcontainer: {
    flex: 1,
    width: Metrics.screenWidth
  },
  tab_myaccount: {
    width: '100%',
    height: actuatedNormalize(90)
  }
});

export default styles;
