import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },

  contentContainer: {
    flex: 1,
  },

  searchContainer: {
    marginTop: actuatedNormalize(10),
    borderColor: Colors.SECONDARY,
    // borderRadius: 8,
    // borderWidth: 1,
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

  icon: {
    width: actuatedNormalize(18),
    height: actuatedNormalize(18),
    marginLeft: actuatedNormalize(19),
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
    padding: actuatedNormalize(15) - 3,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoIcon: {},

  statusView: {
    paddingVertical: 3,
    paddingHorizontal: actuatedNormalize(10),
    borderRadius: 4,
    marginLeft: actuatedNormalize(10),
  },

  bottomButtons: {
    flex: 1,
    flexDirection: 'row',
    marginTop: actuatedNormalize(20),
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
    height: '100%',
    width: actuatedNormalize(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  Icon: {
    width: actuatedNormalize(20),
    height: actuatedNormalize(20),
    marginRight: actuatedNormalize(5)
  },
});

export default styles;
