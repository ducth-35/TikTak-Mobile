import * as Keychain from 'react-native-keychain';

export const setLoginCredentials = async ({ email, password }) => {
  try {
    const res = await Keychain.setGenericPassword(email, password);
    return { status: true };
  } catch (e) {
    // console.log('keychain access failed ', e);
    return { status: false, error: e };
  }
};

export const getLoginCredentials = async () => {
  try {
    const { username, password } = await Keychain.getGenericPassword();

    if (username && password) {
      return { status: true, email: username, password };
    }
    return false;
  } catch (e) {
    // console.log('Cannot retrieve keychain data', e);
    return false;
  }
};

export const resetLoginCredentials = async () => {
  try {
    const reset = await Keychain.resetGenericPassword();
    return reset;
  } catch (e) {
    // console.log('cannot access or reset keychain data ', e);
    return false;
  }
};
