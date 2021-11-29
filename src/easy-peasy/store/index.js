import { persistStore } from 'redux-persist';

import model from '../models';
import ConfigureStore from './configure-store';
import { ApiClient } from '@/services';

let store = null;
let apiClient = null;
let persistor = null;

const createStore = () => {
  // console.log('LOG_createstore ok');

  apiClient = ApiClient;
  store = ConfigureStore(model, apiClient);
  persistor = persistStore(store);
  return store;
};

// 👇 Kickoff our StoreCreater and store instance

export default createStore;

export { store as Store, persistor };
