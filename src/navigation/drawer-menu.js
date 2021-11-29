import React, { useRef } from 'react';
import { Image, StyleSheet, Text, View, Animated } from 'react-native';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';

import {HomeScreen} from '@/containers';

import { Routes } from '@/common';
import { CustomDrawer } from './custom-drawer';
import { CoinWallet } from './navigator/coin_wallet';

const Drawer = createDrawerNavigator();

export const DrawerMenu = () => {
  return (
    <Drawer.Navigator
      drawerType="slide"
      initialRouteName={Routes.HOME}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name={Routes.HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name={Routes.COIN_WALLET}
        component={CoinWallet}
        options={{ headerShown: false }}
      />

    </Drawer.Navigator>
  )
};


