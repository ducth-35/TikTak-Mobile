import React, { useState } from 'react';
import { View, Image, FlatList, RefreshControl } from 'react-native';
import { styles } from './styles';
import { NavTitleBackHeader, TouchableX, StatusBarAll} from '@/components';
import { useTranslation } from '@/hooks';
import {
    ICO_HOME_AFFILIATE,
    Routes,
} from '@/common';
import { NavigationService } from '@/services';

export const AffiliateScreen = () => {
    const { t } = useTranslation();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const data = [
        { id: 'Banner' },
        { id: 'LinkReferFriend' },
        { id: 'ShareLink' },
        { id: 'ShareMail' },
        { id: 'List' },
    ];

    const renderItems = ({ index, item }) => {
        const Comp = require('./elements')[`${item.id}`];
        return <Comp />
    }
    const onBackHome = () => {
        NavigationService.navigate(Routes.HOME)
    }

    return (
        <View style={styles.container}>
            <StatusBarAll />
            <NavTitleBackHeader
                title={t('affiliate')}
                containerStyle={styles.navHeader}
                rightContainer={
                    <TouchableX style={styles.navRightButton} onPress = {onBackHome}>
                        <Image source={ICO_HOME_AFFILIATE} style={styles.images} />
                    </TouchableX>
                } />
                <FlatList
                    style={styles.list}
                    data={data}
                    contentContainerStyle={{ paddingBottom: 200 }}
                    keyExtractor={(item, index) => `${item.id} - ${index}`}
                    renderItem={renderItems}
                    showsVerticalScrollIndicator={false}
                />
        </View>
    );
};

