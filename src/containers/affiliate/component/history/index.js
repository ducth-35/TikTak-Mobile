import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, RefreshControl } from 'react-native';
import { styles } from './styles';
import { NavTitleBackHeader, NoData, TouchableX } from '@/components';
import {
    ICO_HOME_AFFILIATE,
    SUPPORTED_COINS,
    Routes,
    showLoading,
} from '@/common';
import { useAppContext, useTranslation } from '@/hooks';
import { NavigationService } from '@/services';
import { Colors, actuatedNormalize, FontFamily } from "@/themes";
import { formatCommaNumber } from '@/utils';
import dayjs from 'dayjs';

export const HistoryBonusScreen = () => {
    const { t } = useTranslation();
    const { getUserCommission } = useAppContext();
    const [listBonus, setListBonus] = useState(null);
    const [isRefreshing, setIsFreshing] = useState(false);
    const [nodata, setNodata] = useState("");

    useEffect(() => {
        getData({ isShowloading: true });
    }, []);
    useEffect(() => {
        getData({ isShowloading: false });
    }, [isRefreshing]);


    const getData = async ({ isShowloading }) => {
        if (isShowloading) {
            showLoading();
        }
        const params = {};
        const res = await getUserCommission(params);
        setIsFreshing(false);

        if(res.data.length === 0) {
            setNodata(<NoData/>);
        } else {
            setListBonus(res);
        }
        
    }

    const onBackHome = () => {
        NavigationService.navigate(Routes.HOME)
    }
    const onRefresh = () => {
        setIsFreshing(true);
    }


    const renderItems = ({ item, index }) => {
        const {
            createdDate,
            amount,
            transactionContent,
            currencyCode
        } = item;

        const selectedCoin = SUPPORTED_COINS.find(
            (item) => item.currencyCode === currencyCode);

        const renderCommission = () => {
            if (transactionContent === 'Acwallet Commission Program') {
                return (
                    <>
                        <Text style={[styles.description]}> Commission </Text>
                    </>
                )
            } else if (transactionContent === 'Acwallet Airdrop Program') {
                return (
                    <>
                        <Text style={[styles.description]}> Airdrop </Text>
                    </>
                )
            } 
        }
        const renderCoin = () => {
            if (currencyCode === selectedCoin?.currencyCode) {
                return (
                    <>
                        <Text style={[styles.description, { color: Colors.BLUE }]}> {`${selectedCoin?.id.toUpperCase()}`}</Text>
                    </>
                )
            } return null;
        }
        return (
            <View>
                <View style={[styles.notificationBox, { borderRadius: 8 }]}>
                    <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                        {renderCommission()}
                        <Text style={[styles.description, { color: Colors.GREY, fontFamily: FontFamily.TitilliumWeb.Regular, fontSize: actuatedNormalize(13) }]}>{dayjs(createdDate).format('HH:mm  |  DD-MM-YYYY')}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'column', marginRight: actuatedNormalize(10) }}>
                        <Text style={[styles.description, { color: Colors.BLUE }]}>{formatCommaNumber(parseInt(parseFloat(amount)))}</Text>
                        {renderCoin()}
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <NavTitleBackHeader
                title={t('new_bonus_history')}
                containerStyle={styles.navHeader}
                rightContainer={
                    <TouchableX style={styles.navRightButton} onPress={onBackHome}>
                        <Image source={ICO_HOME_AFFILIATE} style={styles.images} />
                    </TouchableX>
                } />
            <View style={styles.container}>
                <FlatList
                    style={styles.bonusList}
                    enableEmptySections={true}
                    data={listBonus?.data}
                    ListEmptyComponent={nodata}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={onRefresh}
                            tintColor={'#fff'}
                        />
                    }
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={listBonus?.data ? <NoData/> : renderItems }
                />
            </View>
        </View>
    );
};

