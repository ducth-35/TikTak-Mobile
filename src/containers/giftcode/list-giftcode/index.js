import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, RefreshControl, Image } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';
import ActionSheet from 'react-native-actionsheet';

import { NavTitleBackHeader, NoData, TouchableX } from '@/components';
import { useTranslation, useAppContext } from '@/hooks';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';
import { NavigationService } from '@/services';
import {
  GIFTCODE_FILTER_HISTORY,
  GIFTCODE_STATUS,
  ICO_SEARCH,
  ICNO_SHOW_GIFTCODE,
  GIFTCODE_CONDITIONS,
  showLoading,
  showSuccessToast,
  SUPPORTED_GIFTCODE_COINS_HISTORY,
  searchKeysgiftcode,
  Routes,
} from '@/common';
import { multiFilter, formatCommaNumber } from '@/utils';
import Clipboard from '@react-native-community/clipboard';


import { styles } from './styles';

export const ListGiftcodeScreen = () => {
  const { t } = useTranslation();
  const { giftcodes, getListGiftcode } = useAppContext();

  const [showSearchContainer, setShowSearchContainer] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [searchCoin, setSearchCoin] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [statusType, setStatusType] = useState(null);
  const [listGiftcode, setListGiftcode] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const actionSheetCoinsRef = useRef(null);
  const actionsSheetTypeRef = useRef(null);
  const actionsSheetStatusRef = useRef(null);

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

  const statusOptios = [
    ...GIFTCODE_STATUS.map((item) => t(`${item.id}`)),
    t('cancel')
  ]

  useEffect(() => {
    fetchData({ isShowLoading: true });
  }, []);

  useEffect(() => {
    fetchData({ isShowLoading: false });
  }, [isRefreshing]);

  useEffect(() => {
    filterGiftCode();
  }, [giftcodes, keywords, searchType, searchCoin, statusType]);

  const fetchData = async ({ isShowLoading }) => {
    if (isShowLoading) {
      showLoading();
    }

    await getListGiftcode();
    setIsRefreshing(false);
  };

  const filterGiftCode = () => {
    const filters = {};
    const searchData = (data, keywords) => {
      return data.filter(item => {
        return searchKeysgiftcode.some(key =>
          String(item[key]).toLowerCase().includes(keywords.toLowerCase())
        );
      });
    };
    const result = searchData(giftcodes, keywords);

    if (!isEmpty(searchCoin)) {
      filters[`currency`] = (coin) => {
        if (searchCoin.id === 'all') {
          return coin === 'xeng' || 'cent' || 'usdf' || 'vndt'.toUpperCase();
        } else {
          return coin === searchCoin.id.toUpperCase();
        }
      };
    }
    if (!isEmpty(statusType)) {
      filters[`status`] = (coin) => {
        if (statusType.id === 'all') {
          return coin === 'error' || 'completed' || 'creating' || 'pending';
        } else {
          return coin === statusType.value;
        }
      }
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

    const filtered = multiFilter({
      arr: giftcodes, filters: filters
    });
    if (!isEmpty(keywords)) {
      result.sort((a, b) => b.created - a.created);
      setListGiftcode(result);
    } else {
      filtered.sort((a, b) => b.created - a.created);
      setListGiftcode(filtered);
    }
  };

  const onCreateGiftCode = () => {
    NavigationService.navigate(Routes.CREATE_GIFTCODE_STEP_1);
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

  const onShowActionSheetStatus = () => {
    if (actionsSheetStatusRef) {
      actionsSheetStatusRef.current.show();
    }
  };

  const renderSearchContainer = () => {
    return (
      <View style={styles.searchContainer}>
        <TouchableX
          style={styles.searchTitle}
          onPress={onShowHideSearchContent}>
          <View style={styles.inputContainer}>
            <Image style={styles.icon} source={ICO_SEARCH} resizeMode="contain" />
            <View style={[styles.leftContainer, { paddingLeft: actuatedNormalize(11) }]}>
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
                    numberOfLines={1}
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
                style={[styles.inputContainer1, { width: '30%', marginLeft: actuatedNormalize(13) }]}
                onPress={onShowActionSheetType}>
                <View style={styles.leftContainer} pointerEvents="none">
                  <TextInput
                    style={[styles.input, { color: Colors.GREY }]}
                    placeholderTextColor={Colors.GREY}
                    editable={false}
                    numberOfLines={1}
                    placeholder={t('giftcode_type')}
                    value={searchType ? t(`${searchType.id}`) : ''}
                  />
                </View>
                <View style={styles.rightContainer}>
                  <FontAwesome5 name={'chevron-down'} color="gray" size={12} />
                </View>
              </TouchableX>

              <TouchableX
                style={[styles.inputContainer1, { width: '30%', marginLeft: actuatedNormalize(13) }]}
                onPress={onShowActionSheetStatus}>
                <View style={styles.leftContainer} pointerEvents="none">
                  <TextInput
                    style={[styles.input, { color: Colors.GREY }]}
                    placeholderTextColor={Colors.GREY}
                    editable={false}
                    numberOfLines={1}
                    placeholder={t('status')}
                    value={statusType ? t(`${statusType.id}`) : ''}
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

  const renderGiftcodeItem = ({ item, index }) => {
    const {
      id,
      created,
      conditions,
      quantity,
      currency,
      status,
      userId,
      hashCreate,
      hashReceive,
      receiveAddress,
      note,
      reveiced } = item;

    const type = GIFTCODE_CONDITIONS.find((item) => {
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

    const Pin = JSON.parse(conditions);

 
    const onShowGiftcode = () => {
      NavigationService.navigate(Routes.MANAGER_GIFTCODE, {
        giftcodeId: id,
        giftcodeQuantity: quantity,
        giftcodeCurrency: currency,
      });
    }

    const onCopy = (code) => {
      if (!isEmpty(code)) {
        Clipboard.setString(code);
        showSuccessToast(t('copy_success'));
      }
    }
    return (
      <TouchableX onPress={onShowGiftcode} style={styles.itemContainer}>
        <View style={styles.itemLeftContainer}>
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${('Pincode')}:`}</Text>
              </View>
            </View>
            <TouchableX
              onPress={() => onCopy(id)}
              style={{ justifyContent: 'flex-end' }}>
              <Text
                style={[
                  styles.title,
                  {
                    marginLeft: 10,
                    color: Colors.BLUE,
                  },
                ]}>
                {Pin.pin}
              </Text>
            </TouchableX>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${('Giftcode')}:`}</Text>
              </View>
            </View>
            <TouchableX
              onPress={() => onCopy(id)}
              style={{ justifyContent: 'flex-end' }}>
              <Text
                style={[
                  styles.title,
                  {
                    marginLeft: 10,
                    color: Colors.BLUE,
                  },
                ]}>
                {id}
              </Text>
            </TouchableX>
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
              <Text style={[styles.title, { color: Colors.WHITE, fontFamily: FontFamily.TitilliumWeb.SemiBold }]}>
                {`${formatCommaNumber(
                  quantity,
                )} ${currency}`}
              </Text>
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
                <Text style={[styles.title, { fontWeight: 'bold', color: Colors.WHITE, fontSize: actuatedNormalize(10) }]}>{`${statusFilter ? t(`${statusFilter.id}`) : ''
                  }`}</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>
                  {`${t('note')}:`}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={[styles.title, { marginLeft: 10, flex: 1, textAlign: 'right' }]}>
                {note}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>
                  {`${('TxID Create')}:`}
                </Text>
              </View>
            </View>
            <TouchableX
              onPress={() => onCopy(hashCreate)}
              style={{ justifyContent: 'flex-end', width: '50%' }}>
              <Text numberOfLines={1} ellipsizeMode='middle' style={[styles.title, { marginLeft: 10, flex: 1 }]}>
                {hashCreate}
              </Text>
            </TouchableX>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>
                  {`${t('date_credit')}:`}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end', width: '73%' }}>
              <Text style={[styles.title, { marginLeft: 10, flex: 1, textAlign: 'right' }]}>
                {dayjs(created).format('HH:mm DD-MM-YYYY')}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start', width: '50%' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>
                  {`${t('giftcode_type')}:`}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={[styles.title, { marginLeft: 10, flex: 1, textAlign: 'right' }]}>
                {type ? t(`${type.id}`) : ''}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start', width: '50%' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>
                  {`${t('id_user')}:`}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={[styles.title, { marginLeft: 10, flex: 1, textAlign: 'right' }]}>
                {userId}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>
                  {`${('TxID Recevier')}:`}
                </Text>
              </View>
            </View>
            <TouchableX
              onPress={() => onCopy(hashReceive)}
              style={{ justifyContent: 'flex-end', width: '50%' }}>
              <Text numberOfLines={1} ellipsizeMode='middle' style={[styles.title, { marginLeft: 10, flex: 1 }]}>
                {hashReceive}
              </Text>
            </TouchableX>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>
                  {`${t('date_credit')}:`}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end', width: '73%' }}>
              <Text style={[styles.title, { marginLeft: 10, flex: 1, textAlign: 'right' }]}>
                {dayjs(reveiced).format('HH:mm DD-MM-YYYY')}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>
                  {`${t('address')}:`}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end', width: '73%' }}>
              <Text style={[styles.title, { marginLeft: 10, flex: 1, textAlign: 'right' }]}>
                {receiveAddress}
              </Text>
            </View>
          </View>
        </View>
        <TouchableX
          style={styles.rightButton}
          onPress={onShowGiftcode}>
          <Image
            source={ICNO_SHOW_GIFTCODE}
            resizeMode='contain'
            style={styles.infoIcon}
          />
        </TouchableX>
      </TouchableX>
    )
  };

  const onRefresh = () => {
    setIsRefreshing(true);
  };

  return (
    <View style={styles.container}>
      <NavTitleBackHeader
        title={t('mygiftcode')}
        containerStyle={styles.navHeader}
        rightContainer={
          <TouchableX style={styles.navRightButton} onPress={onCreateGiftCode}>
            <FontAwesome5 name="plus-circle" color="white" size={20} />
          </TouchableX>
        } />
      <View style={styles.contentContainer}>
        <KeyboardAwareFlatList
          style={styles.scrollView}
          contentContainerStyle={styles.contentScrollContainer}
          ListHeaderComponent={renderSearchContainer()}
          data={listGiftcode}
          renderItem={renderGiftcodeItem}
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

      <ActionSheet
        ref={actionsSheetStatusRef}
        options={statusOptios}
        cancelButtonIndex={statusOptios.length - 1}
        onPress={(index) => {
          if (index !== statusOptios.length - 1) {
            const value = statusOptios[index];
            const condition = GIFTCODE_STATUS.find(
              (item) => value === t(`${item.id}`),
            );

            if (condition) {
              setStatusType(condition);
            }
          }
        }}
      />
    </View>
  )
};