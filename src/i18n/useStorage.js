import { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

export const useStorage = (key, defaultValue) => {
  const [storageValue, updateStorageValue] = useState(defaultValue);

  const getStorageValue = async () => {
    let value = defaultValue;
    try {
      value = JSON.parse(await AsyncStorage.getItem(key)) || defaultValue;
    } catch (e) {
    } finally {
      updateStorageValue(value);
    }
  };

  const updateStorage = async (newValue) => {
    try {
      if (newValue === null) {
        await AsyncStorage.removeItem(key);
      } else {
        const value = JSON.stringify(newValue);
        await AsyncStorage.setItem(key, value);
      }
    } catch (e) {
    } finally {
      updateStorageValue(newValue);
    }
  };

  useEffect(() => {
    getStorageValue();
  }, []);

  return [storageValue, updateStorage];
};
