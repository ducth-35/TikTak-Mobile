import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { styles } from './styles';
import { useAppContext, useTranslation } from '@/hooks';
import { Colors, actuatedNormalize } from '@/themes';
import { ICON_MAIL, ICO_POPUP_MAILBOX, showErrorToast, showLoading } from '@/common';
import { TouchableX, BlueButton } from '@/components';
import { validateEmail } from '@/utils';
import Modal from 'react-native-modal';


export const ShareMail = () => {
    const [email, setEmail] = useState(null);
    const { sendInviteFriend } = useAppContext();
    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const { t } = useTranslation();

    const onSendMail = () => {
        let errorMessage = null;
        if (!validateEmail(email?.trim())) {
            errorMessage = t('invalid_email');
        }
        if (errorMessage) {
            showErrorToast(errorMessage);
            return;
        }
        OnsendInviteFriend();
        showLoading();
    }
    const OnsendInviteFriend = async () => {
        const params = { email }
        const res = await sendInviteFriend(params);
        if (res && res.isSuccess) {
            setShowModalSuccess(true);
        }
    }
    const closeModal = () => {
        setShowModalSuccess(false);
    };

    const renderModalInviteFriendSuccess = () => {
        return (
            <Modal isVisible={showModalSuccess}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image
                            style={styles.mailbox}
                            source={ICO_POPUP_MAILBOX}
                            resizeMode="contain"
                        />
                        <Text style={styles.popupTitle}>{t('send_invite_friend')}</Text>
                        <Text style={styles.popupMessage}>
                            {t('message_invite_friend')}
                        </Text>
                        <BlueButton
                            containerStyle={styles.okBtn}
                            title={t('ok')}
                            onPress={closeModal}
                        />
                    </View>
                </View>
            </Modal>
        );
    };

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
                    >{t('share_mail')}</Text>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    paddingLeft: actuatedNormalize(20),
                    paddingRight: actuatedNormalize(20)
                }}>
                    <View style={{
                        minHeight: actuatedNormalize(48),
                        backgroundColor: Colors.NEUTURAL11,
                        borderRadius: 8,
                        marginTop: 7,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>

                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <TextInput
                                style={styles.input}
                                placeholder={t('placeholder_input_phone_email')}
                                placeholderTextColor={Colors.DARK_GREY}
                                value={email}
                                onChangeText={(value) => setEmail(value)}
                            />
                        </View>

                        <TouchableX style={styles.btnSend} onPress={onSendMail}>
                            <View style={{ flexDirection: 'row', marginLeft: actuatedNormalize(10) }}>
                                <Image source={ICON_MAIL} style={[styles.image]} />
                            </View>
                            <View style={{ flexDirection: 'row', marginRight: actuatedNormalize(10) }}>
                                <Text style={[styles.title, { color: Colors.WHITE }]}>{t('send')}</Text>
                            </View>
                        </TouchableX>

                    </View>
                </View>
            </View>
            {renderModalInviteFriendSuccess()}
        </View>
    );
};





