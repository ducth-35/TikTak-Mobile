import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import Clipboard from '@react-native-community/clipboard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { isEmpty } from 'lodash';
import QRCode from 'react-native-qrcode-svg';

import { useTranslation, useAppContext } from '@/hooks';
import { actuatedNormalize } from '@/themes';
import { TouchableX, NavTitleBackHeader, NoteDeposit, Deposit } from '@/components';
import { Routes, showSuccessToast } from '@/common';
import { getWalletAddress } from '@/utils';

import styles from './styles';
import { NavigationService } from '@/services';

export const DepositCoins = ({ route }) => {
    const { t } = useTranslation();
    const { userWallets } = useAppContext();

    const [coinWallet, setCoinWallet] = useState('');

    const coinId = route.params?.coinId;

    useEffect(() => {
        getCoinWallet();
    }, []);

    const getCoinWallet = () => {
        if (!isEmpty(userWallets) && userWallets.length > 0 && !isEmpty(coinId)) {
            const coin = userWallets.find(
                (item) => item.type.toLowerCase() === coinId,
            );
            if (coin) {
                const walletAddress = coin.walletAddress;
                setCoinWallet(getWalletAddress(walletAddress));
            }

        }
    };

    const onCopy = () => {
        if (!isEmpty(coinWallet)) {
            Clipboard.setString(coinWallet);
            showSuccessToast(t('copy_success'));
        }
    };

    const renderNote = () => {
        return <NoteDeposit coinId={coinId} coinName={coinId.toUpperCase()} onPress={onShowAgent} />;
    };

    const onShowAgent = () => {
        if (coinId === 'vndt') {
            NavigationService.replace(Routes.DEPOSIT_VNDT);
        } else {
            NavigationService.navigate(Routes.DEPOSIT_VNDT);
        }
    }

    return (
        <View style={styles.container}>
            <NavTitleBackHeader
                containerStyle={styles.navHeader}
                title={`${t('tab_deposit')} ${coinId.toUpperCase()}`}
            />
            <ScrollView contentContainerStyle={styles.scrollView}>
                {!isEmpty(coinWallet) && (
                    <View style={styles.qrCodeContainer}>
                        <View style={styles.qrCodeContainerView}>
                            <QRCode size={actuatedNormalize(200)} value={coinWallet} />
                        </View>
                    </View>
                )}
                <View style={{ margin: 20 }}>
                    <Deposit
                        containerStyle={{ backgroundColor: '#E9ECEF' }}
                        textname={'Địa chỉ của bạn'}
                        editable={false}
                        value={coinWallet}
                        onPress={onCopy}
                    />
                </View>
                {renderNote()}
            </ScrollView>
        </View>
    );
};
