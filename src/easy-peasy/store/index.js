import { persistStore } from "redux-persist";
import ConfigureStore from './configure-store';
import model from '../models';
import { ApiClient } from '../../services';

let store = null;
let appiClient = null;
let persistor = null;

const createStore = () => {
    // console.log('LOG_createstore ok');  
    appiClient = ApiClient;
    store = ConfigureStore(model, appiClient);
    persistor = persistStore(store);
    return store;
}

export default createStore;
export { store as Store, persistor }