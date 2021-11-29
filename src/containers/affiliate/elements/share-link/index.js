import React, { useState } from 'react';
import { View, Text, Linking, Image } from 'react-native';
import { styles } from './styles';
import { useTranslation, useAppContext } from '@/hooks';
import { actuatedNormalize, Colors } from '@/themes';
import {
    ICON_TELEGRAM,
    ICON_TWITER,
    ICON_FACEBOOK,
    ICON_ZALO,
    LINK_REGISTER,
    LINK_FACEBOOK,
    LINK_TELEGRAM,
    LINK_ZALO,
    LINK_TWITTER
} from '@/common';
import { TouchableX, } from '@/components';
import { openWeb } from '@/services';
import { isEmpty } from 'lodash';

export const ShareLink = ({ item, index }) => {
    const { t } = useTranslation();
    const { accountInfo } = useAppContext();
    const CONVERT_BASE36 = accountInfo?.id.toString(36).toUpperCase();

    const shareTelegram = () => {
        if (!isEmpty(LINK_TELEGRAM)) {
            openWeb(`${LINK_TELEGRAM}${LINK_REGISTER}${CONVERT_BASE36}`);
        }
    }
    const shareTwitter = () => {
        if (!isEmpty(LINK_TWITTER)) {
            openWeb(`${LINK_TWITTER}${LINK_REGISTER}${CONVERT_BASE36}`);
        }
    }
    const shareFacebook = () => {
        if (!isEmpty(LINK_FACEBOOK)) {
            openWeb(`${LINK_FACEBOOK}${LINK_REGISTER}${CONVERT_BASE36}`);
        }
    }
    const shareZalo = () => {
        if (!isEmpty(LINK_ZALO)) {
            openWeb(`${LINK_ZALO}`);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.rightContainer}>
                    <Text
                        style={[styles.title,
                        {
                            flex: 1,
                            justifyContent: 'space-between',
                            marginLeft: actuatedNormalize(20)
                        }]}
                    >{t('share_link')}</Text>
                </View>
                <View style={styles.share}>
                    <TouchableX style={styles.buyButton} onPress={() => shareTelegram()}>
                        <Image style={styles.icon} source={ICON_TELEGRAM} resizeMode="contain" />
                        <Text style={[styles.title, { color: Colors.WHITE }]}>Telegram</Text>
                    </TouchableX>
                    <TouchableX style={styles.buyButton} onPress={shareTwitter}>
                        <Image style={styles.icon} source={ICON_TWITER} resizeMode="contain" />
                        <Text style={[styles.title, { color: Colors.WHITE }]}>Twitter</Text>
                    </TouchableX>

                    <TouchableX style={[styles.buyButton]} onPress={() => shareFacebook()}>
                        <Image style={styles.icon} source={ICON_FACEBOOK} resizeMode="contain" />
                        <Text style={[styles.title, { color: Colors.WHITE }]}>Facebook</Text>
                    </TouchableX>
                    <TouchableX style={[styles.buyButton]} onPress={shareZalo}>
                        <Image style={styles.icon} source={ICON_ZALO} resizeMode="contain" />
                        <Text style={[styles.title, { color: Colors.WHITE }]}>Zalo</Text>
                    </TouchableX>
                </View>
            </View>
        </View>
    );
};


