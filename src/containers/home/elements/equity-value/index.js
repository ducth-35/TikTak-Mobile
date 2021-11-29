import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

import { isArray, sortBy } from 'lodash';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useAppContext, useTranslation } from '@/hooks';
import { SUPPORTED_COINS, HIDEN_NUMBER } from '@/common';
import { formatCommaNumber, formatNumberFee } from '@/utils';
import { Colors, actuatedNormalize } from '@/themes';

import styles from './styles';

export const EquityValue = () => {
  const { t } = useTranslation();
  const {
    coinRates,
    userWallets,
    updateHidePrice,
    isHidePrice,
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
        setExchangeUFX(formatCommaNumber(TotalEchangeUFX.toFixed(2)));
      }
    }
  };


  const onUpdateShowHidePrice = () => {
    updateHidePrice(!isHidePrice);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{t('equity_value')} </Text>
        <TouchableOpacity onPress={onUpdateShowHidePrice}>
          <FontAwesome5
            name={isHidePrice ? 'eye-slash' : 'eye'}
            style={styles.iconEye}
            size={12}
            color={Colors.WHITE}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.row, { alignItems: 'baseline' }]}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.balance}>
            {`~ ${isHidePrice ? HIDEN_NUMBER : formatNumberFee(amount)}  VNDT`}
          </Text>
          <View style={{ marginLeft: actuatedNormalize(20) }}>
            <Text style={[styles.balance, { color: Colors.WHITE, fontSize: 12 }]}>
              {`( ~ ${isHidePrice ? HIDEN_NUMBER : exchangeUFX }  UFX )`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
