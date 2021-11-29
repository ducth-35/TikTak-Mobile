import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';

import { NavTitleBackHeader, SelectCoinsSwap, BlueButton } from '@/components';
import { useTranslation, useAppContext } from '@/hooks';
import { SUPPORTED_COINS, Routes, SWAP_TYPE } from '@/common';
import { Colors } from '@/themes';
import { NavigationService } from '@/services';
import { sortBy } from 'lodash';

import styles from './styles';

export const SwapScreen = () => {
  const { t } = useTranslation();

  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const { getCoinRates, coinRates } = useAppContext();
  const [perCoin, setPerCoin] = useState(0);

  const Coin = SUPPORTED_COINS.filter((item) =>  item.id !== 'vndt' && item.id !== 'all')

  useEffect(() => {
    getTrackingCoins();
  }, [])

  const onSelectedCoin = (item) => {
    setSelectedCoin(item);
  };
  useEffect(() => {
    getCoinRates();
  }, []);

  const getTrackingCoins = () => {
    if (Coin) {
      let tmpCoins = [];
      Coin.forEach((item) => {
        if (coinRates) {
          const { rates } = coinRates;
          let Per = 0;
          Per = rates[`per_${item.id}`]
          const updateCoin = {
            ...item,
            perCoin: Per
          }
          if (updateCoin) {
            tmpCoins.push(updateCoin)
          } else if (updateCoin.perCoin > 0) {
            tmpCoins.push(updateCoin)
          }
        }
      });
      const sortedCoins = sortBy(tmpCoins, [
        (o) => {
          return o.order;
        },
      ]);
      setCoins(sortedCoins);
    }
  }

  const onSell = () => {
    if (selectedCoin) {
      NavigationService.navigate(Routes.SWAP_TO_SELL, {
        coin: selectedCoin,
        type: SWAP_TYPE.SELL,
        coinId: selectedCoin.id,
      });
    }
  };

  const onBuy = () => {
    if (selectedCoin) {
      NavigationService.navigate(Routes.SWAP_TO_BUY, {
        coin: selectedCoin,
        type: SWAP_TYPE.BUY,
        coinId: selectedCoin.id,
      });
    }
  };

  return (
    <View style={styles.container}>
      <NavTitleBackHeader containerStyle={styles.navHeader} title={t('swap')} />
      <Text style={styles.headerText}>{t('select_coin_swap')}</Text>
      <SelectCoinsSwap coins={coins} onSelected={onSelectedCoin} />
      <View style={styles.row}>
        <BlueButton
          title={t('sell')}
          containerStyle={[styles.buyButton, { marginRight: 5 }]}
          isActive={selectedCoin ? true : false}
          onPress={onSell}
          activeBackgroundColor={Colors.RED}
        />

        <BlueButton
          title={t('buy')}
          containerStyle={[styles.buyButton, { marginLeft: 5 }]}
          isActive={selectedCoin ? true : false}
          onPress={onBuy}
        />
      </View>
    </View>
  );
};
