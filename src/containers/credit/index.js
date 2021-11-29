import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { NavTitleBackHeader, TouchableX, BlueButton, PopupConfirmGrantQuota, PopUpSuccessTransfer } from '@/components';
import { styles } from './styles';
import { useTranslation, useAppContext, useDebounce } from '@/hooks';
import { Colors, actuatedNormalize } from '@/themes';
import { Routes, showLoading, ICO_CLOSE, showErrorToast, showInfoToast } from '@/common';
import { NavigationService } from '@/services';
import { formatCommaNumber, formatNumberFee } from '@/utils';
import { isEmpty, isArray } from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const CreditScreen = () => {
    const { t } = useTranslation();
    const {
        userWallets,
        getUserWallets,
        searchUsers,
        CreateCredit
    } = useAppContext();
    const [amount, setAmount] = useState();
    const [checkButton, setCheckButton] = useState(false);

    const [quota, setQuota] = useState('');
    const [note, setNote] = useState('');
    const [interestrate, setInterestrate] = useState('0.1');

    const [seachKeyword, setSearchKeyword] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isHideSearchResults, setIsHideSearchResults] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isShowPopupSuccessTransfer, setIsShowPopupSuccessTransfer] = useState(false);
    const [isShowConfirmPopup, setIsShowConfirmPopup] = useState();

    const debouncedSearchKeyword = useDebounce(seachKeyword, 500);

    const [selectedUserAddress, setSelectedUserAddress] = useState(null);
    const [selectedUserTitle, setSelectedUserAddressTitle] = useState(null);

    useEffect(() => {
        getUserWallets();
        setAmount(getBalanceVNDT());
    }, []);

    useEffect(() => {
        if (debouncedSearchKeyword) {
            onSearchUsers();
        } else {
            setSearchResults([]);
        }
    }, [debouncedSearchKeyword]);

    useEffect(() => {
        if (quota != "" && (selectedUserTitle || selectedUser)) {
            setCheckButton(true)
        } else setCheckButton(false)
    }, [quota, selectedUserTitle, selectedUser]);


    const onSearchUsers = async () => {
        if (!isEmpty(seachKeyword)) {
            setIsSearching(true);

            const params = {
                s: seachKeyword,
                c: 'vndt',
            };

            const res = await searchUsers(params);

            setIsSearching(false);
            setIsHideSearchResults(false);

            if (res.status && res.data) {
                setSearchResults(res.data);
            }
        }
    }

    const onSelectedSearchUser = (item) => {
        setIsHideSearchResults(true);
        setSelectedUser(item);
        setSelectedUserAddressTitle(null)
        setSelectedUserAddress(null)
    };

    const getBalanceVNDT = () => {
        if (userWallets && isArray(userWallets)) {
            const vndtWallet = userWallets.find(
                (item) => item.type === 'VNDT');
            if (userWallets) {
                return vndtWallet.amount;
            }
        }
        return 0;
    }


    const renderItems = ({ item, index }) => {
        const {
            nickName,
            email
        } = item;
        return (
            <View style={{ backgroundColor: '#fff' }}>
                <TouchableX
                    style={styles.searchItemContainer}
                    onPress={() => onSelectedSearchUser(item)}>
                    <Text style={{ color: '#000' }}>
                        {nickName.toUpperCase()} ({email})
                    </Text>
                </TouchableX>
            </View>
        )
    }

    const onQuota = () => {
        let errorMessage = null;

        if (errorMessage) {
            showErrorToast(errorMessage);
            return;
        } else {
            showLoading();
        }
        setIsShowConfirmPopup(false);
        onSendQuota();
    }
    const onSendQuota = async () => {
        const params = {
            borrowerId: selectedUser?.id,
            currency: "VNDT",
            interestRate: interestrate,
            note: note,
            quantity: quota,
            quota: quota
        }
        const res = await CreateCredit(params);
        if (res && res.isSuccess) {
            setIsShowPopupSuccessTransfer(true);
        }
    }


    const onCancel = () => {
        setIsShowConfirmPopup(false);
    }
    const onCloseModalSuccess = () => {
        setIsShowPopupSuccessTransfer(false);
    }
    const onBack = () => {
        NavigationService.navigate(Routes.CREDIT_MANAGEMENT, setIsShowPopupSuccessTransfer(false))
    }

    const showConfirm = () => {
        if (interestrate > 0.3) {
            showInfoToast(t('maximum_interest'))
        }
        else if (parseFloat(quota) > parseFloat(amount)) {
            showInfoToast(t('invalid_money').replace(/#NAME/g, 'VNCOIN'))
        } else if (parseFloat(quota) < 1) {
            showInfoToast(t('invalid_amount').replace(/#COIN/g, 'VNCOIN')
                .replace(/#LIMIT/g, 1));
        } else {
            setIsShowConfirmPopup(true)
        }
    }


    return (
        <View style={styles.container}>
            <NavTitleBackHeader
                containerStyle={styles.navHeader}
                title={t('grant_quota')}
            />
            <View style={styles.viewTitle}>
                <Text style={styles.textTitle}>{t('you_have')}</Text>
                <Text style={styles.textTitle2}>{`${formatCommaNumber(amount)} VNDT`}</Text>
            </View>
            <View style={styles.searchContainer}>
                <Text style={styles.title}>{t('seach_recipients').toUpperCase()}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={t('seach_recipients_place_holder')}
                        placeholderTextColor={Colors.TEXT_INPUT}
                        autoCapitalize="none"
                        value={seachKeyword}
                        autoCorrect={false}
                        onChangeText={(text) => {
                            setSearchKeyword(text);
                        }}
                    />
                    {isSearching && (
                        <View style={styles.searchingContainer}>
                            <ActivityIndicator size='small' color={Colors.WHITE} />
                        </View>
                    )}
                </View>
            </View>

            {!isHideSearchResults ?
                <View style={styles.isHideSearchResults}>
                    <View style={{ width: '90%' }}>
                        <FlatList
                            enableEmptySections={true}
                            data={searchResults}
                            keyExtractor={(item, index) => `${item.id}-${index}`}
                            renderItem={renderItems} />
                    </View>
                </View> : null}

            <KeyboardAwareScrollView
                style={styles.scrollView}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.contentScrollContainer}>
                <Text style={styles.title}>{t('recipient').toUpperCase()}</Text>
                <View
                    style={[
                        styles.inputContainer,
                        { backgroundColor: Colors.TEXT4 },
                    ]}>
                    <View style={styles.leftContainer}>
                        <TextInput
                            style={[styles.input, { color: Colors.GREY }]}
                            editable={false}
                            value={
                                selectedUser
                                    ? `${selectedUser?.nickName?.toUpperCase() ?? ''} ${selectedUser?.email ? `(${selectedUser?.email})` : ''
                                    }`
                                    : ''
                            }
                        />
                    </View>
                </View>
                <Text style={styles.title}>{t('content').toUpperCase()}</Text>
                <View
                    style={[styles.inputContainer]}>
                    <View style={styles.leftContainer}>
                        <TextInput
                            style={[styles.input]}
                            value={note}
                            placeholder={`${t('enter_content')}`}
                            placeholderTextColor={Colors.TEXT_INPUT}
                            multiline={true}
                            onChangeText={(value) => setNote(value)}
                        />
                    </View>
                </View>
                <Text style={styles.title}>{t('quota').toUpperCase()}</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.leftContainer}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={Colors.TEXT_INPUT}
                            keyboardType="decimal-pad"
                            placeholder={`${('Minimum')} 1 VNDT`}
                            value={quota}
                            onChangeText={(value) => setQuota(value)}
                        />
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.rightButtonTitle}> VNDT </Text>
                    </View>
                </View>
                <Text style={styles.title}>{t('interest_rate_per_day').toUpperCase()}</Text>
                <View
                    style={[styles.inputContainer]}>
                    <View style={styles.leftContainer}>
                        <TextInput
                            style={[styles.input]}
                            value={interestrate}
                            placeholder={`${t('Maximum is')} 0.3 %`}
                            placeholderTextColor={Colors.TEXT_INPUT}
                            keyboardType="decimal-pad"
                            multiline={true}
                            onChangeText={(value) => setInterestrate(value)}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 30 }}>
                    <BlueButton
                        title={t('grant_quota')}
                        containerStyle={styles.transferButton}
                        onPress={showConfirm}
                        activeBackgroundColor={!checkButton ? Colors.DARK_GREY : Colors.BLUE}
                        isActive={quota == "" ? false : true}
                        disabled={checkButton ? false : true}
                    />
                </View>
            </KeyboardAwareScrollView>

            <PopupConfirmGrantQuota
                isVisible={isShowConfirmPopup}
                onCloseContainer={
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            justifyContent: 'flex-start',
                            paddingVertical: actuatedNormalize(10), marginBottom: actuatedNormalize(10)
                        }}>
                            <Text style={[styles.content, { fontSize: 16, color: Colors.LIGHT_GREY }]}>{`${t('confirm_credit')}`}</Text>
                        </View>
                        <TouchableX
                            onPress={onCancel}
                            style={[styles.header,
                            {
                                flex: 1,
                                justifyContent: 'flex-end',
                                paddingHorizontal: actuatedNormalize(15),
                                paddingVertical: actuatedNormalize(15)
                            }]}>
                            <Image source={ICO_CLOSE} style={styles.icon} resizeMode='contain' />
                        </TouchableX>
                    </View>
                }
                grantee={`${t('grantee')}:`}
                granteeName={selectedUser?.nickName.toUpperCase()}
                email={`(${selectedUser?.email})`}
                amount={`${t('money')}:`}
                amountVNDT={`${formatNumberFee(quota)} VNDT`}
                interest={`${t('interest_rate_per_day')}:`}
                interestVNDT={`${interestrate} %`}
                note={t('note')}
                noteText={note}
                title={t('confirm')}
                OnPress={onQuota}
            />
            <PopUpSuccessTransfer
                isVisible={isShowPopupSuccessTransfer}
                onCloseContainer={
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            justifyContent: 'flex-start',
                            paddingVertical: actuatedNormalize(10), marginBottom: actuatedNormalize(10)
                        }}>
                            <Text style={[styles.content, { fontSize: 16, color: Colors.LIGHT_GREY }]}>{`${t('completed')}`}</Text>
                        </View>
                        <TouchableX
                            onPress={onCloseModalSuccess}
                            style={[styles.header,
                            {
                                flex: 1,
                                justifyContent: 'flex-end',
                                paddingHorizontal: actuatedNormalize(15),
                                paddingVertical: actuatedNormalize(15)
                            }]}>
                            <Image source={ICO_CLOSE} style={styles.icon} resizeMode='contain' />
                        </TouchableX>
                    </View>
                }
                text1={t('grant_quota_success')}
                text2={`${t('quota')}:`}
                text3={`${formatNumberFee(quota)} VNDT`}
                text4={`${t('interest_rate_per_day')}:`}
                text5={`${interestrate} %`}
                text6={`${t('grantee')}:`}
                text7={`${selectedUser?.nickName.toUpperCase()}`}
                text8={`${t('note')}:`}
                text9={note}
                text10={`(${selectedUser?.email})`}
                title={t('credit_management')}
                OnPress={onBack}
            />
        </View>
    )
}