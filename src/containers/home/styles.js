import { StyleSheet } from 'react-native';

import { Colors, actuatedNormalize, STATUSBAR_HEIGHT, FontFamily} from '@/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navHeader: {
    backgroundColor: Colors.WHITE,
    minHeight: actuatedNormalize(80) - STATUSBAR_HEIGHT,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    backgroundColor: '#212529'
  },
  list: {
    flex: 1,
  },
  content: {
    marginHorizontal: actuatedNormalize(15),
    fontFamily: FontFamily.TitilliumWeb.SemiBold,
    fontSize: actuatedNormalize(15),
    color: Colors.TEXT2
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  icon: {
    width: actuatedNormalize(15),
    height: actuatedNormalize(15)
  },
});

export default styles;
