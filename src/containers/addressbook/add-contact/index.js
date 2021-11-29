import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, Image } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { isEmpty } from 'lodash';

import {
  NavTitleBackHeader,
  TouchableX,
  QRCodeScannerModal,
  BlueButton,
} from '@/components';
import { useTranslation, useAppContext } from '@/hooks';
import { Colors, actuatedNormalize } from '@/themes';
import {
  SUPPORTED_COINS,
  ICON_SCAN_QRCODE,
  showErrorToast,
  showSuccessToast,
  Routes,
} from '@/common';
import { NavigationService } from '@/services';

import styles from './styles';

export const AddContactScreen = ({ route }) => {
  const coin = route.params?.coin;
  const isEdit = route.params?.isEdit;
  const addressId = route.params?.addressId;

  const { t } = useTranslation();
  const {
    onAddContact,
    onUpdateContact,
    onDeleteContact,
    listAddress,
  } = useAppContext();

  const [name, setName] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showQRCodeScan, setShowQRCodeScan] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    if (isEdit) {
      setTitle(t('edit_contact'));
      const existingCoin = listAddress.find((item) => item.id === addressId);
      if (existingCoin) {
        setName(existingCoin.name);
        setWalletAddress(existingCoin.walletAddress);
      }
    } else {
      setTitle(t('add_contact'));
    }
  }, [isEdit, addressId]);

  useEffect(() => {
    if (coin) {
      const existingCoin = SUPPORTED_COINS.find((item) => item.id === coin);

      if (existingCoin) {
        setSelectedCoin(existingCoin);
      }
    }
  }, [coin]);

  const onShowQRCodeScan = () => {
    setShowQRCodeScan(true);
  };

  const onScanQRCodeSuccess = (data) => {
    setWalletAddress(data);
    setShowQRCodeScan(false);
  };

  const onSave = () => {
    let errorMessage = null;
    if (isEmpty(name)) {
      errorMessage = t('invalid_name');
    } else if (isEmpty(walletAddress)) {
      errorMessage = t('invalid_address');
    }

    if (errorMessage) {
      showErrorToast(errorMessage);
      return;
    }

    const contact = {
      id: isEdit ? addressId : Date.now() / 1000,
      coinId: selectedCoin.id,
      name: name,
      walletAddress: walletAddress,
    };

    if (isEdit) {
      onUpdateContact(contact);
      showSuccessToast(t('update_contact_success_msg'));
    } else {
      onAddContact(contact);
      showSuccessToast(t('add_contact_success_msg'));
    }

    NavigationService.goBack();
  };

  const onDelete = () => {
    Alert.alert(
      //title
      (t('notification')),
      //body
      (t('alert')),
      [
        {
          text: (t('yes')),
          onPress: () => {
            onDeleteContact({ id: addressId });
            showSuccessToast(t('delete_contact_success_msg'));
            NavigationService.goBack();
          }
        },
        {
          text: (t('no')),
          onPress: () => {
            // console.log('No')
          }, style: 'cancel'
        },
      ],
      { cancelable: false },
      //clicking out side of alert will not cancel
    );
  };

  const onTransfer = () => {
    NavigationService.navigate(Routes.TRANSFER_TO, {
      coin: selectedCoin,
      receveAddress: walletAddress,
      name: name,
    });
  };

  const isAvailableTransfers = () => {
    if (
      coin === 'vndt' ||
      coin === 'usdf' ||
      coin === 'cent' ||
      coin === 'xeng'
    ) {
      return true;
    }

    return false;
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(29, 29, 43, 1)' }]}>
      <NavTitleBackHeader
        containerStyle={[styles.navHeader, { backgroundColor: 'rgba(37, 42, 63, 1)' }]}
        title={title ?? ''}
      />
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentScrollContainer}>
        <View style={styles.coin}>
          <Text style={styles.text_coin}> {selectedCoin ? selectedCoin.shortname : ''}</Text>
          <Text style={styles.text_coin_name}> {selectedCoin ? selectedCoin.name : ''}</Text>
        </View>
        <Text style={[styles.title, { marginTop: actuatedNormalize(20) }]}>{t('name').toUpperCase()}</Text>
        <View style={[styles.inputContainer, { backgroundColor: "#141421" }]}>
          <View style={styles.leftContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor={Colors.TEXT_INPUT}
              placeholder={t('user_name')}
              onChangeText={(value) => setName(value)}
              value={name}
            />
          </View>
        </View>
        <Text style={[styles.title, { marginTop: actuatedNormalize(20) }]}>{t('address').toUpperCase()}</Text>
        <View style={[styles.inputContainer, { backgroundColor: "#141421" }]}>
          <View style={styles.leftContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor={Colors.TEXT_INPUT}
              placeholder={t('enter_address')}
              value={walletAddress}
              onChangeText={(value) => setWalletAddress(value)}
              autoCapitalize="none"
            />
          </View>
          {/* <TouchableX
            style={[styles.rightContainer]}
            onPress={onShowQRCodeScan}>
            <FontAwesome
              name="qrcode"
              color="white"
              size={actuatedNormalize(20)}
            />
          </TouchableX> */}
          <TouchableX 
          style={[styles.rightContainer]}
          onPress={onShowQRCodeScan}>
            <Image
            source={ICON_SCAN_QRCODE}
            style={styles.scanQrcode}/>
          </TouchableX>
        </View>
        {!isEdit && (
          <BlueButton
            title={t('save').toUpperCase()}
            containerStyle={styles.saveButton}
            onPress={onSave}
          />
        )}
        {isEdit && (
          <View style={styles.rowButtons}>
             <BlueButton
              title={t('delete').toUpperCase()}
              containerStyle={[
                styles.saveButton,
                { width: undefined, flex: 1,  marginRight: 5},
              ]}
              onPress={onDelete}
              activeBackgroundColor={Colors.BTN_DELETE}
            />
            <BlueButton
              title={t('save').toUpperCase()}
              containerStyle={[
                styles.saveButton,
                { width: undefined, flex: 1,  marginLeft: 5},
              ]}
              onPress={onSave}
              activeBackgroundColor={Colors.BTN_SAVED}
            />
          </View>
        )}
        {isEdit && isAvailableTransfers() && (
          <BlueButton
            title={t('transfer').toUpperCase()}
            containerStyle={[styles.saveButton, { marginTop: 10 }]}
            onPress={onTransfer}
            activeBackgroundColor={Colors.SKY_BLUE}
          />
        )}
      </KeyboardAwareScrollView>
      <QRCodeScannerModal
        isVisible={showQRCodeScan}
        onSuccess={onScanQRCodeSuccess}
        onDismiss={() => setShowQRCodeScan(false)}
      />
    </View>
  );
};
