import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from '../themes';
import { navigationRef, isMountedRef } from '../services';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Routes } from '../common';

import OnboardingStack from './onbroading';
import { PrivacyScreen } from '../container';

const Stack = createStackNavigator();

const RootNavigation = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <>
                <SafeAreaView styles={styles.topSafeAreaView} />
                <SafeAreaView style={styles.bottomSafeAreaView}>
                    <Stack.Navigator
                        screenOptions={{
                            ...TransitionPresets.SlideFromRightIOS
                        }}
                        headerMode="none"
                        initialRouteName={Routes.ONBOARDING_STACK}
                    >
                        <Stack.Screen name={Routes.ONBOARDING_STACK} component={OnboardingStack} />
                    </Stack.Navigator>
                </SafeAreaView>
            </>
        </NavigationContainer>
    )
}
export default RootNavigation;

const styles = StyleSheet.create({
    topSafeAreaView: {
        flex: 0,
        backgroundColor: Colors.SECONDARY,
    },
    bottomSafeAreaView: {
        flex: 1,
        backgroundColor: Colors.SECONDARY,
    },
});