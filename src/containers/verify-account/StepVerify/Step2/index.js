import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { VerifyAccount, TouchableX } from '@/components';
import { useTranslation, useAppContext } from '@/hooks';
import { NavigationService } from '@/services';
import { Routes, ICO_PASSPORT, ICO_UPLOAD_VERIFY, showErrorToast, showLoading } from '@/common';
import { actuatedNormalize } from '@/themes';
import * as ImagePicker from 'react-native-image-picker';

export const Step2Screen = ({ route }) => {
  const { t } = useTranslation();
  const { sendImage } = useAppContext();
  const [imageSource, setImageSource] = useState(null);
  const [idBack, setIdBack] = useState();

  const step1 = route.params?.step1;

  const onUpload = () => {
    let options = {
      title: 'You can choose one image',
      includeBase64: true,
      maxWidth: 250,
      maxHeight: 250,
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
      const id_back = 'data:image/jpeg;base64,' + response.base64
      setIdBack(id_back)
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
      image: idBack
    }
    const res = await sendImage(params)
    if (res && res.isSuccess) {
      NavigationService.navigate(Routes.VERIFY_STEP3, { step1, step2: res.data });
    }
  }

  return (
    <View style={styles.container}>
      <VerifyAccount
        title={t('account_verification')}
        text1={t('upload_a_driver_license')}
        text2={t('choose_driver_license')}
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
            <TouchableX onPress={onUpload}>
              <Image source={{ uri: imageSource }} style={{ width: actuatedNormalize(150), height: actuatedNormalize(150) }} resizeMode="contain" />
            </TouchableX>
          )
        } />
    </View>
  )
}