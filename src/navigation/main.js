import React, { useRef, useEffect } from 'react';
import { AppState, Easing } from 'react-native';

import { CardStyleInterpolators, TransitionPresets, createStackNavigator } from '@react-navigation/stack';

import {
  TransferScreen,
  TransferForexScreen,
  SwapScreen,
  SettingsScreen,
  PincodeScreen,
  BuyScreen,
  SellScreen,
  TransferToScreen,
  AddContactScreen,
  ChangePasswordScreen,
  TwoFactorAuthenticationScreen,
  EnableAuthenticationScreen,
  CreateGiftCodeStep1,
  CreateGiftCodeStep2,
  ReceiveGiftcodeScreen,
  HistoryScreen,
  NotificationScreen,
  PhoneBookScreen,
  ListGiftcodeScreen,
  ManagerGiftcode,
  AffiliateScreen,
  HistoryBonusScreen,
  FriendsScreen,
  VerifyAccountScreen,
  GiftcodeReceiveHistory,
  Step1Screen,
  Step2Screen,
  Step3Screen,
  Step4Screen,
  CreditScreen,
  GantedCredit,
  CreditManagement,
  DetailScreen,
  CreditDetailScreen,
  ManageCredit,
  EditProfileScreen,
  ViewProfileScreen,
  CompanyScreen,
  AddPersonalScreen,
  MyCompanyScreen,
  MultiSendScreen,
  ExcelFile,
  GoogleSheet,
  IntructScreen,
  ListTransferScreen,
  TransactionHistory,
  WithdrawCoin,
  WithdrawMoney,
  WithdrawScreen,
  DepositCoins, 
  DepositMoney, 
  CoinMoney,
  COINS
} from '@/containers';

import { MoneyWallet } from '@/navigation';

import { Routes } from '@/common';

import { DrawerMenu } from './drawer-menu';

const Stack = createStackNavigator();

const MainStack = () => {
  const livecycleState = useRef(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (
      nextAppState === 'background'
    ) {
    }
    livecycleState.current = nextAppState;
  };

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS
      }}
      headerMode="none" initialRouteName={Routes.PIN_CODE}>
      <Stack.Screen
        name={Routes.PIN_CODE}
        component={PincodeScreen}
        options={{
          animationEnabled: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name={Routes.BOTTOM_TABS} component={DrawerMenu} />
      <Stack.Screen name={Routes.DEPOSIT_COIN} component={DepositCoins} />
      <Stack.Screen name={Routes.DEPOSIT_MONEY} component={DepositMoney} />

      <Stack.Screen name={Routes.COIN_MONEY} component={CoinMoney} />
      <Stack.Screen name={Routes.COINS} component={COINS} />

      <Stack.Screen name={Routes.WITHDRAW_COIN} component={WithdrawCoin} />
      <Stack.Screen name={Routes.WITHDRAW_MONEY} component={WithdrawMoney} />
      <Stack.Screen name={Routes.WITHDRAW} component={WithdrawScreen} />
      <Stack.Screen name={Routes.TRANSFER} component={TransferScreen} />
      <Stack.Screen name={Routes.TRANSFER_TO} component={TransferToScreen} />

      <Stack.Screen
        name={Routes.TRANSFER_FOREX}
        component={TransferForexScreen}
      />
      <Stack.Screen name={Routes.SWAP} component={SwapScreen} />
      <Stack.Screen name={Routes.SWAP_TO_BUY} component={BuyScreen} />
      <Stack.Screen name={Routes.SWAP_TO_SELL} component={SellScreen} />
      <Stack.Screen
        name={Routes.SETTINGS}
        component={SettingsScreen}
        options={{ gestureDirection: 'horizontal-inverted' }}
      />
      <Stack.Screen name={Routes.ADD_CONTACT} component={AddContactScreen} />
      <Stack.Screen
        name={Routes.CHANGE_PASSWORD}
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name={Routes.TWO_FACTOR}
        component={TwoFactorAuthenticationScreen}
      />
      <Stack.Screen
        name={Routes.ENABLE_AUTHENTICATION}
        component={EnableAuthenticationScreen}
      />
      <Stack.Screen
        name={Routes.CREATE_GIFTCODE_STEP_1}
        component={CreateGiftCodeStep1}
      />
      <Stack.Screen
        name={Routes.CREATE_GIFTCODE_STEP_2}
        component={CreateGiftCodeStep2}
      />
      <Stack.Screen
        name={Routes.RECEIVE_GIFTCODE}
        component={ReceiveGiftcodeScreen}
      />
      <Stack.Screen
        name={Routes.PHONE_BOOK}
        component={PhoneBookScreen}
      />
      <Stack.Screen name={Routes.NOTIFICATION} component={NotificationScreen} />
      <Stack.Screen name={Routes.HISTORY} component={HistoryScreen} />
      <Stack.Screen name={Routes.LIST_GIFTCODE} component={ListGiftcodeScreen} />
      <Stack.Screen name={Routes.MANAGER_GIFTCODE} component={ManagerGiftcode} />
      <Stack.Screen name={Routes.AFFILIATE} component={AffiliateScreen} />
      <Stack.Screen name={Routes.HISTORYBONUS} component={HistoryBonusScreen} />
      <Stack.Screen name={Routes.FRIENDS} component={FriendsScreen} />
      <Stack.Screen name={Routes.VERIFY_ACCOUNT} component={VerifyAccountScreen} />
      <Stack.Screen name={Routes.HISTORY_GIFTCODE} component={GiftcodeReceiveHistory} />
      <Stack.Screen name={Routes.VERIFY_STEP1} component={Step1Screen} />
      <Stack.Screen name={Routes.VERIFY_STEP2} component={Step2Screen} />
      <Stack.Screen name={Routes.VERIFY_STEP3} component={Step3Screen} />
      <Stack.Screen name={Routes.VERIFY_STEP4} component={Step4Screen} />
      <Stack.Screen name={Routes.CREDIT} component={CreditScreen} />
      <Stack.Screen name={Routes.CREDIT_MANAGEMENT} component={CreditManagement} />
      <Stack.Screen name={Routes.GRANTED_CREDIT} component={GantedCredit} />
      <Stack.Screen name={Routes.DETAIL} component={DetailScreen} />
      <Stack.Screen name={Routes.CREDITDETAIL} component={CreditDetailScreen} />
      <Stack.Screen name={Routes.MANAGER_SCREEN} component={ManageCredit} />
      <Stack.Screen name={Routes.VIEWPROFILE} component={ViewProfileScreen} />
      <Stack.Screen name={Routes.EDITPROFILE} component={EditProfileScreen} />
      <Stack.Screen name={Routes.COMPANY} component={CompanyScreen} />
      <Stack.Screen name={Routes.ADDPERSIONAL} component={AddPersonalScreen} />
      <Stack.Screen name={Routes.MYCOMPANY} component={MyCompanyScreen} />
      <Stack.Screen name={Routes.MULTISEND} component={MultiSendScreen} />
      <Stack.Screen name={Routes.GOOGLESHEET} component={GoogleSheet} />
      <Stack.Screen name={Routes.INPUTFILE} component={ExcelFile} />
      <Stack.Screen name={Routes.INTRUCT} component={IntructScreen} />
      <Stack.Screen name={Routes.LISTTRANSFER} component={ListTransferScreen} />



      <Stack.Screen
        name={Routes.MONEY_WALLET}
        component={MoneyWallet}
      />
      <Stack.Screen
        name={Routes.HISTORY_TRANSACTION}
        component={TransactionHistory}
      />

    </Stack.Navigator>
  );
};

export default MainStack;
