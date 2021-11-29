import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { NavTitleBackHeader, TouchableX, BlueButton } from '@/components';
import { useAppContext, useTranslation } from '@/hooks';
import { ICO_ARROW_DOWN } from '@/common';
import { Colors, actuatedNormalize } from '@/themes';

import styles from './styles';

export const TransferForexScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <NavTitleBackHeader
        containerStyle={styles.navHeader}
        title={t('transfer_to_forex')}
      />
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentScrollContainer}>
        <Text style={styles.title}>{t('transfer_amount_title')}</Text>
        <View style={styles.inputContainer}>
          <View style={styles.leftContainer}>
            <TextInput
              style={styles.input}
              placeholder={t('enter_amount')}
              placeholderTextColor={Colors.GREY}
              keyboardType="decimal-pad"
            />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.rightButtonTitle}>VNDT</Text>
          </View>
        </View>
        <View style={styles.transactionContainer}>
          <Text style={styles.transactionText}>{t('transaction_fee')}: </Text>
          <Text style={[styles.transactionText, { color: Colors.ORANGE }]}>
            0 VNDT
          </Text>
        </View>
        <Text style={styles.title}>{t('choose_forex')}</Text>
        <View style={styles.inputContainer}>
          <View style={styles.leftContainer}>
            <TextInput
              style={styles.input}
              placeholder={t('tap_to_select')}
              placeholderTextColor={Colors.GREY}
              editable={false}
            />
          </View>
          <View
            style={[
              styles.rightContainer,
              { backgroundColor: 'transparent', width: actuatedNormalize(40) },
            ]}>
            <Image
              style={styles.arrowIcon}
              source={ICO_ARROW_DOWN}
              resizeMode="contain"
            />
          </View>
        </View>
        <BlueButton
          title={t('transfer_now')}
          containerStyle={styles.transferButton}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};
