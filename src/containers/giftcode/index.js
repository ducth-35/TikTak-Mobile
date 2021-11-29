import React from 'react';
import { View, Text, Image } from 'react-native';

import { NavTitleHeader, TouchableX } from '@/components';
import { useTranslation } from '@/hooks';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';
import { NavigationService } from '@/services';
import {
  ICO_LIST_GIFCODE,
  ICO_CREAT_GIFCODE,
  ICO_GIFTCODE,
  Routes,
} from '@/common';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { styles } from './styles';

export const GifcodeManagerScreen = () => {

  const { t } = useTranslation();
  const onListGiftCode = () => {
    NavigationService.navigate(Routes.LIST_GIFTCODE)
  }
  const onCreateGiftCode = () => {
    NavigationService.navigate(Routes.CREATE_GIFTCODE_STEP_1);
  };

  const onLoadGiftCode = () => {
    NavigationService.navigate(Routes.RECEIVE_GIFTCODE);
  }
  return (
    <View style={styles.container}>
      <NavTitleHeader
        title={t('giftcode')}
        containerStyle={styles.navHeader}
        rightContainer={
          <TouchableX style={styles.navRightButton} onPress={onListGiftCode}>
            <FontAwesome5 name="list-ul" color="white" size={25} />
          </TouchableX>
        }
      />
      <View style={{ flexDirection: 'column', paddingHorizontal: actuatedNormalize(10) }}>
        <TouchableX style={styles.btnSelect} onPress={onCreateGiftCode}>
          <View style={{ justifyContent: 'center', paddingHorizontal: actuatedNormalize(20) }}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.image}
                source={ICO_CREAT_GIFCODE}
                resizeMode='contain' />
            </View>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontFamily: FontFamily.TitilliumWeb.SemiBold, fontSize: 16, color: Colors.WHITE }}> {t('creategiftcode')} </Text>
          </View>
        </TouchableX>

        <TouchableX style={styles.btnSelect} onPress={onLoadGiftCode}>
          <View style={{ justifyContent: 'center', paddingHorizontal: actuatedNormalize(20) }}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.image}
                source={ICO_GIFTCODE}
                resizeMode='contain' />
            </View>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontFamily: FontFamily.TitilliumWeb.SemiBold, fontSize: 16, color: Colors.WHITE }}> {t('loadgiftcode')} </Text>
          </View>
        </TouchableX>

        <TouchableX style={styles.btnSelect} onPress={onListGiftCode}>
          <View style={{ justifyContent: 'center', paddingHorizontal: actuatedNormalize(20) }}>
            <View style={styles.avatarContainer}>
            <FontAwesome5 name="list-ol" color="white" size={25} />
            </View>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontFamily: FontFamily.TitilliumWeb.SemiBold, fontSize: 16, color: Colors.WHITE }}> {t('list_giftcode')} </Text>
          </View>
        </TouchableX>
      </View>
    </View>
  );
};
