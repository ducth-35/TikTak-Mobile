import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, Image } from 'react-native';
import styles from './styles';
import { NavTitleBackHeader, Detail, BlueButton, PopupCredit, TouchableX, PopUpSuccess } from '@/components';
import { useAppContext, useTranslation } from '@/hooks';
import dayjs from 'dayjs';
import {
  CREDIT_TYPE, ICO_CLOSE,
  showErrorToast,
  showSuccessToast,
  showLoading,
  STATUS_CREDIT,
  ICO_LIST_GIFCODE,
  Routes,
} from '@/common';
import { Colors, actuatedNormalize } from '@/themes';
import { NavigationService } from '@/services';
import { formatNumberFee } from '@/utils'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ActionSheet from 'react-native-actionsheet';
import { isEmpty } from 'lodash';


export const DetailScreen = ({ route }) => {
  const { t } = useTranslation();
  const { createrequestDone, updateCredit, getListcreditManagement } = useAppContext();

  const [isShowConfirmPopup, setIsShowConfirmPopup] = useState();
  const [checkButton, setCheckButton] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [interestRateEdit, setInterestRateEdit] = useState(null);
  const [isShowSuccess, setIsShowSuccess] = useState();
  const [statusType, setStatusType] = useState(null);
  const actionsSheetTypeRef = useRef(null);



  const borrowerEmail = route.params?.borrowerEmail;
  const onwerEmail = route.params?.onwerEmail;
  const quota = route.params?.quota;
  const quantityUsed = route.params?.quantityUsed;
  const interestRate = route.params?.interestRate;
  const created = route.params?.created;
  const status = route.params?.status;
  const type = route.params?.type;
  const id = route.params?.id;


  useEffect(() => {
    if (quantity != "") {
      setCheckButton(true)
    } else { setCheckButton(false) }
  });
  useEffect(() => {
    const publicType = STATUS_CREDIT.find((item) => item.id === status);
    setStatusType(publicType);

    if (interestRate) {
      setInterestRateEdit(`${interestRate}`);
    }
  }, []);

  const conditionOptions = [
    ...STATUS_CREDIT.filter((item) =>
      ['running', 'stoped'].includes(item.id),
    ).map((item) => t(`${item.id}`)),
    t('cancel'),
  ];

  const onShowActionSheetType = () => {
    if (actionsSheetTypeRef) {
      actionsSheetTypeRef.current.show();
    }
  };


  const Requesraloan = () => {
    setIsShowConfirmPopup(true);
  }

  const onEdit = () => {
    if (interestRateEdit > 0.3) {
      showErrorToast(`${t('maximum_interest')}`);
    } else if (isEmpty(interestRateEdit)) {
      showErrorToast(`Nhập lãi suất ngày !`);
    } else {
      showLoading();
      onSenEdit();
    }
  }
  const onSenEdit = async () => {
    const params = {
      id: id,
      status: statusType.id,
      interestRate: interestRateEdit
    }
    const res = await updateCredit(params);
    if (res && res.isSuccess) {
      showSuccessToast(`${t('change_information')}`);
      NavigationService.navigate(Routes.MANAGER_SCREEN, getListcreditManagement({ type: 'lender' }));
    }
  }

  const onCreatCredit = () => {
    let errorMessage = null;

    if (parseFloat(quantity) > parseFloat(quota)) {
      errorMessage = (`${t('maximum_number').replace(/#LIMIT/g, formatNumberFee(quota)).replace(/#NAME/g, 'VNDT')}`)
    }

    if (errorMessage) {
      showErrorToast(errorMessage);
      return;
    } else {
      showLoading();
    }
    setIsShowConfirmPopup(false);
    onSendCreatCredit();
  }
  const onSendCreatCredit = async () => {
    const params = {
      creditId: id,
      quantity: quantity
    }
    const res = await createrequestDone(params);
    if (res && res.isSuccess) {
      setIsShowSuccess(true);
    }
  }


  const onCancel = () => {
    setIsShowConfirmPopup(false);
  }
  const onCancelSuccess = () => {
    NavigationService.navigate(Routes.GRANTED_CREDIT, setIsShowSuccess(false))
  }


  const onListCreditDetail = () => {
    NavigationService.navigate(Routes.CREDITDETAIL, { id: id, typed: type });
  }

  return (
    <View style={styles.container}>
      <NavTitleBackHeader
        title={t('details_credit')}
        containerStyle={styles.navHeader}
        rightContainer={
          <TouchableX style={styles.navRightButton} onPress={onListCreditDetail}>
            <Image
              style={{ width: actuatedNormalize(20), height: actuatedNormalize(20) }}
              source={ICO_LIST_GIFCODE} resizeMode='contain' />
          </TouchableX>
        }
      />
      <ScrollView>
        <Detail
          lender={onwerEmail}
          grantee={borrowerEmail}
          quota={`${formatNumberFee(quota)}`}
          quantityused={`${quantityUsed}`}
          created={dayjs(created).format('HH:mm  |  DD-MM-YYYY')}
          interest={
            type === CREDIT_TYPE.GRANTED ? (
              <View
                style={[styles.inputContainer]}>
                <View style={styles.leftContainer}>
                  <TextInput
                    style={[styles.input]}
                    value={`${interestRate}`}
                    editable={false}
                  />
                </View>
              </View>
            ) : null ||
              type === CREDIT_TYPE.MANAGEMANT ? (
                  <View
                    style={[styles.inputContainer]}>
                    <View style={styles.leftContainer}>
                      <TextInput
                        style={styles.input}
                        value={interestRateEdit}
                        keyboardType='decimal-pad'
                        multiline={true}
                        onChangeText={(value) => setInterestRateEdit(value)}
                      />
                    </View>
                  </View>
                ) : null
          }
          status={
            type === CREDIT_TYPE.GRANTED ? (
              <View
                style={[styles.inputContainer]}>
                <View style={styles.leftContainer}>
                  {status === 'running' ? (
                    <TextInput
                      style={[styles.input, { color: Colors.GREEN }]}
                      value={t(`running`)}
                      editable={false}
                    />
                  ) : null}
                  {status === 'stoped' ? (
                    <TextInput
                      style={[styles.input, { color: Colors.RED }]}
                      value={t(`stoped`)}
                      editable={false}
                    />
                  ) : null}
                </View>
              </View>
            ) : null ||
              type === CREDIT_TYPE.MANAGEMANT ? (
                  <TouchableX
                    style={styles.inputContainer}
                    onPress={onShowActionSheetType}
                  >
                    <View style={styles.leftContainer} pointerEvents="none">
                      <TextInput
                        style={[styles.input, { color: statusType ? statusType.color : '' }]}
                        editable={false}
                        value={statusType ? t(`${statusType.id}`) : ''}
                      />
                    </View>
                    <View style={styles.rightContainer}>
                      <FontAwesome5 name={'chevron-down'} color={Colors.WHITE} size={15} />
                    </View>
                  </TouchableX>
                ) : null
          }
          button={
            type === CREDIT_TYPE.GRANTED ? (
              <View style={{ marginTop: 30 }}>
                {status === 'running' ? (
                  <BlueButton
                    onPress={Requesraloan}
                    title={t('request_loan')}
                    containerStyle={styles.transferButton}
                  />
                ) : null}
              </View>
            ) : null ||
              type === CREDIT_TYPE.MANAGEMANT ? (
                  <View style={{ marginTop: 30 }}>
                    <BlueButton
                      title={t('edit').toUpperCase()}
                      containerStyle={[styles.transferButton]}
                      onPress={onEdit}
                      activeBackgroundColor={Colors.BLUE}
                    />
                  </View>
                ) : null
          }
        />
      </ScrollView>
      <ActionSheet
        ref={actionsSheetTypeRef}
        options={conditionOptions}
        cancelButtonIndex={conditionOptions.length - 1}
        onPress={(index) => {
          if (index !== conditionOptions.length - 1) {
            const value = conditionOptions[index];
            const condition = STATUS_CREDIT.find(
              (item) => value === t(`${item.id}`),
            );
            const color = STATUS_CREDIT.find(
              (item) => value === item.color,
            );

            if (condition) {
              setStatusType(condition, color);
            }
          }
        }}
      />
      <PopupCredit
        isVisible={isShowConfirmPopup}
        onCloseContainer={
          <View style={{ flexDirection: 'row' }}>
            <View style={{
              justifyContent: 'flex-start',
              paddingVertical: actuatedNormalize(10), marginBottom: actuatedNormalize(10)
            }}>
              <Text style={[styles.content, { fontSize: 16, color: Colors.LIGHT_GREY }]}> {`${t('create_a_credit_loan_request')}`} </Text>
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
        quota={`${t('quota')}:`}
        quotaVNDT={`${formatNumberFee(quota)} VNDT`}
        interest={`${t('interest_rate_per_day')}:`}
        interestVNDT={`${interestRate} %`}
        quantityused={`${t('quantity_used')}:`}
        quantityusedVNDT={`${formatNumberFee(quantityUsed)} VNDT`}
        amount={`${t('quantity')}:`}
        title={t('create_credit')}
        OnPress={onCreatCredit}
        activeBackgroundColor={!checkButton ? Colors.DARK_GREY : Colors.BLUE}
        isActive={quantity == "" ? false : true}
        disabled={checkButton ? false : true}
        quanlityInput={
          <View style={{ marginLeft: actuatedNormalize(20), marginRight: actuatedNormalize(20), marginTop: actuatedNormalize(10), marginBottom: actuatedNormalize(20) }}>
            <View
              style={[styles.inputContainer]}>
              <View style={styles.leftContainer}>
                <TextInput
                  style={[styles.input]}
                  placeholder={`Maximun: ${formatNumberFee(quota)} VNDT`}
                  value={quantity}
                  placeholderTextColor={Colors.TEXT_INPUT}
                  keyboardType="decimal-pad"
                  onChangeText={(value) => setQuantity(value)}
                />
              </View>
            </View>
          </View>
        }
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
        text1={t('successful_loan')}
        text2={t('await_loan')}
      />
    </View>
  );
}
