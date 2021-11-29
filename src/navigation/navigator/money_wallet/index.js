import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes, ICO_CREDIT_WHITE, ICO_CREDIT_BLACK } from '@/common';
import {
    WithdrawScreen,
    CoinMoney,
    TransactionHistory,
    TransferScreen,
    Balance
} from '@/containers';
import { actuatedNormalize, Colors, FontFamily } from '@/themes';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from '@/hooks';

const Tab = createBottomTabNavigator();

export const MoneyWallet = () => {
    const { t } = useTranslation();
    return (
        <>
            <Tab.Navigator
                initialRouteName={Routes.BALANCE}
                backBehavior={'none'}
                tabBarOptions={{
                    style: {
                        position: 'absolute',
                        height: actuatedNormalize(60),
                        backgroundColor: '#212529',
                        borderTopColor: '#212529',
                    },
                    labelStyle: styles.labelStyle,
                    tabStyle: {
                        height: actuatedNormalize(60),
                    },
                }}
            >
                <Tab.Screen
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={[styles.text, { color: focused ? Colors.WHITE : Colors.GREY }]}>{t('equity')}</Text>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome5 name={'wallet'} color={focused ? Colors.WHITE : Colors.GREY} size={18} />
                        ),
                    }}
                    name={Routes.BALANCE}
                    component={Balance}
                />
                <Tab.Screen
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={[styles.text, { color: focused ? Colors.WHITE : Colors.GREY, }]}>
                                {`${t('tab_deposit')} tiền`}</Text>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome5 name={'arrow-circle-down'} color={focused ? Colors.WHITE : Colors.GREY} size={18} />
                        ),
                    }}
                    name={Routes.COIN_MONEY}
                    component={CoinMoney}

                />
                <Tab.Screen
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={[styles.text, { color: focused ? Colors.WHITE : Colors.GREY, }]}>
                                {`${t('tab_withdrawal')} tiền`}</Text>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome5 name={'arrow-circle-up'} color={focused ? Colors.WHITE : Colors.GREY} size={18} />
                        ),
                    }}
                    name={Routes.WITHDRAW}
                    component={WithdrawScreen}

                />
                <Tab.Screen
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={[styles.text, { color: focused ? Colors.WHITE : Colors.GREY, }]}>
                                {`${t('transfer')} tiền`}</Text>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome5 name={'exchange-alt'} color={focused ? Colors.WHITE : Colors.GREY} size={18} />
                        ),
                    }}
                    name={Routes.TRANSFER}
                    component={TransferScreen}
                />
                <Tab.Screen
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={[styles.text, { color: focused ? Colors.WHITE : Colors.GREY, }]}>
                                {t('Lịch sử')}</Text>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome5 name={'history'} color={focused ? Colors.WHITE : Colors.GREY} size={18} />
                        ),
                    }}
                    name={Routes.HISTORY_TRANSACTION}
                    component={TransactionHistory}
                />
            </Tab.Navigator>
        </>
    )
}
const styles = StyleSheet.create({
    tabBarIcon: {
        marginTop: 10,
    },

    labelStyle: {
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        fontSize: actuatedNormalize(12),
        marginBottom: actuatedNormalize(6),
    },

    text: {
        fontSize: actuatedNormalize(13),
        paddingBottom: 5
    },
    icon: {
        width: 20,
        height: 20,
    },
    view: {
        width: 60,
        height: 60,
        backgroundColor: Colors.SECONDARY,
        borderRadius: 50,
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
});

