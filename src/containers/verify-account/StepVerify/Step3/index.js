import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { VerifyAccount, TouchableX } from '@/components';
import { useTranslation, useAppContext } from '@/hooks';
import { NavigationService } from '@/services';
import { Routes, ICO_PASSPORT_PORTRAIT, ICO_UPLOAD_VERIFY, showErrorToast, showLoading} from '@/common';
import { Colors, actuatedNormalize } from '@/themes';
import * as ImagePicker from 'react-native-image-picker';

export const Step3Screen = ({ route }) => {
  const { t } = useTranslation();
  const { sendImage } = useAppContext();
  const [imageSource, setImageSource] = useState(null);
  const [avatar, setAvatar] = useState();

  const step1 = route.params?.step1;
  const step2 = route.params?.step2;

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
      image: avatar
    }
    const res = await sendImage(params);
    if (res && res.isSuccess) {
      NavigationService.navigate(Routes.VERIFY_STEP4, { step1, step2, step3: res.data });
    }
  }

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
      const avatar = 'data:image/jpeg;base64,' + response.base64
      setAvatar(avatar)
    });
  }
  return (
    <View style={styles.container}>
      <VerifyAccount
        title={t('account_verification')}
        text1={t('Upload_a_portrait_photo_with_your_ID_card_or_passport')}
        text2={t('Upload_your_portrait_with_your_ID_card_or_passport_in_hand')}
        onPress={onNextStep}
        disabled={imageSource === null ? true : false} 
        isActive={imageSource === null ? false : true}
        image={<Image source={ICO_PASSPORT_PORTRAIT} style={{ width: actuatedNormalize(230), height: actuatedNormalize(150) }} resizeMode="contain" />}
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