import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

import {
  Colors,
  actuatedNormalize,
  FontFamily,
  STATUSBAR_HEIGHT,
  Metrics,
} from '@/themes';

import { ICO_SELECTED, ICO_UN_SELECT, Routes } from '@/common';

import styles from './styles';

export const SelectCoins = ({ coins, containerStyle, onSelected, numColumns }) => {
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    if (selectedCoin) {
      onSelected && onSelected(selectedCoin);
    }
  }, [selectedCoin]);

  const renderCoinItems = ({ item, index }) => {
    return (
      <View style={[styles.itemContainer, {
        opacity: selectedCoin?.id === item.id
          ? 1 : 0.5,
      }]}>
        <TouchableOpacity
          style={[
            styles.itemContent,
            {
              backgroundColor: Colors.WHITE,

              borderColor: selectedCoin?.id === item.id
                ? Colors.SUCCESS_CL : Colors.SECONDARY,
              flexDirection: 'row'
            },
          ]}
          onPress={() => setSelectedCoin(item)}>
          <Image style={styles.icon} source={item.icon} resizeMode="contain" />
          <View style={{ marginLeft: 10, flex: 1 / 2, }}>
            <Text style={styles.coinShortName} numberOfLines={1}>{item.shortname}</Text>
            <Text style={styles.coinName} numberOfLines={1}>{item.name}</Text>
          </View>
          <Image style={styles.iconCheckBox}
            source={selectedCoin?.id === item.id ? ICO_SELECTED : ICO_UN_SELECT}
            resizeMode="contain" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        style={styles.list}
        data={coins}
        numColumns={numColumns == null ? 3 : numColumns}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderCoinItems}
        scrollEnabled={false}
      />
    </View>
  );
};


