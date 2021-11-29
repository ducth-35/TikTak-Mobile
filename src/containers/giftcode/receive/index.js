import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Image } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEmpty } from 'lodash';
import Modal from 'react-native-modal';

import {
  NavTitleBackHeader,
  BlueButton,
  TouchableX,
  QRCodeScannerModal,
} from '@/components';
import { useTranslation, useAppContext } from '@/hooks';
import { formatCommaNumber } from '@/utils';
import { Colors, actuatedNormalize } from '@/themes';
import { ICON_SCAN_QRCODE, showLoading, showErrorToast, showSuccessToast, Routes } from '@/common';
import { NavigationService } from '@/services';

import styles from './styles';

export const ReceiveGiftcodeScreen = () => {
  const { t } = useTranslation();
  const { validateGiftCode, scanGiftCode, getListGiftcode } = useAppContext();

  const [giftcode, setGiftcode] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [type, setType] = useState(null);
  const [giftcodeSuccessInfo, setGiftCodeSuccessInfo] = useState(null);
  const [showQRCodeScan, setShowQRCodeScan] = useState(false);

  const onContinue = async () => {
    if (!type) {
      let errorMessage = null;
      if (isEmpty(giftcode)) {
        errorMessage = t('invalid_giftcode');
      }

      if (errorMessage) {
        showErrorToast(errorMessage);
        return;
      }

      const params = { code: giftcode };
      showLoading('Đang nạp...');

      const res = await validateGiftCode(params);

      if (res.status) {
        if (res.data.status === 200) {
          setGiftCodeSuccessInfo(res.data);
        } else {
          if (res.data.type) {
            setType(res.data.type);
          }
        }
      }
    } else {
      let errorMessage = null;

      if (type === 'private') {
        if (isEmpty(pincode)) {
          errorMessage = t('invalid_pincode');
        }
      } else if (type === 'fixedSender') {
        if (isEmpty(pincode)) {
          errorMessage = t('invalid_uid');
        }
      }

      if (errorMessage) {
        showErrorToast(errorMessage);
        return;
      }

      const params = { code: giftcode };

      showLoading();

      if (type === 'private') {
        params['pincode'] = pincode;
      } else if (type === 'fixedSender') {
        params['pincode'] = pincode;
      }

      const res = await scanGiftCode(params);
      if (res.status) {
        setGiftCodeSuccessInfo(res.data);
      }
    }
  };

  const onClosePopup = () => {
    setGiftCodeSuccessInfo(null);
    setGiftcode(null);
    setPincode(null);
    setType(null);
    getListGiftcode();
  };

  const renderConditionsView = () => {
    if (!type) {
      return null;
    }

    if (type === 'private') {
      return (
        <>
          <Text style={[styles.title, { marginTop: actuatedNormalize(20) }]}>
            {t('giftcode_require_pin').toUpperCase()}
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.leftContainer}>
              <TextInput
                style={[styles.input, { color: Colors.GREY }]}
                placeholderTextColor={Colors.GREY}
                onChangeText={(value) => setPincode(value)}
                value={pincode ? pincode : ''}
              />
            </View>
          </View>
        </>
      );
    } else if (type === 'fixedSender') {
      return (
        <>
          <Text style={[styles.title, { marginTop: actuatedNormalize(20) }]}>
            {t('giftcode_require_creator').toUpperCase()}
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.leftContainer}>
              <TextInput
                style={[styles.input, { color: Colors.GREY }]}
                placeholderTextColor={Colors.GREY}
                onChangeText={(value) => setPincode(value)}
                value={pincode ? pincode : ''}
              />
            </View>
          </View>
        </>
      );
    }
  };

  const onShowQRCodeScan = () => {
    setShowQRCodeScan(true);
  };

  const onScanQRCodeSuccess = (data) => {
    setGiftcode(data);
    setShowQRCodeScan(false);
  };
  
  const onShowHistoryGiftcode = () => {
    NavigationService.navigate(Routes.HISTORY, { check: true }, setGiftCodeSuccessInfo(null));
  }

  return (
    <View style={styles.container}>
      <NavTitleBackHeader
        containerStyle={styles.navHeader}
        title={t('enter_giftcode')}
      />
      <KeyboardAwareScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.contentScrollContainer}>
        <Text style={[styles.title, { marginTop: actuatedNormalize(20) }]}>
          {t('please_enter_giftcode').toUpperCase()}
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.leftContainer}>
            <TextInput
              style={[styles.input, { color: Colors.GREY }]}
              placeholderTextColor={Colors.GREY}
              placeholder={t('enter_giftcode')}
              onChangeText={(value) => setGiftcode(value)}
              value={giftcode ? giftcode : ''}
            />
          </View>
          <TouchableX
            style={[styles.rightContainer, { backgroundColor: Colors.NEUTURAL11 }]}
            onPress={onShowQRCodeScan}>
            <Image
              style={[styles.ICON_SCAN_QRCODE]}
              source={ICON_SCAN_QRCODE} />
          </TouchableX>
        </View>
        {renderConditionsView()}
        <BlueButton
          title={t('continue')}
          containerStyle={styles.continueButton}
          onPress={onContinue}
        />
      </KeyboardAwareScrollView>
      <Modal
        isVisible={giftcodeSuccessInfo !== null}
        onRequestClose={onClosePopup}
        onBackdropPress={onClosePopup}>
        <View style={styles.modalContainer}>
          <Text
            style={[
              styles.title,
              {
                fontWeight: 'bold',
                color: Colors.GREY,
                fontSize: actuatedNormalize(20),
                textAlign: 'center',
              },
            ]}>
            {t('receive_giftcode_success_msg')}
          </Text>
          <View style={[styles.row, {flexDirection: 'row'}]}>
            <Text
              style={[
                styles.title,
                { color: Colors.GREY, fontWeight: 'bold', marginRight: 10 },
              ]}>
              {`${t('quantity')}:`}
            </Text>
            <Text style={[styles.title, { color: Colors.BLUE }]}>
              {`${formatCommaNumber(giftcodeSuccessInfo?.quantity)} ${giftcodeSuccessInfo?.currency
                }`}
            </Text>
          </View>
          <View style={styles.row}>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Text style={[
                styles.title,
                { color: Colors.GREY, fontWeight: 'bold', marginRight: 10 },
              ]}>
                {`${t('hash')}:`}
              </Text>
              <Text style={[styles.title, { color: Colors.GREY }]}>
                {`${giftcodeSuccessInfo?.hash}`}
              </Text>
            </View>
            <TouchableX onPress={onShowHistoryGiftcode}>
                 <Text style={[styles.title, { color: Colors.BLUE, textDecorationLine: 'underline' }]}s>{t('history_giftcode')}</Text>
            </TouchableX>
          </View>
        </View>
      </Modal>

      <QRCodeScannerModal
        isVisible={showQRCodeScan}
        onSuccess={onScanQRCodeSuccess}
        onDismiss={() => setShowQRCodeScan(false)}
      />
    </View>
  );
};
