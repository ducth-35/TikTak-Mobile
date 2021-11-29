import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { SignInScreen, SignUpScreen, ForgotPasswordScreen } from '@/containers';
import { Routes } from '@/common';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS
    }}
    headerMode="none" initialRouteName={Routes.SIGN_IN}>
      <Stack.Screen name={Routes.SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={Routes.SIGN_UP} component={SignUpScreen} />
      <Stack.Screen name={Routes.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
