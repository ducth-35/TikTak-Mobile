import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { NavTitleNoBackHeader } from '@/components';
import { useTranslation } from '@/hooks';
import { Colors } from '@/themes';
import { Routes } from '@/common';

import { TransactionHistory } from './transaction';
import { ExchangeHistory } from './exchange';
import { GiftcodeReceiveHistory } from './giftcode';
import styles from './styles';

const Tab = createMaterialTopTabNavigator();

export const HistoryScreen = ({ route }) => {
  const { t } = useTranslation();
  const check = route.params?.check;

  return (
    <View style={styles.container}>
      <NavTitleNoBackHeader
        title={t('history')}
        containerStyle={styles.navHeader}
        check={check}
      />
      <View style={styles.contentContainer}>
        <Tab.Navigator
          backBehavior="none"
          tabBarOptions={{
            style: {
              // marginTop: 1,
              backgroundColor: Colors.SECONDARY,
              borderTopColor: Colors.PRIMARY,
            },
            labelStyle: styles.labelStyle,
            activeTintColor: Colors.WHITE,
          }}>
          <Tab.Screen
            name={Routes.HISTORY_TRANSACTION}
            component={TransactionHistory}
            options={{ tabBarLabel: t('transaction') }}
          />

          <Tab.Screen
            name={Routes.HISTORY_GIFTCODE}
            component={GiftcodeReceiveHistory}
            options={{ tabBarLabel: t('giftcode_receipt') }}
          />

          <Tab.Screen
            name={Routes.HISTORY_EXCHANGES}
            component={ExchangeHistory}
            options={{ tabBarLabel: t('exchange') }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export * from './giftcode';
export * from './transaction';
export * from './exchange';


