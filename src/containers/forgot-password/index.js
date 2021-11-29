import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';

import {
  NavTitleBackHeader,
  BlueButton,
  RounerInput,
  AppVersionInfo,
} from '@/components';
import { useTranslation, useAppContext } from '@/hooks';
import { validateEmail } from '@/utils';
import { ConfirmGoogleCaptcha } from '@/services';
import {
  GOOGLE_RECAPTRA,
  ICO_POPUP_MAILBOX,
  ICO_USER,
  showErrorToast,
  showLoading,
} from '@/common';

import styles from './styles';

export const ForgotPasswordScreen = () => {
  const { t, localeProvider } = useTranslation();
  const { forgotPassword } = useAppContext();

  const [email, setEmail] = useState(null);
  const [showRecaptra, setShowRecaptra] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const onForgotPassword = () => {
    let errorMessage = null;
    if (!validateEmail(email?.trim())) {
      errorMessage = t('invalid_email');
    }
    if (errorMessage) {
      showErrorToast(errorMessage);
      return;
    }
    setShowRecaptra(true);
  };

  const onRequestForgotPassword = async ({ pEmail, pGRecaptchaResponse }) => {
    showLoading();
    const res = await forgotPassword({
      email: pEmail,
      gRecaptchaResponse: pGRecaptchaResponse,
    });

    if (res && res.isSuccess) {
      setShowModalSuccess(true);
    }

    // console.log('Res forgot password =================: ', res);
  };

  const onMessage = (event) => {
    if (event && event.nativeEvent.data) {
      if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
        setShowRecaptra(false);
        return;
      } else {
        // console.log('Verified code from Google', event.nativeEvent.data);
        setShowRecaptra(false);

        onRequestForgotPassword({
          pEmail: email?.trim(),
          pGRecaptchaResponse: event.nativeEvent.data,
        });
      }
    }
  };

  const closeModal = () => {
    setShowModalSuccess(false);
  };

  const renderModalResetPasswordSuccess = () => {
    return (
      <Modal isVisible={showModalSuccess}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              style={styles.mailbox}
              source={ICO_POPUP_MAILBOX}
              resizeMode="contain"
            />
            <Text style={styles.popupTitle}>{t('reset_password_title')}</Text>
            <Text style={styles.popupMessage}>
              {t('message_forgot_password')}
            </Text>
            <BlueButton
              containerStyle={styles.okBtn}
              title={t('ok')}
              onPress={closeModal}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
       <NavTitleBackHeader
        containerStyle={styles.navHeader}
        title={t('title_forgot_password')}
      />
      <KeyboardAwareScrollView style={styles.scrollView}>
        <View style={styles.contentScrollContainer}>
          <RounerInput
            containerStyle={styles.input}
            title={t('phone_email')}
            icon={ICO_USER}
            placeholderTextColor={'#262F40'}
            placeholder={t('phone_email')}
            onChangeText={(value) => setEmail(value)}
            autoCapitalize="none"
          />
          <BlueButton
            containerStyle={styles.forgotPasswordBtn}
            title={t('submit_request')}
            onPress={onForgotPassword}
          />
        </View>
      </KeyboardAwareScrollView>
      <AppVersionInfo />
      <ConfirmGoogleCaptcha
        siteKey={GOOGLE_RECAPTRA.SITE_KEY}
        baseUrl={GOOGLE_RECAPTRA.DOMAIN}
        languageCode={localeProvider.name}
        onMessage={onMessage}
        show={showRecaptra}
        cancelButtonText={t('cancel')}
      />
      {renderModalResetPasswordSuccess()}
    </View>
  );
};
