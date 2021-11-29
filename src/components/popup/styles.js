import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const styles = StyleSheet.create({
  modalContent: {
    marginHorizontal: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    backgroundColor: Colors.SECONDARY,
  },

  leftContent: {
    flex: 1,
    alignItems: 'flex-end',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'center'
  },

  line: {
    height: 1,
    backgroundColor: '#293244',
    marginLeft: actuatedNormalize(30),
    marginRight: actuatedNormalize(30)
  },

  title: {
    fontFamily: FontFamily.TitilliumWeb.Bold,
    fontSize: actuatedNormalize(20),
    color: Colors.SECONDARY,
  },

  content: {
    marginHorizontal: actuatedNormalize(15),
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(15),
    color: Colors.TEXT2
  },
  
  contentCoin: {
    marginHorizontal: actuatedNormalize(15),
    marginRight: actuatedNormalize(15),
    marginLeft:actuatedNormalize(10),
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(14),
    color: Colors.BLUE
  },

  rounerInputContainer: {
    marginHorizontal: actuatedNormalize(15),
    marginTop: actuatedNormalize(10),
    height: actuatedNormalize(58),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    paddingHorizontal: actuatedNormalize(15),
  },

  rounerInput: {
    flex: 1,
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.DARK_GREY,
  },

  row: {
    flexDirection: 'row',
    marginTop: actuatedNormalize(10),
    marginHorizontal: actuatedNormalize(20)
  },

  confirmBtn: {
    width: '50%',
    height: 40,
    marginHorizontal: actuatedNormalize(10),
    marginTop: actuatedNormalize(20),
    marginBottom: actuatedNormalize(20),
  },
  input: {
    fontFamily: FontFamily.TitilliumWeb.Regular,
    fontSize: actuatedNormalize(16),
    color: Colors.WHITE,
    paddingHorizontal: actuatedNormalize(15)
  },
  inputContainer: {
    height: actuatedNormalize(40),
    backgroundColor: Colors.NEUTURAL11,
    borderRadius: actuatedNormalize(8),
    marginTop: actuatedNormalize(10),
    marginHorizontal: actuatedNormalize(10)
  },
});

export default styles;
