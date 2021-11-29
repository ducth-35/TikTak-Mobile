import { StyleSheet, Dimensions } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  titleBackcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: actuatedNormalize(20)
  },
  titleBackcontainerSetting: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: actuatedNormalize(20),
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20
  },

  titleCoinContainer: {
    flexDirection: 'row',
    width: width,
    height: height,
    alignItems: 'center',
    paddingHorizontal: actuatedNormalize(20),
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20
  },
  settingContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },

  leftBtn: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: actuatedNormalize(60)
  },

  icon: {
    width: actuatedNormalize(20),
    height: actuatedNormalize(20)
  },

  title: {
    flex: 1,
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(20),
    color: Colors.WHITE,
    textAlign: 'center'
  },

  coinHeader: {

  },

  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: actuatedNormalize(10),
    paddingVertical: actuatedNormalize(10),
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },

  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  menuButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: actuatedNormalize(10)
  },

  avatarContainer: {
    marginTop: 10,
    width: actuatedNormalize(52),
    height: actuatedNormalize(52),
    borderRadius: actuatedNormalize(30),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  notificationContainer: {
    marginTop: actuatedNormalize(10),
    width: actuatedNormalize(52),
    height: actuatedNormalize(52),
    justifyContent: 'center',
    alignItems: 'center'
  },

  avatar: {
    width: actuatedNormalize(48),
    height: actuatedNormalize(48),
    borderRadius: actuatedNormalize(25),
    backgroundColor: Colors.LIGHT_GREY
  },

  userInfoContainer: {
    marginLeft: actuatedNormalize(10),
    justifyContent: 'center',
    alignItems: 'flex-start'
  },

  userTitle: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(15),
    color: Colors.LIGHT_GREY
  },

  userName: {
    fontFamily: FontFamily.TitilliumWeb.Bold,
    fontSize: actuatedNormalize(15),
    color: Colors.WHITE
  },

  menuIcon: {
    width: 20,
    height: 14
  },

  searchIcon: {
    width: 16,
    height: 16
  },

  notificationIcon: {
    width: 16,
    height: 19
  },
  badgeStyle: {
    position: 'absolute',
    top: 8,
    right: 8,
  }
});

export default styles;
