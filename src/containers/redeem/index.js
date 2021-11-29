import React, { useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import { NavTitleHeader } from '@/components';
import { useTranslation } from '@/hooks';
import { BG_SCAN } from '@/common';

import styles from './styles';

export const RedeemScreen = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // console.log('mounted');

    return () => {
      // console.log('unmounted');
    };
  }, []);

  const onScanSuccess = (e) => {
    // console.log(e.data);
  };

  return (
    <View style={styles.container}>
      <NavTitleHeader containerStyle={styles.navHeader} title={t('redeem')} />
      <View style={styles.contentContainer}>
        <Text style={styles.topTitle}>{t('redeem_title')}</Text>

        <ImageBackground
          style={styles.scanContainer}
          source={BG_SCAN}
          resizeMode="contain">
          <View style={styles.contentScanContainer}>
            <QRCodeScanner
              cameraStyle={styles.qrCodeContainer}
              onRead={onScanSuccess}
              flashMode={RNCamera.Constants.FlashMode.off}
            />
          </View>
        </ImageBackground>

        <View style={styles.row}>
          <Text style={styles.bottomTitleRegular}>{t('cannot_scan')} </Text>
          <Text style={styles.bottomTitleBold}>{t('enter_code')}</Text>
        </View>
      </View>
    </View>
  );
};
