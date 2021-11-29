import { LINK_SPREADSHEET, HD_1, HD_2, HD_3, Routes } from '@/common';
import { NavTitleBackHeader, TouchableX } from '@/components';
import { useTranslation } from '@/hooks';
import { openWeb } from '@/services';
import { actuatedNormalize, Colors, FontFamily } from '@/themes';
import React, { useState } from 'react';
import { View, Text, Image, Modal } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImageModal from 'react-native-image-modal';
import { styles } from './styles';
import { MULTISEND, HD_4 } from '@/common';
import { CheckPermission } from '@/utils/download';


export const IntructScreen = ({ route }) => {
    const { t } = useTranslation();

    const type = route?.params.type;

    const onOpenWeb = () => {
        openWeb(LINK_SPREADSHEET);
    }

    return (
        <View style={styles.container}>
            <NavTitleBackHeader
                containerStyle={styles.navHead}
                title={t('intruct')} />
            {type === MULTISEND.SHEET ? (
                <KeyboardAwareScrollView style={{ flex: 1 }}>
                    <TouchableX style={{ padding: 10 }} onPress={onOpenWeb}>
                        <Text style={[styles.title, { color: Colors.BLUE, textDecorationLine: 'underline' }]}> {t('make_sure_the_content_is_the_same_as_this_template')} </Text>
                    </TouchableX>

                    <Text style={[styles.title, { marginLeft: actuatedNormalize(10) }]}>{t('intruct_share_sheet')}</Text>

                    <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                        <Text style={[styles.title, { fontFamily: FontFamily.TitilliumWeb.Regular, paddingHorizontal: 10 }]}>{t('step1_share_sheets')}</Text>
                        <ImageModal
                            style={{ height: 150, width: 350, marginHorizontal: 30 }}
                            resizeMode={'contain'}
                            source={HD_1}
                        />
                    </View>

                    <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                        <Text style={[styles.title, { fontFamily: FontFamily.TitilliumWeb.Regular, paddingHorizontal: 10 }]}>{t('step2_share_sheets')}</Text>
                        <ImageModal
                            style={{ height: 200, width: 350, marginHorizontal: 30 }}
                            resizeMode={'contain'}
                            source={HD_2}
                        />
                    </View>

                    <Text style={[styles.title, { marginLeft: actuatedNormalize(10) }]}>{t('intruct_get_sheet')}</Text>

                    <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                        <ImageModal
                            style={{ height: 300, width: 350, marginHorizontal: 30 }}
                            resizeMode={'contain'}
                            source={HD_3}
                        />
                    </View>
                </KeyboardAwareScrollView>
            ) : (
                <View>
                    <Text style={[styles.title, { marginLeft: actuatedNormalize(10), paddingVertical: actuatedNormalize(10) }]}>{t('note1_file_excel')}</Text>
                    <Text style={[styles.title, { marginLeft: actuatedNormalize(10) }]}>{t('note2_file_excel')}</Text>
                    <TouchableX style={{ alignItems: 'center' }} onPress={CheckPermission}>
                        <Image
                            style={{ height: 100, width: 380 }}
                            resizeMode={'contain'}
                            source={HD_4}
                        />
                    </TouchableX>
                </View>
            )}
        </View>
    );
}
