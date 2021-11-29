import React, { useState, useEffect, useRef } from 'react';
import { View, Text, RefreshControl, Image, TextInput } from 'react-native';
import { styles } from './styles';
import {
  showLoading,
  SUPPORTED_COINS,
  CREDIT_STATUS,
  FILTER_STATUS,
  CREDIT_TYPE,
  ICO_CREDIT_GRANTED,
  ICO_CLOSE,
  ICO_ACCEPTED,
  ICO_SEARCH,
  searchKeysCreditDetail,
  Routes
} from '@/common';
import { NavTitleBackHeader, TouchableX, PopUpAccept, PopUpSuccess, PopUpRefund, NoData } from '@/components';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { useAppContext, useTranslation } from '@/hooks';
import dayjs from 'dayjs';
import {
  Colors,
  actuatedNormalize,
  FontFamily,
  STATUSBAR_HEIGHT,
} from '@/themes';
import { NavigationService } from '@/services';
import { multiFilter, formatNumberFee } from '@/utils';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ActionSheet from 'react-native-actionsheet';
import { isArray, isEmpty } from 'lodash';

export const CreditDetailScreen = ({ route }) => {
  const [listCreditDetail, setListCreditDetail] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isShowConfirmPopup, setIsShowConfirmPopup] = useState();
  const [isShowRefund, setIsShowRefund] = useState();
  const [isShowSuccess, setIsShowSuccess] = useState();
  const [isShowSuccess2, setIsShowSuccess2] = useState();
  const [amount, setAmount] = useState();
  const [quantitypopup, setQuantityPopup] = useState();
  const [ratepopup, setRatePopup] = useState();
  const [currencyCodePopUp, setCurrencyCodePopup] = useState();
  const [idAccept, setIdAccept] = useState();
  const [interestPopup, setInterestPopup] = useState();
  const [totalPopup, setTotalPopup] = useState();
  const [amountInput, setAmountInput] = useState('');
  const [checkButton, setCheckButton] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [showSearchContainer, setShowSearchContainer] = useState(false);
  const [searchType, setSearchType] = useState(null);
  const [ nodata, setNodata ] = useState();


  const actionSheetTypeRef = useRef(null);

  const { t } = useTranslation();
  const {
    listDetail,
    getCreditDetail,
    userWallets,
    accepteCredit,
    refundCredit
  } = useAppContext();

  const id = route.params?.id;
  const typed = route.params?.typed;

  useEffect(() => {
    fetchData({ isShowLoading: true });
  }, []);

  useEffect(() => {
    fetchData({ isShowLoading: false })
  }, [isRefreshing]);

  useEffect(() => {
    setAmount(getBalanceVNDT());
  });

  useEffect(() => {
    filterCreditDetail();
  }, [listDetail, keywords, searchType]);

  useEffect(() => {
    if (amountInput != "") {
      setCheckButton(true)
    } else {
      setCheckButton(false)
    }
  });

  const fetchData = async ({ isShowLoading }) => {
    if (isShowLoading) {
      showLoading();
    }
    const params = { id: id };
    await getCreditDetail(params);
    setIsRefreshing(false);

  }

  const onShowHideSearchContent = () => {
    setShowSearchContainer((prev) => !prev);
  };

  const onShowActionSheetType = () => {
    if (actionSheetTypeRef) {
      actionSheetTypeRef.current.show();
    }
  }

  const transactionTypeOptions = [
    ...FILTER_STATUS.map((item) => t(`${item.id}`)),
    t('cancel'),
  ];

  const filterCreditDetail = () => {

    const filters = {};

    const searchData = (data, keywords) => {
      return data.filter(item => {
        return searchKeysCreditDetail.some(key =>
          String(item[key]).toLowerCase().includes(keywords.toLowerCase())
        );
      });
    };

    const result = searchData(listDetail, keywords);

    if (!isEmpty(searchType)) {
      filters[`status`] = (status) => {
        if (searchType.id === 'all') {
          return status === 'pending' || 'completed' || 'processing' || 'error'
        } else {
          return status === searchType.value
        }
      }
    }

    const filtered = multiFilter({ arr: listDetail, filters: filters });

    if (!isEmpty(keywords)) {
      if (result.length === 0) {
        setNodata(<NoData />)
      } else {
        result.sort((a, b) => b.created - a.created);
        setListCreditDetail(result);
      }
    } else {
      if (filtered.length === 0) {
        setNodata(<NoData />)
      } else {
        filtered.sort((a, b) => b.created - a.created);
        setListCreditDetail(filtered);
      }
    }
  }


  const getBalanceVNDT = () => {
    if (userWallets && isArray(userWallets)) {
      const vndtWallet = userWallets.find(
        (item) => item.type === 'VNDT');
      if (userWallets) {
        return vndtWallet.amount;
      }
    }
    return 0;
  }

  const onConfirmAccept = () => {
    let errorMessage = null;

    if (errorMessage) {
      showErrorToast(errorMessage);
      return;
    } else {
      showLoading();
    }
    setIsShowConfirmPopup(false);
    onSendAccept();
  }
  const onSendAccept = async () => {
    const params = { id: idAccept };
    const res = await accepteCredit(params);
    if (res && res.isSuccess) {
      setIsShowSuccess(true);
    }
  }


  const onConfirmRefund = () => {
    let errorMessage = null;

    if (errorMessage) {
      showErrorToast(errorMessage);
      return;
    } else {
      showLoading();
    }
    setIsShowRefund(false);
    onSendRefund();
  }

  const onSendRefund = async () => {
    const params = {
      id: idAccept,
      amount: amountInput
    };
    const res = await refundCredit(params);
    if (res && res.isSuccess) {
      setIsShowSuccess2(true);
    }
  }


  const onCancel = () => {
    setIsShowConfirmPopup(false);
  }

  const onCancelRefund = () => {
    setIsShowRefund(false)
  }

  const onCancelSuccess = () => {
    NavigationService.navigate(Routes.CREDIT_MANAGEMENT, setIsShowSuccess(false));
  }

  const onCancelSuccess2 = () => {
    NavigationService.navigate(Routes.CREDIT_MANAGEMENT, setIsShowSuccess2(false));
  }

  const renderCreditDetailItem = ({ index, item }) => {
    const {
      id,
      quantity,
      interest,
      interestRate,
      refundQuantity,
      status,
      accepted,
      created,
      currencyCode,
      refunded
    } = item;

    const selectCoin = SUPPORTED_COINS.find((item) => item.currencyCode === currencyCode);

    const filterStatus = CREDIT_STATUS.find((item) => item.value === status);

    const onShowPopupAccept = () => {
      setQuantityPopup(quantity);
      setRatePopup(interestRate);
      setCurrencyCodePopup(selectCoin?.id.toUpperCase());
      setIdAccept(id);
      setIsShowConfirmPopup(true);
    }

    const onShowPopupRefund = () => {
      setQuantityPopup(quantity);
      setRatePopup(interestRate);
      setCurrencyCodePopup(selectCoin?.id.toUpperCase());
      setIdAccept(id);
      setInterestPopup(interest);
      setTotalPopup(quantity + interest);
      setIsShowRefund(true)
    }
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemLeftContainer}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('transaction_id')}:`}</Text>
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
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('amount_credit')}:`}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={[styles.title, { marginLeft: 10, color: Colors.WHITE, fontFamily: FontFamily.TitilliumWeb.SemiBold }]}>{`${formatNumberFee(quantity)} ${selectCoin?.id.toUpperCase()}`}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('interest')}:`}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={[styles.title, { marginLeft: 10, color: Colors.WHITE, fontFamily: FontFamily.TitilliumWeb.SemiBold }]}>{`${formatNumberFee(interest)} ${selectCoin?.id.toUpperCase()}`}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('total_credit')}:`}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={[styles.title, { marginLeft: 10, color: Colors.WHITE, fontFamily: FontFamily.TitilliumWeb.SemiBold }]}>{`${formatNumberFee(quantity + interest)} ${selectCoin?.id.toUpperCase()}`}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('quantity_refunded')}:`}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={[styles.title, { marginLeft: 10, color: Colors.WHITE, fontFamily: FontFamily.TitilliumWeb.SemiBold }]}>{`${formatNumberFee(refundQuantity)} ${selectCoin?.id.toUpperCase()}`}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('status')}:`}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <View
                style={[
                  styles.statusView,
                  { backgroundColor: filterStatus ? filterStatus.color : 'grey' },
                ]}>
                <Text style={[styles.title, { fontWeight: 'bold', fontSize: 10, color: Colors.WHITE }]}>{`${filterStatus ? t(`${filterStatus.id}`) : ''
                  }`}</Text>
              </View>
            </View>
          </View>


          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('created_date')}:`}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={[styles.title, { marginLeft: 5, fontSize: 11 }]}>{dayjs(created).format('HH:mm  |  DD-MM-YYYY')}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={styles.row}>
                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('accepted_date')}:`}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={[styles.title, { marginLeft: 5, fontSize: 11 }]}>{dayjs(accepted).format('HH:mm  |  DD-MM-YYYY')}</Text>
            </View>
          </View>

          {typed === CREDIT_TYPE.GRANTED ? (
            <View>
              {refunded === 0 ? (
                <View style={{ flexDirection: 'row', marginTop: actuatedNormalize(20) }}>
                  <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <View style={styles.row}>
                      <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('refund')}:`}</Text>
                    </View>
                  </View>
                  <TouchableX
                    onPress={onShowPopupRefund}
                    style={{ justifyContent: 'flex-end', marginRight: actuatedNormalize(10) }} >
                    <View>
                      <Image
                        style={styles.icon}
                        source={ICO_CREDIT_GRANTED} resizeMode='contain'
                      />
                    </View>
                  </TouchableX>
                </View>
              ) : null}
            </View>
          ) : null ||
            typed === CREDIT_TYPE.MANAGEMANT ? (
            <View>
              {accepted === 0 ? (
                <View style={{ flexDirection: 'row', marginTop: actuatedNormalize(20) }}>
                  <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <View style={styles.row}>
                      <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('accepted')}:`}</Text>
                    </View>
                  </View>
                  <TouchableX
                    onPress={onShowPopupAccept}
                    style={{ justifyContent: 'flex-end', marginRight: actuatedNormalize(10) }} >
                    <View>
                      <Image
                        style={styles.icon}
                        source={ICO_ACCEPTED} resizeMode='contain'
                      />
                    </View>
                  </TouchableX>
                </View>
              ) : null}
            </View>
          ) : null}

        </View>
      </View >
    )
  }

  const renderSearchContainer = () => {
    return (
      <View style={styles.searchContainer}>
        <TouchableX
          style={styles.searchTitle}
          onPress={onShowHideSearchContent}>
          <View style={[styles.inputContainer, { height: actuatedNormalize(58) }]}>
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
                onPress={onShowActionSheetType}
              >
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
        title={t('list_credit')}
        containerStyle={styles.navHeader}
      />
      <View style={styles.contentContainer}>
        <KeyboardAwareFlatList
          style={styles.scrollView}
          contentContainerStyle={styles.contentScrollContainer}
          ListHeaderComponent={renderSearchContainer()}
          data={listCreditDetail}
          renderItem={renderCreditDetailItem}
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
            const condition = FILTER_STATUS.find(
              (item) => value === t(`${item.id}`),
            );

            if (condition) {
              setSearchType(condition);
            }
          }
        }}
      />
      <PopUpAccept
        isVisible={isShowConfirmPopup}
        onCloseContainer={
          <View style={{ flexDirection: 'row' }}>
            <View style={{
              justifyContent: 'flex-start',
              paddingVertical: actuatedNormalize(10), marginBottom: actuatedNormalize(10)
            }}>
              <Text style={[styles.content, { fontSize: 16, color: Colors.LIGHT_GREY }]}> {`${t('loan_approval')}`} </Text>
            </View>
            <TouchableX
              onPress={onCancel}
              style={[styles.header,
              {
                flex: 1,
                justifyContent: 'flex-end',
                paddingHorizontal: actuatedNormalize(15),
                paddingVertical: actuatedNormalize(15)
              }]}>
              <Image source={ICO_CLOSE} style={{ width: 15, height: 15 }} resizeMode='contain' />
            </TouchableX>
          </View>
        }
        Youhave={`${t('you_have')}:`}
        YouhavVNDT={`${formatNumberFee(amount)} VNDT`}
        Amount={`${t('amount_credit')}:`}
        AmountVNDT={`${formatNumberFee(quantitypopup)} ${currencyCodePopUp}`}
        InterestRate={`${t('interest_rate_per_day')}:`}
        InterestRateVNDT={`${ratepopup} %`}
        title={t('confirm')}
        OnPress={onConfirmAccept}
      />
      <PopUpRefund
        isVisible={isShowRefund}
        onCloseContainer={
          <View style={{ flexDirection: 'row' }}>
            <View style={{
              justifyContent: 'flex-start',
              paddingVertical: actuatedNormalize(10), marginBottom: actuatedNormalize(10)
            }}>
              <Text style={[styles.content, { fontSize: 16, color: Colors.LIGHT_GREY }]}> {`${t('loan_repayment')}`} </Text>
            </View>
            <TouchableX
              onPress={onCancelRefund}
              style={[styles.header,
              {
                flex: 1,
                justifyContent: 'flex-end',
                paddingHorizontal: actuatedNormalize(15),
                paddingVertical: actuatedNormalize(15)
              }]}>
              <Image source={ICO_CLOSE} style={{ width: 15, height: 15 }} resizeMode='contain' />
            </TouchableX>
          </View>
        }
        quanlityInput={
          <View style={{ marginLeft: actuatedNormalize(20), marginRight: actuatedNormalize(20), marginTop: actuatedNormalize(10), marginBottom: actuatedNormalize(20) }}>
            <View
              style={[styles.inputContainer]}>
              <View style={styles.leftContainer}>
                <TextInput
                  style={[styles.input]}
                  value={amountInput}
                  keyboardType="decimal-pad"
                  onChangeText={(value) => setAmountInput(value)}
                />
              </View>
            </View>
          </View>
        }
        Youhave={`${t('you_have')}:`}
        YouhavVNDT={`${formatNumberFee(amount)} VNDT`}
        Amount={`${t('amount_credit')}:`}
        AmountVNDT={`${formatNumberFee(quantitypopup)} ${currencyCodePopUp}`}
        InterestRate={`${t('interest_rate_per_day')}:`}
        InterestRateVNDT={`${ratepopup} %`}
        title={t('confirm')}
        interest={`${t('interest')}:`}
        interestVNDT={`${formatNumberFee(interestPopup)} ${currencyCodePopUp}`}
        total={`${t('total_')}:`}
        totalVNDT={`${formatNumberFee(totalPopup)} ${currencyCodePopUp}`}
        amount={`${t('amount')}:`}
        OnPress={onConfirmRefund}
        activeBackgroundColor={!checkButton ? Colors.DARK_GREY : Colors.BLUE}
        isActive={amountInput == "" ? false : true}
        disabled={checkButton ? false : true}
      />
      <PopUpSuccess
        isVisible={isShowSuccess}
        onCloseContainer={
          <View style={{ flexDirection: 'row' }}>
            <View style={{
              justifyContent: 'flex-start',
              paddingVertical: actuatedNormalize(10), marginBottom: actuatedNormalize(10)
            }}>
              <Text style={[styles.content, { fontSize: 16, color: Colors.LIGHT_GREY }]}> {`${t('loan_approval')}`} </Text>
            </View>
            <TouchableX
              onPress={onCancelSuccess}
              style={[styles.header,
              {
                flex: 1,
                justifyContent: 'flex-end',
                paddingHorizontal: actuatedNormalize(15),
                paddingVertical: actuatedNormalize(15)
              }]}>
              <Image source={ICO_CLOSE} style={{ width: 15, height: 15 }} resizeMode='contain' />
            </TouchableX>
          </View>
        }
        text1={t('loan_approved')}
        text2={t('auto_send_loan')}
      />

      <PopUpSuccess
        isVisible={isShowSuccess2}
        onCloseContainer={
          <View style={{ flexDirection: 'row' }}>
            <View style={{
              justifyContent: 'flex-start',
              paddingVertical: actuatedNormalize(10), marginBottom: actuatedNormalize(10)
            }}>
              <Text style={[styles.content, { fontSize: 16, color: Colors.LIGHT_GREY }]}> {`${t('loan_repayment')}`} </Text>
            </View>
            <TouchableX
              onPress={onCancelSuccess2}
              style={[styles.header,
              {
                flex: 1,
                justifyContent: 'flex-end',
                paddingHorizontal: actuatedNormalize(15),
                paddingVertical: actuatedNormalize(15)
              }]}>
              <Image source={ICO_CLOSE} style={{ width: 15, height: 15 }} resizeMode='contain' />
            </TouchableX>
          </View>
        }
        text1={t('loan_has_been_repaid')}
        text2={t('auto_repaid_loan')}
      />
    </View>
  );
}
