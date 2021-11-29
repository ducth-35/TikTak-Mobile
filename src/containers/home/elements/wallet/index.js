import React from 'react'
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from './styles';
import { Routes } from '@/common';
import { useTranslation } from '@/hooks';

import { MoneyCoin } from './money_coin';
import { TotalCoin } from './total';

import { Colors } from '@/themes';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createMaterialTopTabNavigator();

export const Wallet = () => {

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        backBehavior="none"
        tabBarOptions={{
          style: {
            marginTop: 1,
            backgroundColor: '#0063c3'
          },
          indicatorStyle: {
            backgroundColor: Colors.WHITE
          },
          labelStyle: styles.labelStyle,
          activeTintColor: Colors.WHITE,
          showIcon: true,
          tabStyle: {
            height: 50,
            flexDirection: 'row'
          }
        }}
      >
        <Tab.Screen
          name={Routes.MONEY_COIN}
          component={MoneyCoin}
          options={{
            tabBarLabel: t('Ví'),
            tabBarIcon: ({color}) =>
              <FontAwesome5 name={'wallet'} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name={Routes.TOTAL_COIN}
          component={TotalCoin}
          options={{
            tabBarLabel: t('Tổng cộng'),
            tabBarIcon: ({color}) =>
              <FontAwesome5 name={'home'} color={color} size={20} />,
          }}
        />
      </Tab.Navigator>
      <View>

      </View>
    </View>
  )
}