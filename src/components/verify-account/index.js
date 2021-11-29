import React from 'react';
import { View, Text, } from 'react-native';
import { BlueButton, NavTitleBackHeader } from '@/components';
import { styles } from './styles';
import { useTranslation } from '@/hooks';
import { Colors, actuatedNormalize } from '@/themes';

export const VerifyAccount = ({ title, text1, text2, onPress, image, image2, isActive, disabled}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <NavTitleBackHeader
        title={title}
        containerStyle={styles.navHeader} />
      <View style={[styles.containers, { height: actuatedNormalize(200) }]}>
        <Text style={styles.text1}>{text1}</Text>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {image}
        </View>
      </View>
      <View style={styles.containers}>
        <Text style={[styles.text1, { textAlign: 'center', color: Colors.WHITE }]}>{text2}</Text>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {image2}
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <BlueButton
          isActive={isActive}
          onPress={onPress}
          disabled={disabled}
          title={t('continue')}
          style={styles.NextButton} />
      </View>
    </View>
  )
}