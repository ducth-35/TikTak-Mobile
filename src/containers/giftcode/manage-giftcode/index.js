import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavTitleBackHeader, TouchableX } from '@/components';
import { useTranslation } from '@/hooks';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { NavigationService } from '@/services';
import { actuatedNormalize, Colors } from '@/themes';
import QRCode from 'react-native-qrcode-svg';
import { formatCommaNumber } from '@/utils';
import { Routes, showSuccessToast } from '@/common';
import { isEmpty } from 'lodash';
import Clipboard from '@react-native-community/clipboard';

import { styles } from './styles';

export const ManagerGiftcode = ({ route }) => {

    const { t } = useTranslation();

    const giftcodeId = route.params?.giftcodeId;
    const giftcodeQuantity = route.params?.giftcodeQuantity;
    const giftcodeCurrency = route.params?.giftcodeCurrency;


    const onCreateGiftCode = () => {
        NavigationService.navigate(Routes.CREATE_GIFTCODE_STEP_1)
    }

    const onCopyGiftcode = (code) => {
        if (!isEmpty(code)) {
            Clipboard.setString(code);
            showSuccessToast(t('copy_success'));
          }
    }

    return (
        <View style={styles.container}>
            <NavTitleBackHeader
                title={t('manager_giftcode')}
                containerStyle={styles.navHeader}
                rightContainer={
                    <TouchableX style={styles.navRightButton} onPress={onCreateGiftCode}>
                        <FontAwesome5 name="plus-circle" color="white" size={20} />
                    </TouchableX>
                } />
            <View>
                <View style={styles.qrcodeContainer}>
                    <View style={styles.qrcodeContainerView}>
                        <QRCode size={actuatedNormalize(200)} value={giftcodeId}></QRCode>
                    </View>
                </View>
                <View >
                    <View style={[styles.row, { marginTop: actuatedNormalize(10) }]}>
                        <Text style={[styles.title, { fontWeight: 'bold', fontSize: actuatedNormalize(16) }]}>
                            {`${formatCommaNumber(
                                giftcodeQuantity
                            )}`}
                        </Text>
                        <Text style={[styles.title, { fontWeight: 'bold', marginLeft: actuatedNormalize(8), fontSize: actuatedNormalize(16), color: Colors.GREY }]}>
                            {giftcodeCurrency}
                        </Text>
                    </View>
                    <View style={[styles.row, { marginTop: actuatedNormalize(10) }]}>
                        <Text style={[styles.title, { fontWeight: 'bold', color: Colors.GREY }]}>
                            {`${t('code')}:`}
                        </Text>
                        <TouchableX onPress={() => onCopyGiftcode(giftcodeId)}>
                            <Text
                                style={[
                                    styles.title,
                                    {
                                        marginLeft: 5,
                                        color: Colors.BLUE,
                                        textDecorationLine: 'underline',
                                        fontSize: actuatedNormalize(15),
                                    },
                                ]}>
                                {giftcodeId}
                            </Text>
                        </TouchableX>
                    </View>
                </View>
            </View>
        </View>
    );
};

