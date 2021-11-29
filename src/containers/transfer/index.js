import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image } from 'react-native';

import { NavTitleBackHeader, BlueButton, SelectCoins, TouchableX } from '@/components';
import { useTranslation } from '@/hooks';
import { Routes, SUPPORTED_COINS, ICO_CLOSE } from '@/common';
import { NavigationService } from '@/services';

import styles from './styles';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';

export const TransferScreen = () => {
  const { t } = useTranslation();
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    setCoins(
      SUPPORTED_COINS.filter(
        (item) =>
          item.id === 'vndt' ||
          item.id === 'ufx'
      ),
    );
  }, []);

  const onSelectedCoin = (item) => {
    setSelectedCoin(item);
  };

  const onContinue = () => {
    if (selectedCoin) {
      NavigationService.navigate(Routes.TRANSFER_TO, {
        coinId: selectedCoin.id,
        coin: selectedCoin
      });
    }
  };
  return (
    <View style={styles.container}>
      <NavTitleBackHeader
        containerStyle={styles.navHeader}
        title={t('transfer')}
      />
      <View>
        <Text style={styles.headerText}>{t('select_coin_transfer')}</Text>
        <SelectCoins coins={coins} onSelected={onSelectedCoin} numColumns={2} />
        <BlueButton
          title={t('continue')}
          containerStyle={styles.withdrawalButton}
          isActive={selectedCoin ? true : false}
          onPress={onContinue}
        />
      </View>
    </View>
  );
};
