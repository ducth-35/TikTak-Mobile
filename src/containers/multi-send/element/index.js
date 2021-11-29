import { NavTitleBackHeader, TouchableX, Permission } from '@/components';
import { useTranslation, useAppContext } from '@/hooks';
import React from 'react';
import { View, Text } from 'react-native';
import { actuatedNormalize, Colors, FontFamily } from '@/themes';
import { styles } from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { NavigationService } from '@/services';
import { Routes, MULTISEND } from '@/common';

export const MultiSendScreen = () => {
    const { t } = useTranslation();
    const { accountInfo } = useAppContext();

    const inputFile = () => {
        NavigationService.navigate(Routes.INPUTFILE, { type: MULTISEND.EXCEL });
    }

    const googleSheet = () => {
        NavigationService.navigate(Routes.GOOGLESHEET, { type: MULTISEND.SHEET });
    }

    return (
        <View style={styles.container}>
            {accountInfo?.permission === 'special' ? (
                <NavTitleBackHeader
                    title={t('choose_a_list_input_method')}
                    containerStyle={styles.navHead} />
            ) : null}
            { accountInfo?.permission === 'special' ? (
                <View style={{ flexDirection: 'column', paddingHorizontal: actuatedNormalize(10) }}>
                    {/* <TouchableX style={styles.btnSelect} onPress={inputFile}>
                    <View style={{ justifyContent: 'center', paddingHorizontal: actuatedNormalize(20) }}>
                        <View style={styles.avatarContainer}>
                            <FontAwesome5
                                name='folder-plus'
                                color="white"
                                size={25}
                            />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontFamily: FontFamily.TitilliumWeb.SemiBold, fontSize: 16, color: Colors.WHITE }}> Import File </Text>
                    </View>
                </TouchableX> */}
                    <TouchableX style={styles.btnSelect} onPress={googleSheet}>
                        <View style={{ justifyContent: 'center', paddingHorizontal: actuatedNormalize(20) }}>
                            <View style={styles.avatarContainer}>
                                <FontAwesome5
                                    name='google-drive'
                                    color="white"
                                    size={25}
                                />
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ fontFamily: FontFamily.TitilliumWeb.SemiBold, fontSize: 16, color: Colors.WHITE }}> Import Google Sheet </Text>
                        </View>
                    </TouchableX>
                </View>
            ) : (<Permission />)}
        </View>
    );
}
