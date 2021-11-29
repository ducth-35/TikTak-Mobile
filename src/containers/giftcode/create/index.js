import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ActivityIndicator, FlatList, Image } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isArray, isEmpty } from 'lodash';
import ActionSheet from 'react-native-actionsheet';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { formatCommaNumber } from '@/utils';
import {
  NavTitleBackHeader,
  BlueButton,
  SelectCoins,
  TouchableX,
  PopUpGiftCode,
  PopUpSuccessCreateGiftode
} from '@/components';
import { useTranslation, useAppContext, useDebounce } from '@/hooks';
import {
  Routes,
  SUPPORTED_GIFTCODE_COINS,
  GIFTCODE_CONDITIONS,
  showLoading,
  showSuccessToast,
  showErrorToast,
  ICO_CLOSE
} from '@/common';
import { NavigationService } from '@/services';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';

import styles from './styles';

export const CreateGiftCodeStep1 = () => {
  const { t } = useTranslation();

  const [selectedCoin, setSelectedCoin] = useState(null);

  const onSelectedCoin = (item) => {
    setSelectedCoin(item);
  };

  const onContinue = () => {
    if (selectedCoin) {
      NavigationService.navigate(Routes.CREATE_GIFTCODE_STEP_2, {
        coin: selectedCoin,
      });
    }
  };

  return (
    <View style={styles.container}>
      <NavTitleBackHeader
        containerStyle={styles.navHeader}
        title={t('create_giftcode')}
      />
      <Text style={styles.headerText}>{t('create_giftcode_title')}</Text>
      <SelectCoins
        coins={SUPPORTED_GIFTCODE_COINS}
        onSelected={onSelectedCoin}
        numColumns={2}
      />
      <BlueButton
        title={t('continue')}
        containerStyle={styles.continueButton}
        isActive={selectedCoin ? true : false}
        onPress={onContinue}
      />
    </View>
  );
};

export const CreateGiftCodeStep2 = ({ route }) => {
  const coin = route.params?.coin;

  const { t } = useTranslation();
  const {
    getUserWallets,
    userWallets,
    getListGiftcode,
    createGiftCode,
    accountInfo,
    searchUsers,
  } = useAppContext();

  const [giftCodeType, setGiftCodeType] = useState(null);
  const [gifcode, setGiftCode] = useState();
  const [amount, setAmount] = useState('');
  const [amountTrx, setAmountTrx] = useState('');
  const [quantity, setQuantity] = useState('');
  const [availableCoin, setAvailableCoin] = useState(0);
  const [pincode, setPincode] = useState(null);
  const [content, setContent] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isHideSearchResults, setIsHideSearchResults] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [seachKeyword, setSearchKeyword] = useState(null);
  const actionsSheetTypeRef = useRef(null);
  const debouncedSearchKeyword = useDebounce(seachKeyword, 500);
  const [checkButton, setCheckButton] = useState(false);
  const [isShowConfirmGiftCode, setIsShowConfirmGiftCode] = useState(false);
  const [isShowPopupSuccess, setIsShowPopupSuccess] = useState();
  const [type, setType] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    const publicType = GIFTCODE_CONDITIONS.find((item) => item.id === 'public');
    setGiftCodeType(publicType);
    getAvailableCoin();
    setAmountTrx(getBalanceTRX());
  }, []);

  useEffect(() => {
    if (debouncedSearchKeyword) {
      onSearchUsers();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchKeyword]);

  useEffect(() => {
    if (amount != "" && quantity != "") {
      setCheckButton(true);
    } else {
      setCheckButton(false);
    }
  });

  const getBalanceTRX = () => {
    if (userWallets && isArray(userWallets)) {
      const trxWallet = userWallets.find(
        (item) => item.type === 'TRX');
      if (userWallets) {
        return trxWallet.amount;
      }
    }
    return 0;
  }

  const conditionOptions = [
    ...GIFTCODE_CONDITIONS.map((item) => t(`${item.id}`)),
    t('cancel'),
  ];

  const onShowActionSheetType = () => {
    if (actionsSheetTypeRef) {
      actionsSheetTypeRef.current.show();
    }
  };

  const getAvailableCoin = () => {
    if (userWallets) {
      const existingCoin = userWallets.find(
        (item) => item.type.toLowerCase() === coin?.id,
      );

      if (existingCoin) {
        setAvailableCoin(existingCoin);
      }
    }
  };
  const onConfirm = () => {
    setGiftCode(t(`${giftCodeType.id}`));
    setType(giftCodeType.id);
    setName(`${selectedUser?.nickName?.toUpperCase()}`);

    const conditions = JSON.parse(giftCodeType.value);

    if (isEmpty(quantity) || parseInt(quantity) === 0) {
      showErrorToast(t('invalid_quantity').replace(/#NAME/g, 'GiftCode'));
    } else if (isEmpty(amount) || parseFloat(amount) === 0) {
      showErrorToast(t('invalid_amount').replace(/#COIN/g, coin?.id?.toUpperCase())
        .replace(/#LIMIT/g, 1));
    } else if (parseFloat(amount) > parseFloat(availableCoin.amount)) {
      showErrorToast(t('invalid_money').replace(/#NAME/g, coin?.id?.toUpperCase()));
    } else if (0.1 > parseFloat(amountTrx)) {
      showErrorToast(('check_wallet_trx').replace(/#COIN/g, coin?.id?.toUpperCase()));
    } else if (parseFloat(amount) < 1) {
      showErrorToast(t('invalid_amount').replace(/#COIN/g, coin?.id?.toUpperCase())
        .replace(/#LIMIT/g, 1));
    } else if (conditions.type === 'private') {
      if (isEmpty(pincode)) {
        showErrorToast(t('Pin code phải có ít nhất 3 kí tự'));
      }
    }
    //  else if (conditions.type === 'fixedReceiver') {
    //   if (isEmpty(selectedUser)) {
    //     showErrorToast(t('invalid_address'));
    //   }
    // } 
    else {
      setIsShowConfirmGiftCode(true);
    }

  }

  const onCreateGiftCode = async () => {
    setIsShowConfirmGiftCode(false);
    let errorMessage = null;

    const conditions = JSON.parse(giftCodeType.value);

    if (errorMessage) {
      showErrorToast(errorMessage);
      return;
    }

    if (conditions.type === 'private') {
      conditions.pin = pincode;
    } else if (conditions.type === 'fixedSender') {
      conditions.uid = accountInfo.id;
    } else if (conditions.type === 'fixedReceiver') {
      conditions.uid = selectedUser.id;
    }

    const params = {
      currencyCode: coin.currencyCode,
      quantity: amount,
      number: quantity,
      conditions: conditions,
    };

    showLoading('Đang tạo...');

    const res = await createGiftCode(params);

    if (res.status) {
      setIsShowPopupSuccess(true);
    }
  };

  const onCloseModalSuccess = () => {
    NavigationService.navigate(Routes.LIST_GIFTCODE, setIsShowPopupSuccess(false),
      getUserWallets(),
      getListGiftcode());
  }


  const onCancel = () => {
    setIsShowPopupSuccess(false);
    setIsShowConfirmGiftCode(false);
  }

  const renderConditionView = () => {
    if (!giftCodeType) {
      return null;
    }

    switch (giftCodeType.id) {
      case 'public':
        return renderConditionPublic();
      case 'password_required':
        return renderConditionPrivate();
      case 'authenticate_sender':
        return renderConditionAuthenSender();
      case 'recipients_indentified':
        return renderConditionReceipients();
    }
  };

  const renderConditionPublic = () => {
    return (
      <View style={styles.conditionContainer}>
        <Text style={styles.note}>{t('note_giftcode_public')}</Text>
      </View>
    );
  };


  const renderConditionPrivate = () => {
    return (
      <View style={styles.conditionContainer}>
        <Text style={styles.note}>{t('note_giftcode_private')}</Text>
        <Text style={[styles.title, { marginTop: actuatedNormalize(20) }]}>
          {t('pincode').toUpperCase()}
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.leftContainer}>
            <TextInput
              style={[styles.input, { color: Colors.WHITE }]}
              placeholderTextColor={Colors.TEXT_INPUT}
              placeholder={t('pincode_enter_title')}
              onChangeText={(value) => setPincode(value)}
              value={pincode ? pincode : ''}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderConditionAuthenSender = () => {
    return (
      <View style={styles.conditionContainer}>
        <Text style={styles.note}>{t('note_giftcode_authen_sender')}</Text>
      </View>
    );
  };

  const renderConditionReceipients = () => {
    const rederItem = ({ index, item }) => {
      const {
        nickName,
        email
      } = item;
      return (
        <View style={{ backgroundColor: '#fff' }}>
          <TouchableX
            style={styles.searchItemContainer}
            onPress={() => onSelectedSearchUser(item)}>
            <Text style={{ color: '#000' }}>
              {nickName.toUpperCase()} ({email})
            </Text>
          </TouchableX>
        </View>
      )
    }
    return (
      <View style={styles.conditionContainer}>
        <Text style={styles.note}>{t('note_giftcode_recipients')}</Text>
        <View style={styles.searchContainer}>
          <Text style={styles.title}>
            {t('seach_recipients').toUpperCase()}
          </Text>
          <View style={[styles.inputContainer, { justifyContent: 'space-between' }]}>
            <TextInput
              style={styles.input}
              placeholder={t('seach_recipients_place_holder')}
              placeholderTextColor={Colors.GREY}
              autoCapitalize="none"
              value={seachKeyword}
              autoCorrect={false}
              onChangeText={(text) => {
                setSearchKeyword(text);
              }}
            />
            {isSearching && (
              <View style={styles.searchingContainer}>
                <ActivityIndicator size="small" color={Colors.WHITE} />
              </View>
            )}
          </View>
        </View>
        {!isHideSearchResults ?
          <View style={styles.isHideSearchResults}>
            <View style={{ width: '100%' }}>
              <FlatList
                data={searchResults}
                enableEmptySections={true}
                renderItem={rederItem}
                keyExtractor={(item, index) => `${item.id} - ${index}`} />
            </View>
          </View> : null}

        <Text style={[styles.title, { marginTop: actuatedNormalize(10) }]}>
          {t('recipient').toUpperCase()}
        </Text>
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: Colors.DARK_GREY },
          ]}>
          <View style={styles.leftContainer}>
            <TextInput
              style={[styles.input, { color: Colors.GREY }]}
              editable={false}
              value={
                selectedUser
                  ? `${selectedUser?.nickName?.toUpperCase() ?? ''} ${selectedUser?.email ? `(${selectedUser?.email})` : ''
                  }`
                  : ''
              }
            />
          </View>
        </View>
      </View>
    );
  };

  const onSearchUsers = async () => {
    if (!isEmpty(seachKeyword)) {
      setIsSearching(true);

      const params = {
        s: seachKeyword,
        c: coin?.id.toUpperCase(),
      };

      const res = await searchUsers(params);

      setIsSearching(false);
      setIsHideSearchResults(false);

      if (res.status && res.data) {
        setSearchResults(res.data);
      }
    }
  };

  const onSelectedSearchUser = (item) => {
    setIsHideSearchResults(true);
    setSelectedUser(item);
  };


  return (
    <View style={styles.container}>
      <NavTitleBackHeader
        containerStyle={styles.navHeader}
        title={`${t('create_giftcode')} ${coin.shortname}`}
      />
      <KeyboardAwareScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.contentScrollContainer}>
        <Text style={[styles.title, { marginTop: actuatedNormalize(20) }]}>
          {t('giftcode_type').toUpperCase()}
        </Text>
        <TouchableX
          style={styles.inputContainer}
          onPress={onShowActionSheetType}>
          <View style={styles.leftContainer} pointerEvents="none">
            <TextInput
              style={[styles.input, { color: Colors.WHITE }]}
              placeholderTextColor={Colors.GREY}
              editable={false}
              value={giftCodeType ? t(`${giftCodeType.id}`) : ''}
            />
          </View>
          <View style={styles.rightContainer}>
            <FontAwesome5 name={'chevron-down'} color="white" size={15} />
          </View>
        </TouchableX>
        {renderConditionView()}

        <Text style={[styles.title, { marginTop: actuatedNormalize(20) }]}>
          {t('content').toUpperCase()}
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.leftContainer}>
            <TextInput
              style={[styles.input, { color: Colors.WHITE }]}
              placeholder={t('enter_content')}
              placeholderTextColor={Colors.TEXT_INPUT}
              onChangeText={(value) => setContent(value)}
              value={content ? content : ''}
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>{t('amount').toUpperCase()}</Text>
          <View style={styles.row}>
            <Text style={styles.transactionText}>{t('you_have')}</Text>
            <Text style={[styles.transactionText, { color: Colors.BLUE }]}>
              {formatCommaNumber(availableCoin.amount)} {coin?.id.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.leftContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor={Colors.TEXT_INPUT}
              keyboardType="decimal-pad"
              value={amount}
              placeholder={t(` Minimum 1 ${coin?.id?.toUpperCase()}`)}
              onChangeText={(value) => setAmount(value)}
            />
          </View>
          <View
            style={[styles.rightContainer,]}>
            <Text style={styles.rightButtonTitle}>
              {coin?.id?.toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={[styles.title, { marginTop: actuatedNormalize(20) }]}>
          {t('quantity').toUpperCase()}
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.leftContainer}>
            <TextInput
              style={[styles.input, { color: Colors.WHITE }]}
              placeholderTextColor={Colors.TEXT_INPUT}
              placeholder={t('Minimum is 1')}
              keyboardType='decimal-pad'
              onChangeText={(value) => setQuantity(value)}
              value={quantity ? quantity : ''}
            />
          </View>
        </View>

        <BlueButton
          title={t('create')}
          containerStyle={[styles.continueButton, { marginHorizontal: 0 }]}
          onPress={onConfirm}
          activeBackgroundColor={!checkButton ? Colors.DARK_GREY : Colors.BLUE}
          isActive={amount == "" || quantity == "" ? false : true}
          disabled={checkButton ? false : true}
        />
      </KeyboardAwareScrollView>
      <ActionSheet
        ref={actionsSheetTypeRef}
        options={conditionOptions}
        cancelButtonIndex={conditionOptions.length - 1}
        onPress={(index) => {
          if (index !== conditionOptions.length - 1) {
            const value = conditionOptions[index];
            const condition = GIFTCODE_CONDITIONS.find(
              (item) => value === t(`${item.id}`),
            );

            if (condition) {
              setGiftCodeType(condition);
            }
          }
        }}
      />
      <PopUpGiftCode
        isVisible={isShowConfirmGiftCode}
        onCloseContainer={
          <View style={{ flexDirection: 'row' }}>
            <View style={{
              justifyContent: 'flex-start',
              paddingVertical: actuatedNormalize(10), marginBottom: actuatedNormalize(10)
            }}>
              <Text style={[styles.content, { fontSize: 16, color: Colors.LIGHT_GREY }]}>{`${t('confirm_creat_giftcode').replace(/#COIN/g, coin?.id?.toUpperCase())}`}</Text>
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
              <Image source={ICO_CLOSE} style={styles.icon} resizeMode='contain' />
            </TouchableX>
          </View>
        }
        giftcode={`${t('giftcode_type')}:`}
        giftcodetype={gifcode}
        money={`${t('amount')}:`}
        moneyVNDT={`${amount} ${coin?.id?.toUpperCase()}`}
        quantity={`${t('quantity')}:`}
        quantityVNDT={quantity}
        total={`${t('total_credit')}:`}
        totalVNDT={`${quantity} ${coin?.id?.toUpperCase()}`}
        note={`${t('note')}:`}
        noteText={content}
        title={t('confirm')}
        GiftCodeType={
          type === 'password_required' ? (
            <View style={[styles.row, { marginLeft: actuatedNormalize(20), marginRight: actuatedNormalize(20), marginTop: actuatedNormalize(10) }]}>
              <View>
                <Text
                  style={[styles.content, { marginHorizontal: 0, marginLeft: 10 }]}>
                  {`${t('pincode')}:`}
                </Text>
              </View>
              <View style={styles.leftContent}>
                <Text
                  style={{
                    fontFamily: FontFamily.TitilliumWeb.SemiBold,
                    color: Colors.WHITE
                  }}>
                  {pincode}
                </Text>
              </View>
            </View>
          ) : null ||
            type === 'recipients_indentified' ? (
                <View style={[styles.row, { marginLeft: actuatedNormalize(20), marginRight: actuatedNormalize(20), marginTop: actuatedNormalize(10) }]}>
                  <View>
                    <Text
                      style={[styles.content, { marginHorizontal: 0, marginLeft: 10 }]}>
                      {`${t('recipient')}:`}
                    </Text>
                  </View>
                  <View style={styles.leftContent}>
                    <Text
                      style={{
                        fontFamily: FontFamily.TitilliumWeb.SemiBold,
                        color: Colors.WHITE
                      }}>
                      {name}
                    </Text>
                  </View>
                </View>
              ) : null
        }
        OnPress={onCreateGiftCode}
      />

      <PopUpSuccessCreateGiftode
        isVisible={isShowPopupSuccess}
        onCloseContainer={
          <View style={{ flexDirection: 'row' }}>
            <View style={{
              justifyContent: 'flex-start',
              paddingVertical: actuatedNormalize(10), marginBottom: actuatedNormalize(10)
            }}>
              <Text style={[styles.content, { fontSize: 16, color: Colors.LIGHT_GREY }]}>{`${t('completed')}`}</Text>
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
              <Image source={ICO_CLOSE} style={styles.icon} resizeMode='contain' />
            </TouchableX>
          </View>
        }
        text1={t('create_giftcode_success')}
        title={t('manager_giftcode')}
        OnPress={onCloseModalSuccess}
      />
    </View>
  );
};
