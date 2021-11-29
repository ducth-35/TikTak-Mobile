import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, RefreshControl, Image } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';
import ActionSheet from 'react-native-actionsheet';
import Clipboard from '@react-native-community/clipboard';
import { ICO_SEARCH, searchKeysgiftcode } from '@/common';

import { NoData, TouchableX } from '@/components';
import { useTranslation, useAppContext } from '@/hooks';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';
import {
  SUPPORTED_GIFTCODE_COINS_HISTORY,
  GIFTCODE_STATUS,
  GIFTCODE_FILTER_HISTORY,
  showLoading,
  showSuccessToast
} from '@/common';
import { multiFilter, formatCommaNumber } from '@/utils';

import styles from './styles';

export const GiftcodeReceiveHistory = () => {
  const { t } = useTranslation();
  const { history, getHistoryGiftcodeReceive } = useAppContext();

  const [showSearchContainer, setShowSearchContainer] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [searchCoin, setSearchCoin] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [listGiftcode, setListGiftcode] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const actionSheetCoinsRef = useRef(null);
  const actionsSheetTypeRef = useRef(null);

  const supportedCoinOptions = [
    ...SUPPORTED_GIFTCODE_COINS_HISTORY.map(
      (item) => `${item.name} (${item.id.toUpperCase()})`,
    ),
    t('cancel'),
  ];

  const conditionOptions = [
    ...GIFTCODE_FILTER_HISTORY.map((item) => t(`${item.id}`)),
    t('cancel'),
  ];

  useEffect(() => {
    fetchData({ isShowLoading: true });
  }, []);

  useEffect(() => {
    fetchData({ isShowLoading: false });
  }, [isRefreshing]);

  useEffect(() => {
    filterGiftCode();
  }, [history, keywords, searchType, searchCoin]);

  const fetchData = async ({ isShowLoading }) => {
    if (isShowLoading) {
      showLoading();
    }

    await getHistoryGiftcodeReceive();
    setIsRefreshing(false);
  };

  const filterGiftCode = () => {
    let filters = {};

    const searchData = (data, keywords) => {
      return data.filter(item => {
        return searchKeysgiftcode.some(key =>
          String(item[key]).toLowerCase().includes(keywords.toLowerCase())
        );
      });
    };
    const result = searchData(history, keywords);


    if (!isEmpty(searchCoin)) {
      filters[`currency`] = (coin) => {
        if (searchCoin.id === 'all') {
          return coin === 'xeng' || 'cent' || 'usdf' || 'vndt'.toUpperCase();
        } else {
          return coin === searchCoin.id.toUpperCase();
        }
      };
    }

    if (!isEmpty(searchType)) {
      filters[`conditions`] = (condition) => {
        if (searchType.id === 'all') {
          const parseCondition = JSON.parse(condition);
          const parseConditionValue = 'public' || 'private' || 'fixedSender' || 'fixedReceiver';

          if (
            parseCondition &&
            parseConditionValue &&
            parseCondition.type === 'public' || 'private' || 'fixedSender' || 'fixedReceiver'
          ) {
            return true;
          }
          return false;

        } else {
          const parseCondition = JSON.parse(condition);
          const parseConditionValue = JSON.parse(searchType.value);

          if (
            parseCondition &&
            parseConditionValue &&
            parseCondition.type === parseConditionValue.type
          ) {
            return true;
          }
          return false;
        }
      };
    }

    const filtered = multiFilter({ arr: history, filters: filters });

    if (!isEmpty(keywords)) {
      filtered.sort((a, b) => {
        a = new Date(a.reveiced);
        b = new Date(b.reveiced);
        return a > b ? -1 : a < b ? 1 : 0;
      });
      setListGiftcode(result);
    } else {
      filtered.sort((a, b) => {
        a = new Date(a.reveiced);
        b = new Date(b.reveiced);
        return a > b ? -1 : a < b ? 1 : 0;
      });
      setListGiftcode(filtered);
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
    if (actionsSheetTypeRef) {
      actionsSheetTypeRef.current.show();
    }
  };

  const onResetAll = () => {
    setKeywords(null);
    setSearchType(null);
    setSearchCoin(null);
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
                color="white"
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
                  <FontAwesome5 name={'chevron-down'} color="white" size={12} />
                </View>
              </TouchableX>
              {/* <Text style={[styles.title, { marginTop: actuatedNormalize(20) }]}>
                {t('giftcode_type').toUpperCase()}
              </Text> */}
              <TouchableX
                style={[styles.inputContainer1, { width: '42%', marginLeft: actuatedNormalize(13) }]}
                onPress={onShowActionSheetType}>
                <View style={styles.leftContainer} pointerEvents="none">
                  <TextInput
                    style={[styles.input, { color: Colors.GREY }]}
                    placeholderTextColor={Colors.GREY}
                    editable={false}
                    // placeholder={t('all')}
                    placeholder={t('giftcode_type')}
                    value={searchType ? t(`${searchType.id}`) : ''}
                  />
                </View>
                <View style={styles.rightContainer}>
                  <FontAwesome5 name={'chevron-down'} color="white" size={12} />
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
      showSuccessToast(t('copy_success'));
    }
  };

  const renderGiftcodeItem = ({ item, index }) => {
    const {
      id,
      reveiced,
      conditions,
      quantity,
      currency,
      status,
      hashReceive,
    } = item;

    const type = GIFTCODE_FILTER_HISTORY.find((item) => {
      const parseCondition = JSON.parse(conditions);
      const parseConditionValue = JSON.parse(item.value);
      if (
        parseCondition &&
        parseConditionValue &&
        parseCondition.type === parseConditionValue.type
      ) {
        return true;
      }
      return false;
    });

    const statusFilter = GIFTCODE_STATUS.find((item) => item.value === status);


    return (
      <TouchableX
        style={styles.itemContainer}
        onPress={() => onCopyHashReceive(hashReceive)}>
        <View style={styles.itemLeftContainer}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('code')}:`}</Text>
              </View>
            </View>
            <TouchableX
              onPress={() => onCopyHashReceive(id)}
              style={{ justifyContent: 'flex-end', width: '80%' }}>
              <Text style={[styles.title, { marginLeft: 10, flex: 1, textAlign: 'right', color: Colors.BLUE }]}>
                {id}
              </Text>
            </TouchableX>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('date_credit')}:`}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={[styles.title, { marginLeft: 10 }]}>
                {dayjs(reveiced).format('HH:mm DD-MM-YYYY')}
              </Text>
            </View>
          </View>


          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('giftcode_type')}:`}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={[styles.title, { marginLeft: 10 }]}>
                {type ? t(`${type.id}`) : ''}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('quantity')}:`}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text
                style={[styles.title, { marginLeft: 10, color: Colors.WHITE, fontFamily: FontFamily.TitilliumWeb.SemiBold }]}>{`${formatCommaNumber(
                  quantity,
                )} ${currency}`}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t(
                  'txid',
                )}:`}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end', width: '50%' }}>
              <Text numberOfLines={1} ellipsizeMode='middle' style={[styles.title, { marginLeft: 10, flex: 1}]}>
                {hashReceive}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}> {`${t('status')}:`}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <View
                style={[
                  styles.statusView,
                  { backgroundColor: statusFilter ? statusFilter.color : 'grey' },
                ]}>
                <Text style={[styles.title, { fontWeight: 'bold',color: Colors.WHITE, fontSize: actuatedNormalize(10) }]}>{`${statusFilter ? t(`${statusFilter.id}`) : ''
                  }`}</Text>
              </View>
            </View>
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
          data={listGiftcode}
          renderItem={renderGiftcodeItem}
          ListEmptyComponent={<NoData/>}
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
            const coin = SUPPORTED_GIFTCODE_COINS_HISTORY.find(
              (item) => value === `${item.name} (${item.id.toUpperCase()})`,
            );

            if (coin) {
              setSearchCoin(coin);
            }
          }
        }}
      />

      <ActionSheet
        ref={actionsSheetTypeRef}
        options={conditionOptions}
        cancelButtonIndex={conditionOptions.length - 1}
        onPress={(index) => {
          if (index !== conditionOptions.length - 1) {
            const value = conditionOptions[index];
            const condition = GIFTCODE_FILTER_HISTORY.find(
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
