import React from "react";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Routes } from '../common';
import { OnboardingScreen, PrivacyScreen } from '../container';

const Stack = createStackNavigator();

const OnboardingStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS
            }}
            initialRouteName={Routes.PRIVACY}>
            <Stack.Screen name={Routes.PRIVACY} component={PrivacyScreen} />
            <Stack.Screen name={Routes.ONBOARDING} component={OnboardingScreen} />
        </Stack.Navigator>
    )
}
export default OnboardingStack;