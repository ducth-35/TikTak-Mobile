import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';

import DeviceInfo from 'react-native-device-info';
import { ChangeLanguagePopup } from '@/containers';

import styles from './styles';
import { TouchableX } from '@/components';
import { useTranslation } from '@/hooks';
import { ICO_LANGUAGE } from '@/common';

export const AppVersionInfo = () => {
  const { t } = useTranslation();
  const [showLanguage, setShowLanguage] = useState(false);

  const onClosePopupChange = () => {
    setShowLanguage(false);
  }
  const onShowChangeLanguagePopup = () => {
    setShowLanguage(true);
  }

  return (
    <>
      <TouchableX onPress={onShowChangeLanguagePopup}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image source={ICO_LANGUAGE} style={{width: 18, height: 18}} resizeMode="contain" />
          <Text style={styles.languageText}>{t('language')}</Text>
        </View>
      </TouchableX>
      <View>
        <Text style={styles.versionText}>
          AC Wallet - {DeviceInfo.getVersion()} build{' '}
          {DeviceInfo.getBuildNumber()}
        </Text>
      </View>
      {showLanguage && (
        <ChangeLanguagePopup onClose={onClosePopupChange} />
      )}
    </>
  );
};
