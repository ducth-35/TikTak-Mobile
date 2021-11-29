import React from 'react';
import { View, Text, Image } from 'react-native';

import { NavTitleHeader, TouchableX } from '@/components';
import { useTranslation } from '@/hooks';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';
import { NavigationService } from '@/services';
import {
    ICO_CREDIT_GRANTED,
    ICO_CREDIT_MANAGE,
    Routes,
} from '@/common';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { styles } from './styles';

export const ManageCredit = () => {

    const { t } = useTranslation();

    const onCreateCredit = () => {
        NavigationService.navigate(Routes.CREDIT)
    }
    const onCreditManagement = () => {
        NavigationService.navigate(Routes.CREDIT_MANAGEMENT);
    };

    const onGrantedCredit = () => {
        NavigationService.navigate(Routes.GRANTED_CREDIT);
    }
    return (
        <View style={styles.container}>
            <NavTitleHeader
                title={t('credit')}
                containerStyle={styles.navHeader}
                rightContainer={
                    <TouchableX style={styles.navRightButton} onPress={onCreateCredit}>
                        <FontAwesome5 name="plus-circle" color="white" size={20} />
                    </TouchableX>
                }
            />
            <View style={{ flexDirection: 'column', paddingHorizontal: actuatedNormalize(10) }}>
                <TouchableX style={styles.btnSelect} onPress={onCreditManagement}>
                    <View style={{ justifyContent: 'center', paddingHorizontal: actuatedNormalize(20) }}>
                        <View style={styles.avatarContainer}>
                            <Image
                                style={styles.image}
                                source={ICO_CREDIT_MANAGE}
                                resizeMode='contain' />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontFamily: FontFamily.TitilliumWeb.SemiBold, fontSize: 16, color: Colors.WHITE }}> {t('credit_management')} </Text>
                    </View>
                </TouchableX>

                <TouchableX style={styles.btnSelect} onPress={onGrantedCredit}>
                    <View style={{ justifyContent: 'center', paddingHorizontal: actuatedNormalize(20) }}>
                        <View style={styles.avatarContainer}>
                            <Image
                                style={styles.image}
                                source={ICO_CREDIT_GRANTED}
                                resizeMode='contain' />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontFamily: FontFamily.TitilliumWeb.SemiBold, fontSize: 16, color: Colors.WHITE }}> {t('granted_credit')} </Text>
                    </View>
                </TouchableX>

                <TouchableX style={styles.btnSelect} onPress={onCreateCredit}>
                    <View style={{ justifyContent: 'center', paddingHorizontal: actuatedNormalize(20) }}>
                        <View style={styles.avatarContainer}>
                        <FontAwesome5 name="plus-circle" color="white" size={35} />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontFamily: FontFamily.TitilliumWeb.SemiBold, fontSize: 16, color: Colors.WHITE }}> {t('grant_quota')} </Text>
                    </View>
                </TouchableX>
            </View>
        </View>
    );
};
