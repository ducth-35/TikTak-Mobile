import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import Modal from 'react-native-modal';

import { useTranslation } from '@/hooks';
import { RadioGroup } from '@/components';
import { LOCALES } from '@/common';
import { Colors } from '@/themes';

import styles from './styles';

export const ChangeLanguagePopup = ({ onClose }) => {
  const { changeLocale, locale } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(
    locale === LOCALES.ENGLISH.name
      ? LOCALES.ENGLISH.id
      : LOCALES.VIETNAMESE.id,
  );

  const initialLanguages = [
    { label: LOCALES.ENGLISH.label, id: LOCALES.ENGLISH.id },
    { label: LOCALES.VIETNAMESE.label, id: LOCALES.VIETNAMESE.id },
  ];

  useEffect(() => {
    if (locale === LOCALES.ENGLISH.name) {
      setCurrentLanguage(LOCALES.ENGLISH.id);
    } else {
      setCurrentLanguage(LOCALES.VIETNAMESE.id);
    }
  }, [locale]);

  return (
    <Modal
      isVisible={true}
      animationIn="zoomIn"
      useNativeDriver={true}
      avoidKeyboard={true}
      backdropOpacity={0.8}
      onRequestClose={onClose}
      onBackdropPress={onClose}>
      <View style={styles.container}>
        <RadioGroup
          options={initialLanguages}
          onChange={(value) => {
            changeLocale(
              value.id === LOCALES.ENGLISH.id
                ? LOCALES.ENGLISH
                : LOCALES.VIETNAMESE,
            );
            onClose();
          }}
          activeButtonId={currentLanguage}
          circleStyle={{ fillColor: Colors.BLUE, borderColor: Colors.BLUE }}
        />
      </View>
    </Modal>
  );
};
