import React from 'react';
import { StackActions } from '@react-navigation/native';

/**
 * Call this function when you want to navigate to a specific route.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */

const navigate = (routeName, params) => {
    if (isMountedRef.current && navigationRef.current) {
        navigationRef.current.navigate(routeName, params);
    } else {
        //  
    }
}

const replace = (routeName, params) => {
    if (isMountedRef.current && navigationRef.current) {
        navigationRef.current.dispatch(StackActions.replace(routeName, params));
    } else {
        //
    }
}

const popToTop = (routeName, params) => {
    if (isMountedRef.current && navigationRef.current) {
        navigationRef.current.dispatch(StackActions.popToTop());
    } else {
        //
    }
}

const goBack = () => {
    navigationRef.current?.goBack();
}

const NavigationService = {
    navigate,
    replace,
    popToTop,
    goBack
}

export const navigationRef = React.createRef();
export const isMountedRef = React.createRef();

export default NavigationService;