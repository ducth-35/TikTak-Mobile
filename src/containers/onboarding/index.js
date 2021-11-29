import React from 'react';
import { View, Text, Image } from 'react-native';

import DeviceInfo from 'react-native-device-info';
import Swiper from 'react-native-swiper';

import {
  ICO_ONBOARDING_SECURITY,
  ICO_ONBOARDING_ADDRESS_BOOK,
  ICO_ONBOARDING_MUTI_ACCOUNTS,
  ICO_ONBOARDING_RECEIVE,
  Routes,
} from '@/common';
import { NavigationService } from '@/services';
import { BlueButton } from '@/components';
import { useTranslation } from '@/hooks';

import styles from './styles';

export const OnboardingScreen = () => {
  const { t } = useTranslation();

  const listIntro = [
    {
      icon: null,
      title: t('onbroading.onboarding_welcome'),
      subTitle: t('onboarging_sub_1'),
    },
    {
      icon: ICO_ONBOARDING_SECURITY,
      title: t('onboarding_sercurity'),
      subTitle: t('onboarging_sub_2'),
    },
    {
      icon: ICO_ONBOARDING_ADDRESS_BOOK,
      title: t('onboarding_address_book'),
      subTitle: t('onboarging_sub_3'),
    },
    {
      icon: ICO_ONBOARDING_MUTI_ACCOUNTS,
      title: t('onboarding_multiple_accounts'),
      subTitle: t('onboarging_sub_4'),
    },
    {
      icon: ICO_ONBOARDING_RECEIVE,
      title: t('onboarding_receive'),
      subTitle: t('onboarging_sub_5'),
    },
  ];

  const renderIntroItem = (item, index) => {
    const { icon, title, subTitle } = item;
    return (
      <View key={`${title}-${index}`} style={styles.itemContainer}>
        {icon && (
          <Image style={styles.icon} source={icon} resizeMode="contain" />
        )}
        <Text style={index === 0 ? styles.bigTitle : styles.title}>
          {title}
        </Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    );
  };

  const onStarted = () => {
    NavigationService.navigate(Routes.AUTH_STACK);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Swiper
          style={styles.wrapper}
          autoplay
          activeDotColor="#fff"
          dotColor="rgba(255,255,255, 0.15)">
          {listIntro.map((item, index) => renderIntroItem(item, index))}
        </Swiper>
      </View>
      <View style={styles.bottomContainer}>
        <BlueButton
          containerStyle={styles.startBtn}
          title={t('get_started')}
          onPress={onStarted}
        />
        <Text style={styles.versionText}>v{DeviceInfo.getVersion()}</Text>
      </View>
    </View>
  );
};
