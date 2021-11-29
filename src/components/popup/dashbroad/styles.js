import { StyleSheet } from "react-native";
import { Colors, actuatedNormalize, FontFamily } from '@/themes';

export const styles = StyleSheet.create({
    modalContent: {
        marginHorizontal: actuatedNormalize(20),
        backgroundColor: Colors.BLUE,  
         
    },
    content: {
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        fontSize: actuatedNormalize(15),
        color: Colors.TEXT2
    },
    icon: {
        width: actuatedNormalize(15),
        height: actuatedNormalize(15)
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
});