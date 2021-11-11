import React from 'react'
import { StoreProvider } from 'easy-peasy';
import createStore, { persistor } from './src/easy-peasy/store';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, SafeAreaView, Text } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { NetInfoProvider } from '././src/services';
import { LocaleContextProvider } from './src/i18n';
import { RootNavigation } from './src/navigation';
import 'react-native-gesture-handler';

const store = createStore();

const App = () => {
  return (
    <PersistGate persistor={persistor}>
      <SafeAreaView>
        <NetInfoProvider>
          <LocaleContextProvider>
            <StoreProvider store={store}>
              <StatusBar barStyle="light-content" />
              <RootNavigation />
            </StoreProvider>
          </LocaleContextProvider>
        </NetInfoProvider>
      </SafeAreaView>
    </PersistGate>
  )
}
export default App;