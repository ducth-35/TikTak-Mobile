import React from 'react';
import { View, Text, Image } from 'react-native';

// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Clipboard from '@react-native-community/clipboard';
import { isEmpty } from 'lodash';

import { TouchableX } from '@/components';
import { Colors, actuatedNormalize } from '@/themes';
import { showSuccessToast, ICO_COPY } from '@/common';
import { getWalletAddress } from '@/utils';
import { useTranslation } from '@/hooks';

import styles from './styles';

export const WalletAddressItem = ({
  id,
  title,
  subTitle,
  address,
  lineBackgroundColor,
  onPress,
}) => {
  const { t } = useTranslation();

  const onSelectedItem = () => {
    if (onPress) {
      onPress({ id, walletAddress: address });
    }
  };

  const onCopyAddress = () => {
    if (!isEmpty(address)) {
      Clipboard.setString(getWalletAddress(address));
      showSuccessToast(t('copy_success'));
    }
  };

  return (
    <TouchableX style={styles.itemContainer} onPress={onSelectedItem}>
      <View
        style={[
          styles.lineVertical,
          {
            backgroundColor: lineBackgroundColor
              ? lineBackgroundColor
              : Colors.NEON_GREEN
          },
        ]}
      />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
          <Text style={styles.subTitle}>{address}</Text>
        </View>
        <TouchableX style={styles.rightContainer} onPress={onCopyAddress}>
          {/* <FontAwesome name="copy" color="white" size={actuatedNormalize(20)} /> */}
          <Image source={ICO_COPY} style={{ width: actuatedNormalize(18), height: actuatedNormalize(18) }} />
        </TouchableX>
    </TouchableX>
  );
};
