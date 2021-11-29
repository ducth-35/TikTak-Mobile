import { Routes, showErrorToast, showLoading, showSuccessToast } from '@/common';
import { BlueButton, NavTitleBackHeader, TouchableX, RNInput } from '@/components';
import { useTranslation, useAppContext } from '@/hooks';
import { NavigationService } from '@/services';
import { Colors, FontFamily } from '@/themes';
import { validateName } from '@/utils';
import Clipboard from '@react-native-community/clipboard';
import { isEmpty, isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './styles';

export const GoogleSheet = ({ route }) => {
  const { t } = useTranslation();
  const { getSheet, userWallets, getUserWallets } = useAppContext();

  const [sheetId, setSheetID] = useState('');
  const [sheetName, setSheetName] = useState('');
  const [amountVNDT, setAmountVNDT] = useState(0);
  const [amountTRX, setAmountTRX] = useState(0);

  const type = route?.params.type;

  useEffect(() => {
    getUserWallets();
    getBalance();
  }, []);

  const getBalance = () => {
    if (userWallets && isArray(userWallets)) {
      const vndtWallet = userWallets.find(
        (item) => item.type === 'VNDT');
      const trxWallet = userWallets.find(
        (item) => item.type === 'TRX');
      if (userWallets) {
        setAmountVNDT(vndtWallet.amount);
        setAmountTRX(trxWallet.amount);
      }
    }
    return 0;
  }

  const onCopy = (email) => {
    if (!isEmpty(email)) {
      Clipboard.setString(email)
      showSuccessToast(t('copy_success'));
    }
  }

  const onIntruct = () => {
    NavigationService.navigate(Routes.INTRUCT, { type: type });
  }

  const onConfirm = async () => {
    const params = {
      sheetId: sheetId,
      sheetName: sheetName
    }

    let errorMessage = null;
    if (!validateName(sheetId?.trim())) {
      errorMessage = 'Vui lòng nhập Sheet ID';
    } else if (!validateName(sheetName?.trim())) {
      errorMessage = 'Vui lòng nhập Sheet Name';
    }

    if (errorMessage) {
      showErrorToast(errorMessage);
      return;
    } else {
      showLoading();
    }
    const res = await getSheet(params)
    if (res && res.isSuccess) {
      NavigationService.navigate(Routes.LISTTRANSFER,
        {
          listTransfer: res.data?.list,
          total: res.data?.total,
          totalBalance: res.data?.totalBalance,
          error: res.data?.error,
          totalvndt: amountVNDT,
          totaltrx: amountTRX
        })
    }
  }

  return (
    <View style={styles.container}>
      <NavTitleBackHeader
        title={t('getinfor_googlesheet')}
        containerStyle={styles.navHead} />
      <View style={{ flexDirection: 'column', paddingHorizontal: 10, paddingVertical: 10 }}>
        <Text style={styles.tittle}>{t('enter_sheetname_sheetid')}</Text>
        <TouchableX onPress={() => onCopy('acwallet@appspot.gserviceaccount.com')}>
          <Text style={[styles.tittle, { color: Colors.BLUE }]}>{'acwallet@appspot.gserviceaccount.com'}</Text>
        </TouchableX>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <RNInput
          textname={'Sheet ID'}
          value={sheetId}
          placeholder={'Enter sheet ID'}
          placeholderTextColor={Colors.TEXT_INPUT}
          onChangeText={(value) => setSheetID(value)} />

        <RNInput
          containerStyle={styles.sheetNameInput}
          textname={'Sheet Name'}
          value={sheetName}
          placeholder={'Enter sheet name'}
          placeholderTextColor={Colors.TEXT_INPUT}
          onChangeText={(value) => setSheetName(value)}
        />

        <TouchableX onPress={onIntruct}>
          <Text style={[styles.tittle, {
            fontFamily: FontFamily.TitilliumWeb.SemiBold,
            textDecorationLine: 'underline',
            textAlign: 'center'
          }]}> {t('intruct_export')} </Text>
        </TouchableX>
        
        <BlueButton
          name={'file-export'}
          title={t('export_infor')}
          containerStyle={[styles.continueButton, { marginHorizontal: 0 }]}
          onPress={onConfirm}
        />
      </View>

    </View>
  );
}
