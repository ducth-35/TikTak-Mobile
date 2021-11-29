import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { NavTitleBackHeader, BlueButton } from '@/components';
import { useTranslation, useAppContext } from '@/hooks';
import { NavigationService } from '@/services';
import { Routes } from '@/common';
import { Colors } from '@/themes';

export const VerifyAccountScreen = () => {
    const { t } = useTranslation();
    const { accountInfo } = useAppContext();

    const onNextStep = () => {
        NavigationService.navigate(Routes.VERIFY_STEP1)
    }
    const onBackHome = () => {
        NavigationService.navigate(Routes.HOME)
    }
    const renderVerifying = () => {
        if (accountInfo?.verification === "verifying") {
            return (
                <>
                    <View style={styles.containers}>
                        <View style={styles.containerTitle}>
                            <Text style={[styles.content, { alignItems: 'center' }]}>{t('verify')}</Text>
                        </View>
                    </View>
                    <View style={{ padding: 20 }}>
                        <BlueButton
                            onPress={onBackHome}
                            title={t('back_home')}
                            style={styles.NextButton} />
                    </View>
                </>
            )
        } else if (accountInfo?.verification === "nonVerify") {
            return (
                <>
                    <View style={styles.containers}>
                        <View>
                            <Text style={styles.text1}>{t('attention_when_verifying_your_account')}</Text>
                        </View>
                        <View style={styles.containerTitle}>
                            <Text style={styles.textTitle}>{t('confirm_it_is_you')}</Text>
                            <Text style={styles.content}>{t('tex1')}</Text>
                        </View>
                        <View style={styles.containerTitle}>
                            <Text style={styles.textTitle}>{t('supported_country')}</Text>
                            <Text style={styles.content}> {t('text2')} </Text>
                        </View>
                    </View>
                    <View style={{ padding: 20 }}>
                        <BlueButton
                            onPress={onNextStep}
                            title={t('continue')}
                            style={styles.NextButton} />
                    </View>
                </>
            )
        } else {
            return (
                <>
                    <View style={styles.containers}>
                        <View style={styles.containerTitle}>
                            <Text style={[styles.content, { alignItems: 'center' }]}>{t('verified')}</Text>
                        </View>
                    </View>
                    <View style={{ padding: 20 }}>
                        <BlueButton
                            onPress={onBackHome}
                            title={t('back_home')}
                            style={styles.NextButton} />
                    </View>
                </>
            )
        }
    }
    return (
        <View style={styles.container}>
            <NavTitleBackHeader
                title={t('account_verification')}
                containerStyle={styles.navHeader} />
            {renderVerifying()}
        </View>
    );
};
