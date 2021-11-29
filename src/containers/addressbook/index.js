import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, ScrollView } from 'react-native';

import SwiperFlatList from 'react-native-swiper-flatlist';
import { isArray, sortBy } from 'lodash';

import { useAppContext } from '@/hooks';
import { NavigationService } from '@/services';
import { CoinHeader, TouchableX } from '@/components';
import { useTranslation } from '@/hooks';
import { SUPPORTED_COINS, ICON_SELECTED, ICO_UN_SELECT, Routes } from '@/common';
import { Colors } from '@/themes';

import { MyAccounts } from './my-accounts';
import { Contacts } from './contacts';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const AddressBookScreen = ({ numColumns, onSelected }) => {
  const { t } = useTranslation();

  const [selectedCoin, setSelectedCoin] = useState('vndt');
  const [selectedNameCoin, setSelectedNameCoin] = useState('VNCOIN');
  const [selectedIndexTab, setSelectedIndexTab] = useState(0);
  const [coins, setCoins] = useState([]);

  const swiperRef = useRef(null);

  useEffect(() => {
    let tmpCoins = [...SUPPORTED_COINS.filter((item) => item.id !== 'all')];
    const sortedCoins = sortBy(tmpCoins, [
      (o) => {
        return o.order;
      },
    ]);
    setCoins(sortedCoins);
  }, []);

  const header_contacts = [
    { id: 1, title: t('contacts') },
  ]
  const headers_myaccount = [
    { id: 1, title: t('my_accounts').replace(/#COIN/g,`${selectedCoin.toUpperCase()}`) },
  ];

  const renderCoinItems = ({
    color,
    backgroundColor,
    isSelected,
    opacity,
    item }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => {
          setSelectedCoin(item.id)
          setSelectedNameCoin(item.name)
        }}>
          <View
            style={[
              styles.itemContent,
              {
                borderWidth: 1,
                borderColor:
                  selectedCoin === item.id
                  ? Colors.SUCCESS_CL : Colors.SECONDARY,
                backgroundColor:
                  selectedCoin === item.id
                  ? Colors.SECONDARY
                  : 'transparent',
                opacity:
                  selectedCoin === item.id
                    ? opacity ? opacity
                      : 1 : 0.5,
                flexDirection: 'row',
              }
            ]}
          >
            <Image style={styles.icon} source={item.icon} resizeMode="contain" />
            <View style={{ marginLeft: 10, flex: 1 / 2, }}>
              <Text style={[styles.coinShortName, {
                color: selectedCoin === item.id
                  ? color ? color : Colors.WHITE : Colors.GREY
              }
              ]} numberOfLines={1}>{item.shortname}
              </Text>
              <Text style={styles.coinName} numberOfLines={1}>{`${item.name}`}</Text>
            </View>
            <Image style={styles.icon_selected}
              source={selectedCoin === item.id ? ICON_SELECTED : ICO_UN_SELECT}
              resizeMode="contain" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onChangeSelectedTab = (index) => {
    setSelectedIndexTab(index);
    if (swiperRef.current) {
      swiperRef.current.scrollToIndex({ index: index });
    }
  };

  const renderHeaderItem = (item, index) => {
    return (

      <TouchableOpacity
        key={`${item.id}-${index}`}
        style={styles.tabHeaderItemContainer}
        onPress={() => onChangeSelectedTab(index)}>
        <Text
          style={[
            styles.tabItemTitle,
            {
              color:
                selectedIndexTab === index
                  ? Colors.WHITE
                  : 'rgba(255,255,255,0.5)',
            },
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>

    );
  };

  const renderTabMyAccount = (item, index) => {
    return (
      <View style={styles.tabItemcontainer} key={`${item.id}-${index}`}>
        <MyAccounts selectedCoin={selectedCoin} />
      </View>
    );
  };


  const renderTabContacts = (item, index) => {
    return (
      <View style={styles.tabItemcontainer} key={`${item.id}-${index}`}>
        <Contacts selectedCoin={selectedCoin} />
      </View>
    );
  };

  const onCreateAddress = () => {
    NavigationService.navigate(Routes.ADD_CONTACT, { coin: selectedCoin });
  }

  return (

    <View style={[styles.container, { backgroundColor: 'rgba(29, 29, 43, 1)' }]}>
      <CoinHeader
        containerStyle={[styles.navHeader, { backgroundColor: 'rgba(37, 42, 63, 1)' }]}
        rightContainer={
          <TouchableX style={styles.navRightButton} onPress={onCreateAddress}>
            <FontAwesome5 name="plus-circle" color="white" size={20} />
          </TouchableX>
        }
        leftContainer={
          <TouchableX style={styles.navLeftButton}>
            <FontAwesome5 />
          </TouchableX>
        }
      />
      <ScrollView>
        <View style={styles.coinsContainer}>
          <FlatList
            style={styles.list}
            data={coins}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={renderCoinItems}
            horizontal={false}
            numColumns={numColumns == null ? 2 : numColumns}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.contentContainer}>
          <View>
            <View style={styles.tabHeader}>
              {headers_myaccount.map((item, index) => renderHeaderItem(item, index))}
            </View>
            <View style={styles.tab_myaccount}>
              <SwiperFlatList
                ref={swiperRef}
                style={styles.wrapper}
                pagingEnabled
                showsPagination={false}
                threshold={100}
                onChangeIndex={({ index }) => {
                  setSelectedIndexTab(index);
                }}>
                {headers_myaccount.map((item, index) => renderTabMyAccount(item, index))}
              </SwiperFlatList>
            </View>
          </View>
          <View style={styles.tabHeader}>
            {header_contacts.map((item, index) => renderHeaderItem(item, index))}
          </View>
          <View style={[styles.tabContentContainer]}>
            <SwiperFlatList
              ref={swiperRef}
              style={styles.wrapper}
              pagingEnabled
              showsPagination={false}
              threshold={100}
              onChangeIndex={({ index }) => {
                setSelectedIndexTab(index);
              }}>
              {header_contacts.map((item, index) => renderTabContacts(item, index))}
            </SwiperFlatList>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
