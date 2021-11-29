import { createStore } from 'easy-peasy';

import { composeWithDevTools } from 'remote-redux-devtools';
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

let devTools = composeWithDevTools({
  name: 'Heylows',
  realtime: true,
  injectserver: 'react-native',
  trace: true,
});

export default (model, api) => {
  return createStore(model, {
    name: 'easystore',
    /**
     * for api injecting using injections
     */
    injections: { api },
    compose: devTools,
    devTools: true,
    // middleware: [logger],
    reducerEnhancer: (reducer) =>
      persistReducer(
        {
          key: 'easypeasystate',
          storage: AsyncStorage,
          whitelist: ['addressBook'],
        },
        reducer,
      ),
  });
};
