import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import PINCode from '@haskkor/react-native-pincode';
import { isEmpty } from 'lodash';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import { useTranslation, useAppContext } from '@/hooks';
import {
  Routes,
  STORE_PIN_CODE,
  showSuccessToast,
  showLoading,
  ENABLE_TOUCH_ID,
  BG_SPLASH
} from '@/common';
import { NavigationService } from '@/services';
import { saveValue, getValue } from '@/utils';
import { ConfirmPopup, TouchableX } from '@/components';

import styles from './styles';

export const PincodeScreen = ({ route }) => {
  const isUpdate = route.params?.isUpdate;
  const authenTypeParams = route.params?.authenType;
  const needGoback = route.params?.needGoback;

  const { t } = useTranslation();
  const {
    accountInfo,
    confirmLogin,
    getAccountInfo,
    resendVerifyEmail,
  } = useAppContext();

  const [status, setStatus] = useState('choose');
  const [stepUpdate, setStepUpdate] = useState(0);
  const [storedPin, setStoredPin] = useState(null);
  const [authenType, setAuthenType] = useState('none');
  const [isShowConfirmPopup, setIsShowConfirmPopup] = useState(false);
  const [enableTouchId, setEnableTouchId] = useState(false);
  const [isAvailableFaceID, setIsAvailableFaceID] = useState(false);

  // useEffect(() => {
  //   setAuthenType(accountInfo?.authen_type);
  // }, [accountInfo]);

  useEffect(() => {
    setStepUpdate(1);
  }, [isUpdate]);

  useEffect(() => {
    getAccountInfo();
    onCheckEnableTouchId();
    onCheckBiometricsAvailable();
    checkStatus();
    if (!isEmpty(authenTypeParams)) {
      setAuthenType(authenTypeParams);
    }

    return () => {
      if (Platform.OS === 'android') {
        FingerprintScanner.release();
      }
    };
  }, []);

  const onCheckBiometricsAvailable = async () => {
    try {
      const resBio = await FingerprintScanner.isSensorAvailable();
      let isAvailable = false;

      if (Platform.OS === 'ios') {
        isAvailable = true;
      } else if (Platform.OS === 'android') {
        if (resBio === 'Biometrics') {
          isAvailable = true;
        }
      }
      setIsAvailableFaceID(isAvailable);
    } catch (err) {
      // console.log('biometric error: ', err);
    }
  };

  const onCheckEnableTouchId = async () => {
    const result = await getValue(ENABLE_TOUCH_ID);

    // console.log('onCheckEnableTouchId: ', result);

    setEnableTouchId(result ? JSON.parse(result) : false);
  };

  const checkStatus = async () => {
    const res = await getValue(STORE_PIN_CODE);

    // console.log('res ==== :', res);

    setStatus(res ? 'enter' : 'choose');

    setStoredPin(res);
  };

  const onFinishProcess = () => {
    // console.log('onFinishProcess');
    if (needGoback) {
      NavigationService.goBack();
    } else if (!isUpdate) {
      NavigationService.replace(Routes.BOTTOM_TABS);

      // if (authenType === 'none') {
      //   NavigationService.replace(Routes.BOTTOM_TABS);
      // } else if (authenType === 'google') {
      //   setIsShowConfirmPopup(true);
      // } else {
      //   requestAuthenCodeViaEmail();
      // }
    } else {
      if (stepUpdate === 1) {
        setStatus('choose');
        setStepUpdate(2);
      } else {
        showSuccessToast(t('change_pincode_success'));
        NavigationService.goBack();
      }
    }
  };

  const requestAuthenCodeViaEmail = async () => {
    showLoading();
    const res = await resendVerifyEmail({
      type: 'login',
      email: accountInfo?.email,
    });

    if (res.status) {
      setIsShowConfirmPopup(true);
    }
  };

  const storedPinCode = async (value) => {
    const res = await saveValue(STORE_PIN_CODE, value);
    // console.log('Store pin success: ', res);
  };

  const onConfirmCode = async (authenCode) => {
    if (!isEmpty(authenCode)) {
      setIsShowConfirmPopup(false);

      const params = { email: accountInfo?.email, token: authenCode };
      showLoading();

      const res = await confirmLogin(params);

      if (res.status) {
        NavigationService.replace(Routes.BOTTOM_TABS);
      } else {
        setIsShowConfirmPopup(true);
      }
    }
  };

  const onSignInWighFaceId = () => {
    if (Platform.OS === 'ios') {
      FingerprintScanner.authenticate({
        description: t('message_scan_face_id'),
      })
        .then(() => {
          //On login biometrics
          onLoginBiometrics();
        })
        .catch((error) => {
          showErrorToast(error.message);
        });
    } else {
      if (requiresLegacyAuthentication()) {
        authLegacy();
      } else {
        authCurrent();
      }
    }
  };

  const requiresLegacyAuthentication = () => {
    return Platform.Version < 23;
  };

  const authCurrent = () => {
    FingerprintScanner.authenticate({
      title: t('title_login_biometrics'),
    }).then(() => {
      //On login biometrics
      onLoginBiometrics();
    });
  };

  const authLegacy = () => {
    FingerprintScanner.authenticate({
      onAttempt: handleAuthenticationAttemptedLegacy,
    })
      .then(() => {
        //On login biometrics
        onLoginBiometrics();
      })
      .catch((error) => {
        showErrorToast(error.message);
      });
  };

  const onLoginBiometrics = () => {
    NavigationService.replace(Routes.BOTTOM_TABS);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={BG_SPLASH}
        resizeMode="cover"
        style={[styles.container, { backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }]}>
        <PINCode
          status={status}
          storedPin={storedPin}
          storePin={storedPinCode}
          passwordLength={4}
          buttonDeleteText={t('delete')}
          titleChoose={t('pincode_choose_title')}
          subtitleChoose={t('pincode_subtitle_choose')}
          subtitleError={t('pincode_subtitle_error')}
          titleAttemptFailed={t('pincode_incorrect')}
          titleConfirmFailed={t('pincode_confirm_failed')}
          titleConfirm={t('pincode_confirm_title')}
          titleEnter={t('pincode_enter_title')}
          stylePinCodeButtonNumberPressed={'white'}
          stylePinCodeColorTitle={'white'}
          numbersButtonOverlayColor={'#CCCCCC'}
          finishProcess={onFinishProcess}
          touchIDDisabled={true}
          pinCodeKeychainName={STORE_PIN_CODE}
          disableLockScreen={true}
          stylePinCodeButtonNumber={'white'}
          stylePinCodeHiddenPasswordSizeFull={12}
          stylePinCodeHiddenPasswordSizeEmpty={8}
          colorPasswordEmpty={'gray'}
          colorPassword={'white'}
          colorCircleButtons={'gray'}

        />
        {enableTouchId && !isUpdate && isAvailableFaceID && (
          <TouchableX style={styles.faceIdBtn} onPress={onSignInWighFaceId}>
            <Text style={styles.faceIdText}>{t('sign_in_with_faceid')}</Text>
          </TouchableX>
        )}

        <ConfirmPopup
          isVisible={isShowConfirmPopup}
          title={t('confirm_login')}
          subTitle={
            authenType === 'google'
              ? t('enter_google_authen_code')
              : t('enter_email_authen_code')
          }
          onConfirmCode={onConfirmCode}
        />
      </ImageBackground>
    </View>
  );
};
