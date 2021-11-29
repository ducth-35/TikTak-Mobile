import { isEmpty } from 'lodash';

export const validateEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm.test(email);
};

export const validatePassword = (password) => {
  return !isEmpty(password);
};

export const validateName = (name) => {
  return !isEmpty(name);
};

export const hideEmail = (email) => {
  let hideWord = (str) => {
    return str[0] + '*'.repeat(str.length - 2) + str.slice(-1);
  }
  let arr = email.split('@');
  return hideWord(arr[0]) + '@' + hideWord(arr[1]);
}
