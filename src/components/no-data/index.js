import React  from 'react';
import { View, Text } from 'react-native';
import {Colors} from '@/themes';
import { useTranslation } from '@/hooks';

export const NoData = () => {
    const { t } = useTranslation();
    return (
        <View style={{flex:1, justifyContent : 'center', alignItems: 'center' }}>
            <Text style={{textAlign: 'center', justifyContent: 'center', marginTop: 250, color: Colors.DARK_GREY}} >{t('no_data')}</Text>
        </View>
    )
}