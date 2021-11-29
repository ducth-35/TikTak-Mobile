import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';

import 'react-native-gesture-handler';
import { StoreProvider } from 'easy-peasy';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';

import { RootNavigation } from '@/navigation';
import createStore, { persistor } from '@/easy-peasy/store';
import { AppContextProvider } from '@/easy-peasy/app-context';
import { LocaleContextProvider } from '@/i18n';
import { NetInfoProvider } from '@/services';

const store = createStore();

const App = () => {
  return (
    <PersistGate persistor={persistor}>
      <SafeAreaProvider>
        <NetInfoProvider>
          <LocaleContextProvider>
            <StoreProvider store={store}>
              <AppContextProvider>
                <StatusBar barStyle="light-content" />
                <RootNavigation />
              </AppContextProvider>
            </StoreProvider>
          </LocaleContextProvider>
        </NetInfoProvider>
      </SafeAreaProvider>
    </PersistGate>
  );
};

export default App;
