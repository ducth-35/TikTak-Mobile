import React, { useState, useEffect } from 'react';
import { View, Text, Image, CheckBox, Linking } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEmpty } from 'lodash';

import {
  NavTitleBackHeader,
  BlueButton,
  ToggleSwitch,
  IconInput,
  TouchableX,
  AppVersionInfo,
} from '@/components';
import { useTranslation, useAppContext } from '@/hooks';
import {
  ICO_USER,
  ICO_PASSWORD,
  ICO_EMAIL,
  ICO_PRECENTERS,
  GOOGLE_RECAPTRA,
  ICO_WARNING,
  showErrorToast,
  showLoading,
  showSuccessToast,
} from '@/common';
import { validateEmail, validatePassword, validateName } from '@/utils';
import { ConfirmGoogleCaptcha, NavigationService } from '@/services';

import styles from './styles';
import { actuatedNormalize, Colors } from '@/themes';

export const SignUpScreen = () => {
  const { t, localeProvider } = useTranslation();
  const { register } = useAppContext();

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [sponsorId, setSponsorId] = useState(null);
  const [showRecaptra, setShowRecaptra] = useState(false);
  const [agree, setAgree] = useState(false);

  const onSignUp = () => {
    if (agree) {
      let errorMessage = null;
      if (!validateName(name?.trim())) {
        errorMessage = t('invalid_name');
      } else if (!validateEmail(email?.trim())) {
        errorMessage = t('invalid_email');
      } else if (!validatePassword(password?.trim())) {
        errorMessage = t('invalid_password');
      } else if (password.length < 6 || password.length > 50) {
        errorMessage = t('new_pass_invalid');
      }

      if (errorMessage) {
        showErrorToast(errorMessage);
        return;
      }

      setShowRecaptra(true);
    }
  };

  const onRegister = async ({
    pName,
    pEmail,
    pPassword,
    pSponsor,
    pGRecaptchaResponse,
  }) => {
    showLoading();
    const res = await register({
      name: pName,
      email: pEmail,
      password: pPassword,
      sponsor: pSponsor,
      gRecaptchaResponse: pGRecaptchaResponse,
    });

    if (res && res?.isSuccess) {
      showSuccessToast(t('msg_register_success'));
      onNavigateToSignIn();
    }
  };

  const onNavigateToSignIn = () => {
    NavigationService.goBack();
  };

  const onChangeToggleValue = (isOn) => {
    setAgree(isOn);
  };

  const onTermConditions = () => {
    Linking.openURL('https://acwallet.io/images/terms-and-conditions.pdf')
  }

  const onMessage = (event) => {
    if (event && event.nativeEvent.data) {
      if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
        setShowRecaptra(false);
        return;
      } else {
        // console.log('Verified code from Google', event.nativeEvent.data);
        setShowRecaptra(false);

        const sponsor = isEmpty(sponsorId?.trim())
          ? 'ACWALLET'
          : sponsorId?.trim();

        onRegister({
          pName: name?.trim(),
          pEmail: email?.trim(),
          pPassword: password?.trim(),
          pSponsor: sponsor,
          pGRecaptchaResponse: event.nativeEvent.data,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <NavTitleBackHeader
        containerStyle={styles.navHeader}
        title={t('sign_up')}
      />
      <KeyboardAwareScrollView style={styles.scrollView}>
        <View style={styles.contentScrollContainer}>
          {/* <Text style={styles.subTitle}>{t('privacy_text_1')}</Text>
          <View style={styles.smallLine} /> */}
          <View style={styles.contentContainer}>
            <IconInput
              containerStyle={styles.nameInput}
              icon={ICO_USER}
              textname={t('input_name')}
              placeholder={t('input_name')}
              placeholderColor={'#262F40'}
              onChangeText={(value) => setName(value)}
              autoCapitalize="none"
            />
            <IconInput
              containerStyle={styles.emailInput}
              icon={ICO_EMAIL}
              textname={t('email')}
              placeholder={t('email')}
              placeholderColor={'#262F40'}
              onChangeText={(value) => setEmail(value)}
              autoCapitalize="none"
            />
            <IconInput
              containerStyle={styles.passwordInput}
              icon={ICO_PASSWORD}
              textname={t('password')}
              placeholder={t('password')}
              placeholderColor={'#262F40'}
              onChangeText={(value) => setPassword(value)}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            <IconInput
              containerStyle={styles.emailInput}
              icon={ICO_PRECENTERS}
              textname={t('placeholder_sponsor')}
              placeholder={t('presenter')}
              placeholderColor={'#262F40'}
              onChangeText={(value) => setSponsorId(value)}
              autoCapitalize="none"
            />
            <View style={{ flexDirection: 'row', marginTop: actuatedNormalize(20) }}>
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
              isActive={agree ? true : false}
              containerStyle={styles.signUpBtn}
              title={t('create_new_account')}
              onPress={onSignUp}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.accountText}>{t('already_account')}</Text>
            <TouchableX onPress={onNavigateToSignIn}>
              <Text style={styles.signInText}>{t('sign_in_normal_case')}</Text>
            </TouchableX>
          </View>
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
    </View>
  );
};
