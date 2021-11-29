import React, { useState, useEffect, useRef } from 'react';
import { MENUITEM, NavTitleBackHeader, NoData, Permission, TouchableX, PopupDelete } from '@/components';
import { useTranslation, useAppContext } from '@/hooks';
import { View, Text, FlatList, RefreshControl, Image, TextInput } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { styles } from './styles';
import {
    Routes,
    showErrorToast,
    showLoading,
    showSuccessToast,
    ICO_SEARCH,
    POSITION
} from '@/common';
import { NavigationService } from '@/services';
import { Colors, FontFamily } from '@/themes';
import { multiFilter } from '@/utils';
import { isEmpty } from 'lodash';
import ActionSheet from 'react-native-actionsheet';

export const CompanyScreen = () => {
    const { t } = useTranslation();
    const {
        getEmployer,
        listEmployer,
        deleteEmployer,
        myCompany,
        getMycompany,
        accountInfo
    } = useAppContext();

    const [visible, setVisible] = useState(false);
    const [isshowdelete, setIsShowDelete] = useState(false);
    const [listEmploy, setListEmploy] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [nodata, setNodata] = useState();
    const [name, setName] = useState();
    const [id, setId] = useState();
    const [totalPersonal, setTotalPersonal] = useState(null);

    const [keywords, setKeywords] = useState('');
    const [searchType, setSearchType] = useState(null);
    const [showSearchContainer, setShowSearchContainer] = useState(false);
    const actionSheetDepartmentRef = useRef(null);

    useEffect(() => {
        getMycompany();
        filterPersonal();
    }, [listEmployer, keywords, searchType]);

    useEffect(() => {
        fetchData({ isShowLoading: true });
    }, []);

    useEffect(() => {
        fetchData({ isShowLoading: false });
    }, [isRefreshing]);

    const fetchData = async ({ isShowLoading }) => {
        if (isShowLoading) {
            showLoading();
        }
        const res = await getEmployer();
        setIsRefreshing(false);
        setTotalPersonal(res.data?.length);

        // const res = await getEmployer();
        // setIsRefreshing(false);

        // if (res.data.length === 0) {
        //     setNodata(<NoData />)
        // } else {
        //     setListEmploy(res.data);
        // }
    }

    // const onCreateCredit = () => {
    //     setVisible(true);
    // }
    // const hideMenu = () => {
    //     setVisible(false);
    // }

    const onAddPerional = () => {
        NavigationService.navigate(Routes.ADDPERSIONAL, setVisible(false));
    }

    const onRefresh = () => {
        setIsRefreshing(true);
        fetchData();
    }

    const OnPressAccept = async () => {
        let errorMessage = null;

        if (errorMessage) {
            showErrorToast(errorMessage);
            return;
        } else {
            setIsShowDelete(false);
            showLoading();
        }
        const params = { userId: id }
        const res = await deleteEmployer(params);
        if (res && res.isSuccess) {
            showSuccessToast(t('delete_succes').replace(/#NAME/g, name));
        }
    }

    const OnCancel = () => {
        setIsShowDelete(false);
    }

    const onShowHideSearchContent = () => {
        setShowSearchContainer((prev) => !prev);
    };

    const onShowActionSheetDepartment = () => {
        if (actionSheetDepartmentRef) {
            actionSheetDepartmentRef.current.show();
        }
    }

    const transactionDepartmentOptions = [
        ...POSITION.map((item) => t(`${item.id}`)),
        t('cancel')
    ]

    const filterPersonal = () => {
        const filters = {};

        if (!isEmpty(keywords)) {
            filters[`id`] = (id) => id.includes(keywords);
          }      
        // const searchKey = ['id', 'firstName', 'lastName', 'department', 'position', 'address', 'national_id'];
        // const searchData = (data, keywords) => {
        //     return data.filter(item => {
        //         return searchKey.some(key =>
        //             String(item[key]).toLowerCase().includes(keywords.toLowerCase()));
        //     });
        // }
        // const ResultSearch = searchData(listEmployer, keywords);

        if (!isEmpty(searchType)) {
            filters[`position`] = (position) => {
                return position === searchType.value;
            };
        }

        const filtered = multiFilter({ arr: listEmployer, filters: filters });

        setListEmploy(filtered);


        // if (ResultSearch.length === 0) {
        //     setNodata(<NoData />)
        // } else {
        //     setListEmploy(ResultSearch);
        // }
        // setListEmploy(ResultSearch);

        // if (!isEmpty(keywords)) {
        //     if (ResultSearch.length === 0) {
        //         setNodata(<NoData />)
        //     } else {
        //         setListEmploy(ResultSearch);
        //     }
        //     setListEmploy(ResultSearch);
        // } else {
        //     if (filtered.length === 0) {
        //         setNodata(<NoData />)
        //     } else {
        //         setListEmploy(filtered);
        //     }
        //     setListEmploy(filtered);
        // }
    }



    const renderSearchContainer = () => {
        return (
            <View style={styles.searchContainer}>
                <TouchableX style={styles.searchTitle} onPress={onShowHideSearchContent}>
                    <View style={styles.inputContainer}>
                        <Image source={ICO_SEARCH} style={styles.icon} resizeMode="contain" />
                        <View style={styles.leftContainer}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor={Colors.GREY}
                                placeholder={t('search_person')}
                                value={keywords ? keywords : ''}
                                onChangeText={(value) => setKeywords(value)} />
                        </View>
                        <View style={styles.expandButton}>
                            <FontAwesome5
                                name={showSearchContainer ? 'chevron-up' : 'chevron-down'}
                                color="gray"
                                size={15}
                            />
                        </View>
                    </View>
                </TouchableX>
                {showSearchContainer && (
                    <>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableX
                                style={[styles.inputContainer1]}
                                onPress={onShowActionSheetDepartment}
                            >
                                <View style={styles.leftContainer} pointerEvents="none">
                                    <TextInput
                                        style={[styles.input, { color: Colors.GREY }]}
                                        placeholderTextColor={Colors.GREY}
                                        editable={false}
                                        placeholder={t('department')}
                                        value={searchType ? t(`${searchType.id}`) : ''}
                                    />
                                </View>
                                <View style={styles.rightContainer}>
                                    <FontAwesome5 name={'chevron-down'} color="gray" size={12} />
                                </View>
                            </TouchableX>
                        </View>
                    </>
                )}
            </View>
        )
    }

    const renderListEmployer = ({ item, index }) => {

        const { id, lastName, firstName, department, position, address, national_id } = item;

        const onShowDelete = () => {
            setIsShowDelete(true);
            setName(`${firstName} ${lastName}`);
            setId(id);
        }

        return (
            <TouchableX style={styles.itemContainer} onPress={onShowDelete}>
                <View style={styles.itemLeftContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <View style={styles.row}>
                                <Text style={[styles.title, { fontWeight: 'bold', fontSize: 14, color: Colors.BLUE }]}>{`${t('id')}:`}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Text style={[styles.title, { marginLeft: 10, fontWeight: 'bold', fontSize: 14, color: Colors.SKY_BLUE }]}>
                                {id}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <View style={styles.row}>
                                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('name_profile')}:`}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Text style={[styles.title, { marginLeft: 10, fontFamily: FontFamily.TitilliumWeb.Regular }]}>
                                {`${firstName} ${lastName}`}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <View style={styles.row}>
                                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('department')}:`}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Text style={[styles.title, { marginLeft: 10, fontFamily: FontFamily.TitilliumWeb.Regular }]}>
                                {department}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <View style={styles.row}>
                                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('position')}:`}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Text style={[styles.title, { marginLeft: 10, fontFamily: FontFamily.TitilliumWeb.Regular }]}>
                                {t(`${position}`)}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <View style={styles.row}>
                                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('address')}:`}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Text style={[styles.title, { marginLeft: 10, fontFamily: FontFamily.TitilliumWeb.Regular }]}>
                                {address}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <View style={styles.row}>
                                <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${t('id_number')}:`}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Text style={[styles.title, { marginLeft: 10, fontFamily: FontFamily.TitilliumWeb.Regular }]}>
                                {national_id}
                            </Text>
                        </View>
                    </View>

                </View>
            </TouchableX>
        )
    }

    const RenderList = () => {
        return (
            <View style={styles.container}>
                <NavTitleBackHeader
                    containerStyle={styles.navHead}
                    title={`${t('list_of_personnel')} (${totalPersonal})`}
                    rightContainer={
                        <TouchableX style={styles.navRightButton} onPress={onAddPerional}>
                            <FontAwesome5 name="user-plus" color="white" size={20} />
                        </TouchableX>
                    } />
                <View style={styles.container}>
                    <FlatList
                        style={styles.scrollview}
                        contentContainerStyle={styles.contentContainerStyle}
                        data={listEmploy}
                        ListHeaderComponent={renderSearchContainer()}
                        renderItem={renderListEmployer}
                        ListEmptyComponent={nodata}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={onRefresh}
                                tintColor='white'
                            />
                        }
                        keyExtractor={(item, index) => `${index.id}-${index}`}
                    />
                </View>
            </View>
        )
    }

    const Company = () => {
        if (accountInfo?.position === 'director') {
            return RenderList();
        } else if (accountInfo?.position === 'personnelManager') {
            return RenderList();
        } else {
            return Permission();
        }
    }

    return (
        <View style={styles.container}>
            {Company()}
            <PopupDelete
                isVisible={isshowdelete}
                text1={t('delete_personal')
                    .replace(/#COMPANY/g, myCompany?.name)
                    .replace(/#NAME/g, name)
                }
                titleCancel={t('no')}
                titleAccept={t('sure')}
                OnCancel={OnCancel}
                OnPressAccept={OnPressAccept}
            />

            <ActionSheet
                ref={actionSheetDepartmentRef}
                options={transactionDepartmentOptions}
                cancelButtonIndex={transactionDepartmentOptions.length - 1}
                onPress={(index) => {
                    if (index !== transactionDepartmentOptions.length - 1) {
                        const value = transactionDepartmentOptions[index];
                        const condition = POSITION.find(
                            (item) => value === t(`${item.id}`),
                        );
                        if (condition) {
                            setSearchType(condition);
                        }
                    }
                }}
            />
        </View>
    );
}
