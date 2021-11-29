import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Modal from 'react-native-modal';
import { RNCamera } from 'react-native-camera';

import { NavTitleDownHeader } from '@/components';
import { useTranslation } from '@/hooks';

import styles from './styles';

export const QRCodeScannerModal = ({ isVisible, onSuccess, onDismiss }) => {
  const { t } = useTranslation();

  const onScanSuccess = (e) => {
    // console.log(e.data);

    onSuccess && onSuccess(e.data);
  };

  return (
    <Modal isVisible={isVisible} backdropOpacity={1}>
      <View style={styles.container}>
        <NavTitleDownHeader
          containerStyle={styles.navHeader}
          title={t('qrcode_scan')}
          onPress={onDismiss}
        />
        <View style={styles.contentContainer}>
          <QRCodeScanner
            onRead={onScanSuccess}
            flashMode={RNCamera.Constants.FlashMode.off}
          />
        </View>
      </View>
    </Modal>
  );
};
