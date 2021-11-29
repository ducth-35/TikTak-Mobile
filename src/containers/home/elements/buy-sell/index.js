import React from 'react';
import { View, Image, Text } from 'react-native';

import { useTranslation } from '@/hooks';
import { TouchableX } from '@/components';
import { ICO_BUY, ICO_SELL, Routes } from '@/common';
import { NavigationService } from '@/services';

import styles from './styles';

export const BuySell = () => {
  const { t } = useTranslation();

  const onNavigateToDepositScreen = () => {
    NavigationService.navigate(Routes.DEPOSIT);
  };

  const onNavigateToWithdrawScreen = () => {
    NavigationService.navigate(Routes.WITHDRAWAL);
  };

  return (
    <View style={styles.container}>
      <TouchableX style={styles.buyButton} onPress={onNavigateToDepositScreen}>
        {/* <Image style={styles.icon} source={ICO_BUY} resizeMode="contain" /> */}
        <Text style={styles.title}>{t('tab_deposit')}</Text>
      </TouchableX>
      <TouchableX
        style={styles.sellButton}
        onPress={onNavigateToWithdrawScreen}>
        {/* <Image style={styles.icon} source={ICO_SELL} resizeMode="contain" /> */}
        <Text style={styles.title}>{t('tab_withdrawal')}</Text>
      </TouchableX>
    </View>
  );
};
