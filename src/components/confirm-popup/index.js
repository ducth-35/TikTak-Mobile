import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import Modal from 'react-native-modal';

import { useTranslation } from '@/hooks';
import { Colors } from '@/themes';
import { BlueButton } from '../buttons';

import styles from './styles';

export const ConfirmPopup = ({ isVisible, title, subTitle, onConfirmCode }) => {
  const { t } = useTranslation();

  const [authenCode, setAuthenCode] = useState(null);

  const onChangeCode = (value) => {
    setAuthenCode(value);
  };

  const onConfirm = () => {
    onConfirmCode && onConfirmCode(authenCode);
  };

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.row}>
          <Text
            style={[styles.content, { marginHorizontal: 0, marginLeft: 10 }]}>
            {subTitle}
          </Text>
        </View>
        <View style={[styles.rounerInputContainer]}>
            <View style={styles.leftContainer}>
              <TextInput
                placeholder= 'Authenciation Code'
                style={styles.input}
                clearButtonMode="while-editing"
                placeholderTextColor={Colors.GREY}
                onChangeText={onChangeCode}
              />
            </View>
        </View>

        <BlueButton
          containerStyle={styles.confirmBtn}
          title={t('confirm').toUpperCase()}
          onPress={onConfirm}
        />
      </View>
    </Modal>
  );
};
