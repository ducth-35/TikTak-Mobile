import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './styles';
import { BlueButton, NavTitleBackHeader, TouchableX } from '@/components';
import { Colors, FontFamily } from '@/themes';
import { useTranslation } from '@/hooks';
import { NavigationService } from '@/services';
import { Routes } from '@/common';
import { Upload } from '@/utils/upload';

export const ExcelFile = ({ route }) => {
  const { t } = useTranslation();

  const type = route?.params.type;

  const onIntruct = () => {
    NavigationService.navigate(Routes.INTRUCT, { type: type });
  }
  return (
    <View style={styles.container}>
      <NavTitleBackHeader
        title={t('download_information_from_excel_file')}
        containerStyle={styles.navHead} />
      <View style={{ flexDirection: 'column', paddingHorizontal: 10, paddingVertical: 10 }}>
        <Text style={styles.title}>{t('step1_import_file')}</Text>
      </View>
      <TouchableX style={styles.inputContainer} onPress={Upload}>
        <View style={styles.leftContainer}>
          <TextInput
            style={styles.input}
            placeholder={t('select_file_excel')}
            placeholderTextColor={Colors.DARK_GREY}
            editable={false}
          />
        </View>
        <View style={styles.rightContainer}>
          <Text style={[styles.title, { color: Colors.WHITE }]}>Browse</Text>
        </View>
      </TouchableX>
      <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
        <TouchableX onPress={onIntruct}>
          <Text style={[styles.title, {
            fontFamily: FontFamily.TitilliumWeb.SemiBold,
            textDecorationLine: 'underline',
            textAlign: 'center'
          }]}>{t('intructs_import_file')}</Text>
        </TouchableX>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <BlueButton
          name={'file-export'}
          title={t('export_infor')}
          containerStyle={[styles.continueButton, { marginHorizontal: 0 }]}
        />
      </View>
    </View>
  );
}