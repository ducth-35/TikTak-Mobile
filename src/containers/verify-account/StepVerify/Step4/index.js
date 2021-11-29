import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { NavTitleBackHeader, BlueButton } from '@/components';
import { useTranslation, useAppContext } from '@/hooks';
import { NavigationService } from '@/services';
import { Routes, ICO_POPUP_MAILBOX, showErrorToast, showLoading } from '@/common';
import Modal from 'react-native-modal';

export const Step4Screen = ({ route }) => {
  const { t } = useTranslation();
  const { sendVerifyAcount } = useAppContext();
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const step1 = route.params?.step1;
  const step2 = route.params?.step2;
  const step3 = route.params?.step3;


  console.log({ step1, step2, step3 })

  const onSenRequets = () => {

  

    let errorMessage = null;
    if (errorMessage) {
      showErrorToast(errorMessage);
      return;
    } else {
      OnSenRequets();
    }
    showLoading();
  }

  const OnSenRequets = async () => {
    const params = {
      id_front: step1,
      id_back: step2,
      avatar: step3
    }
    const res = await sendVerifyAcount(params);
    if (res && res.isSuccess) {
      setShowModalSuccess(true);
    }

  }

  const closeModal = () => {
    setShowModalSuccess(false);
    NavigationService.navigate(Routes.HOME);
  };
  const renderModalVerifyAccountSuccess = () => {
    return (
      <Modal isVisible={showModalSuccess}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              style={styles.mailbox}
              source={ICO_POPUP_MAILBOX}
              resizeMode="contain"
            />
            <Text style={styles.popupTitle}>{t('send_image')}</Text>
            <Text style={styles.popupMessage}>{t('waiting_verify')}</Text>
            <BlueButton
              containerStyle={styles.okBtn}
              title={t('ok')}
              onPress={closeModal}
            />
          </View>
        </View>
      </Modal>
    );
  }
  return (
    <View style={styles.container}>
      <NavTitleBackHeader
        title={t('account_verification')}
        containerStyle={styles.navHeader} />
      <View style={styles.containers}>
        <Text style={styles.text1}>{t('Confirm_document_submission')}</Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
          <Text style={[styles.textTitle, { textAlign: 'center' }]}>{t('text3')}</Text>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <BlueButton
          onPress={onSenRequets}
          title={t('send_request')}
          style={styles.NextButton} />
      </View>
      {renderModalVerifyAccountSuccess()}
    </View>
  );
};