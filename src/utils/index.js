export * from './storage';
export * from './keychain';
export * from './validator';
export * from './numbers';
export * from './event-emitter';

import { Alert } from 'react-native';

import { isEmpty } from 'lodash';

export const getCookie = (cookie, cname) => {
  const name = cname + '=';
  const ca = cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const showAlert = ({
  title,
  message,
  acceptButtonTitle,
  cancelButtonTitle,
  acceptAction,
  cancelAction,
  showCancelButton = true,
}) => {
  Alert.alert(
    title,
    message,
    showCancelButton
      ? [
        {
          text: acceptButtonTitle,
          onPress: () => {
            acceptAction && acceptAction();
          },
        },
        {
          text: cancelButtonTitle,
          onPress: () => {
            cancelAction && cancelAction();
          },
        },
      ]
      : [
        {
          text: acceptButtonTitle,
          onPress: () => {
            acceptAction && acceptAction();
          },
        },
      ],
    { cancelable: false },
  );
};

export const getWalletAddress = (walletAddress) => {
  if (!isEmpty(walletAddress)) {
    const splitRealAddress = walletAddress.split(':');
    if (splitRealAddress.length > 0) {
      return splitRealAddress.pop();
    }
  }
};

export const multiFilter = ({ arr, filters }) => {
  const filterKeys = Object.keys(filters);
  return arr.filter((item) => {
    return filterKeys.every((key) => {
      if (!filters[key].length) return true;
      if (typeof filters[key] !== 'function') return true;
      return filters[key](item[key]);
    });
  });
};
