import React, { useState, useEffect } from 'react';
import { View, Text, Linking } from 'react-native';

import { ToggleSwitch, BlueButton, TouchableX } from '@/components';
import { useTranslation } from '@/hooks';
import { Routes } from '@/common';
import { NavigationService } from '@/services';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';

import styles from './styles';

export const PrivacyScreen = () => {
  const { t } = useTranslation();

  const [agree, setAgree] = useState(false);

  const onChangeToggleValue = (isOn) => {
    setAgree(isOn);
  };

  const onContinue = () => {
    if (agree) {
      NavigationService.navigate(Routes.ONBOARDING);
    }
  };

  const onTermConditions = () => {
    Linking.openURL('https://support.tiktakbtc.io/dieu-khoan-su-dung/#term')
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.bigTitle}>{t('privacy_screen.privacy_policy')}</Text>
          <Text style={styles.subTitle}>{t('privacy_screen.privacy_text_1')}</Text>
          <View style={styles.line} />
          <View style={{ justifyContent: 'center' }}>
            <TouchableX onPress={onTermConditions}>
              <Text style={styles.signInText}>{t('terms & Conditions')}</Text>
            </TouchableX>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.row}>
          <View style={{ marginRight: actuatedNormalize(10) }}>
            <ToggleSwitch
              isOn={agree}
              size="small"
              onColor={Colors.BLUE}
              offColor={Colors.PRIMARY}
              onToggle={onChangeToggleValue}
            />
          </View>
          <View style={{ justifyContent: 'center', marginRight: actuatedNormalize(5) }}>
            <Text style={[styles.title, { marginHorizontal: 0 }]}>{t('sign_up_guide')}</Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <TouchableX onPress={onTermConditions}>
              <Text style={styles.signInText}>{t('terms & Conditions')}</Text>
            </TouchableX>
          </View>
        </View>
        <BlueButton
          containerStyle={styles.continueBtn}
          title={t('continue')}
          onPress={onContinue}
          isActive={agree ? true : false}
        />
      </View>
    </View>
  );
};
