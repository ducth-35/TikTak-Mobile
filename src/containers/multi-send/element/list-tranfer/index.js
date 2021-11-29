import { BlueButton, NavTitleBackHeader, PopupMultiSend, PopUpSuccess, TouchableX } from '@/components';
import { useAppContext, useTranslation } from '@/hooks';
import { actuatedNormalize, Colors, FontFamily } from '@/themes';
import { formatCommaNumber, formatNumberFee } from '@/utils';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TextInput } from 'react-native';
import { styles } from './styles';
import { ICO_CLOSE, Routes, showErrorToast, showLoading } from '@/common';
import { NavigationService } from '@/services';


export const ListTransferScreen = ({ route }) => {
    const { t } = useTranslation();
    const { transfer } = useAppContext();

    const [isShowComfirm, setIsShowComfirm] = useState(false);
    const [isShowSuccess, setIsShowSuccess] = useState(false);

    const [textCapcha, setTextCapcha] = useState(null);

    const listTransfer = route.params?.listTransfer;
    const total = route.params?.total;
    const totalBalance = route.params?.totalBalance;
    const error = route.params?.error;
    const totalvndt = route.params?.totalvndt;
    const totaltrx = route.params?.totaltrx;

    const onConfirm = () => {
        setIsShowComfirm(true);
    }
    const onCancelSuccess = () => {
        if(isShowComfirm){
            setIsShowComfirm(false);
        } else {
            NavigationService.navigate(Routes.HOME,  setIsShowSuccess(false));
        }
    }
    const onTransfer = async () => {

        let errorMessage = null;
        if (textCapcha === 'tôi có não và đang dùng nó') {
            setIsShowComfirm(false);
        } else {
            errorMessage = 'Cụm từ xác thực không đúng. Vui lòng kiểm tra lại !'
        }
        if (totaltrx <= 0) {
            errorMessage = 'Số dư TRX của bạn không đủ để thực hiện chuyển tiền. Vui lòng kiểm tra lại !'
        }
        if (errorMessage) {
            showErrorToast(errorMessage);
            return;
        } else {
            showLoading();
        }
        const params = listTransfer;

        const res = await transfer(params);
        if (res && res.isSuccess) {
            setIsShowSuccess(true);
        };
    }

    const renderHead = () => {
        return (
            <View style={{ paddingVertical: actuatedNormalize(10), flexDirection: 'column' }}>
                <Text style={[styles.title, { fontSize: 20, textAlign: 'center', color: Colors.BLUE }]}>{`${t('total_amount')}: ${formatNumberFee(totalBalance)} VNDT`}</Text>
                <View style={{ flexDirection: 'row', paddingVertical: actuatedNormalize(10) }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.title, { marginLeft: 10, fontSize: 14, color: Colors.WHITE, paddingVertical: actuatedNormalize(5) }]}>
                                {`${t('equity')} VNDT:`}
                            </Text>
                            <Text style={[styles.title, { marginLeft: 10, fontSize: 14, color: Colors.WHITE, paddingVertical: actuatedNormalize(5) }]}>
                                {`${formatNumberFee(totalvndt)} VNDT`}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.title, { marginLeft: 10, fontSize: 14, color: Colors.WHITE, paddingVertical: actuatedNormalize(5) }]}>
                                {`${t('equity')} TRX:`}
                            </Text>
                            <Text style={[styles.title, { marginLeft: 10, fontSize: 14, color: Colors.RED, paddingVertical: actuatedNormalize(5) }]}>
                                {`${formatCommaNumber(totaltrx)} TRX`}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.title, { marginLeft: 10, fontSize: 14, color: Colors.WHITE, paddingVertical: actuatedNormalize(5) }]}>
                                {`${t('total_')}:`}
                            </Text>
                            <Text style={[styles.title, { marginLeft: 10, fontSize: 14, color: Colors.WHITE, paddingVertical: actuatedNormalize(5) }]}>
                                {`${total}`}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.title, { marginLeft: 10, fontSize: 14, color: Colors.WHITE, paddingVertical: actuatedNormalize(5) }]}>
                                {`${t('check_error')}:`}
                            </Text>
                            {error.length > 0 ? (
                                <Text style={[styles.title, { marginLeft: 10, fontSize: 14, color: Colors.RED, paddingVertical: actuatedNormalize(5) }]}>
                                    {`${error}`}
                                </Text>
                            ) : (
                                    <Text style={[styles.title, { marginLeft: 10, fontSize: 14, color: Colors.WHITE, paddingVertical: actuatedNormalize(5) }]}>
                                        {`${error}`}
                                    </Text>
                                )}
                        </View>
                    </View>
                </View>
                <View style={styles.line} />
            </View>
        )
    }

    const renderListTransfer = ({ item, index }) => {

        const { name, email, balance, note, check } = item;

        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemLeftContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <View style={styles.row}>
                                <Text style={[styles.title, { fontWeight: 'bold', fontSize: 14, color: Colors.WHITE }]}>{`${t('name_profile')}:`}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Text style={[styles.title, { marginLeft: 10, fontWeight: 'bold', fontSize: 14, color: Colors.WHITE }]}>
                                {name}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <View style={styles.row}>
                                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('email')}:`}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Text style={[styles.title, { marginLeft: 10, fontFamily: FontFamily.TitilliumWeb.Regular }]}>
                                {`${email}`}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <View style={styles.row}>
                                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('amount')} (VNDT):`}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Text style={[styles.title, { marginLeft: 10, fontFamily: FontFamily.TitilliumWeb.Regular }]}>
                                {`${formatNumberFee(balance)}`}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <View style={styles.row}>
                                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('content_transfer')}:`}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Text style={[styles.title, { marginLeft: 10, fontFamily: FontFamily.TitilliumWeb.Regular }]}>
                                {`${note}`}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <View style={styles.row}>
                                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('check')}:`}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            {check === false ? (
                                <Text style={[styles.title, { marginLeft: 10, fontFamily: FontFamily.TitilliumWeb.SemiBold, color: Colors.RED }]}>
                                    {t('error')}
                                </Text>
                            ) : (
                                    <Text style={[styles.title, { marginLeft: 10, fontFamily: FontFamily.TitilliumWeb.SemiBold, color: Colors.GREEN }]}>
                                        OK
                                    </Text>
                                )}
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <NavTitleBackHeader
                title={t('list_transfer')}
                containerStyle={styles.navHead}
            />
            <View style={styles.container}>
                <FlatList
                    style={styles.scrollview}
                    contentContainerStyle={styles.contentContainerStyle}
                    ListHeaderComponent={renderHead}
                    data={listTransfer}
                    renderItem={renderListTransfer}
                    keyExtractor={(item, index) => `${index.id}-${index}`}
                />
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <BlueButton
                    name='exchange-alt'
                    title={t('transfer_now')}
                    containerStyle={[styles.continueButton]}
                    onPress={onConfirm}
                />
            </View>
            <PopupMultiSend
                isVisible={isShowComfirm}
                onCloseContainer={
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            justifyContent: 'flex-start',
                            paddingVertical: actuatedNormalize(10), marginBottom: actuatedNormalize(10)
                        }}>
                            <Text style={[styles.content, { fontSize: 16, color: Colors.LIGHT_GREY }]}> {`${t('confirm_transfer')}`} </Text>
                        </View>
                        <TouchableX
                            onPress={onCancelSuccess}
                            style={[styles.header,
                            {
                                flex: 1,
                                justifyContent: 'flex-end',
                                paddingHorizontal: actuatedNormalize(15),
                                paddingVertical: actuatedNormalize(15)
                            }]}>
                            <Image source={ICO_CLOSE} style={{ width: 10, height: 10 }} resizeMode='contain' />
                        </TouchableX>
                    </View>
                }
                quanlityInput={
                    <View style={{ marginLeft: actuatedNormalize(20), marginRight: actuatedNormalize(20), marginTop: actuatedNormalize(10), marginBottom: actuatedNormalize(20) }}>
                        <View
                            style={[styles.inputContainer]}>
                            <TextInput
                                style={[styles.input]}
                                placeholder={'tôi có não và đang dùng nó'}
                                placeholderTextColor={Colors.GREY}
                                value={textCapcha}
                                onChangeText={(value) => setTextCapcha(value)}
                            />
                        </View>
                    </View>
                }
                text1={`•  Bạn đang thực hiện chuyển tiền số lượng lớn với tổng số tiền là: `}
                text2={'•  Vui lòng gõ "tôi có não và đang dùng nó" để xác nhận giao dịch'}
                text3={`${formatNumberFee(totalBalance)} VNDT`}
                titleCancel={t('cancel')}
                OnPressCancel={onCancelSuccess}
                titleAccept={t('ok')}
                OnPressAccept={onTransfer}
            />
            <PopUpSuccess
                isVisible={isShowSuccess}
                onCloseContainer={
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            justifyContent: 'flex-start',
                            paddingVertical: actuatedNormalize(10), marginBottom: actuatedNormalize(10)
                        }}>
                            <Text style={[styles.content, { fontSize: 16, color: Colors.LIGHT_GREY }]}> {`${t('completed')}`} </Text>
                        </View>
                        <TouchableX
                            onPress={onCancelSuccess}
                            style={[styles.header,
                            {
                                flex: 1,
                                justifyContent: 'flex-end',
                                paddingHorizontal: actuatedNormalize(15),
                                paddingVertical: actuatedNormalize(15)
                            }]}>
                            <Image source={ICO_CLOSE} style={{ width: 10, height: 10 }} resizeMode='contain' />
                        </TouchableX>
                    </View>
                }
                text1={'Thao tác chuyển tiền thành công. Các giao dịch đang trong quá trinh xử lý.'}
                text2={'Vui lòng đợi 5-10 phút cho đến khi các giao dịch hoàn tất, và không thực hiện bất kỳ thao tác nào liên quan đến số dư của bạn. Trân trọng !'}
            />
        </View>
    );
}
