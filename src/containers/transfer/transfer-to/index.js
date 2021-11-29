import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, Image, FlatList } from 'react-native';

import { ICO_ADDRESS_BOOK_INSIDE, SUPPORTED_COINS } from '@/common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEmpty, isArray } from 'lodash';

import {
  NavTitleBackHeader,
  BlueButton,
  NoteTransfer,
  TouchableX,
  Popup,
  PopUpTransfer,
  RNInput,
  RNInput2,
  RNInput3,
  RNInput4,
} from '@/components';
import { useAppContext, useTranslation, useDebounce } from '@/hooks';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';
import { ICO_CLOSE, showLoading, showErrorToast, Routes } from '@/common';
import { formatCommaNumber, formatNumberFee, getWalletAddress } from '@/utils';
import { NavigationService } from '@/services';

import styles from './styles';

export const TransferToScreen = ({ route }) => {
  const { t } = useTranslation();
  const {
    searchUsers,
    getTransactionCoinFee,
    withdrawMoney,
    getUserWallets,
    coinFee,
    userWallets,
    confirmWithdraw,
    accountInfo,
    getCoinRates,
    coinRates,
    getWithdrawLimitedInfo
  } = useAppContext();

  useEffect(() => {
    getAvailableCoin();
    getLimit();
    getFeeCoin();
    getLimitWithdrawCoins();
  }, [coinFee]);

  const coinId = route.params?.coinId;
  const coin = route.params?.coin;

  const [availableCoin, setAvailableCoin] = useState(0);
  const [quantity, setQuantity] = useState('');
  const [limit, setLimit] = useState(0);
  const [withdrawed, setWithdrawed] = useState();
  const [limitCoin, setLimitCoin] = useState();
  const [fee, setFee] = useState(0);

  const coins = SUPPORTED_COINS.find((item) => item.id === coinId);

  const getAvailableCoin = () => {
    if (userWallets) {
      const existingCoin = userWallets.find((item) =>
        item.type.toLowerCase() === coin?.id)
      if (existingCoin) {
        setAvailableCoin(existingCoin);
      }
    }
  };

  const getLimit = () => {
    if (coinFee && coinRates) {
      const { limit } = coinRates;
      let min_coin = 0;
      min_coin = limit[`min_wtd_${coin.id}`];
      setLimit(min_coin);
    }
  };

  const getFeeCoin = () => {
    if(coinFee) {
      let fee = 0; 
       fee = coinFee[`${coin.id}_fee`];
       setFee(fee);
    }
  }

  const getLimitWithdrawCoins = async () => {
    const res = await getWithdrawLimitedInfo();
    setWithdrawed(res.data?.withdrawed);
    setLimitCoin(res.data?.limit);
  };

  const onSetAllAvailableCoin = () => {
    setQuantity(availableCoin.amount);
  }

  return (
    <View style={styles.container}>
      <NavTitleBackHeader
        containerStyle={styles.navHeader}
        title={`${t('transfer_money')} ${coinId.toUpperCase()}`}
      />
      <KeyboardAwareScrollView style={styles.viewContainer}>
        <View style={styles.viewContainer1}>
          <View style={{ padding: 10 }}>
            <Text style={styles.text}> Tổng số tiền : </Text>
            <Text style={styles.text}> Số dư khả dụng : </Text>
            <Text style={styles.text}> Số dư pending : </Text>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={styles.text}> {`${formatCommaNumber(availableCoin.amount)} ${coinId.toUpperCase()}`} </Text>
            <Text style={styles.text}> {`${formatCommaNumber(availableCoin.amount)} ${coinId.toUpperCase()}`} </Text>
            <Text style={styles.text}> {`${formatCommaNumber(availableCoin.pending)} ${coinId.toUpperCase()}`} </Text>
          </View>
        </View>
        <View style={styles.viewContainer2}>
          <RNInput4
            textname={t('seach_recipients')}
            placeholder={t('seach_recipients_place_holder')}
            placeholderTextColor={Colors.GREY}
          />
          <RNInput2
            containerStyle={{ backgroundColor: '#E9ECEF' }}
            textname={t('recipient')}
            editable={false}
          />
          <RNInput2
            textname={t('content')}
            placeholder={t('content')}
          />

          <View style={styles.transactionContainer}>
            <Text style={styles.title}>{t('quantity')}</Text>
            <TouchableX style={styles.transactionContainer} onPress={onSetAllAvailableCoin}>
              <Text style={[styles.transactionText, { color: Colors.GREY }]}>
                {t('you_have')}
              </Text>
              <Text style={[styles.transactionText, { color: 'black', marginLeft: 5 }]}>
                {`${formatCommaNumber(availableCoin.amount)} VNDT`}
              </Text>
            </TouchableX>
          </View>

          <RNInput3
            placeholder={`${'Minimum'} ${limit} ${coin.id.toUpperCase()}`}
            value={quantity}
            keyboardType="decimal-pad"
            onChangeText={(value) => setQuantity(value)}
          />

          <View style={{ flexDirection: 'row', marginTop: actuatedNormalize(10) }}>
            <Text style={{ fontFamily: FontFamily.TitilliumWeb.SemiBold, color: Colors.GREY, fontSize: 12 }}>{t('limit_24h')}</Text>
            <Text style={{ fontFamily: FontFamily.TitilliumWeb.SemiBold, color: 'black', fontSize: 12 }}> {`${withdrawed} / ${limitCoin} BTC`}</Text>
          </View>

          <RNInput2
            containerStyle={{ backgroundColor: '#E9ECEF' }}
            textname={t('fee')}
            placeholder={'Trung bình'}
            editable={false}
          />

          <View style={{ flexDirection: 'row', marginTop: actuatedNormalize(10) }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ padding: 10 }}>
                <Text style={styles.text}> {t('fee')} </Text>
                <Text style={styles.text}> {t('total')}</Text>
              </View>
              <View style={{ padding: 10 }}>
                <Text style={[styles.text, { color: Colors.RED }]}> {`${formatCommaNumber(fee)} ${coins.networkFee.toUpperCase()}`} </Text>
                <Text style={[styles.text, { color: Colors.BLUE }]}> {`${formatCommaNumber(availableCoin.amount)} ${coin.id.toUpperCase()}`} </Text>
              </View>
            </View>
          </View>

          <BlueButton
            title={t('transfer_now')}
            containerStyle={styles.transferButton}
            name='exchange-alt'
          />

          <NoteTransfer coinId={coin?.id} coinName={coin?.id.toUpperCase()} containerStyle={[styles.noteContainer, { marginBottom: actuatedNormalize(20) }]} />

        </View>
      </KeyboardAwareScrollView>
    </View>
  )
};
