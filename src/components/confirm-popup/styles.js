import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const styles = StyleSheet.create({
  modalContent: {
    marginHorizontal: actuatedNormalize(20),
    borderRadius: actuatedNormalize(15),
    backgroundColor: Colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: actuatedNormalize(15),
    paddingVertical: actuatedNormalize(15),
  },

  title: {
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(18),
    color: Colors.WHITE,
  },

  content: {
    marginHorizontal: actuatedNormalize(15),
    marginTop: actuatedNormalize(10),
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(15),
    color: Colors.WHITE,
  },

  rounerInputContainer: {
    width:actuatedNormalize(264),
    height:actuatedNormalize(48),
    backgroundColor: Colors.NEUTURAL11,
    borderRadius: 8,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rounerInput: {
    flex: 1,
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.DARK_GREY,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmBtn: {
    width: actuatedNormalize(264),
    height: actuatedNormalize(52),
    marginHorizontal: actuatedNormalize(10),
    marginTop: actuatedNormalize(20),
    marginBottom: actuatedNormalize(20),
  },
  leftContainer: {
    flex: 1,
    paddingVertical: actuatedNormalize(5),
    paddingHorizontal: actuatedNormalize(10),
    justifyContent: 'center'
  },

  input: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.WHITE,
  },

});

export default styles;
