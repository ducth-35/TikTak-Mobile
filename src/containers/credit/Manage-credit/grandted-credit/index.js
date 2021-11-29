import React, { useState, useEffect, useRef } from 'react';
import { View, Text, RefreshControl, Image, TouchableWithoutFeedback, TextInput } from 'react-native';
import { styles } from './styles';
import { NavTitleBackHeader, NoData, TouchableX } from '@/components';
import { useTranslation, useAppContext } from '@/hooks'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';
import { Routes, showLoading, CREDIT_TYPE, ICO_SEARCH, STATUS_CREDIT, ICO_LIST_GIFCODE, searchKeysCredit } from '@/common';
import dayjs from 'dayjs';
import { NavigationService } from '@/services';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ActionSheet from 'react-native-actionsheet';
import { multiFilter, formatNumberFee } from '@/utils';
import { isEmpty } from 'lodash';

export const GantedCredit = () => {
  const { t } = useTranslation();
  const { listCreditGranted, getListcreditGranted } = useAppContext();

  const [listcredit, setListCredit] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [showSearchContainer, setShowSearchContainer] = useState(false);
  const [searchType, setSearchType] = useState(null);
  const [nodata, setNodata] = useState();

  const actionSheetTypeRef = useRef(null);


  useEffect(() => {
    fetchData({ isShowLoading: true });
  }, []);

  useEffect(() => {
    fetchData({ isShowLoading: false })
  }, [isRefreshing]);

  useEffect(() => {
    filterCredit();
  }, [listCreditGranted, keywords, searchType]);


  const transactionTypeOptions = [
    ...STATUS_CREDIT.map((item) => t(`${item.id}`)),
    t('cancel'),
  ];

  const fetchData = async ({ isShowLoading }) => {
    if (isShowLoading) {
      showLoading();
    }

    const params = { type: 'borrower' }

    await getListcreditGranted(params);
    setIsRefreshing(false);
  }

  const filterCredit = () => {
    let filters = {};

    const searchData = (data, keywords) => {
      return data.filter(item => {
        return searchKeysCredit.some(key =>
          String(item[key]).toLowerCase().includes(keywords.toLowerCase())
        );
      });
    };

    const result = searchData(listCreditGranted, keywords);

    if (!isEmpty(searchType)) {
      filters[`status`] = (status) => {
        if (searchType.id === 'all') {
          return status === 'running' || 'stoped'
        } else {
          return status === searchType.value
        }
      }
    }
    const filtered = multiFilter({ arr: listCreditGranted, filters: filters });
    if (!isEmpty(keywords)) {
      if (result.length === 0) {
        setNodata(<NoData />)
      } else {
        result.sort((a, b) => b.created - a.created);
        setListCredit(result);
      }
      result.sort((a, b) => b.created - a.created);
      setListCredit(result);
    } else {
      if (filtered.length === 0) {
        setNodata(<NoData />)
      } else {
        filtered.sort((a, b) => b.created - a.created);
        setListCredit(filtered);
      }
      filtered.sort((a, b) => b.created - a.created);
      setListCredit(filtered);
    }
  }


  const onShowHideSearchContent = () => {
    setShowSearchContainer((prev) => !prev);
  };

  const onShowActionSheetType = () => {
    if (actionSheetTypeRef) {
      actionSheetTypeRef.current.show();
    }
  }


  const renderCreditItem = ({ item, index }) => {
    const {
      id,
      borrowerEmail,
      onwerEmail,
      interestRate,
      quantityUsed,
      created,
      quota,
      note,
      status
    } = item;

    const onshowCredit = () => {
      NavigationService.navigate(Routes.DETAIL, {
        borrowerEmail: borrowerEmail,
        onwerEmail: onwerEmail,
        interestRate: interestRate,
        quantityUsed: quantityUsed,
        created: created,
        quota: quota,
        status: status,
        type: CREDIT_TYPE.GRANTED,
        id: id
      })
    }

    const onListCreditDetail = () => {
      NavigationService.navigate(Routes.CREDITDETAIL, { id: id, typed: CREDIT_TYPE.GRANTED });
    }


    const renderStatus = () => {
      if (status === 'running') {
        return (
          <View
            style={[
              styles.statusView,
              { backgroundColor: Colors.GREEN },
            ]}>
            <Text style={[styles.title, { fontWeight: 'bold', color: Colors.WHITE, fontSize: actuatedNormalize(10) }]}>{t('running')}</Text>
          </View>
        )
      } else if (status === 'stoped') {
        return (
          <View
            style={[
              styles.statusView,
              { backgroundColor: Colors.RED },
            ]}>
            <Text style={[styles.title, { fontWeight: 'bold', color: Colors.WHITE, fontSize: actuatedNormalize(10) }]}>{t('stoped')}</Text>
          </View>
        )
      }
    }
    return (
      <View style={styles.itemContainer}>
        <TouchableWithoutFeedback onPress={onshowCredit}>
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
                  <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('lender')}:`}</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'flex-end' }}>
                <Text style={[styles.title, { marginLeft: 10 }]} numberOfLines={1}>{onwerEmail}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <View style={styles.row}>
                  <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('quota')}:`}</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'flex-end' }}>
                <Text style={[styles.title, { marginLeft: 10, color: Colors.WHITE,fontFamily: FontFamily.TitilliumWeb.SemiBold }]}> {`${formatNumberFee(quota)} VNDT`}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <View style={styles.row}>
                  <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('interest_rate_per_day')}:`}</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'flex-end' }}>
                <Text style={[styles.title, {marginLeft: 10, color: Colors.WHITE,fontFamily: FontFamily.TitilliumWeb.SemiBold }]}>{`${interestRate} %`}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <View style={styles.row}>
                  <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('quantity_used')}:`}</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'flex-end' }}>
                <Text style={[styles.title, { marginLeft: 10, color: Colors.WHITE,fontFamily: FontFamily.TitilliumWeb.SemiBold }]}>{`${formatNumberFee(quantityUsed)} VNDT`}</Text>
              </View>
            </View>


            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <View style={styles.row}>
                  <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('status')}:`}</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'flex-end' }}>
                {renderStatus()}
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <View style={styles.row}>
                  <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('date')}:`}</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'flex-end' }}>
                <Text style={[styles.title, { marginLeft: 10 }]}>{dayjs(created).format('HH:mm  |  DD-MM-YYYY')}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <View style={styles.row}>
                  <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('note')}:`}</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'flex-end' }}>
                <Text style={[styles.title, { marginLeft: 10 }]}>{note}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <View style={styles.row}>
                  <View style={{
                    backgroundColor: Colors.GREY,
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
                        style={styles.icon}
                        source={ICO_LIST_GIFCODE} resizeMode='contain'
                      />
                      <Text style={[styles.title,
                      {
                        color: Colors.WHITE,
                        fontSize: 10,
                        textAlign: 'center',
                        fontFamily: FontFamily.TitilliumWeb.SemiBold
                      }]}>{`${t('details')}`}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableX
                onPress={onListCreditDetail}
                style={{ justifyContent: 'flex-end' }}>
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
                    paddingHorizontal: actuatedNormalize(10),
                  }}>
                    <Image
                      style={styles.icon}
                      source={ICO_LIST_GIFCODE} resizeMode='contain'
                    />
                    <Text style={[styles.title,
                    {
                      color: Colors.WHITE,
                      textAlign: 'center',
                      fontSize: 10,
                      fontFamily: FontFamily.TitilliumWeb.SemiBold
                    }]}>{`${t('loan_transaction')}`}</Text>
                  </View>
                </View>
              </TouchableX>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  const renderSearchContainer = () => {
    return (
      <View style={styles.searchContainer}>
        <TouchableX
          style={styles.searchTitle}
          onPress={onShowHideSearchContent}>
          <View style={styles.inputContainer}>
            <Image style={styles.Icon} source={ICO_SEARCH} resizeMode="contain" />
            <View style={[styles.leftContainer, { paddingLeft: actuatedNormalize(11) }]}>
              <TextInput
                style={[styles.input, { color: Colors.GREY }]}
                placeholderTextColor={Colors.GREY}
                onChangeText={(value) => setKeywords(value)}
                placeholder={`${t('search_giftcode')}...`}
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
            <View style={{ flexDirection: 'row' }}>
              <TouchableX
                style={[styles.inputContainer1]}
                onPress={onShowActionSheetType}>
                <View style={styles.leftContainer} pointerEvents="none">
                  <TextInput
                    style={[styles.input, { color: Colors.GREY }]}
                    placeholderTextColor={Colors.GREY}
                    editable={false}
                    placeholder={t('status')}
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
    )
  }


  const onRefresh = () => {
    setIsRefreshing(true);
  }

  return (
    <View style={styles.container}>
      <NavTitleBackHeader
        title={t('granted_credit')}
        containerStyle={styles.navHeader}
      />
      <View style={styles.contentContainer}>
        <KeyboardAwareFlatList
          style={styles.scrollView}
          contentContainerStyle={styles.contentScrollContainer}
          ListHeaderComponent={renderSearchContainer()}
          data={listcredit}
          renderItem={renderCreditItem}
          ListEmptyComponent={nodata}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor='white'
            />
          }
          keyExtractor={(item, index) => `${item.id} - ${index}`}
        />
      </View>
      <ActionSheet
        ref={actionSheetTypeRef}
        options={transactionTypeOptions}
        cancelButtonIndex={transactionTypeOptions.length - 1}
        onPress={(index) => {
          if (index !== transactionTypeOptions.length - 1) {
            const value = transactionTypeOptions[index];
            const condition = STATUS_CREDIT.find(
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
}
