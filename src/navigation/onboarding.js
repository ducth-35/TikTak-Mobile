import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { PrivacyScreen, OnboardingScreen } from '@/containers';
import { Routes } from '@/common';

const Stack = createStackNavigator();

const OnboardingStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS
    }}
    headerMode="none" initialRouteName={Routes.PRIVACY}>
      <Stack.Screen name={Routes.PRIVACY} component={PrivacyScreen} />
      <Stack.Screen name={Routes.ONBOARDING} component={OnboardingScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
