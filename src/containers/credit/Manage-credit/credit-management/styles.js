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
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.SECONDARY,
    justifyContent: 'space-between',
    marginTop: actuatedNormalize(10),
  },
  contentContainer: {
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: actuatedNormalize(5)
  },
  contentScrollContainer: {
    paddingHorizontal: actuatedNormalize(10),
  },
  itemLeftContainer: {
    flex: 1,
    padding: actuatedNormalize(15) - 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(14),
    color: Colors.TEXT2,
  },
  statusView: {
    paddingVertical: 3,
    paddingHorizontal: actuatedNormalize(10),
    borderRadius: 4,
    marginLeft: actuatedNormalize(10),
  },
  searchContainer: {
    marginTop: actuatedNormalize(10),
    borderColor: Colors.SECONDARY,
    paddingVertical: actuatedNormalize(15),
  },
  searchTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '100%',
    height: actuatedNormalize(58),
    backgroundColor: Colors.NEUTURAL11,
    borderRadius: 8,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Icon: {
    width: actuatedNormalize(18),
    height: actuatedNormalize(18),
    marginLeft: actuatedNormalize(19),
  },
  leftContainer: {
    flex: 1,
    paddingHorizontal: actuatedNormalize(15) - 2.5,
    justifyContent: 'center'
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
})

