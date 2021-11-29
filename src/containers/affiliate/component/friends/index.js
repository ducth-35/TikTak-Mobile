import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, RefreshControl } from 'react-native';
import { styles } from './styles';
import { NavTitleBackHeader, NoData, TouchableX } from '@/components';
import {
    ICO_HOME_AFFILIATE,
    Routes,
    showLoading
} from '@/common';
import { useTranslation, useAppContext } from '@/hooks';
import { NavigationService } from '@/services';
import { Colors, actuatedNormalize, FontFamily, STATUSBAR_HEIGHT } from "@/themes";
import dayjs from 'dayjs';

export const FriendsScreen = () => {
    const { t } = useTranslation();
    const { getListFriend } = useAppContext();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [list, setList] = useState(null);
    const [nodata,setNodata] = useState("");

    useEffect(() => {
        fetchData({ isShowLoading: true });
    }, []);

    useEffect(() => {
        fetchData({ isShowLoading: false });
    }, [isRefreshing])

    const fetchData = async ({ isShowLoading }) => {
        if (isShowLoading) {
            showLoading();
        }

        const params = {};

        const res = await getListFriend(params);

        setIsRefreshing(false);
        
        if(res.data.length === 0) {
            setNodata(<NoData/>)
        } else {
            setList(res);
        }
    }
    const onRefresh = () => {
        setIsRefreshing(true);
    }

    const onBackHome = () => {
        NavigationService.navigate(Routes.HOME)
    }


    const renderItems = ({ item, index }) => {
        const {
            email,
            create_date,
            permission
        } = item;

        const renderLevel = () => {
            if (permission === 'user') {
                return (
                    <>
                        <Text style={{ color: Colors.WHITE }}> {`${t('level')} ${'1'}`}</Text>
                    </>
                )
            } else if (permission === 'verified') {
                return (
                    <>
                        <Text style={{ color: Colors.WHITE }}> {`${t('level')} ${'2'}`}</Text>
                    </>
                )
            } else if (permission === 'security') {
                return (
                    <>
                        <Text style={{ color: Colors.WHITE }}> {`${t('level')} ${'3'}`}</Text>
                    </>
                )
            } else if (permission === 'vip') {
                return (
                    <>
                        <Text style={{ color: Colors.WHITE }}> {`${t('level')} ${'4'}`}</Text>
                    </>
                )
            } else if (permission === 'supervip') {
                return (
                    <>
                        <Text style={{ color: Colors.WHITE }}> {`${t('level')} ${'5'}`}</Text>
                    </>
                )
            } else if (permission === 'special') {
                return (
                    <>
                        <Text style={{ color: Colors.WHITE }}> {`${t('level')} ${'6'}`}</Text>
                    </>
                )
            } else if (permission === 'agent') {
                return (
                    <>
                        <Text style={{ color: Colors.WHITE }}> {`${t('level')} ${'7'}`}</Text>
                    </>
                )
            }
            return null;
        }

        return (
            <View>
                <View style={[styles.notificationBox, { borderRadius: 8 }]}>
                    <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                        <Text style={[styles.description, { marginBottom: actuatedNormalize(5) }]}>{email}</Text>
                        <Text style={[styles.description, { color: Colors.GREY, fontFamily: FontFamily.TitilliumWeb.Regular, fontSize: actuatedNormalize(13) }]}>Ngày tham gia: {dayjs(create_date).format('HH:mm  |  DD-MM-YYYY')}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', marginRight: actuatedNormalize(10) }}>
                        {renderLevel()}
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <NavTitleBackHeader
                title={t('friend_advise')}
                containerStyle={styles.navHeader}
                rightContainer={
                    <TouchableX style={styles.navRightButton} onPress={onBackHome}>
                        <Image source={ICO_HOME_AFFILIATE} style={styles.images} />
                    </TouchableX>
                } />
            <View style={styles.container}>
                <FlatList
                    style={styles.friendList}
                    enableEmptySections={true}
                    data={list?.data}
                    ListEmptyComponent={nodata}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={onRefresh}
                            tintColor={'#fff'}
                        />
                    }
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={renderItems} />
            </View>

        </View>
    );
};
