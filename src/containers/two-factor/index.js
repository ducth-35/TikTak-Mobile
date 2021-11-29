import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

import { NavTitleBackHeader, BlueButton } from '@/components';
import { useAppContext, useTranslation } from '@/hooks';
import { NavigationService } from '@/services';
import { Routes } from '@/common';
import { Colors } from '@/themes';

import styles from './styles';

export const TwoFactorAuthenticationScreen = () => {
  const { t } = useTranslation();
  const { accountInfo } = useAppContext();

  const [authenType, setAuthenType] = useState('none');

  useEffect(() => {
    setAuthenType(accountInfo?.authen_type);
  }, [accountInfo]);

  const onGetActivationCode = () => {
    NavigationService.navigate(Routes.ENABLE_AUTHENTICATION, {
      type: 'google',
    });
  };

  const onSendVerificationCode = () => {
    NavigationService.navigate(Routes.ENABLE_AUTHENTICATION, { type: 'email' });
  };

  const onDisableGoogleAuthen = () => {
    NavigationService.navigate(Routes.ENABLE_AUTHENTICATION, {
      isDisable: true,
      type: 'google',
    });
  };

  const onDisableEmailAuthen = () => {
    NavigationService.navigate(Routes.ENABLE_AUTHENTICATION, {
      isDisable: true,
      type: 'email',
    });
  };

  return (
    <View style={styles.container}>
      <NavTitleBackHeader
        containerStyle={styles.navHeader}
        title={t('two_factor_authentication')}
      />
      <ScrollView>
        <View style={styles.sectionContainer}>
          <View style={styles.header}>
            <Entypo name="lock-open" color="white" size={20} />
            <Text style={styles.title}>{t('two_factor_authentication')}</Text>
          </View>

          {authenType === 'none' ? (
            <View style={styles.contentContainer}>
              <Text style={styles.content}>{t('google_authen_message')}</Text>
              <BlueButton
                containerStyle={styles.activationCodeBtn}
                title={t('get_activation_code').toUpperCase()}
                onPress={onGetActivationCode}
              />
            </View>
          ) : authenType === 'google' ? (
            <View style={styles.contentContainer}>
              <Text style={styles.content}>
                {t('google_authen_enable_msg')}
              </Text>
              <BlueButton
                containerStyle={styles.activationCodeBtn}
                title={t('disable_google_authen').toUpperCase()}
                onPress={onDisableGoogleAuthen}
                activeBackgroundColor={Colors.RED}
              />
            </View>
          ) : (
            <View style={styles.contentContainer}>
              <Text style={styles.content}>
                {t('none_use_authen_goole_msg')}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.header}>
            <Entypo name="lock-open" color="white" size={20} />
            <Text style={styles.title}>{t('email_authentication')}</Text>
          </View>
          {authenType === 'none' ? (
            <View style={styles.contentContainer}>
              <Text style={styles.content}>{t('email_authen_message')}</Text>
              <View style={styles.rounerInput}>
                <Text style={styles.content}>
                  {accountInfo ? accountInfo.email : ''}
                </Text>
              </View>
              <BlueButton
                containerStyle={styles.activationCodeBtn}
                title={t('send_verification_code').toUpperCase()}
                onPress={onSendVerificationCode}
              />
            </View>
          ) : authenType === 'google' ? (
            <View style={styles.contentContainer}>
              <Text style={styles.content}>
                {t('none_use_authen_via_email_msg')}
              </Text>
            </View>
          ) : (
            <View style={styles.contentContainer}>
              <Text style={styles.content}>{t('email_authen_enable')}</Text>
              <BlueButton
                containerStyle={styles.activationCodeBtn}
                title={t('disable_email_authentication').toUpperCase()}
                onPress={onDisableEmailAuthen}
                activeBackgroundColor={Colors.RED}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
