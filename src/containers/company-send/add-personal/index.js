import React, { useState, useRef, useEffect } from 'react';
import { BlueButton, NavTitleBackHeader, PopUpSuccess, RNActionSheet, RNInput, RNInput2, RNInput4, TouchableX } from '@/components';
import { View, Text, TextInput, ActivityIndicator, FlatList, Image } from 'react-native';
import { styles } from './styles';
import { useAppContext, useTranslation, useDebounce } from '@/hooks';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ActionSheet from 'react-native-actionsheet';
import { POSITION, ICO_CLOSE, showLoading, Routes } from '@/common';
import { isEmpty } from 'lodash';
import { NavigationService } from '@/services';

export const AddPersonalScreen = () => {
    const { t } = useTranslation();
    const { searchUsers, sendInvited } = useAppContext();
    const [positionType, setPositionType] = useState('');
    const [seachKeyword, setSearchKeyword] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isHideSearchResults, setIsHideSearchResults] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [checkButton, setCheckButton] = useState(false);
    const [department, setDepartment] = useState('');

    const actionSheetPosition = useRef(null);
    const debouncedSearchKeyword = useDebounce(seachKeyword, 500);
    const [selectedUserTitle, setSelectedUserAddressTitle] = useState(null);
    const [isShowSuccess, setIsShowSuccess] = useState(false);

    useEffect(() => {
        if (debouncedSearchKeyword) {
            onSearchUser();
        } else {
            setSearchResults([]);
        }
    }, [debouncedSearchKeyword]);

    useEffect(() => {
        if (department != "" && positionType != "" && (selectedUserTitle || selectedUser)) {
            setCheckButton(true);
        } else {
            setCheckButton(false);
        }
    })

    const onShowActionSheetPosition = () => {
        if (actionSheetPosition) {
            actionSheetPosition.current.show();
        }
    }

    const positionTypeOptions = [
        ...POSITION.map((item) => t(`${item.id}`)),
        t('cancel')
    ];

    const onSearchUser = async () => {
        if (!isEmpty(seachKeyword)) {
            setIsSearching(true);

            const params = {
                s: seachKeyword,
                c: 'vndt'
            };
            const res = await searchUsers(params);

            setIsSearching(false);
            setIsHideSearchResults(false);

            if (res.status && res.data) {
                setSearchResults(res.data);
            }
        }
    }

    const onSend = async () => {
        const params = {
            id: selectedUser.id,
            position: positionType.id,
            department: department
        }

        let errorMessage = null;

        if (errorMessage) {
            showErrorToast(errorMessage);
            return;
        } else {
            showLoading();
        }

        const res = await sendInvited(params);

        if (res && res.isSuccess) {
            setIsShowSuccess(true);
        }

    }

    const onSelectedSearchUser = (item) => {
        setIsHideSearchResults(true);
        setSelectedUser(item);
        setSelectedUserAddressTitle(null);
    };

    const onCancelSuccess = () => {
        NavigationService.navigate(Routes.COMPANY);
        setIsShowSuccess(false);
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

    return (
        <View style={styles.container}>
            <NavTitleBackHeader
                title={t('add_personal')}
                containerStyle={styles.navHead} />
            <View style={styles.searchContainer}>
                <RNInput4
                    textname={t('search_personal').toUpperCase()}
                    placeholder={t('seach_recipients_place_holder')}
                    placeholderTextColor={Colors.TEXT_INPUT}
                    autoCapitalize="none"
                    value={seachKeyword}
                    autoCorrect={false}
                    onChangeText={(text) => { setSearchKeyword(text) }}
                    ActivityIndicator={
                        <>
                            {isSearching && (
                                <View style={styles.searchingContainer}>
                                    <ActivityIndicator size="small" color={Colors.WHITE} />
                                </View>
                            )}
                        </>
                    }
                />
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
                <RNInput
                    textname={t('recipient').toUpperCase()}
                    editable={false}
                    value={selectedUser
                        ? `${selectedUser?.nickName?.toUpperCase() ?? ''} ${selectedUser?.email ? `(${selectedUser?.email})` : ''
                        }`
                        : ''} />
                <RNInput
                    textname={t('department').toUpperCase()}
                    value={department}
                    placeholderTextColor={Colors.TEXT_INPUT}
                    onChangeText={(value) => setDepartment(value)}
                />

                <RNActionSheet
                    textname={t('position').toUpperCase()}
                    onPress={onShowActionSheetPosition}
                    value={positionType ? t(`${positionType.id}`) : ''}
                    onChangeText={(value) => setPositionType(value)}
                />
                <View style={{ marginTop: 30 }}>
                    <BlueButton
                        title={t('invite')}
                        name="paper-plane"
                        type={!checkButton}
                        onPress={onSend}
                        activeBackgroundColor={!checkButton ? Colors.DARK_GREY : Colors.BLUE}
                        isActive={department == "" && positionType == "" ? false : true}
                        disabled={checkButton ? false : true}
                    />
                </View>
            </KeyboardAwareScrollView>

            <ActionSheet
                ref={actionSheetPosition}
                options={positionTypeOptions}
                cancelButtonIndex={positionTypeOptions.length - 1}
                onPress={(index) => {
                    if (index != positionTypeOptions.length - 1) {
                        const value = positionTypeOptions[index];
                        const condition = POSITION.find(
                            (item) => value === t(`${item.id}`),
                        );
                        if (condition) {
                            setPositionType(condition);
                        }
                    }
                }}
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
                            <Image source={ICO_CLOSE} style={{ width: 15, height: 15 }} resizeMode='contain' />
                        </TouchableX>
                    </View>
                }
                text1={t('completed')}
                text2={t('send_invite_friend')}
            />
        </View>
    );
}