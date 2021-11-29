import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { NavTitleBackHeader, BlueButton, SelectCoins } from '@/components';
import { useTranslation } from '@/hooks';
import { Routes, SUPPORTED_COINS } from '@/common';
import { NavigationService } from '@/services';

import styles from './styles';

export const COINS = () => {
    const { t } = useTranslation();

    const onSelectedCoin = (item) => {
        NavigationService.navigate(Routes.DEPOSIT_COIN, {
            coinName: item.name,
             coinId: item.id,  
        })
    };

    const Coin = SUPPORTED_COINS.filter((item) => item.id !== 'vndt' && item.id !== 'ufx')

    return (
        <View style={styles.container}>
            <NavTitleBackHeader
                containerStyle={styles.navHeader}
                title={t('tab_deposit')}
            />
            <Text style={styles.headerText}>{t('select_coin_deposit')}</Text>
            <SelectCoins coins={Coin} onSelected={onSelectedCoin} numColumns={2} />
        </View>
    );
};