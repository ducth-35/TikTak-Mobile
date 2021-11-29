import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import { useTranslation, useAppContext } from '@/hooks';
import { TouchableX } from '@/components';
import { Colors } from '@/themes';
import { Table, TableWrapper, Row } from 'react-native-table-component';

import styles from './styles';
import { SUPPORTED_COINS } from '@/common';
import { isArray } from 'lodash';
import { formatNumberFee } from '@/utils';

export const Exchange = () => {
  const { t } = useTranslation();
  const {
    userWallets,
    getCoinRates,
    coinRates
  } = useAppContext();

  const [data, setData] = useState([]);

  const tableHead = ['Thị trường', 'Giá mua (VNDT)', 'Giá bán (VNDT)'];
  const widthArr = [90, 128, 128];

  const Coins = SUPPORTED_COINS.filter((item) => item.id !== 'vndt');

  useEffect(() => {
    getData();
    getCoinRates();
  }, [userWallets]);

  const getData = () => {
    if (coinRates && userWallets && isArray(userWallets)) {
      let exchange_coin = [];
      const { rates } = coinRates;
      Coins.forEach((item) => {
        userWallets.forEach((coin) => {
          if (item.id.toUpperCase() === coin.type) {
            let ask = 0;
            let bid = 0;
            ask = rates[`ask_${item.id}`];
            bid = rates[`bid_${item.id}`];
            const updatedCoina = [
              `${item.id.toUpperCase()} - VNDT`,
              `${formatNumberFee(ask)}`,
              `${formatNumberFee(bid)}`
            ];
            exchange_coin.push(updatedCoina);
            setData(exchange_coin);
          }
        });
      });
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>{t('exchange')}</Text>
      </View>
      <View style={styles.tableContainer}>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
          <Row data={tableHead} widthArr={widthArr} style={[styles.header]} textStyle={[styles.text, { color: 'white' }]} />
        </Table>
        <ScrollView style={styles.dataWrapper}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            {
              data.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                  textStyle={styles.text}
                />
              ))
            }
          </Table>
        </ScrollView>
      </View>
    </View>
  );
};
