import { StyleSheet } from 'react-native';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';

const styles = StyleSheet.create({
  container: {
    marginTop: actuatedNormalize(30),
    paddingHorizontal: actuatedNormalize(20)
  },
  contentContainer: {
    height: actuatedNormalize(50),
    flexDirection: 'row',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: actuatedNormalize(16),
    fontFamily: FontFamily.TitilliumWeb.Bold,
    color: Colors.WHITE,
    paddingHorizontal: actuatedNormalize(10),

  },
  background: {
    backgroundColor: Colors.WHITE,
    paddingVertical: actuatedNormalize(20),
    justifyContent: 'center',
    paddingHorizontal: actuatedNormalize(10),
    borderRadius: 5
  },
  balance: {
    fontFamily: FontFamily.TitilliumWeb.SemiBold, 
    fontSize: 16
  }

});

export default styles;
