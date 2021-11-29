import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';

import { Colors, actuatedNormalize, FontFamily } from '@/themes';
import { ICO_SELECTED, ICO_UN_SELECT, ICO_PER_UP, ICO_PER_DOWN } from '@/common';


import styles from './styles';

export const SelectCoinsSwap = ({ coins, containerStyle, onSelected, numColumns }) => {
    const [selectedCoin, setSelectedCoin] = useState(null);

    useEffect(() => {
        if (selectedCoin) {
            onSelected && onSelected(selectedCoin);
        }
    });

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
                            backgroundColor:
                                selectedCoin?.id === item.id
                                    ? Colors.SECONDARY
                                    : 'transparent',

                            borderColor: selectedCoin?.id === item.id
                                ? Colors.SUCCESS_CL : Colors.SECONDARY,
                            flexDirection: 'row'
                        },
                    ]}
                    onPress={() => setSelectedCoin(item)}>
                    <Image style={styles.icon} source={item.icon} resizeMode="contain" />
                    <View style={{ marginLeft: 10, flex: 1 / 2, }}>
                        <Text style={styles.coinShortName} numberOfLines={1}>{`${item.shortname}/VNDT`}</Text>
                        <Text style={styles.coinName} numberOfLines={1}>{`${item.name}`}</Text>
                        {(item.perCoin > 0) ? (
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'center', marginRight: actuatedNormalize(5) }}>
                                    <Image source={ICO_PER_UP} style={{ width: 7, height: 7 }} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontFamily: FontFamily.TitilliumWeb.Bold,
                                        fontSize: actuatedNormalize(12),
                                        color: Colors.GREEN,
                                    }}>{`${((item.perCoin) / 100)}%`}</Text>
                                </View>
                            </View>
                        ) : (
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ justifyContent: 'center', marginRight: actuatedNormalize(5) }}>
                                        <Image source={ICO_PER_DOWN} style={{ width: 7, height: 7 }} />
                                    </View>
                                    <View>
                                        <Text style={{
                                            fontFamily: FontFamily.TitilliumWeb.Bold,
                                            fontSize: actuatedNormalize(12),
                                            color: Colors.RED,
                                        }}>{`${((item.perCoin) / 100)}%`}</Text>
                                    </View>
                                </View>
                            )}
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
                numColumns={numColumns == null ? 2 : numColumns}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={renderCoinItems}
                scrollEnabled={false}
            />
        </View>
    );
};

