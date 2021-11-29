import AsyncStorage from '@react-native-community/async-storage';

export const saveValue = async (key, value) => {
  try {
    if (value == null) {
      await removeValue(key);
      return { success: true };
    } else {
      await AsyncStorage.setItem(key, value);
      return { success: true };
    }
  } catch (e) {
    // console.log('LOG_Async Storage access Failed', e);
    return { error: e };
  }
};

export const saveMultiValues = async (data) => {
  const mappedValues = values.map((v, i) => {
    return [i, v];
  });
  try {
    await AsyncStorage.multiSet(mappedValues);
    return { success: true };
  } catch (e) {
    // console.log('LOG_Async Storage access Failed', e);
    return { error: e };
  }
};

export const getValue = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    // console.log('LOG_Async Storage access Failed', e);
    return false;
  }
};

export const getMultiValues = async (keys) => {
  let values;
  try {
    values = await AsyncStorage.multiGet(keys);
  } catch (e) {
    // console.log('LOG_Async Storage access Failed', e);
    return false;
  }

  let value;
  values.forEach((v, i) => {
    value[v[0]] = v[1];
  });

  return value;
};

export const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return { success: true };
  } catch (e) {
    // console.log('LOG_Async Storage access Failed', e);
    return { error: e };
  }
};

export const removeMultiValues = async (keys) => {
  try {
    await AsyncStorage.multiRemove(keys);
    return { success: true };
  } catch (e) {
    // console.log('LOG_Async Storage access Failed', e);
    return { error: e };
  }
};

export const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    // console.log('LOG_Async Storage access Failed', e);
  }
  return keys;
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // console.log('LOG_Async Storage access Failed', e);
  }
};
