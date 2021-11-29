import { SUPPORTED_COINS } from '@/common';
import { TouchableX } from '@/components';
import { useTranslation, useAppContext } from '@/hooks';
import { actuatedNormalize, Colors } from '@/themes';
import { formatNumberFee } from '@/utils';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native';
import styles from './styles';
import { NavigationService } from '@/services';
import { Routes } from '@/common';


export const BuySellTransfer = () => {

  const { t } = useTranslation();

  const {
    coinRates,
    userWallets,
  } = useAppContext();

  const [amount, setAmount] = useState(0);
  const [exchangeUFX, setExchangeUFX] = useState();

  useEffect(() => {
    getTrackingCoins();
  }, [coinRates, userWallets]);

  const getTrackingCoins = () => {
    if (coinRates && userWallets && isArray(userWallets)) {
      const { rates } = coinRates;
      const tmpCoins = [];

      SUPPORTED_COINS.forEach((item) => {
        userWallets.forEach((coin) => {
          if (item.id.toUpperCase() === coin.type) {
            let ask = 0;
            let bid = 0;
            let exchange_vndt = 0;
            let amounts = 0;
            ask = rates[`ask_${item.id}`];
            bid = rates[`bid_${item.id}`];
            amounts = coin.amount;
            exchange_vndt = ([(ask + bid) / 2] * amounts);
            tmpCoins.push(exchange_vndt);
          }
        })
      });


      let total_balance = 0;
      tmpCoins.forEach((value) => {
        total_balance += value;
        setAmount(formatNumberFee(total_balance));
      });
      if (coinRates) {
        const { rates } = coinRates;
        let ask_ufx = 0;
        let bid_ufx = 0;
        ask_ufx = rates[`ask_ufx`];
        bid_ufx = rates[`bid_ufx`];
        const ExchangeUFX = (ask_ufx + bid_ufx) / 2;
        const TotalEchangeUFX = (total_balance) / (ExchangeUFX);
        setExchangeUFX(TotalEchangeUFX.toFixed(2));
      }
    }

  }

  const onDepost = () => {
    NavigationService.navigate(Routes.COIN_MONEY);
  }

  const onWithdraw = () => {
    NavigationService.navigate(Routes.WITHDRAW, { type: 'WITHDRAW' });
  }

  const onSend = () => {
    NavigationService.navigate(Routes.TRANSFER);
  }


  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={{ marginBottom: actuatedNormalize(10) }}>
          <Text style={styles.balance}>{`${t('equity_value')} ~ ${amount} VNDT`}</Text>
        </View>
        <View style={{ marginBottom: actuatedNormalize(20) }}>
          <Text style={styles.balance}>{`( ~ ${exchangeUFX} UFX )`}</Text>
        </View>
        <View style={styles.contentContainer}>
          <TouchableX
            onPress={onDepost}
            style={[styles.itemContainer, { backgroundColor: '#28a745', marginRight: 4 }]}>
            <Text style={styles.title}> Nạp VNDT </Text>
          </TouchableX>
          <TouchableX
            onPress={onWithdraw}
            style={[styles.itemContainer, { backgroundColor: '#ffc107', marginRight: 4, marginLeft: 4 }]}>
            <Text style={styles.title}> Rút VNDT </Text>
          </TouchableX>
          <TouchableX
            onPress={onSend}
            style={[styles.itemContainer, { backgroundColor: '#007bff', marginLeft: 4 }]}>
            <Text style={styles.title}> Chuyển VNDT </Text>
          </TouchableX>
        </View>
      </View>
    </View>
  )
}