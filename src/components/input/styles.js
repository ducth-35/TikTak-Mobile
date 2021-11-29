import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: actuatedNormalize(56)
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: actuatedNormalize(58),
    backgroundColor: "#141421",
    borderRadius: 8,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },

  icon: {
    width: actuatedNormalize(20),
    height: actuatedNormalize(20),

  },

  input: {
    flex: 1,
    marginLeft: actuatedNormalize(20),
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.DARK,
  },

  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },

  rounerContainer: {
    marginHorizontal: actuatedNormalize(20),
  },

  title: {
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(14),
    color: Colors.DARK_GREY,
  },

  inputContainer: {
    width: '100%',
    minHeight: actuatedNormalize(48),
    backgroundColor: Colors.WHITE,
    marginTop: 7,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ced4da',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  rounerInput: {
    flex: 1,
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.WHITE,
    paddingHorizontal: actuatedNormalize(15),
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  qRButton: {
    height: '100%',
    borderTopRightRadius: 8,
    borderBottomEndRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: actuatedNormalize(15),
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
  searchingContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: actuatedNormalize(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  expanButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: actuatedNormalize(56),
    backgroundColor: Colors.GREY,
    borderTopRightRadius: 8,
    borderBottomEndRadius: 8,
  },
  inputContainer2: {
    width: '100%',
    height: actuatedNormalize(50),
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ced4da',
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

});

export default styles;
