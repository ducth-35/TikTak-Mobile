import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StepIndicator from 'react-native-step-indicator';
import QRCode from 'react-native-qrcode-svg';
import { isEmpty } from 'lodash';
import Clipboard from '@react-native-community/clipboard';
import Entypo from 'react-native-vector-icons/Entypo';

import { useAppContext, useTranslation } from '@/hooks';
import { NavTitleBackHeader, BlueButton, TouchableX } from '@/components';
import { showLoading, showErrorToast, showSuccessToast } from '@/common';
import { actuatedNormalize, Colors } from '@/themes';
import { NavigationService } from '@/services';

import styles from './styles';

const indicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: '#4aae4f',
  separatorUnFinishedColor: '#a4d4a5',
  stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#a4d4a5',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 12,
  currentStepLabelColor: '#4aae4f',
};

const StepGuideView = () => {
  const { t } = useTranslation();

  const stepContents = [
    t('auth_google_step_1_msg'),
    t('auth_google_step_2_msg'),
    t('auth_google_step_3_msg'),
    t('auth_google_step_4_msg'),
    t('auth_google_step_5_msg'),
    t('auth_google_step_6_msg'),
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [stepContent, setStepContent] = useState(stepContents[0]);

  const onStepPress = (position) => {
    setCurrentStep(position);
    setStepContent(stepContents[position]);
  };

  return (
    <View style={styles.tutorialContainer}>
      <StepIndicator
        stepCount={6}
        customStyles={indicatorStyles}
        currentPosition={currentStep}
        labels={['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6']}
        onPress={onStepPress}
      />
      <Text style={styles.content}>{stepContent}</Text>
    </View>
  );
};

export const EnableAuthenticationScreen = ({ route }) => {
  const isDisable = route.params?.isDisable;
  const type = route.params?.type;

  const { t } = useTranslation();
  const {
    updateAuthenTypeStep1,
    updateAuthenTypeStep2,
    getAccountInfo,
    accountInfo
  } = useAppContext();

  const [authenCode, setAuthenCode] = useState(null);
  const [verifyCode, setVerifyCode] = useState(null);

  useEffect(() => {
    if (!isDisable) {
      fetchAuthenTypeStep1({ authenType: type });
    } else if (type === 'email') {
      fetchAuthenTypeStep1({ authenType: 'none' });
    }
  }, []);

  const fetchAuthenTypeStep1 = async ({ authenType }) => {
    showLoading();
    const res = await updateAuthenTypeStep1({ type: authenType });

    if (res.status) {
      setAuthenCode(res.data);
    }
  };

  const onChangeCode = (value) => {
    setVerifyCode(value);
  };

  const onEnableGoogleAuthen = () => {
    onUpdateAuthenTypeStep({ type: 'google' });
  };

  const onDisable = () => {
    onUpdateAuthenTypeStep({ type: 'none' });
  };

  const onEnableEmailAuthen = () => {
    onUpdateAuthenTypeStep({ type: 'email' });
  };

  const onCopy = (code) => {
    if (!isEmpty(code)) {
      Clipboard.setString(code);
      showSuccessToast(t('copy_success'));
    }
  }

  const onUpdateAuthenTypeStep = async ({ type }) => {
    let errorMessage = null;
    if (isEmpty(verifyCode)) {
      errorMessage = t('verify_code_invalid');
    }

    if (errorMessage) {
      showErrorToast(errorMessage);
      return;
    }

    showLoading();
    const params = { type: type, code: verifyCode };
    const res = await updateAuthenTypeStep2(params);
    if (res.status) {
      getAccountInfo();
      NavigationService.goBack();
    }
  };

  const renderEnableContainer = () => {
    const user = `${accountInfo?.name}`
    const appName = 'AcWallet.io'
    const secretKey = `${authenCode}`
    const url = `otpauth://totp/${user}?secret=${secretKey}&issuer=${appName}`

    if (type === 'google') {
      return (
        <>
          <StepGuideView />
          {!isEmpty(authenCode) && (
            <View style={styles.qrCodeContainer}>
              <View style={styles.qrCodeContainerView}>
                <QRCode size={actuatedNormalize(300)} value={url} />
              </View>
            </View>
          )}
          {!isEmpty(authenCode) && (
            <View style={[styles.row, { marginTop: actuatedNormalize(20) }]}>
              <Text style={[styles.content, { marginHorizontal: 0 }]}>
                {t('authentication_secret_code')}
              </Text>
              <TouchableX onPress={() => { onCopy(authenCode) }}>
                <Text
                  style={[
                    styles.content,
                    {
                      marginHorizontal: 0,
                      marginLeft: 10,
                      fontWeight: 'bold',
                      color: Colors.BLUE,
                    },
                  ]}>
                  {authenCode}
                </Text>
              </TouchableX>
            </View>
          )}
          {!isEmpty(authenCode) && (
            <View style={styles.inputContainer}>
              <View style={styles.row}>
                <Entypo name="mobile" color="white" size={20} />
                <Text
                  style={[
                    styles.content,
                    { marginHorizontal: 0, marginLeft: 10 },
                  ]}>
                  {t('enter_2_step_verification')}
                </Text>
              </View>
              <View style={styles.rounerInputContainer}>
                <TextInput
                  style={styles.rounerInput}
                  placeholder={t('verification_code')}
                  onChangeText={onChangeCode}
                  keyboardType='decimal-pad'
                  placeholderTextColor={Colors.GREY}
                  clearButtonMode="while-editing"
                />
              </View>

              <BlueButton
                containerStyle={styles.enableBtn}
                title={t('enable').toUpperCase()}
                onPress={onEnableGoogleAuthen}
              />
            </View>
          )}
        </>
      );
    } else {
      return (
        <>
          <View style={styles.inputContainer}>
            <View style={styles.row}>
              <Entypo name="mobile" color="white" size={20} />
              <Text
                style={[
                  styles.content,
                  { marginHorizontal: 0, marginLeft: 10 },
                ]}>
                {t('verify_code_in_your_email_msg')}
              </Text>
            </View>
            <View style={styles.rounerInputContainer}>
              <TextInput
                style={styles.rounerInput}
                placeholder={t('verification_code')}
                keyboardType="decimal-pad"
                onChangeText={onChangeCode}
                placeholderTextColor={Colors.GREY}
                clearButtonMode="while-editing"
              />
            </View>

            <BlueButton
              containerStyle={styles.enableBtn}
              title={t('enable').toUpperCase()}
              onPress={onEnableEmailAuthen}
            />
          </View>
        </>
      );
    }
  };

  const renderDisableContainer = () => {
    if (type === 'google') {
      return (
        <>
          <View style={styles.inputContainer}>
            <View style={styles.row}>
              <Entypo name="mobile" color="white" size={20} />
              <Text
                style={[
                  styles.content,
                  { marginHorizontal: 0, marginLeft: 10 },
                ]}>
                {t('verify_code_in_your_phone_msg')}
              </Text>
            </View>
            <View style={styles.rounerInputContainer}>
              <TextInput
                style={styles.rounerInput}
                placeholder={t('verification_code')}
                onChangeText={onChangeCode}
                keyboardType='decimal-pad'
                placeholderTextColor={Colors.GREY}
                clearButtonMode="while-editing"
              />
            </View>

            <BlueButton
              containerStyle={styles.enableBtn}
              title={t('disable_google_authen').toUpperCase()}
              onPress={onDisable}
            />
          </View>
        </>
      );
    } else {
      return (
        <>
          <View style={styles.inputContainer}>
            <View style={styles.row}>
              <Entypo name="mobile" color="white" size={20} />
              <Text
                style={[
                  styles.content,
                  { marginHorizontal: 0, marginLeft: 10 },
                ]}>
                {t('verify_code_in_your_email_msg')}
              </Text>
            </View>
            <View style={styles.rounerInputContainer}>
              <TextInput
                style={styles.rounerInput}
                placeholder={t('verification_code')}
                onChangeText={onChangeCode}
                keyboardType='decimal-pad'
                placeholderTextColor={Colors.GREY}
                clearButtonMode="while-editing"
              />
            </View>

            <BlueButton
              containerStyle={styles.enableBtn}
              title={t('disable_email_authentication').toUpperCase()}
              onPress={onDisable}
            />
          </View>
        </>
      );
    }
  };

  const getTitle = () => {
    if (type !== 'email') {
      if (isDisable) {
        return t('disable_google_authen');
      } else {
        return t('google_auth_title');
      }
    } else {
      if (isDisable) {
        return t('disable_email_authentication');
      } else {
        return t('active_email');
      }
    }
  };

  return (
    <View style={styles.container}>
      <NavTitleBackHeader
        containerStyle={styles.navHeader}
        title={getTitle()}
      />
      <KeyboardAwareScrollView style={styles.scrollView}>
        {isDisable ? renderDisableContainer() : renderEnableContainer()}
      </KeyboardAwareScrollView>
    </View>
  );
};
