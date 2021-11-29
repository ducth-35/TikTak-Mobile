import React from 'react';

import { StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef();
export const isMountedRef = React.createRef();

/**
 * Call this function when you want to navigate to a specific route.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
const navigate = (routeName, params) => {
  // console.log('LOG_navigate', routeName, params);
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(routeName, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
};

const replace = (routeName, params) => {
  // console.log('LOG_replace', routeName, params);

  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.dispatch(StackActions.replace(routeName, params));
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
};

const popToTop = () => {
  // console.log('LOG_popToTop');

  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.dispatch(StackActions.popToTop());
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
};

const goBack = () => {
  navigationRef.current?.goBack();
};

const NavigationService = {
  navigate,
  goBack,
  replace,
  popToTop
};

export default NavigationService;
