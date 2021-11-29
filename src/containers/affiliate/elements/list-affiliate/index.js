//import liraries
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { ICNO_SHOW_GIFTCODE, Routes } from '@/common';
import { TouchableX } from '@/components';
import { NavigationService } from '@/services';
import { useTranslation } from '@/hooks';

export const List = () => {
    const { t } = useTranslation();

    const onShowFriends = () => {
        NavigationService.navigate(Routes.FRIENDS)
    }

    const onShowHistory = () => {
        NavigationService.navigate(Routes.HISTORYBONUS)
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerStyle}>
                <TouchableX style={styles.itemContainer} onPress={onShowFriends}>
                    <View style={styles.leftText}>
                        <Text style={styles.title}> {t('friend_advise')} </Text>
                    </View>
                    <View style={styles.rightImg}>
                    <Image source={ICNO_SHOW_GIFTCODE} style={{ width: 16, height: 16}} resizeMode='contain'/>
                    </View>
                </TouchableX>
            </View>
            <View style={[styles.containerStyle, { marginTop: 1 }]}>
                <TouchableX style={styles.itemContainer} onPress={onShowHistory}>
                    <View style={styles.leftText}>
                        <Text style={styles.title}> { t('new_bonus_history')}</Text>
                    </View>
                    <View style={styles.rightImg}>
                        <Image source={ICNO_SHOW_GIFTCODE} style={{ width: 16, height: 16}} resizeMode='contain' />
                    </View>
                </TouchableX>
            </View>
        </View>
    );
};




