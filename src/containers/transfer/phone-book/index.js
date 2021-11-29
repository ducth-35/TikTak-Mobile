import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, FlatList } from 'react-native';

import { isEmpty, isArray } from 'lodash';
import { NavTitleBackHeader } from '@/components';
import { useTranslation, useAppContext } from '@/hooks';
import { Colors } from '@/themes';

import { WalletAddressItem } from '../address-item';
import styles from './styles';

export const PhoneBookScreen = ({ route }) => {
  const { t } = useTranslation();
  const { listAddress } = useAppContext();

  const [listContacts, setListContacts] = useState([]);

  const coin = route.params?.coin;
  const receivedValue = route.params?.receivedValue;

  useEffect(() => {
    if (coin.id) {
      if (!isEmpty(listAddress) && isArray(listAddress)) {
        const filterContacts = listAddress.filter(
          (item) => item.coinId === coin.id,
        );

        setListContacts(filterContacts);
      } else {
        setListContacts([]);
      }
    }
  }, [coin.id, listAddress]);

  const renderAddressItem = ({ item, index }) => {
    return (
      <WalletAddressItem
        id={item.id}
        title={item.name}
        subTitle={`${item.coinId.toUpperCase()} ${t('address')}`}
        address={item.walletAddress}
        lineBackgroundColor={Colors.ORANGE}
        receivedValue={receivedValue}
      />
    );
  };

  return (
    <View style={styles.container}>
      <NavTitleBackHeader
        containerStyle={styles.navHeader}
        title={t('tab_address_book')}
      />
      {/* <Text>{coin?.id?.toUpperCase()}</Text> */}

      <FlatList
        data={listContacts}
        style={styles.list}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderAddressItem}
      />
    </View>
  );
};
