import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { styles } from './styles';
import { useTranslation, useAppContext } from '@/hooks';
import { Colors } from '@/themes';
import { ICO_COPYY, LINK_REGISTER, showSuccessToast } from '@/common';
import { TouchableX } from '@/components';
import Clipboard from '@react-native-community/clipboard';
import { isEmpty } from 'lodash';


export const LinkReferFriend = () => {
  
    const [email, setEmail] = useState(LINK_REGISTER);
    const { t } = useTranslation();
    const { accountInfo } = useAppContext();
     
    const CONVERT_BASE36 = accountInfo?.id.toString(36).toUpperCase();

    const onCopy = () => {
        if (!isEmpty(LINK_REGISTER)) {
            Clipboard.setString(LINK_REGISTER+CONVERT_BASE36)
            showSuccessToast(t('copy_success'))
      }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('link_refer')}</Text>
            <View style={styles.inputContainer}>
                <View style={styles.leftContainer}>
                    <TextInput
                        style={styles.input}
                        numberOfLines={1}
                        placeholderTextColor={Colors.GREY}
                        keyboardType="decimal-pad"
                        value={`${email}${CONVERT_BASE36}`}
                        editable={false}
                    />
                </View>
                <TouchableX style={styles.rightContainer} onPress={onCopy}>
                    <Image source={ICO_COPYY} style={styles.image} />
                    <Text style={[styles.title, { color: Colors.WHITE }]}>{t('copy')}</Text>
                </TouchableX>
            </View>
        </View>
    );
};


