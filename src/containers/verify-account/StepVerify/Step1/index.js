import React, { useState } from 'react';
import { View, Image, Alert } from 'react-native';
import { styles } from './styles';
import { VerifyAccount, TouchableX } from '@/components';
import { useTranslation, useAppContext } from '@/hooks';
import { NavigationService } from '@/services';
import { Routes, ICO_PASSPORT, ICO_UPLOAD_VERIFY, showErrorToast, showLoading } from '@/common';
import { actuatedNormalize } from '@/themes';
import * as ImagePicker from 'react-native-image-picker';

export const Step1Screen = () => {
  const [imageSource, setImageSource] = useState(null);
  const [idFront, setIdFront] = useState();
  const { t } = useTranslation();
  const { sendImage } = useAppContext();

  const onUpload = () => {
    let options = {
      title: 'You can choose one image',
      includeBase64: true,
      maxWidth: 300,
      maxHeight: 300,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
        setImageSource(source.uri);
      }
      const id_front = 'data:image/jpeg;base64,' + response.base64
      setIdFront(id_front)
    });
  }
  const onNextStep = () => {

    let errorMessage = null;
    if (errorMessage) {
      showErrorToast(errorMessage);
      return;
    } else {
      OnNextStep();
    }
    showLoading();
  }
  const OnNextStep = async () => {
    const params = {
      image: idFront
    }
    const res = await sendImage(params);

    if (res && res.isSuccess) {
      NavigationService.navigate(Routes.VERIFY_STEP2, { step1: res.data });
    }
  }

  return (
    <View style={styles.container}>
      <VerifyAccount
        title={t('account_verification')}
        text1={t('upload_passport')}
        text2={t('choose_passport')}
        onPress={onNextStep}
        disabled={imageSource === null ? true : false} 
        isActive={imageSource === null ? false : true}
        image={<Image source={ICO_PASSPORT} style={{ width: actuatedNormalize(230), height: actuatedNormalize(250) }} resizeMode="contain" />}
        image2={
          imageSource === null ? (
            <TouchableX onPress={onUpload}>
              <Image source={ICO_UPLOAD_VERIFY} style={{ width: actuatedNormalize(230), height: actuatedNormalize(250) }} resizeMode="contain" />
            </TouchableX>
          ) : (
            <TouchableX
              onPress={onUpload}>
              <Image source={{ uri: imageSource }} style={{ width: actuatedNormalize(150), height: actuatedNormalize(150) }} resizeMode="contain" />
            </TouchableX>
          )
        } />
    </View>
  )
}