import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import Swiper from 'react-native-swiper';
import { BANNER_AFFILIATE, BANNER_AFFILIATE1, BANNER_AFFILIATE2 } from '@/common';

export const Banner = () => {

    const listBanner = [
        {
            icon: BANNER_AFFILIATE
        },
        {
            icon: BANNER_AFFILIATE1
        },
        {
            icon: BANNER_AFFILIATE2
        }
    ];

    const renderIntroItem = (item, index) => {
        const { icon } = item;
        return (
            <View key={`${icon}-${index}`}>
                <Image style={styles.image} source={icon} resizeMode="contain" />
            </View>
        );
    };

    return (
            <View style={styles.topContainer}>
                <Swiper                 
                    autoplay
                    dot={<View style={{backgroundColor: 'gray', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 50 }}/>}
                    activeDot={<View style={{backgroundColor: '#fff', width: 20, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 50}}/>}
                    dotColor="rgba(255,255,255, 0.15)">
                    {listBanner.map((item, index) => renderIntroItem(item, index))}
                </Swiper>
            </View>
    );
};
