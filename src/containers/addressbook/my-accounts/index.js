import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useTranslation, useAppContext } from '@/hooks';
import { getWalletAddress } from '@/utils';

import { WalletAddressItem } from '../address-item';
import styles from './styles';
import { formatNumberFee } from '@/utils';

export const MyAccounts = ({ selectedCoin }) => {
  const { t } = useTranslation();
  const { userWallets } = useAppContext();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    if (selectedCoin && userWallets) {
      const existingCoin = userWallets.find(
        (wallet) => wallet.type === selectedCoin.toUpperCase(),
      );

      if (existingCoin) {
        setCoin(existingCoin);
      }
    }
  }, [selectedCoin, userWallets]);

  return (
    <View style={styles.container}>
      <WalletAddressItem
        title={t('my_accounts').replace(/#COIN/g, selectedCoin.toUpperCase())}
        subTitle={coin ? `${t('equity')} ${formatNumberFee(coin.amount)} ${selectedCoin.toUpperCase()}` : ''}
        address={coin ? getWalletAddress(coin.walletAddress) : ''}
      />
    </View>
  );
};
