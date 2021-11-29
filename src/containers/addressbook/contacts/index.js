import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, FlatList } from 'react-native';

import { isEmpty, isArray } from 'lodash';

import { ICO_CIRCLE_PLUS, BTN_RETANGLE_DOT, Routes } from '@/common';
import { useTranslation, useAppContext } from '@/hooks';
import { NavigationService } from '@/services';
import { TouchableX } from '@/components';
import { Colors } from '@/themes';

import { WalletAddressItem } from '../address-item';
import styles from './styles';

export const Contacts = ({ selectedCoin }) => {
  const { t } = useTranslation();
  const { listAddress } = useAppContext();

  const [listContacts, setListContacts] = useState([]);

  useEffect(() => {
    if (selectedCoin) {
      if (!isEmpty(listAddress) && isArray(listAddress)) {
        const filterContacts = listAddress.filter(
          (item) => item.coinId === selectedCoin,
        );

        setListContacts(filterContacts);
      } else {
        setListContacts([]);
      }
    }
  }, [selectedCoin, listAddress]);

  const onAddContact = () => {
    NavigationService.navigate(Routes.ADD_CONTACT, { coin: selectedCoin });
  };

  const onSelectedAddressItem = ({ id }) => {
    NavigationService.navigate(Routes.ADD_CONTACT, {
      coin: selectedCoin,
      isEdit: true,
      addressId: id,
    });
  };

  const renderAddressItem = ({ item, index }) => {
    return (
      <WalletAddressItem
        id={item.id}
        title={item.name}
        subTitle={`${t('address')} ${item.coinId.toUpperCase()}`}
        address={item.walletAddress}
        onPress={onSelectedAddressItem}
        lineBackgroundColor={Colors.ORANGE}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listContacts}
        style={styles.list}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderAddressItem}
      />
    </View>
  );
};
