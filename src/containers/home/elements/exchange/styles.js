import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const styles = StyleSheet.create({
  container: {
    marginTop: actuatedNormalize(20),
    marginHorizontal: 20,
    backgroundColor: '#0063c3',
    height: actuatedNormalize(50),
    justifyContent: 'center'
  },
  title: {
    marginLeft: 20,
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    color: Colors.WHITE
  },
  tableContainer: {
    marginHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.WHITE,
    alignItems: 'center'
  },
  header: {
    height: 40,
    backgroundColor: '#212529'
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: FontFamily.TitilliumWeb.SemiBold
  },
   dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});

export default styles;
