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
  viewContainer: {
    marginHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.WHITE,
    alignItems: 'center'
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#212529",
    height: 40,
    marginHorizontal: 5,
  },
  tableRow: {
    flexDirection: "row",
    height: 70,
    alignItems: "center",
  },
  columnHeader: {
    width: "33%",
    justifyContent: "center",
    alignItems: "center"
  },
  columnRowTxt: {
    width: "33%"
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
});

export default styles;