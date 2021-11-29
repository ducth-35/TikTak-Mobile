import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, RefreshControl } from 'react-native';
import { NavMenuHeaderUD, StatusBarAll } from '@/components';
import { Colors } from '@/themes';
import styles from './styles';
import { useAppContext } from '@/hooks';

export const HomeScreen = (props) => {
  const {
    getCoinRates,
    getUserWallets,
    getAccountInfo
  } = useAppContext();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const data = [
    { id: 'BuySellTransfer' },
    { id: 'Wallet' },
    { id: 'Exchange' },
    { id: 'RecentTranslations' },
    { id: 'Know' }
  ]

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => { 
    await getCoinRates();
    await getUserWallets();
    await getAccountInfo();
    setIsRefreshing(false);
  }

  const onRefresh = () => {
    setIsRefreshing(true);
    getData();
  }

  const renderItems = ({ item, index }) => {
    const Comp = require('./elements')[`${item.id}`];
    return (<Comp />)
  }

  return (
    <View style={styles.container}>
      <StatusBarAll />
      <NavMenuHeaderUD
        onshowMenu={() => props.navigation.openDrawer()}
        containerStyle={styles.navHeader}
      />
      <FlatList
        style={styles.list}
        data={data}
        contentContainerStyle={{ paddingBottom: 30 }}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={'white'}
          />
        }
        renderItem={renderItems}
        showsVerticalScrollIndicator={false}
      />
    </View>

  )
}