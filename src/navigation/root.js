import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { SplashScreen } from '@/containers';
import { Colors } from '@/themes';
import { useAppContext } from '@/hooks';
import { APP_STATE, Routes, SESSION_TIMEOUT, STORE_COOKIE } from '@/common';
import { navigationRef, isMountedRef } from '@/services';
import { EventEmitter } from '@/utils';

import MainStack from './main';
import AuthStack from './auth';
import OnboardingStack from './onboarding';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const {
    appState,
    shouldShowOnboarding,
    checkShowOnboarding,
    getTransactionCoinFee,
    getCoinRates,
    forceLogout,
    checkStoreCookie,
  } = useAppContext();

  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    EventEmitter.addListener(SESSION_TIMEOUT, onSessionTimeout);

    checkAuth();
    return () => {
      EventEmitter.removeListener(SESSION_TIMEOUT, onSessionTimeout);

      isMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (appState === APP_STATE.LOGGED_IN) {
      intervalRef.current = setInterval(() => {
        updateCoinInformations();
      }, 60000);
    }
  }, [appState]);

  const onSessionTimeout = () => {
    forceLogout();
  };

  const updateCoinInformations = () => {
    getCoinRates();
    getTransactionCoinFee();
  };

  const checkAuth = async () => {
    await checkStoreCookie();
    await checkShowOnboarding();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <>
        <SafeAreaView style={styles.topSafeAreaView} />
        <SafeAreaView style={styles.bottomSafeAreaView}>
          <Stack.Navigator 
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS
          }}
          headerMode="none">
            {shouldShowOnboarding && appState === APP_STATE.ANONYMOUS && (
              <Stack.Screen
                name={Routes.ONBOARDING_STACK}
                component={OnboardingStack}
              />
            )}

            {appState === APP_STATE.ANONYMOUS ? (
              <Stack.Screen name={Routes.AUTH_STACK} component={AuthStack} />
            ) : (
              <Stack.Screen name={Routes.MAIN_STACK} component={MainStack} />
            )}
          </Stack.Navigator>
        </SafeAreaView>
      </>
    </NavigationContainer>
  );
};

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
