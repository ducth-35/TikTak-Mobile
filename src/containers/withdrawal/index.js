import { NavTitleBackHeader, SelectCoins, BlueButton } from '@/components';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { useTranslation } from '@/hooks';
import { SUPPORTED_COINS } from '@/common';

export const WithdrawScreen = () => {

    const { t } = useTranslation();

    const [selectedCoin, setSelectedCoin] = useState(null);

    const coin = SUPPORTED_COINS.filter((item) => item.id);


    const onSelectedCoin = (item) => {
        setSelectedCoin(item);
    }

    return (
        <View style={styles.container}>
            <NavTitleBackHeader
                containerStyle={styles.navHead}
                title={t('select_coin_withdraw')}
            />
            <Text style={styles.headerText}>Vui lòng chọn loại Coin cần RÚT </Text>

            <SelectCoins coins={coin} onSelected={onSelectedCoin} numColumns={2} />

            <BlueButton
                title={t('continue')}
                containerStyle={styles.withdrawalButton}
                isActive={selectedCoin ? true : false}
            // onPress={onContinue}
            />
        </View>
    )
}