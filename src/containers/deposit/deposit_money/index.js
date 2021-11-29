import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { NavTitleBackHeader } from '@/components';
import { useTranslation } from '@/hooks';

export const DepositMoney = ({ route }) => {

    const coinName = route.params?.coinName;
    const coinId = route.params?.coinId;

    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <NavTitleBackHeader
                containerStyle={styles.navHeader}
                title={`${t('tab_deposit')} ${coinId.toUpperCase()}`}
            />
            <Text>Nạp qua ngân hàng </Text>
        </View>
    )
}