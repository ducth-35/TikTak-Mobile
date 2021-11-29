import { NavTitleBackHeader, TouchableX, PopupOut } from '@/components';
import { useAppContext, useTranslation } from '@/hooks';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { styles } from './styles';
import { Colors, actuatedNormalize, FontFamily } from "@/themes";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { showLoading, showSuccessToast } from '@/common';


export const MyCompanyScreen = () => {
    const { t } = useTranslation();
    const { getMycompany, myCompany, accountInfo, outCompany} = useAppContext();

    const [isshowOut, setIsshowOut] = useState(false);
    const [department, setDepartment] = useState(null);
    const [company, setCompany] = useState(null);
    const [position, setPosition] = useState(null);


    useEffect(() => {
        getMycompany();
        if(typeof(myCompany?.fullName && accountInfo?.position && accountInfo?.department) === 'undefined') {
            setCompany(t('not_yet'));
            setDepartment(t('not_yet'));
            setPosition(t('not_yet'));
        } else {
           setCompany(`${myCompany?.fullName}`);
           setDepartment(`${accountInfo?.department}`);
           setPosition(`${accountInfo?.position}`);
        }
    }, []);

    const showPopup = () => {
        setIsshowOut(true);
    }

    const OnCancel = () => {
        setIsshowOut(false);
    }

   const OnPressOut = async () => {
        let errorMessage = null;

        if (errorMessage) {
            showErrorToast(errorMessage);
            return;
        } else {
            setIsshowOut(false);
            showLoading();
        }
        const res = await outCompany();
        if (res && res.isSuccess) {
            showSuccessToast(t('out_company_success').replace(/#COMPANY/g, myCompany?.name));
        }
    }

    return (
        <View style={styles.container}>
            <NavTitleBackHeader
                title={`${t('my_company')}`}
                containerStyle={styles.navHead}
                rightContainer={
                    <TouchableX style={styles.navRightButton} onPress={showPopup}>
                        <FontAwesome5 name="sign-out-alt" color="white" size={20} />
                    </TouchableX>
                }
            />
            <View style={styles.avatarContainer}>
                <View style={styles.viewContainer}>
                    <Image
                        style={styles.avatarContainerView}
                        resizeMode="contain"
                        source={{ uri: myCompany?.logo }}
                    />
                </View>
            </View>
            <Text style={{
                fontFamily: FontFamily.TitilliumWeb.SemiBold,
                marginTop: actuatedNormalize(10),
                textAlign: 'center',
                fontSize: actuatedNormalize(18),
                color: Colors.WHITE,
            }}>{`( ${company} )`}</Text>
            <View style={{ paddingHorizontal: actuatedNormalize(15) }}>
                <Text style={styles.title}>{t('position').toUpperCase()}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={t(`${position}`)}
                        editable={true}
                    />
                </View>

                <Text style={styles.title}>{t('department').toUpperCase()}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        editable={true}
                        value={department}
                    />
                </View>
            </View>
            <PopupOut
                isVisible={isshowOut}
                text1={t('out_company')
                    .replace(/#COMPANY/g, myCompany?.name)}
                titleCancel={t('no')}
                titleAccept={t('sure')}
                OnCancel={OnCancel}
                OnPressAccept={OnPressOut}
            />
        </View>
    );
}
