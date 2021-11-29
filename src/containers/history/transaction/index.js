import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, RefreshControl, Image, Linking } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';
import ActionSheet from 'react-native-actionsheet';
import Clipboard from '@react-native-community/clipboard';

import { ICO_SEARCH } from '@/common';
import { NoData, TouchableX } from '@/components';
import { useTranslation, useAppContext } from '@/hooks';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';

import {
  showLoading,
  showSuccessToast,
  SUPPORTED_COINS,
  GIFTCODE_STATUS,
  ICO_CHECK_EXPORT,
  TRANSACTION_TYPE,
  FROM_TO,
  CHECK_EXPORT,
  searchKeys
} from '@/common';
import { multiFilter, formatCommaNumber } from '@/utils';

import styles from './styles';

export const TransactionHistory = () => {
  const { t } = useTranslation();
  const { transactionHistory, getTransactionHistory } = useAppContext();

  const [showSearchContainer, setShowSearchContainer] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [searchCoin, setSearchCoin] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [listHistory, setListHistory] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const actionSheetCoinsRef = useRef(null);
  const actionSheetTypeRef = useRef(null);

  const supportedCoinOptions = [
    ...SUPPORTED_COINS.map(
      (item) => `${item.name} (${item.id.toUpperCase()})`
    ), t('cancel')
  ];

  const transactionTypeOptions = [
    ...TRANSACTION_TYPE.filter((item) =>
      ['all', 'tab_withdrawal', 'tab_deposit', 'commission', 'receive', 'fee'].includes(item.id),
    ).map((item) => t(`${item.id}`)),
    t('cancel'),
  ];

  useEffect(() => {
    fetchData({ isShowLoading: false });
  }, []);

  useEffect(() => {
    fetchData({ isShowLoading: false });
  }, [isRefreshing]);

  useEffect(() => {
    filterHistory();
  }, [transactionHistory, keywords, searchCoin, searchType]);

  const fetchData = async ({ isShowLoading }) => {
    if (isShowLoading) {
      showLoading();
    }

    const params = { c: 'all', t: 'depowith', l: 1000 };

    await getTransactionHistory(params);
    setIsRefreshing(false);
  };

  const filterHistory = () => {
    let filters = {};

    const searchData = (data, keywords) => {
      return data.filter(item => {
        return searchKeys.some(key =>
          String(item[key]).toLowerCase().includes(keywords.toLowerCase())
        );
      });
    };

    const result = searchData(transactionHistory, keywords);

    if (!isEmpty(searchCoin)) {
      filters[`currencyCode`] = (currencyCode) => {
        if (searchCoin.id === 'all') {
          return currencyCode === 1 || 3 || 17 || 6 || 8 || 10 || 11 || 12 || 16 || 14 || 15;
        } else {
          return currencyCode === searchCoin.currencyCode;
        }
      };
    }

    if (!isEmpty(searchType)) {
      filters[`transactionType`] = (transactionType) => {
        if (searchType.id === 'all') {
          return transactionType === 3 || 4 || 5 || 7 || 8;
        } else {
          return transactionType === searchType.value;
        }
      };
    }
    const filtered = multiFilter({ arr: transactionHistory, filters: filters });

    if (!isEmpty(keywords)) {
      result.sort((a, b) => b.createdDate - a.createdDate);
      setListHistory(result);
    } else {
      result.sort((a, b) => b.createdDate - a.createdDate);
      setListHistory(filtered);
    }
  };

  const onShowHideSearchContent = () => {
    setShowSearchContainer((prev) => !prev);
  };

  const onShowActionSheetCoins = () => {
    if (actionSheetCoinsRef) {
      actionSheetCoinsRef.current.show();
    }
  };

  const onShowActionSheetType = () => {
    if (actionSheetTypeRef) {
      actionSheetTypeRef.current.show();
    }
  };

  const onResetAll = () => {
    setKeywords(null);
    setSearchCoin(null);
    setSearchType(null);
  };

  const renderSearchContainer = () => {
    return (
      <View style={styles.searchContainer}>
        <TouchableX
          style={styles.searchTitle}
          onPress={onShowHideSearchContent}>
          <View style={styles.inputContainer}>
            <Image style={styles.icon} source={ICO_SEARCH} resizeMode="contain" />
            <View style={[styles.leftContainer, { paddingLeft: actuatedNormalize(11), }]}>
              <TextInput
                style={[styles.input, { color: Colors.GREY }]}
                placeholderTextColor={Colors.GREY}
                onChangeText={(value) => setKeywords(value)}
                placeholder={t('search_giftcode')}
                value={keywords ? keywords : ''}
              />
            </View>
            <View style={styles.expandButton}>
              <FontAwesome5
                name={showSearchContainer ? 'chevron-up' : 'chevron-down'}
                color="gray"
                size={15}
              />
            </View>
          </View>
        </TouchableX>

        {showSearchContainer && (
          <>
            <View style={{ flexDirection: 'row', marginTop: actuatedNormalize(12) }}>
              <TouchableX
                style={styles.inputContainer1}
                onPress={onShowActionSheetCoins}>
                <View style={styles.leftContainer} pointerEvents="none">
                  <TextInput
                    style={[styles.input, { color: Colors.GREY }]}
                    placeholderTextColor={Colors.GREY}
                    editable={false}
                    placeholder={t('coin_type')}
                    value={
                      searchCoin
                        ? `${searchCoin.name} (${searchCoin.id.toUpperCase()})`
                        : ''
                    }
                  />
                </View>
                <View style={styles.rightContainer}>
                  <FontAwesome5 name={'chevron-down'} color="gray" size={12} />
                </View>
              </TouchableX>

              <TouchableX
                style={[styles.inputContainer1, { width: '42%', marginLeft: actuatedNormalize(13) }]}
                onPress={onShowActionSheetType}>
                <View style={styles.leftContainer} pointerEvents="none">
                  <TextInput
                    style={[styles.input, { color: Colors.GREY }]}
                    placeholderTextColor={Colors.GREY}
                    editable={false}
                    placeholder={t('transaction_type')}
                    value={searchType ? t(`${searchType.id}`) : ''}
                  />
                </View>
                <View style={styles.rightContainer}>
                  <FontAwesome5 name={'chevron-down'} color="gray" size={12} />
                </View>
              </TouchableX>
            </View>
          </>
        )}
      </View>
    );
  };

  const onCopyHashReceive = (code) => {
    if (!isEmpty(code)) {
      Clipboard.setString(code);
      showSuccessToast(`${t('copy_success')}TxID !`);
    }
  };

  const getTransactionType = ({ type }) => {
    const findItem = TRANSACTION_TYPE.find((item) => item.value === type);
    if (findItem) {
      return t(`${findItem.id}`);
    }
    return '';
  };

  const getFromTo = ({ type }) => {
    const findItem = FROM_TO.find((item) => item.value === type);
    if (findItem) {
      return t(`${findItem.id}`);
    }
    return '';
  }


  const renderHistoryItem = ({ item, index }) => {
    const {
      id,
      createdDate,
      transactionType,
      quantity,
      currencyCode,
      status,
      rate,
      fee,
      addressReceivePayment,
      hash,
      transactionContent,
      amount
    } = item;

    const selectedCoin = SUPPORTED_COINS.find(
      (item) => item.currencyCode === currencyCode,
    );

    const statusFilter = GIFTCODE_STATUS.find((item) => item.value === status);

    const onCheck = () => {
      Linking.openURL(CHECK_EXPORT + `${hash}`)
    }

    return (
      <TouchableX
        style={styles.itemContainer}
        onPress={() => onCopyHashReceive(hash)}>
        <View style={styles.itemLeftContainer}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('id')}:`}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text
                style={[
                  styles.title,
                  {
                    marginLeft: 10,
                    color: Colors.BLUE,
                    fontSize: actuatedNormalize(15),
                  },
                ]}>
                {id}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>
                  {`${t('quantity')}:`}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text
                style={[
                  styles.title,
                  { marginLeft: 10, fontWeight: 'bold', color: Colors.RED },
                ]}>{`${formatCommaNumber(
                  quantity,
                )} ${selectedCoin?.id.toUpperCase()}`}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <View style={[styles.row, { marginTop: actuatedNormalize(10) }]}>
                  <Text style={[styles.title, { fontWeight: 'bold' }]}>
                    {`${t('status')}:`}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <View
                style={[
                  styles.statusView,
                  { backgroundColor: statusFilter ? statusFilter.color : 'grey' },
                ]}>
                <Text style={[styles.title, { fontWeight: 'bold', color:Colors.WHITE, fontSize: actuatedNormalize(10) }]}>{`${statusFilter ? t(`${statusFilter.id}`) : ''
                  }`}</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{getFromTo({ type: transactionType })}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={[styles.title, { marginLeft: 10, flex: 1 }]}>
                {addressReceivePayment}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>
                  {`${t('rate')}:`}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text
                style={[
                  styles.title,
                  { marginLeft: 10, fontWeight: 'bold', color: Colors.WHITE},
                ]}>{`${formatCommaNumber(
                  rate,
                )} ${selectedCoin?.id.toUpperCase()}`}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>
                  {`${t('fee')}:`}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text
                style={[
                  styles.title,
                  { marginLeft: 10, fontWeight: 'bold', color: Colors.WHITE},
                ]}>{`${formatCommaNumber(
                  fee,
                )} ${selectedCoin?.id.toUpperCase()}`}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>
                  {`${t('total_credit')}:`}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text
                style={[
                  styles.title,
                  { marginLeft: 10, fontWeight: 'bold', color: Colors.WHITE},
                ]}>{`${formatCommaNumber(
                  amount,
                )} VNDT`}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t(
                  'exchange',
                )}:`}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={[styles.title, { marginLeft: 10, flex: 1 }]}>
                {getTransactionType({ type: transactionType })}
              </Text>
            </View>
          </View>


          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text
                  style={[styles.title, { fontWeight: 'bold' }]}>{`${t('txid')}:`}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end', width: '50%' }}>
              <Text numberOfLines={1} ellipsizeMode='middle' style={[styles.title, { marginLeft: 10, flex: 1 }]}>
                {hash}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>
                  {`${t('date')}:`}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={[styles.title, { marginLeft: 10 }]}>
                {dayjs(createdDate).format('HH:mm DD-MM-YYYY')}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={[styles.row, { marginTop: actuatedNormalize(10) }]}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t(
                  'content',
                )}:`}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={[styles.title, { marginLeft: 10, flex: 1 }]}>
                {transactionContent}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <TouchableX
              onPress={onCheck}
              style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <View style={{
                  backgroundColor: Colors.BLUE,
                  borderRadius: 3, marginTop: 10
                }}>
                  <View style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 3,
                    paddingHorizontal: actuatedNormalize(10)
                  }}>
                    <Image
                      style={styles.Icon}
                      source={ICO_CHECK_EXPORT} />
                    <Text style={[styles.title,
                    {
                      color: Colors.WHITE,
                      textAlign: 'center',
                      fontFamily: FontFamily.TitilliumWeb.SemiBold
                    }]}>{('Check Export')}</Text>
                  </View>
                </View>
              </View>
            </TouchableX>
          </View>
        </View>
      </TouchableX>
    );
  };

  const onRefresh = () => {
    setIsRefreshing(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <KeyboardAwareFlatList
          style={styles.scrollView}
          contentContainerStyle={styles.contentScrollContainer}
          ListHeaderComponent={renderSearchContainer()}
          data={listHistory}
          renderItem={renderHistoryItem}
          ListEmptyComponent={<NoData />}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor="white"
            />
          }
          keyExtractor={(item, index) => `${item.id}-${index}`}
        />
      </View>
      <ActionSheet
        ref={actionSheetCoinsRef}
        options={supportedCoinOptions}
        cancelButtonIndex={supportedCoinOptions.length - 1}
        onPress={(index) => {
          if (index !== supportedCoinOptions.length - 1) {
            const value = supportedCoinOptions[index];
            const coin = SUPPORTED_COINS.find(
              (item) => value === `${item.name} (${item.id.toUpperCase()})`,
            );

            if (coin) {
              setSearchCoin(coin);
            }
          }
        }}
      />

      <ActionSheet
        ref={actionSheetTypeRef}
        options={transactionTypeOptions}
        cancelButtonIndex={transactionTypeOptions.length - 1}
        onPress={(index) => {
          if (index !== transactionTypeOptions.length - 1) {
            const value = transactionTypeOptions[index];
            const condition = TRANSACTION_TYPE.find(
              (item) => value === t(`${item.id}`),
            );

            if (condition) {
              setSearchType(condition);
            }
          }
        }}
      />
    </View>
  );
};
