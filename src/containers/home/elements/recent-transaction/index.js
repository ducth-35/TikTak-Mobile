import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useTranslation, useAppContext } from '@/hooks';
import styles from './styles';
import { Colors, FontFamily } from '@/themes';
import { COLUMNS_EXCHANGE, TRANSACTION_TYPE, GIFTCODE_STATUS, SUPPORTED_COINS } from '@/common';
import dayjs from 'dayjs';
import { formatCommaNumber } from '@/utils';
import { PopupExchange, TouchableX } from '@/components';

export const RecentTranslations = () => {
  const { t } = useTranslation();

  const { getTransactionHistory } = useAppContext();

  const [data, setData] = useState([]);
  const [showExchange, setShowExchange] = useState(false);
  const [showDataModal, setShowDataModal] = useState();

  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    const params = { c: 'all', t: 'all', l: 5 }
    const res = await getTransactionHistory(params);
    if (res) {
      setData(res.data);
    }
  };

  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {COLUMNS_EXCHANGE.map((column, index) => {
        return (
          <View
            key={index}
            style={styles.columnHeader}>
            <Text style={styles.columnHeaderTxt}>{column} </Text>
          </View>
        )
      })}
    </View>
  );

  const renderItems = ({ item, index }) => {

    const { transactionType, amount, quantity, status, timesendOrReceive, currencyCode } = item;

    const findItems = TRANSACTION_TYPE.find((item) => item.value === transactionType);
    const statusFilter = GIFTCODE_STATUS.find((item) => item.value === status);

    const coinType = SUPPORTED_COINS.find(
      (item) => item.currencyCode === currencyCode,
    );

    const onPress = () => {
      setShowExchange(true);
      setShowDataModal(transactionType, amount, quantity, status, timesendOrReceive, currencyCode);
    }

    return (
      <TouchableX style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? "#E7E6E1" : "white" }} onPress={onPress}>
        <View style={{ ...styles.columnRowTxt }}>
          <Text style={{ fontFamily: FontFamily.TitilliumWeb.SemiBold, textAlign: "center", color: findItems.color }}>{t(`${findItems.id}`)}</Text>
          <Text style={{ fontFamily: FontFamily.TitilliumWeb.SemiBold, textAlign: "center", fontSize: 10 }}>{dayjs(timesendOrReceive).format(' YYYY-MM-YY')}</Text>
          <Text style={{ fontFamily: FontFamily.TitilliumWeb.SemiBold, textAlign: "center", fontSize: 10 }}>{dayjs(timesendOrReceive).format('HH:mm:ss ')}</Text>
        </View>
        <View style={{ ...styles.columnRowTxt }}>
          <Text style={{ fontFamily: FontFamily.TitilliumWeb.SemiBold, textAlign: "center", fontSize: 12 }}>{`${formatCommaNumber(quantity)} ${coinType.id.toUpperCase()}`}</Text>
          <Text style={{ fontFamily: FontFamily.TitilliumWeb.SemiBold, textAlign: "center", fontSize: 10, color: Colors.GREY }}>{`${formatCommaNumber(amount)} VNDT`}</Text>
        </View>
        <View style={{ ...styles.columnRowTxt }}>
          <View style={{
            paddingVertical: 3,
            paddingHorizontal: 4,
            width: 90,
            borderRadius: 4,
            alignItems: 'center',
            marginLeft: 20,
            backgroundColor: statusFilter ? statusFilter.color : 'grey'
          }}>
            <Text style={{
              fontFamily: FontFamily.TitilliumWeb.SemiBold,
              color: Colors.WHITE,
              textAlign: "center",
              fontSize: 12
            }}>{`${statusFilter ? t(`${statusFilter.id}`) : ''
              }`}</Text>
          </View>
        </View>
      </TouchableX>
    )
  }
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}> Giao dịch gần đây </Text>
      </View>
      <View style={styles.viewContainer}>
        <FlatList
          data={data}
          ListHeaderComponent={tableHeader}
          keyExtractor={(item, index) => index + ""}
          stickyHeaderIndices={[0]}
          renderItem={renderItems}
        />
      </View>
      <PopupExchange
        isVisible={showExchange}
        onClose={() => setShowExchange(false)}
        // title={amount}
      />
    </View>
  );
};
